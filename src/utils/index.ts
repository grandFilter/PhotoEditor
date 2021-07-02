/**
 * 防抖(debounce)
 *
 * @param {Function} fn - 目标函数
 * @param {number} delay - 延迟执行毫秒数
 * @return {*} {(this: any) => void}
 */
export function debounce(fn: Function, delay: number): (this: any) => void {
  let timer: number;
  return function (this: any) {
    const context = this,
      args = arguments;
    clearTimeout(timer);
    timer = window.setTimeout(() => fn.apply(context, args), delay);
  };
}

/**
 * 节流(throttle)
 *
 * @param {Function} fn  - 目标函数
 * @param {number} [threshold=250] - 延迟执行毫秒数
 * @param {*} [scope=null] - 作用域
 * @return {*} {(this: any) => void}
 */
export function throttle(
  fn: Function,
  threshold = 250,
  scope: any = null
): (this: any) => void {
  let last: number, deferTimer: number;
  return function (this: any) {
    const context = scope || this;

    let now = +new Date(),
      args = arguments;
    if (last && now < last + threshold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = window.setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, threshold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}
