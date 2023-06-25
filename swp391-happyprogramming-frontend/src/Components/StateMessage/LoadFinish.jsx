import React, { useEffect, useState } from 'react';
import Loading from './Loading';

function LoadFinish(props) {

    // const [currentState, setCurrentState] = useEffect(0);

    const [showState, setShowState] = useState(true);
    const hideState = () => {
        setShowState(false);
    }
    useEffect(() => {
        setShowState(true);
    }, [props.state]);



    return (
        <>
            {showState ? (
                <>
                    {props.state === 0 && <Loading />}
                    {props.state === 1 &&
                        <div className='load-finish-dialog'>
                            <div className="success-dialog">
                                <ion-icon name="chevron-down-circle-outline"></ion-icon>
                                <h1>Success</h1>
                                <p>Your action was successful.</p>
                                <p>{showState ? "true" : "false"}</p>
                                <button onClick={hideState}>Confirm</button>
                            </div>
                        </div>}
                    {props.state === 2 &&
                        <div className='load-finish-dialog'>
                            <div className="fail-dialog">
                                <ion-icon name="close-circle-outline"></ion-icon>
                                <h1>Error</h1>
                                <p>Your action failed.</p>
                                <p>{showState ? "true" : "false"}</p>
                                <button onClick={hideState}>Confirm</button>
                            </div>
                        </div>}
                </>
            ) : null}
        </>
    );
}

export default LoadFinish;

