/**
 * 获取角度
 *
 * @param {[number, number]} from - 起点
 * @param {[number, number]} to - 终点
 * @param {[number, number]} [origin=[0, 0]] - 原点
 */
export function getDegree(
  from: [number, number],
  to: [number, number],
  origin: [number, number] = [0, 0]
) {
  const x1 = from[0] - origin[0],
    y1 = from[1] - origin[1];
  const x2 = to[0] - origin[0],
    y2 = to[1] - origin[1];
  const cos =
    (x1 * x2 + y1 * y2) /
    (Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2));
  const direction = x1 * y2 - y1 * x2; // 向量叉乘
  const degree = Math.acos(cos);

  return direction < 0 ? -degree : degree; // 叉乘结果为负表示逆时针旋转， 逆时针旋转减度数
}
