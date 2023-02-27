import { useCallback, useEffect, useState } from 'react'
import { CallbackRef, HTMLElementOrNull } from '../types/types'
import { useMutationObserverRef } from '../useMutationObserverRef'
import { useForkRef } from '../useForkRef'

function getBoundingClientRect (element: HTMLElement): DOMRect {
  return element.getBoundingClientRect()
}

function useBoundingclientrectRef (): [
    CallbackRef | null,
    DOMRect | null,
  () => void
  ] {
  const [domRect, setDomRect] = useState<DOMRect | null>(null)
  const [node, setNode] = useState<HTMLElementOrNull>(null)

  const update = useCallback(() => {
    setDomRect(node ? getBoundingClientRect(node) : null)
  }, [node])

  useEffect(() => {
    update()
  }, [update])

  const ref = useCallback((nodeElement: HTMLElement | null) => {
    setNode(nodeElement)
  }, [node])

  const [mutationObserverRef] = useMutationObserverRef(update)

  const forkedRef = useForkRef(ref, mutationObserverRef)

  return [forkedRef, domRect, update]
}

export default useBoundingclientrectRef
