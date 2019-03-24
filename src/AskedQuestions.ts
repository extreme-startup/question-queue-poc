import { v1 as uuidv1 } from 'uuid';
import delayedResolve from './utils/delayedResolve';

export type AskedQuestion = {
  Id: string;
  ContestContenderId: string;
  QuestionId: string;
  AskedOn: Date;
  AnsweredOn?: Date;
  Answer?: string;
  Score?: number;
}

const BD_LATENCY = 50

// absolutelly imperative,
// don't try to do this in at home
export default function AskedQuestionsStore () {
  const db : AskedQuestion[] = []


  function insert(props) {
    const inservedItem = {
      Id: uuidv1(),
      ...props,
    }
    db.push(inservedItem)
    return delayedResolve(inservedItem, BD_LATENCY)
  }

  function find(Id: string) {
    const updatedItem = db.find((item) => item.Id === Id)
    return delayedResolve(updatedItem || null, BD_LATENCY)
  }

  function update(Id: string, props) {
    const updatedItem = db.find((item) => item.Id === Id)
    if (updatedItem) {
      Object.assign(updatedItem, props)
      return delayedResolve(updatedItem, BD_LATENCY)
    }
    console.log(`try to update non existing item with id: ${Id}`)
    return delayedResolve(null, BD_LATENCY)
  }

  function print() {

    console.clear();
    console.log('ContestContenderId \t|\t QuestionId \t|\t AskedOn \t|\t AnsweredOn  \t|\t Answer \t|\t Score ');
    console.log('---------------------------------------------------------------------------------------------');
    db.forEach(item => {
      console.log(`${item.ContestContenderId.substring(0,18)} \t|\t ${item.QuestionId.substring(0,12)} \t|\t ${item.AskedOn.getTime()} \t|\t ${item.AnsweredOn && item.AnsweredOn.getTime()} \t|\t ${item.Answer} \t|\t ${item.Score}`);
    });
  }

  return {
    insert,
    update,
    find,
    print,
  }
}
