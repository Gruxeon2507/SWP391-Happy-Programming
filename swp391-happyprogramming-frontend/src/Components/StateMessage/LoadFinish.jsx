import React, { useState } from 'react';
import Loading from './Loading';

function LoadFinish(props) {

    const [showState, setShowState] = useState(0);
    return (
        <>
            {props.state === 0 ? <Loading></Loading> :
                props.state === 1 ? <SuccessDialog></SuccessDialog> :
                    props.state === 2 ? <FailDialog></FailDialog> : <></>
            }
        </>
    );
}
export default LoadFinish;

export const SuccessDialog = () => {
    return (
        <div className='load-finish-dialog'>
            <div className="success-dialog">
                <ion-icon name="chevron-down-circle-outline"></ion-icon>
                <h1>Success</h1>
                <p>Your action was successful.</p>
                <button>Confirm</button>
            </div>
        </div>
    );
};

export const FailDialog = () => {
    return (
        <div className='load-finish-dialog'>
            <div className="fail-dialog">
                <ion-icon name="close-circle-outline"></ion-icon>
                <h1>Error</h1>
                <p>Your action failed.</p>
                <button>Confirm</button>
            </div>
        </div>
    );
};
