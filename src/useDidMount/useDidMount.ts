import { useEffect } from 'react'
import { CallbackWithNoArguments } from '../types/types'

/**
 * useDidMount hook
 * @description Calls a function on mount
 *
 * @param callback
 */
function useDidMount (callback: CallbackWithNoArguments): void {
  useEffect(() => {
    if (typeof callback === 'function') {
      callback()
    }
  }, [])
}

export default useDidMount
