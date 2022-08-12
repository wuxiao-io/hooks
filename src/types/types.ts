export type CallbackWithNoArguments = () => void

export type HTMLElementOrNull = HTMLElement | null

export type CallbackRef<T extends HTMLElement | null = HTMLElementOrNull> = (
  node: T
) => void
