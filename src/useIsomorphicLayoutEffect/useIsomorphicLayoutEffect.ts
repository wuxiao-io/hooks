import { useEffect, useLayoutEffect } from 'react'

// NOTE: This hook fixes this problem by switching between `useEffect` and `useLayoutEffect` following the execution

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default useIsomorphicLayoutEffect
