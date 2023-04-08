import { Ref } from 'react'

export type CallbackWithNoArguments = () => void

export type HTMLElementOrNull = HTMLElement | null

export type CallbackRef<T extends HTMLElement | null = HTMLElementOrNull> = (
  node: T
) => void

export type PossibleRef<T> = Ref<T> | undefined

export type FunctionReturningPromise = (...args: any[]) => Promise<any>;

export type UseGeolocationReturnType = {
  isError: boolean;
  lat?: number;
  lng?: number;
  message: string;
};
