import { MutableRefObject, useCallback, useState } from 'react'
import { useDidMount } from '../useDidMount'
import { useMutationObserver } from '../useMutationObserver'

/**
 *
 * @param element HTML element whose boundingclientrect is needed
 * @returns DOMRect
 */
function getBoundingClientRect (element: HTMLElement): DOMRect | null {
  return element.getBoundingClientRect()
}

function useBoundingclientrect (ref: MutableRefObject<HTMLElement | null>): DOMRect | null {
  const [domRect, setDomRect] = useState<DOMRect | null>(null)

  const update = useCallback(() => {
    setDomRect(ref.current ? getBoundingClientRect(ref.current) : null)
  }, [ref])

  useDidMount(() => {
    update()
  })

  useMutationObserver(ref, update)

  return domRect
}

export default useBoundingclientrect
