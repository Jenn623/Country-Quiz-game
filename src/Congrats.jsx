import { useState } from "react";

function Congrats(){
    return(
        <>
        <div className="congrats-container">
            <div className="congrats-icon"></div>
            <div className="correct-answers"></div>
            <button className="play-again"></button>
        </div>
        </>
    )
}

export default Congrats;