// Función para barajar elementos en un array
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

// Prepara las preguntas con la API de países
export function prepareQuestions(countries) {
  // Barajar los países antes de elegir
  const shuffledCountries = shuffleArray(countries);

  // Elegir solo 10 aleatorios del total
  return shuffledCountries.slice(0, 10).map((country) => {
    const correct = country.capital?.[0] || "Unknown";

    // Generar opciones incorrectas
    const wrongOptions = [];
    while (wrongOptions.length < 3) {
      const random =
        shuffledCountries[Math.floor(Math.random() * shuffledCountries.length)];
      const capital = random.capital?.[0];
      if (capital && capital !== correct && !wrongOptions.includes(capital)) {
        wrongOptions.push(capital);
      }
    }

    // Armar respuestas con shuffle
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
