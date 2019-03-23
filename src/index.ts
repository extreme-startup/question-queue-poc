import TaskPlanner from './TaskPlanner';
import QuestionProvider from './QuestionProvider';
import Contender from './Contender';


const questionProvider = QuestionProvider()


const cotenders: any[] = [
  Contender('ivan'),
  Contender('max'),
  Contender('tolik'),
  Contender('katya'),
];


let startTime = Date.now();
cotenders.forEach(c => {
  c.startTime = startTime;
});

const planner = TaskPlanner();
const play = (contender) => () => {
  const question = questionProvider.getRandomQuestion();

  // check answer
  const answer = contender.askQuestion(question);
  const checkResult = questionProvider.checkQuestion(question, answer);
  if (checkResult) {
    contender.updateScore(question.reward);
    contender.increaseSpeed();
  } else {
    contender.updateScore(question.penalty);
    contender.decreseSpeed();
  }

  // info output
  console.log('\n\n\ntime from previos run:', Date.now() - contender.startTime);
  // console.log(question, `check result: ${checkResult}`)
  contender.printState();
  contender.startTime = Date.now();
  planner.register(contender.getInterval(), play(contender));
}


cotenders.forEach((contender) => {
  planner.register(contender.getInterval(), play(contender));
});
planner.start();


// planner.stop();
// planner.clear();


