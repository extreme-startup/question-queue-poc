type Question = {
  question: string;
  result: string;
  reward: number;
  penalty: number;
}

const questions: Question[] = [{
  question: '2+2',
  result: '4',
  reward: 2,
  penalty: -3
}, {
  question: '5*3',
  result: '15',
  reward: 6,
  penalty: -10
}, {
  question: '4^2',
  result: '16',
  reward: 10,
  penalty: -3
}];

const getRandomQuestion = (questions: Question[]) => {
  const index = Math.floor(questions.length * Math.random());
  return questions[index];
}

const checkQuestion = (question, answer) => {
  return Math.random() < 0.5;
}
export default function QuestionProvider() {
  return {
    getRandomQuestion: () => getRandomQuestion(questions),
    checkQuestion,
  };
}
