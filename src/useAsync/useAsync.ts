import { DependencyList, useEffect } from 'react'
import { FunctionReturningPromise } from '../types/types'
import { useAsyncFn } from '../useAsyncFn'

function useAsync<T extends FunctionReturningPromise> (
  fn: T,
  deps: DependencyList = []
) {
  const [state, callback] = useAsyncFn(fn, deps, {
    loading: true
  })

  useEffect(() => {
    callback()
  }, [callback])

  return state
}

export default useAsync
