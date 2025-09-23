import congrats from "./assets/congrats.svg";

function Congratulations({ score, total }) {
  return (
    <div className="congrats-container">
      <img src={congrats} alt="Congratulations" />
      <h2>🎉 Congratulations!</h2>
      <p>
        You scored <strong>{score}</strong> out of <strong>{total}</strong>
      </p>
    </div>
  );
}

export default Congratulations;
