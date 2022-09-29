import { useEffect, useRef } from 'react'
import { noop } from '../utils/util'

function useTimeoutWhen (
  callback: () => void,
  timeoutDelayMs = 0,
  when = true
): void {
  const savedRefCallback = useRef<() => void>()

  useEffect(() => {
    savedRefCallback.current = callback
  })

  function internalCallback () {
    savedRefCallback.current?.()
  }

  useEffect(() => {
    if (when) {
      if (typeof window !== 'undefined') {
        const timeout = window.setTimeout(internalCallback, timeoutDelayMs)

        return () => {
          window.clearTimeout(timeout)
        }
      } else {
        console.warn('useTimeoutWhen: when is undefined.')
      }
    }

    return noop
  }, [timeoutDelayMs, when])
}

export default useTimeoutWhen
