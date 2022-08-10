import { useState } from 'react'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

const useRaf = (ms: number = 1e12, delay: number = 0): number => {
  const [elapsed, set] = useState<number>(0)

  useIsomorphicLayoutEffect(() => {
    let raf: ReturnType<typeof requestAnimationFrame>
    let timerStop: ReturnType<typeof setTimeout>
    let start: number

    const onFrame = () => {
      const time = Math.min(1, (Date.now() - start) / ms)
      set(time)
      loop()
    }

    const loop = () => {
      raf = requestAnimationFrame(onFrame)
    }

    const onStart = () => {
      timerStop = setTimeout(() => {
        cancelAnimationFrame(raf)
        set(1)
      }, ms)
      start = Date.now()
    }

    const timerDelay = setTimeout(onStart, delay)

    return () => {
      clearTimeout(timerStop)
      clearTimeout(timerDelay)
      cancelAnimationFrame(raf)
    }
  }, [ms, delay])

  return elapsed
}

export default useRaf
