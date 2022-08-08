import { useEffect, useRef } from 'react'

function useEffectOnceWhen (callback: () => void, when = true): void {
  const hasRunOnceRef = useRef(false)
  const callbackRef = useRef(callback)

  useEffect(() => {
    if (when && !hasRunOnceRef.current) {
      callbackRef.current()
      hasRunOnceRef.current = true
    }
  }, [when])
}

export default useEffectOnceWhen
