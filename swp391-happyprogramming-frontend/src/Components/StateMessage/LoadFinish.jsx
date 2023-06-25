import React, { useState } from 'react';
import Loading from './Loading';

function LoadFinish(props) {

    // const [currentState, setCurrentState] = useEffect(0);

    const [showState, setShowState] = useState(true);
    const hideState = () => {
        setShowState(false);
        console.log("loadshow");
    };

    return (
        <>
            {showState ? <>{props.state === 0 ? <Loading></Loading> :
                props.state === 1 ? <>
                    <div className='load-finish-dialog'>
                        <div className="success-dialog">
                            <ion-icon name="chevron-down-circle-outline"></ion-icon>
                            <h1>Success</h1>
                            <p>Your action was successful.</p>
                            <button onClick={hideState}>Confirm</button>
                        </div>
                    </div></> :
                    props.state === 2 ? <>
                        <div className='load-finish-dialog'>
                            <div className="fail-dialog">
                                <ion-icon name="close-circle-outline"></ion-icon>
                                <h1>Error</h1>
                                <p>Your action failed.</p>
                                <button onClick={hideState}>Confirm</button>
                            </div>
                        </div>
                    </> : <></>
            }</> : <></>}

        </>
    );
}
export default LoadFinish;

// export const SuccessDialog = () => {
//     return (
//         <div className='load-finish-dialog'>
//             <div className="success-dialog">
//                 <ion-icon name="chevron-down-circle-outline"></ion-icon>
//                 <h1>Success</h1>
//                 <p>Your action was successful.</p>
//                 <button>Confirm</button>
//             </div>
//         </div>
//     );
// };

// export const FailDialog = () => {
//     return (
//         <div className='load-finish-dialog'>
//             <div className="fail-dialog">
//                 <ion-icon name="close-circle-outline"></ion-icon>
//                 <h1>Error</h1>
//                 <p>Your action failed.</p>
//                 <button>Confirm</button>
//             </div>
//         </div>
//     );
// };
