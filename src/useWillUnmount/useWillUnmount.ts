import { useEffect } from 'react'
import { CallbackWithNoArguments } from '../types/types'

/**
 * useWillUnmount hook
 * Fires a callback just before component unmounts
 *
 * @param callback
 */
function useWillUnmount (callback: CallbackWithNoArguments): void {
  // run only once
  useEffect(() => {
    return callback
  }, [])
}

export default useWillUnmount
