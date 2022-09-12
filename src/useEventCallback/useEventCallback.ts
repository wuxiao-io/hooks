import { useCallback, useRef } from 'react'

import { useIsomorphicEffect } from '../useIsomorphicEffect'

export default function useEventCallback<Args extends unknown[], R> (
  fn: (...args: Args) => R
) {
  const ref = useRef<typeof fn>(() => {
    throw new Error('Cannot call an event handler while rendering')
  })

  useIsomorphicEffect(() => {
    ref.current = fn
  }, [fn])

  return useCallback((...args: Args) => ref.current(...args), [ref])
}
