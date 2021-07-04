/**
 * 绘制选择区域
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {[number, number]} from
 * @param {[number, number]} to
 */
export function drawSelectRange(
  ctx: CanvasRenderingContext2D,
  from: [number, number],
  to: [number, number]
) {
  const [X, Y] = from;
  const [W, H] = [to[0] - X, to[1] - Y];
  ctx.save();
  ctx.fillStyle = "rgba(25, 160, 251, 0.3)";
  ctx.fillRect(X, Y, W, H);

  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(25, 160, 251, 1)";
  ctx.strokeRect(X, Y, W, H);

  ctx.restore();
}

/**
 * 绘制辅助线
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 */
export function drawGuideLines(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) {
  ctx.save();

  ctx.strokeStyle = "rgba(0, 0, 230, 0.4)";
  ctx.lineWidth = 0.5;

  // 垂直辅助线
  ctx.beginPath();
  ctx.moveTo(x + 0.5, 0);
  ctx.lineTo(x + 0.5, ctx.canvas.height);
  ctx.stroke();

  // 水平辅助线
  ctx.beginPath();
  ctx.moveTo(0, y + 0.5);
  ctx.lineTo(ctx.canvas.width, y + 0.5);
  ctx.stroke();

  ctx.restore();
}
