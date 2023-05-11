import { useEffect, useState } from 'react'

export type Status = 'idle' | 'loading' | 'ready' | 'error';
export type ScriptElt = HTMLScriptElement | null;

// NOTE: Dynamically load an external script in one line with this React hook. This can be useful to integrate a third party library
// like Google Analytics or Stripe.
// This avoids loading this script in the `<head> </head>` on all your pages if it is not necessary.
function useScript (src: string, onload: () => void | undefined): Status {
  const [status, setStatus] = useState<Status>(src ? 'loading' : 'idle')

  useEffect(
    () => {
      if (!src) {
        setStatus('idle')
        return
      }

      // Fetch existing script element by src
      // It may have been added by another instance of this hook
      let script: ScriptElt = document.querySelector(`script[src="${src}"]`)

      if (!script) {
        // Create script
        script = document.createElement('script')
        script.src = src
        script.async = true
        script.setAttribute('data-status', 'loading')

        // TODO: need to test
        if (onload) {
          script.onload = onload
        }
        // Add script to document body
        document.body.appendChild(script)

        // Store status in attribute on script
        // This can be read by other instances of this hook
        const setAttributeFromEvent = (event: { type: string }) => {
          script?.setAttribute(
            'data-status',
            event.type === 'load' ? 'ready' : 'error'
          )
        }

        script.addEventListener('load', setAttributeFromEvent)
        script.addEventListener('error', setAttributeFromEvent)
      } else {
        // Grab existing script status from attribute and set to state.
        setStatus(script.getAttribute('data-status') as Status)
      }

      // Script event handler to update status in state
      // Note: Even if the script already exists we still need to add
      // even handlers to updagte the state for *this* hook instance.
      const setStateFromEvent = (event: { type: string }) => {
        setStatus(event.type === 'load' ? 'ready' : 'error')
      }

      // Add event listeners
      script.addEventListener('load', setStateFromEvent)
      script.addEventListener('error', setStateFromEvent)

      // Remove event listeners on cleanup
      return () => {
        if (script) {
          script.removeEventListener('load', setStateFromEvent)
          script.removeEventListener('error', setStateFromEvent)
        }
      }
    },
    [src] // Only re-run effect if script src changes
  )

  return status
}

export default useScript
