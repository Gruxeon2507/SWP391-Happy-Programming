import React, { useState, useEffect } from "react";
import CourseServices from "../../services/CourseServices";
import convertDateFormat from "../../util/DateConvert";
import RequestService from "../../services/RequestService";


const MyRequestHistory = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        RequestService.getMyAccessRejectRequet().then((response) => {
            setRequests(response.data);
        });
    }, [])

    return (
        <>
        <h1>Request History</h1>
            {
                requests.map((request) => (
                    <div className="">
                        <hr />
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
                ))

            }
        </>
    );
}

export default MyRequestHistory
