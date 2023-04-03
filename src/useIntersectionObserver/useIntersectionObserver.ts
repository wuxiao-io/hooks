import { RefObject, useEffect, useState } from 'react'

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

/**
 *
 * @param elementRef
 * @param threshold 它是一个值或一个数组，表示目标元素交叉检测到根元素的程度。当交叉检测到的值大于或等于阈值时。IntersectionObserver 会被激活。该值是 0 到 1 之间的数值，默认值是 0，表示元素的任意部分与根元素相交时都会触发回调。如果为1，则必须将目标元素完全包含在根元素中才能触发回调
 * @param root 它是一个 null 或者一个 Element 对象。指定根元素用于检测目标元素的可见性。默认为 null, 表示使用浏览器的视口作为根元素
 * @param rootMargin 它是一个指示交叉区域周围 margin 大小的字符串，通常在该值中设置像素值、百分比或单位值 em。用于扩展或缩小根元素的矩形大小，从而影响到交叉检测区域。默认值是 '0%'，表示没有扩展或缩小。
 * @param freezeOnceVisible 用于控制是否在元素第一次进入视口时冻结（停止）交叉检测。当 freezeOnceVisible 设置为 true 时，表示一旦目标元素进入视口并与根元素相交，就会在回调函数中更新状态，并停止 IntersectionObserver 的交叉检测。
 */
function useIntersectionObserver (
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false
  }: Args
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  const frozen = entry?.isIntersecting && freezeOnceVisible

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry)
  }

  useEffect(() => {
    const node = elementRef?.current // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || frozen || !node) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)

    return () => observer.disconnect()
  }, [elementRef?.current, JSON.stringify(threshold), root, rootMargin, frozen])

  return entry
}

export default useIntersectionObserver
