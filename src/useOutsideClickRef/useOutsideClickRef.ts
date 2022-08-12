import { useCallback, useEffect, useRef, useState } from 'react'
import type { HTMLElementOrNull, CallbackRef } from '../types/types'
import { noop } from '../utils/noop'

/**
 * useOutsideClickRef hook
 * Clicks if a click happened outside a Ref, Handy for dropdowns, modals and popups etc.
 * @param handler handler Callback to fire on outside click
 * @param when
 */
function useOutsideClickRef (
  handler: (event: MouseEvent | TouchEvent) => void,
  when = true
): [CallbackRef] {
  const savedHandler = useRef(handler)

  const [node, setNode] = useState<HTMLElementOrNull>(null)

  const memoizedCallback = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (node && !node.contains(event.target as Element)) {
        savedHandler.current(event)
      }
    },
    [node]
  )

  useEffect(() => {
    savedHandler.current = handler
  })

  const ref = useCallback((nodeElement: HTMLElementOrNull) => {
    setNode(nodeElement)
  }, [])

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
  }, [when, memoizedCallback])

  return [ref]
}

export default useOutsideClickRef
