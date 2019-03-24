
function getCurrentTimestump () {
  return Date.now()
}
const min = (items: Number[]) => Math.min.apply(null, items)
const map = (fn: any) => (array: any[]) => array.map(fn)

export default function taskPlanner () {
  let queue = []

  let started = false
  let nextExecution : number = Number.MAX_VALUE
  let currentTimeout: number

  /**
  * @prop interval {number} interval in ms
   */
  function register (timeout, handler) {
    const currentTimestump = getCurrentTimestump()
    const executeOn = currentTimestump + timeout
    if (nextExecution > executeOn) {
      queue.push({
        timeout,
        handler,
        executeOn,
      })
      clearInterval(currentTimeout)
      nextTick()
    } else {
      queue.push({
        timeout,
        handler,
        executeOn,
      })
      if (started && queue.length === 1) {
        nextTick()
      }
    }
  }

  function start () {
    started = true
    const currentTimestump = getCurrentTimestump()
    queue = map((item) => ({
      ...item,
      executeOn: currentTimestump + item.timeout
    }))(queue)
    nextTick()
  }

  function nextTick () {
    if (!queue.length) {
      return
    }
    const executeOns = map((item) => item.executeOn)(queue) as any
    const nextTick = min(executeOns)
    nextExecution = nextTick
    const currentTimestump = getCurrentTimestump()
    const timeout = nextTick - currentTimestump
    currentTimeout = setTimeout(executeQueue, timeout) as any as number
  }

  function executeQueue () {
    const currentTimestump = getCurrentTimestump()
    const itemsToExecute = queue.filter((item) => item.executeOn <= currentTimestump)
    const restItems = queue.filter((item) => item.executeOn > currentTimestump)
    queue = restItems
    itemsToExecute.forEach((item) => {
      item.handler()
    })
    nextTick()
  }

  function stop () {
    started = false
    clearInterval(currentTimeout)
    queue = map((item) => ({
      ...item,
      executeOn: null
    }))(queue)
    nextExecution = Number.MAX_VALUE
  }

  function clear () {
    stop()
    queue = []
  }

  return {
    register,
    start,
    stop,
    clear
  }
}
