// shuffles the array
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

// prepares questions with the country API
export function prepareQuestions(countries) {
  // shuffle before start
  const shuffledCountries = shuffleArray(countries);

  // choose only 10
  return shuffledCountries.slice(0, 10).map((country) => {
    const correct = country.capital?.[0] || "Unknown";

    // generates incorrect answers
    const wrongOptions = [];
    while (wrongOptions.length < 3) {
      const random =
        shuffledCountries[Math.floor(Math.random() * shuffledCountries.length)];
      const capital = random.capital?.[0];
      if (capital && capital !== correct && !wrongOptions.includes(capital)) {
        wrongOptions.push(capital);
      }
    }

    // build answers with shuffle
    const answers = shuffleArray([
      { text: correct, isCorrect: true },
      ...wrongOptions.map((capital) => ({
        text: capital,
        isCorrect: false,
      })),
    ]);

    return {
      question: `What is the capital of ${country.name.common}?`,
      answers,
    };
  });
}
