//Quiz.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import Question from "./Question";
import Congratulations from "./Congratulations";
import StartScreen from "./StartScreen";
import { prepareQuestions } from "./quizLogic";
import "./Quiz.css";

//main component, manages the quiz state and flow
function Quiz() {
  //here, we store questions and answers
  const [questions, setQuestions] = useState([]);
  //manages index of active question
  const [currentIndex, setCurrentIndex] = useState(0);
  //control wich screen to display
  const [showQuiz, setShowQuiz] = useState(false);

  //runs only once
  useEffect(() => {
    if (showQuiz) {
      const savedState = localStorage.getItem("quizState");
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        setQuestions(parsedState.questions);
        setCurrentIndex(parsedState.currentIndex);
      } else {
        fetchQuestions();
      }
    }
  }, [showQuiz]);

  //runs every time we reload to save in the local Storage
  useEffect(() => {
    if (showQuiz && questions.length > 0) {
      const stateToSave = { questions, currentIndex };
      localStorage.setItem("quizState", JSON.stringify(stateToSave));
    }
  }, [questions, currentIndex, showQuiz]);

  //fetch questions from the API
  const fetchQuestions = () => {
    axios
      .get("https://restcountries.com/v3.1/independent?status=true")
      .then((res) => {
        const prepared = prepareQuestions(res.data).map((q) => ({
          ...q,
          isAnswered: false,
          selectedAnswer: null,
          isCorrect: null,
        }));
        setQuestions(prepared);
        setCurrentIndex(0);
      })
      .catch((err) => console.error("Error fetching API:", err));
  };

  //handles the users answer, updates the state of a question
  const handleAnswer = (answer, isCorrect) => {
    const newQuestions = [...questions];
    newQuestions[currentIndex] = {
      ...newQuestions[currentIndex],
      isAnswered: true,
      selectedAnswer: answer,
      isCorrect: isCorrect,
    };
    setQuestions(newQuestions);
  };

  //resets the game 
  const handleRestart = () => {
    localStorage.removeItem("quizState");
    fetchQuestions();
  };

  //transition from the start screen to the quiz
  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  //calculates the number of answered questions
  const answeredCount = questions.filter((q) => q.isAnswered).length;
  //calculates final score
  const score = questions.filter((q) => q.isCorrect).length;
  //checks if all the questions have been answered
  const quizFinished = answeredCount === questions.length && questions.length > 0;

  return (
    <>
      {showQuiz && (
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
      )}

      <div className="quiz-container">
        {!showQuiz ? (
          <StartScreen onStart={handleStartQuiz} />
        ) : quizFinished ? (
          <Congratulations score={score} total={questions.length} onRestart={handleRestart} />
        ) : (
          <>
            {questions.length === 0 ? (
              <h2>Loading questions...</h2>
            ) : (
              <>
                <div className="number-question">
                  {questions.map((q, index) => {
                    const curr = index === currentIndex;
                    const answered = q.isAnswered;
                    return (
                      <section
                        key={index}
                        className={`question-section ${curr ? "active" : ""} ${
                          answered ? "answered" : ""
                        }`}
                        onClick={() => setCurrentIndex(index)}
                        style={{ cursor: "pointer" }}
                      >
                        {index + 1}
                      </section>
                    );
                  })}
                </div>
                <Question
                  data={questions[currentIndex]}
                  onAnswer={handleAnswer}
                  current={currentIndex + 1}
                  total={questions.length}
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Quiz;