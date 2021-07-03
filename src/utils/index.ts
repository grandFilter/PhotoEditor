/**
 * High DPI Canvas
 *
 * @param {(HTMLCanvasElement | null)} canvas - canvas元素
 * @return {CanvasRenderingContext2D | null}
 *
 * @see https://www.html5rocks.com/en/tutorials/canvas/hidpi/
 */
export function setupCanvas(
  canvas: HTMLCanvasElement | null
): CanvasRenderingContext2D | null {
  if (!canvas) return null;

  const DPR = window.devicePixelRatio || 1;

  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * DPR;
  canvas.height = rect.height * DPR;
  const ctx = canvas.getContext("2d");

  ctx?.scale(DPR, DPR);

  return ctx;
}

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
 * 绘制网格背景
 *
 * @param {CanvasRenderingContext2D} ctx - canvas 上下文
 * @param {number} [girdSize=10] - 网格大小
 */

export function drawBackground(ctx: CanvasRenderingContext2D, girdSize = 10) {
  const { width, height } = ctx.canvas;
  // 垂直网线
  const xTotals = Math.floor(width / girdSize);
  // 水平网线
  const yTotals = Math.floor(height / girdSize);

  for (let i = 0; i < xTotals; i++) {
    for (let j = 0; j < yTotals; j++) {
      ctx.fillStyle = (i + j) % 2 ? "#ffffff" : "#f2f2f2";
      ctx.fillRect(girdSize * i, girdSize * j, girdSize, girdSize);
    }
  }
}

/**
 * 绘制网格
 *
 * @param {CanvasRenderingContext2D} ctx - canvas 上下文
 * @param {number} [girdSize=20] - 网格大小
 */
export function drawGrid(ctx: CanvasRenderingContext2D, girdSize = 20) {
  const { width, height } = ctx.canvas;
  // 垂直网线
  const xTotals = Math.floor(width / girdSize);
  for (let i = 0; i < xTotals; i++) {
    ctx.moveTo(girdSize * i, 0);
    ctx.lineTo(girdSize * i, height);
  }
  // 水平网线
  const yTotals = Math.floor(height / girdSize);
  for (let j = 0; j < yTotals; j++) {
    ctx.moveTo(0, girdSize * j);
    ctx.lineTo(width, girdSize * j);
  }

  ctx.strokeStyle = "lightgray"; // 设置绘制颜色
  ctx.lineWidth = 0.5; // 设置绘制线段的宽度
  ctx.stroke(); // 绘制格网
  ctx.beginPath(); // 清除路径
}

/**
 * 绘制坐标轴
 *
 * @param {CanvasRenderingContext2D} ctx
 */
export function drawAxes(ctx: CanvasRenderingContext2D) {
  const girdSize = 20;
  const step = 40;

  const { width, height } = ctx.canvas;
  // ## X轴
  ctx.moveTo(girdSize, girdSize); // 起点
  ctx.lineTo(girdSize + width, girdSize); // X轴线
  for (let i = girdSize + step; i < width; i += step) {
    // X轴刻度
    ctx.moveTo(i, girdSize - 5);
    ctx.lineTo(i, girdSize + 0);
  }

  // ## Y轴
  ctx.moveTo(girdSize, girdSize); // 起点
  ctx.lineTo(girdSize, height); // Y轴线
  for (let j = girdSize + step; j < height; j += step) {
    // Y轴刻度
    ctx.moveTo(girdSize - 5, j);
    ctx.lineTo(girdSize + 0, j);
  }

  ctx.strokeStyle = "#cfcfcf"; // 设置绘制颜色
  ctx.lineWidth = 1.2; // 设置绘制线段的宽度
  ctx.stroke(); // 绘制坐标轴
  ctx.beginPath(); // 清除路径
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
