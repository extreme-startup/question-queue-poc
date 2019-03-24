import { v1 as uuidv1 } from 'uuid'
import delayedResolve from './utils/delayedResolve';

export type Question = {
  question: string;
  result: string;
  reward: number;
  penalty: number;
}

const questions : Question[] = [{
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
}]

const getRandomQuestion = (questions: Question[]) => {
  const index = Math.floor(questions.length * Math.random())
  return {
    Id: uuidv1(),
    ...questions[index],
  }
}

const CHECK_LATENCY = 100;

const checkQuestion = (question, answer) => delayedResolve(Math.random() < 0.5, CHECK_LATENCY);
export default function QuestionProvider () {
  return {
    getRandomQuestion: () => getRandomQuestion(questions),
    checkQuestion,
  }
}
