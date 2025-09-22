//import neccesary modules
import { useState } from "react";
import right_fill from "./assets/right_fill.svg";
import wrong_fill from "./assets/wrong_fill.svg";
import congrats from "./assets/congrats.svg";
import bgImg from "./assets/bg.jpg";
import './Quiz.css'

function Quiz(){
    return (
        <>
        <div className="title-score">
            <div className="title-game">
                <h1>Country Quiz</h1>
            </div>
            <div className="score-game">
                <span>🏆</span>
                <span>8/10 Points</span>
            </div>
        </div>
        <div className="quiz-container">
            <div className="number-question">
                <section className="question-section">1</section>
                <section className="question-section">2</section>
                <section className="question-section">3</section>
                <section className="question-section">4</section>
                <section className="question-section">5</section>
                <section className="question-section">6</section>
                <section className="question-section">7</section>
                <section className="question-section">8</section>
                <section className="question-section">9</section>
                <section className="question-section">10</section>
            </div>
            <div className="country-question">
                <h2>Best Nintendo Game Of All Time?</h2>
            </div>
            <div className="posible-answers">
                <button id="answer-1">The Legend Of Zelda: Skyward Swords</button>
                <button id="answer-2">Super Mario Galaxy</button>
                <button id="answer-3">Super Smash Bros Ultimate</button>
                <button id="answer-4">The Legend Of Zelda: Breath Of The Wild</button>
            </div>
        </div>
        </>
    )
}
export default Quiz;