import { CallbackRef, HTMLElementOrNull } from '../types/types'
import { useCallback, useEffect, useState } from 'react'
import { noop } from '../utils/util'

const config: MutationObserverInit = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true
}

function useMutationObserverRef (
  callback: MutationCallback,
  options: MutationObserverInit = config
): [CallbackRef] {
  const [node, setNode] = useState<HTMLElementOrNull>(null)

  useEffect(() => {
    // Create an observer instance linked to the callback function
    if (node) {
      const observer = new MutationObserver(callback)

      // Start observing the target node for configured mutations
      observer.observe(node, options)

      return () => {
        observer.disconnect()
      }
    }

    return noop
  }, [node, callback, options])

  const ref: CallbackRef = useCallback((nodeElement: HTMLElementOrNull) => {
    setNode(nodeElement)
  }, [])

  return [ref]
}

export default useMutationObserverRef
