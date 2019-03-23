export default function Contender(name) {
  const contenderAnswers = [];

  let ContenderInfo = {
    interval: 5000,
    score: 0
  };

  const updateScore = (info, score) => {
    return {
      ...info,
      score: info.score + score,
    }
  }

  const decreseSpeed = (info) => {
    if (info.interval >= 20000) {
      return info;
    }
    return {
      ...info,
      interval: info.interval + 500,
    }
  }

  const increaseSpeed = (info) => {
    if (info.interval <= 1000) {
      return info;
    }
    return {
      ...info,
      interval: info.interval - 500,
    }
  }

  const printState = () => {
    console.log(`${name}:\tscore: ${ContenderInfo.score}\t interval: ${ContenderInfo.interval}`)
  };

  const askQuestion = (question) => {
    const answer = 'some answer';
    return answer;
  };

  return {
    updateScore: (score) => ContenderInfo = updateScore(ContenderInfo, score),
    increaseSpeed: () => ContenderInfo = increaseSpeed(ContenderInfo),
    decreseSpeed: (score) => ContenderInfo = decreseSpeed(ContenderInfo),
    getScore: () => ContenderInfo.score,
    getInterval: () => ContenderInfo.interval,
    askQuestion,
    printState,
  };
}
