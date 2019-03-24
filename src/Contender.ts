import { v1 as uuidv1 } from 'uuid'
import delayedResolve from './utils/delayedResolve';
const BD_LATENCY = 50

export default function Contender (name) {
  const Id = uuidv1()

  let ContenderInfo = {
    interval: 5000,
    score: 0
  }

  const updateScore = (info, score) => ({
    ...info,
    score: info.score + score,
  })

  const decreseSpeed = (info) => {
    if (info.interval >= 20000) {
      return info
    }
    return {
      ...info,
      interval: info.interval + 500,
    }
  }

  const increaseSpeed = (info) => {
    if (info.interval <= 1000) {
      return info
    }
    return {
      ...info,
      interval: info.interval - 500,
    }
  }

  const printState = () => {
    console.log(`${name}:\tscore: ${ContenderInfo.score}\t interval: ${ContenderInfo.interval}`)
  }

  const askQuestion = (question) => {
    const answer = 'some answer'
    return delayedResolve(answer, BD_LATENCY)
  }

  return {
    updateScore: (score) => ContenderInfo = updateScore(ContenderInfo, score),
    increaseSpeed: () => ContenderInfo = increaseSpeed(ContenderInfo),
    decreseSpeed: (score) => ContenderInfo = decreseSpeed(ContenderInfo),
    getScore: () => ContenderInfo.score,
    getInterval: () => ContenderInfo.interval,
    askQuestion,
    printState,
    getId: () => Id,
  }
}
