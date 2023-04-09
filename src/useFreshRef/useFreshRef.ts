import { MutableRefObject, useEffect, useRef } from 'react'
import { useIsomorphicEffect } from '../useIsomorphicEffect'

function useFreshRef<T> (
  value: T,
  preferLayoutEffect = false
):MutableRefObject<T | undefined> {
  const useEffectToUse = preferLayoutEffect ? useIsomorphicEffect : useEffect
  const ref = useRef<T>()
  useEffectToUse(() => {
    ref.current = value
  })

  return ref
}

export default useFreshRef
