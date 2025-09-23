function Question({ data, onAnswer, current, total }) {
  return (
    <>
      <div className="country-question">
        <h2>{data.question}</h2>
      </div>

      <div className="posible-answers">
        {data.answers.map((answer, index) => (
          <button
            key={index}
            id={`answer-${index + 1}`}
            onClick={() => onAnswer(answer.isCorrect)}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </>
  );
}

export default Question;

