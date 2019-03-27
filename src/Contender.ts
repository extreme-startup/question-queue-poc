import { v1 as uuidv1 } from 'uuid'
import delayedResolve from './utils/delayedResolve';
const BD_LATENCY = 50

export default function Contender (name) {
  const Id = name; //uuidv1()

  const askQuestion = (question) => {
    const answer = 'some answer'
    return delayedResolve(answer, BD_LATENCY)
  }

  return {
    askQuestion,
    getId: () => Id,
  }
}
