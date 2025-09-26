//Congratulations.jsx
import congrats from "./assets/congrats.png";
import './Quiz.css';

function Congratulations({ score, total, onRestart }) {
  return (
    <div className="congrats-container">
      <img src={congrats} alt="Congratulations" />
      <h2 className="congrats-text"> Congrats! You completed</h2>
      <h2 className="congrats-text"> the quiz.</h2>
      <p>
       You scored <strong>{score}</strong> out of <strong>{total}</strong>
      </p>
      <button className="restart-button" onClick={onRestart} id="play-again">
        Play Again
      </button>
    </div>
  );
}

export default Congratulations;