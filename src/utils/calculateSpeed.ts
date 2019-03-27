const START_SPEED = 5000;
const MAX_SPEED = 20000;
const MIN_SPEED = 1000;

const decreseSpeed = (prevSpeed: number) => 
  (prevSpeed >= 20000)
    ? prevSpeed
    : prevSpeed + 500;

const increaseSpeed = (prevSpeed: number) => 
  (prevSpeed <= 1000) 
    ? prevSpeed
    : prevSpeed - 500;

const updateSpeed = (prevSpeed: number, answerEntry: any) =>
  (answerEntry.isAnswerCorrect) 
    ? increaseSpeed(prevSpeed)
    : decreseSpeed(prevSpeed);


export default function calculateSpeed(entries) {
  let _currentSpeed;

  function getSpeed() {
    if (!_currentSpeed) {
      _currentSpeed = entries.reduce(updateSpeed, START_SPEED);
    }
    return _currentSpeed;
  }

  function addEntry(entry) {
    _currentSpeed = updateSpeed(_currentSpeed, entry);
  }

  return {
    addEntry,
    getSpeed,
  };
}
