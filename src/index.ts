import TaskPlanner from './TaskPlanner'
import QuestionProvider from './QuestionProvider'
import Contender from './Contender'
import AskedQuestionsStore from './AskedQuestions'

const questionProvider = QuestionProvider()
const askedQuestionStore = AskedQuestionsStore()

// TODO:
// dinamic adding contenders
// async get question
// async check answer
// async ger answer
// pause contest
// resume contest
// restore status on restart


const contenders : any[] = [
  Contender('ivan'),
  Contender('max'),
  Contender('tolik'),
  Contender('katya'),
]


const startTime = Date.now()
contenders.forEach((c) => {
  c.startTime = startTime
})

const planner = TaskPlanner()
const play = (contender) => async () => {
  const question = questionProvider.getRandomQuestion()

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

  if (checkResult) {
    contender.updateScore(question.reward)
    contender.increaseSpeed()
  } else {
    contender.updateScore(question.penalty)
    contender.decreseSpeed()
  }

  // // info output
  // console.log('\n\n\ntime from previos run:', Date.now() - contender.startTime)
  // // console.log(question, `check result: ${checkResult}`)
  // contender.printState()
  // contender.startTime = Date.now()
  planner.register(contender.getInterval(), play(contender))
}


contenders.forEach((contender) => {
  planner.register(contender.getInterval(), play(contender))
})
planner.start()

setInterval(() => {
  askedQuestionStore.print();
}, 100);

// planner.stop();
// planner.clear();

