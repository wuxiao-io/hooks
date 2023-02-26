import { MutableRefObject, RefCallback, useMemo } from 'react'
import { PossibleRef } from '../types/types'

function setRef<T> (ref: PossibleRef<T> | null, value: T) {
  if (typeof ref === 'function') {
    ref(value)
  } else {
    (ref as MutableRefObject<T>).current = value
  }
}

function useForkRef<T> (
  refA: PossibleRef<any> | null,
  refB: PossibleRef<any> | null
): RefCallback<T> | null {
  return useMemo(() => {
    if (refA === null && refB === null) {
      return null
    }

    return (refValue: T) => {
      setRef(refA, refValue)
      setRef(refB, refValue)
    }
  }, [refA, refB])
}

export default useForkRef
