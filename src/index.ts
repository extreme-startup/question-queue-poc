import TaskPlanner from './TaskPlanner'
import QuestionProvider from './QuestionProvider'
import Contender from './Contender'
import AskedQuestionsStore from './AskedQuestions'
import calculateSpeed from './utils/calculateSpeed';

const questionProvider = QuestionProvider()
const askedQuestionStore = AskedQuestionsStore()

// TODO:
// dinamic adding contenders
// pause contest
// resume contest
// restore status on restart

const contenders : any[] = [
  Contender('ivan'),
  Contender('max'),
  Contender('tolik'),
  Contender('katya'),
]

const contendersState = new Map();
contenders.forEach((contender) => {
  contendersState.set(contender.getId(), calculateSpeed([]));
});

const planner = TaskPlanner()
const play = (contender) => async () => {
  const question = await questionProvider.getRandomQuestion()

  const [askedQuestion, answer] = await Promise.all([
    askedQuestionStore.insert({
      ContestContenderId: contender.getId(),
      QuestionId: question.Id,
      AskedOn: new Date(),
    }),
    contender.askQuestion(question),
  ])
  // check answer
  await askedQuestionStore.update(askedQuestion.Id, {
    AnsweredOn: new Date(),
    Answer: answer,
  })


  const checkResult = await questionProvider.checkQuestion(question, answer)
  await askedQuestionStore.update(askedQuestion.Id, {
    Score: checkResult ? question.reward : question.penalty,
  });
  contendersState
    .get(contender.getId())
    .addEntry({ isAnswerCorrect: checkResult });

  // // info output
  // console.log('\n\n\ntime from previos run:', Date.now() - contender.startTime)
  // // console.log(question, `check result: ${checkResult}`)
  // contender.printState()
  // contender.startTime = Date.now()
  //
  const speed = contendersState.get(contender.getId()).getSpeed();
  planner.register(speed, play(contender))
}



contenders.forEach((contender) => {

  const speed = contendersState.get(contender.getId()).getSpeed();
  planner.register(speed, play(contender))
});
planner.start();



// dinamic adding contender
setTimeout(() => {

  const newContenders: any[] = [
    Contender('anna'),
    Contender('kostya'),
  ];
  newContenders.forEach((contender) => {
    contenders.push(contender);
    const speedCalc = calculateSpeed([]);
    contendersState.set(contender.getId(), speedCalc);
    planner.register(speedCalc.getSpeed(), play(contender))
  });

}, 2000);
// --------------------------


setInterval(() => {
  askedQuestionStore.print();
}, 100);

// planner.stop();
// planner.clear();

