import { MutableRefObject, useCallback, useEffect, useRef } from 'react'
import { noop } from '../utils/util'

function useOutsideClick (
  ref: MutableRefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
  when = true
): void {
  const savedHandler = useRef(handler)

  const memoizedCallback = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current?.contains(event.target as Element)) {
        savedHandler.current(event)
      }
    },
    [ref]
  )

  useEffect(() => {
    savedHandler.current = handler
  })

  useEffect(() => {
    if (when) {
      document.addEventListener('click', memoizedCallback, true)
      document.addEventListener('touchstart', memoizedCallback, true)

      return () => {
        document.removeEventListener('click', memoizedCallback, true)
        document.removeEventListener('touchstart', memoizedCallback, true)
      }
    }

    return noop
  }, [ref, handler, when, memoizedCallback])
}

export default useOutsideClick
