import React, { useState, useEffect } from "react";
import CourseServices from "../../services/CourseServices";
import convertDateFormat from "../../util/DateConvert";
import RequestService from "../../services/RequestService";
import NavBar from "../../Components/Navbar/NavBar";
import "./MyRequest.css"


const MyRequestHistory = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        RequestService.getMyAccessRejectRequet().then((response) => {
            setRequests(response.data);
        });
    }, [])

    return (
        <>
            <NavBar mode={1} />
            <div className="requestHistory">
                <div className="head">
                    <h1>Request History</h1>
                </div>
                <div className="log-list">
                    {
                        requests.map((request) => (
                            <div className="log">
                                <div>
                                    <p>
                                        <span style={{ color: request.requestStatus === 1 ? 'green' : 'red' }}>
                                            {request.requestStatus === 1 ? 'Access' : 'Reject'}
                                        </span> - {request.courseName}
                                    </p>
                                    <p>
                                        {request.requestStatus == 1 ? `You've joined the course at ${convertDateFormat(request.requestTime)}` : `You've been rejected from the course at ${convertDateFormat(request.requestTime)}`}
                                    </p>
                                    <p>{request.requestStatus == -1 ? `Reason: ${request.requestReason}` : ""}</p>
                                </div>
                                <div>
                                    <button>View Details</button>
                                </div>
                            </div>
                        ))

                    }
                </div>
            </div>
        </>
    );
}

export default MyRequestHistory
