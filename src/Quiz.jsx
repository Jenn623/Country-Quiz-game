//import neccesary modules
import { useState, useEffect } from "react";
import axios from "axios";
import Question from "./Question";
import Congratulations from "./Congratulations";
import { prepareQuestions } from "./quizLogic";
import right_fill from "./assets/right_fill.svg";
import wrong_fill from "./assets/wrong_fill.svg";
import congrats from "./assets/congrats.svg";
import bgImg from "./assets/bg.jpg";
import "./Quiz.css";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);

  // Llamada a la API y armado de preguntas
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/independent?status=true")
      .then((res) => {
        const prepared = prepareQuestions(res.data);
        setQuestions(prepared);
      })
      .catch((err) => console.error("Error fetching API:", err));
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore((prev) => prev + 1);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowCongrats(true);
    }
  };

  if (questions.length === 0) return <h2>Loading questions...</h2>;

  return (
    <>
      <div className="title-score">
        <div className="title-game">
          <h1>Country Quiz</h1>
        </div>
        <div className="score-game">
          <span>🏆</span>
          <span>
            {score}/{questions.length} Points
          </span>
        </div>
      </div>

      <div className="quiz-container">
        {/* Sección de números de preguntas */}
        <div className="number-question">
  {questions.map((_, index) => {
    const answered = index < currentIndex; // ya respondida
    const curr = index === currentIndex;   // pregunta actual
    return (
      <section
        key={index}
        className={`question-section ${curr ? "active" : ""} ${
          answered ? "answered" : ""
        }`}
        onClick={() => setCurrentIndex(index)}
        style={{cursor: "pointer"}}
      >
        {index + 1}
      </section>
    );
  })}
</div>

        {/* Si terminó el quiz → muestra pantalla final */}
        {showCongrats ? (
          <Congratulations score={score} total={questions.length} />
        ) : (
          <Question
            data={questions[currentIndex]}
            onAnswer={handleAnswer}
            current={currentIndex + 1}
            total={questions.length}
          />
        )}
      </div>
    </>
  );
}

export default Quiz;