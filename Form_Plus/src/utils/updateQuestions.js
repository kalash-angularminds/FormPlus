function updatedQuestions(questions) {
  const updated = questions.map((question) => {
    let initialAnswer;

  
    if (question.type === "checkbox") {
      initialAnswer = [];
    } else if (question.type === "file") {
      initialAnswer = null;
    } else {
      initialAnswer = "";
    }

    return {
      ...question,
      answer: initialAnswer,
    };
  });

  return updated;
}

export default updatedQuestions;
