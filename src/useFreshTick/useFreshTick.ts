import { useFreshRef } from '../useFreshRef'

type CallbackType<T> = (...args: T[]) => void;

function useFreshTick<T> (callback: CallbackType<T>): CallbackType<T> {
  const freshRef = useFreshRef(callback)

  function tick (...args: T[]) {
    if (typeof freshRef.current === 'function') {
      freshRef.current(...args)
    }
  }

  return tick
}

export default useFreshTick

// NOTE:
// 该 Hook 可以在如 React 组件的异步操作、定时器等场景中防止因组件卸载、函数变更等原因导致的错误或警告

/**
 * 任何需要保回调总是最新的场景都可以使用 useFreshTick
 *
 * 1. 异步操作
 * 在 React 组件中，我们经常需要进行异步操作，如 API 调用。这时，如果在请求发出后，组件卸载或者回调函数变更，就可能出现问题。使用 useFreshTick 可以确保总是调用最新的回调函数。
 *
 * 2. 定时器
 * 在使用 setTimeout 或 setInterval 的场景中，如果定时器的回调函数在定时器设定后被改变，使用 useFreshTick 可以确保执行的是最新的回调函数。
 *
 * 3. 事件监听器
 * 在添加事件监听器时，如果监听的事件处理函数在添加监听器后被改变，使用 useFreshTick 可以确保触发的是最新的处理函数。
 *
 * 4. WebSockets 或其他实时数据流
 * 在处理来自 WebSocket 或其他实时数据流的数据时，如果处理数据的函数在数据流开始后被改变，使用 useFreshTick 可以确保处理的是最新的处理函数。
 *
 * 5. 动画或游戏循环
 * 在实现动画或游戏循环时，如果每一帧的处理函数在循环开始后被改变，使用 useFreshTick 可以确保执行的是最新的处理函数。
 *
 * 6. 消息队列处理
 * 如果你正在处理一个消息队列，每个消息都需要一个处理函数，并且这个处理函数可能在运行时被更新，那么 useFreshTick 就非常有用。
 *
 * 7. 用户交互的响应
 * 例如，在复杂的用户交互过程中，你可能会有一个函数来处理这些交互，这个函数可能会随着组件状态或属性的变化而变化。在这种情况下，你可以使用 useFreshTick 来确保在每次交互时都使用最新的处理函数。
 *
 * 8. 观察者模式
 * 在观察者模式中，如果观察者（回调函数）在运行过程中被更改，你可以使用 useFreshTick 来确保总是触发最新的观察者。
 *
 * 9. 状态机的转换函数
 * 如果你正在使用状态机，并且状态机的转换函数可能在运行过程中被更新，那么 useFreshTick 就非常有用。
 *
 * 10. Promise 链中的回调
 * 在 Promise 链中，then 或 catch 中的回调函数在定义时可能会被改变。使用 useFreshTick 可以确保总是使用最新的回调函数。
 */
