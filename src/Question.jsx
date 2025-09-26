//Question.jsx
import right_fill from "./assets/right_fill.svg";
import wrong_fill from "./assets/wrong_fill.svg";
import './Quiz.css'

//destructures from the data prop
function Question({ data, onAnswer }) {
  const { question, answers, isAnswered, selectedAnswer } = data;

  //here, we prevent that users can change their answers
  const handleSelect = (answer) => {
    if (isAnswered) return;
    const isCorrect = answer.isCorrect;
    onAnswer(answer, isCorrect);
  };

  return (
    <>
      <div className="country-question">
        <h2>{question}</h2>
      </div>

      <div className="posible-answers">
        {answers.map((answer, index) => (
          <button
            key={index}
            className={`
              answer-button 
              ${isAnswered && answer.isCorrect ? "correct" : ""}
              ${isAnswered && selectedAnswer?.text === answer.text && !answer.isCorrect ? "wrong" : ""}
            `}
            onClick={() => handleSelect(answer)}
            disabled={isAnswered}
          >
            {answer.text}
            {isAnswered && (
              // Lógica para mostrar los íconos
              (selectedAnswer?.text === answer.text && !answer.isCorrect) ? (
                // Muestra el ícono de "incorrecto" si esta fue la respuesta seleccionada y no es correcta
                <img src={wrong_fill} alt="Wrong answer" className="guessed-answer"/>
              ) : (isAnswered && answer.isCorrect) ? (
                // Muestra el ícono de "correcto" si esta es la respuesta correcta (sin importar si fue seleccionada o no)
                <img src={right_fill} alt="Correct answer" className="guessed-answer"/>
              ) : null
            )}
          </button>
        ))}
      </div>
    </>
  );
}

export default Question;