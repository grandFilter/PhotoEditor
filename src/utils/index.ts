/**
 * 获取舞台区域展示的宽高
 *
 */
export function getStageSize() {
  const { clientWidth, clientHeight } = document.documentElement;

  const styles = getComputedStyle(document.documentElement);

  const getValue = (name: string) =>
    parseFloat(styles.getPropertyValue(name)) || 0;

  const headerHeight = getValue(`--header-height`),
    asideWidth = getValue(`--aside-width`),
    panelWidth = getValue(`--panel-width`);

  return {
    width: clientWidth - (asideWidth + panelWidth),
    height: clientHeight - headerHeight,
  };
}

/**
 * 防抖 (debounce)
 *
 * 有新的指令进来，则重新计时等待，保证执行最后一个指令
 *
 * @param {Function} fn - 目标函数
 * @param {number} delay - 延迟执行毫秒数
 */
export function debounce<T = any>(fn: (...args: T[]) => void, delay: number) {
  let timer: number;
  return function (this: any, ...args: Parameters<typeof fn>) {
    const context = this;
    clearTimeout(timer);
    timer = window.setTimeout(() => fn.apply(context, args), delay);
  };
}
