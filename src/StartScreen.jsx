//StartScreen.jsx
import worldIcon from "./assets/world.png";

function StartScreen({onStart}){
    return (
        <div className="start-container">
            <img src={worldIcon} alt="Map Icon" className="world-img"/>
            <h2>Country Quiz</h2>
            <button className="start-button" onClick={onStart}>Play</button>
        </div>
    );
}

export default StartScreen;