import { useCounter } from '../useCounter'
import { useBoolean } from '../useBoolean'
import { useCallback } from 'react'
import { useInterval } from '../useInterval'

interface CountdownOption {
  countStart: number,
  intervalMs?: number,
  isIncrement?: boolean,
  countStop?: number
}

interface CountdownControllers {
  startCountdown: () => void
  stopCountdown: () => void
  resetCountdown: () => void
}

function useCounterdown (
  countdownOption: CountdownOption
): [number, CountdownControllers] {
  let { countStart, intervalMs, isIncrement, countStop } = countdownOption

  intervalMs = intervalMs ?? 1000
  isIncrement = isIncrement ?? false
  countStop = countStop ?? 0

  const {
    count,
    increment,
    decrement,
    reset: resetCounter
  } = useCounter(countStart)

  const {
    value: isCountdownRunning,
    setTrue: startCountdown,
    setFalse: stopCountdown
  } = useBoolean(false)

  const resetCountdown = () => {
    stopCountdown()
    resetCounter()
  }

  const countdownCallback = useCallback(() => {
    if (count === countStop) {
      stopCountdown()
      return
    }

    if (isIncrement) {
      increment()
    } else {
      decrement()
    }
  }, [count, countStop, decrement, increment, isIncrement, stopCountdown])

  useInterval(countdownCallback, isCountdownRunning ? intervalMs : null)

  return [
    count,
    {
      startCountdown,
      stopCountdown,
      resetCountdown
    }
  ]
}

export default useCounterdown
