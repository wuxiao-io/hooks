import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

function useStateWithCallback<T> (initialState: T, callback: (arg: T) => void) {
  const [state, setState] = useState<T>(initialState)

  const didMount = useRef<boolean>(true)

  useEffect(() => {
    if (didMount.current) {
      callback(state)
    } else {
      didMount.current = true
    }
  }, [state, callback])

  return [state, setState]
}

function useStateWithCallbackInstant<T> (initialState: T, callback: (arg: T) => void) {
  const [state, setState] = useState<T>(initialState)

  const didMount = useRef<boolean>(true)

  useLayoutEffect(() => {
    if (didMount.current) {
      callback(state)
    } else {
      didMount.current = true
    }
  }, [state, callback])

  return [state, setState]
}

function useStateWithCallbackLazy<T> (initialValue: T) {
  const callbackRef = useRef<null |((arg: any) => void) >(null)
  const [value, setValue] = useState<T>(initialValue)

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(value)

      callbackRef.current = null
    }
  }, [value])

  const setValueWithCallback = useCallback(
    (newValue: any, callback: null |((arg: any) => void)) => {
      callbackRef.current = callback

      return setValue(newValue)
    },
    []
  )

  return [value, setValueWithCallback]
}

export { useStateWithCallbackInstant, useStateWithCallbackLazy }

export default useStateWithCallback
