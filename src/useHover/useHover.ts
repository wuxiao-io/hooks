import React, { useState } from 'react'
import { noop } from '../utils/util'
import * as events from 'events'

type Element = ((state: boolean) => React.ReactElement<any>) | React.ReactElement<any>

function useHover (element: Element): [React.ReactElement<any>, boolean] {
  const [state, setState] = useState(false)

  const onMouseEnter = (originalOnMouseEnter?: any) => (event: any) => {
    (originalOnMouseEnter || noop)(event)
    setState(true)
  }

  const onMouseLeave = (originalOnMouseLeave?: any) => (event: any) => {
    (originalOnMouseLeave || noop)(event)
    setState(false)
  }

  if (typeof element === 'function') {
    element = element(state)
  }

  const el = React.cloneElement(element, {
    onMouseEnter: onMouseEnter(element.props.onMouseEnter),
    onMouseLeave: onMouseLeave(element.props.onMouseLeave)
  })

  return [el, state]
}

export default useHover
