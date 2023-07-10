import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import ParticipateServices from "../../services/ParticipateServices";
import { useParams, useNavigate, Link } from "react-router-dom";
import RequestService from "../../services/RequestService";
const RequestButton = ({ courseID }) => {
    console.log("truyen sang ", courseID);
    const [participateStatus, setParticipateStatus] = useState(-1);
    const [isClick, setIsClick] = useState(true)
    const cancelRequest = async () => {
        setClickedButtonId(courseID);
        await RequestService.deleteParticipateDeleteRequest(courseID);
        window.location.reload()
    };
    const [clickedButtonId, setClickedButtonId] = useState(null);
    const handleRequest = async () => {
        setClickedButtonId(courseID);
        if (localStorage.getItem('token')) {
            try {
                await RequestService.insertParticipateInsertRequest(courseID);
                // setIsClick(!isClick);
                window.location.reload()
            } catch (error) {
                console.log('Error occurred while handling request:', error);
            }
        } else {
            window.location.href = '/login';
        }
    };
    useEffect(() => {
        ParticipateServices.getParticipateByUser(courseID)
            .then((res) => {
                // setParticipation(res.data);
                const p = res.data;
                if (p.length == 0 || p.status.statusId == -1) {
                    setParticipateStatus(-1);
                    console.log(participateStatus);
                } else if (p.status.statusId == 0) {
                    setParticipateStatus(0);
                } else if (p.status.statusId == 1) {
                    setParticipateStatus(1);
                }
            })
            .catch((error) => {
                console.log("error fetching participation" + error);
            });
    }, []);
    console.log("PARTICIPATE STATUS " + participateStatus);

    return (
        <span>
            {participateStatus == -1 ? (
                <>
                    <div>
                        <button disabled={clickedButtonId === courseID}
                            style={{
                                border: "4px solid var(--item2)",
                                color: "var(--item2)",
                            }}
                            id="requestBttn"
                            onClick={() => handleRequest()}>
                            Request
                        </button>
                    </div>
                </>
            ) : participateStatus == 0 ? (
                <>
                    <div disabled={clickedButtonId === courseID} onClick={() => cancelRequest(courseID)}>
                        <button
                            id="requestBttn"
                            style={{
                                border: "4px solid var(--item)",
                                color: "var(--item)",
                            }}
                        >
                            Cancel request
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <button
                            id="requestBttn"
                            style={{
                                border: "4px solid var(--item2)",
                                color: "var(--item2)",
                            }}
                            disabled={clickedButtonId === courseID}
                        >
                            <Link to={"/courses/feed/" + courseID}>Go to course</Link>
                        </button>
                    </div>
                </>
            )}
        </span>
    );
};

export default RequestButton;
