import React from 'react';
import "./StateMessage.css"

import penguinRunning from "../../Assets/penguin.gif"

const Loading = () => {
    return (
        <div className='loading-screen'>
            <img src={penguinRunning}></img>
        </div>
    );
};
export default Loading;