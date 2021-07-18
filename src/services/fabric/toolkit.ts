import { fabric } from "fabric";

/**
 * 绘制箭头方法
 *
 * @param {{
 *   from: [number, number];
 *   to: [number, number];
 *   theta: number;
 *   headlen: number;
 * }}
 *
 * @see https://github.com/vipstone/drawingboard/blob/master/drawingboard/js/demo.js#L258
 */
export function drawArrow({
  from: [fromX, fromY],
  to: [toX, toY],
  theta,
  headlen,
}: {
  from: [number, number];
  to: [number, number];
  theta: number;
  headlen: number;
}) {
  theta = typeof theta != "undefined" ? theta : 30;
  headlen = typeof theta != "undefined" ? headlen : 10;
  // 计算各角度和对应的P2,P3坐标
  const angle = (Math.atan2(fromY - toY, fromX - toX) * 180) / Math.PI,
    angle1 = ((angle + theta) * Math.PI) / 180,
    angle2 = ((angle - theta) * Math.PI) / 180,
    topX = headlen * Math.cos(angle1),
    topY = headlen * Math.sin(angle1),
    botX = headlen * Math.cos(angle2),
    botY = headlen * Math.sin(angle2);
  let arrowX = fromX - topX,
    arrowY = fromY - topY;
  let path = " M " + fromX + " " + fromY;
  path += " L " + toX + " " + toY;
  arrowX = toX + topX;
  arrowY = toY + topY;
  path += " M " + arrowX + " " + arrowY;
  path += " L " + toX + " " + toY;
  arrowX = toX + botX;
  arrowY = toY + botY;
  path += " L " + arrowX + " " + arrowY;
  return path;
}

/**
 * 绘制网格背景
 *
 * @param {CanvasRenderingContext2D} ctx - canvas 上下文
 * @param {number} [girdSize=10] - 网格大小
 */

export function drawBackground(canvas: fabric.Canvas, girdSize = 10) {
  // const zoom = canvas.getZoom();
  const width = canvas.getWidth();
  const height = canvas.getHeight();

  //  { width = 0, height = 0 } = canvas;
  const { Rect, Group } = fabric;
  // 垂直网线
  const xTotals = Math.ceil(width / girdSize);
  // 水平网线
  const yTotals = Math.ceil(height / girdSize);

  const rectGroup: fabric.Rect[] = [];

  for (let i = 0; i < xTotals; i++) {
    for (let j = 0; j < yTotals; j++) {
      const fillStyle = (i + j) % 2 ? "#ffffff" : "#f2f2f2";
      rectGroup.push(
        new Rect({
          left: girdSize * i,
          top: girdSize * j,
          width: girdSize,
          height: girdSize,
          fill: fillStyle,
        })
      );
    }
  }

  const group = new Group(rectGroup, {
    name: `custom_background`,
    //perPixelTargetFind: true,
    hasControls: false,
    hasRotatingPoint: false,
    selectable: false,
  });
  canvas.add(group);
  // 设置为最底层
  // canvas.moveTo(group, -1); // z-index
  canvas.sendToBack(group);
  // canvas.renderAll();

  return group;
}

/**
 * 绘制网格
 *
 */
export function drawGrid(canvas: fabric.Canvas) {
  const { width = 0, height = 0 } = canvas; // as Required<fabric.Canvas>;

  const girdSize = 10;

  console.log(canvas);

  const { Line, Group } = fabric;

  const lineGroup: fabric.Line[] = [];

  // 垂直网线
  const xTotals = Math.ceil(width / girdSize);
  for (let i = 0; i < xTotals; i++) {
    lineGroup.push(
      new Line(
        // prettier-ignore
        [
          girdSize * i, 0, 
          girdSize * i, height,
        ],
        { stroke: "#f2f2f2", selectable: false }
      )
    );
  }
  // 水平网线
  const yTotals = Math.ceil(height / girdSize);
  for (let j = 0; j < yTotals; j++) {
    lineGroup.push(
      new Line(
        // prettier-ignore
        [
          0, girdSize * j, 
          width, girdSize * j,
        ],
        { stroke: "#f2f2f2", selectable: false }
      )
    );
  }
  canvas.add(
    new Group(lineGroup, {
      hasControls: false,
      hasRotatingPoint: false,
      selectable: false,
      lockMovementX: true,
      lockMovementY: true,
    })
  );
}
/**
 * 绘制辅助线
 *
 * @param {fabric.Canvas} canvas
 * @param {number} x
 * @param {number} y
 */
export function drawAxes(canvas: fabric.Canvas, x: number, y: number) {
  const { Line } = fabric;

  const {
    canvas: { width, height },
  } = canvas.getSelectionContext();

  // 水平辅助线
  canvas.add(
    new Line([0, y, width, y], {
      stroke: "rgba(0, 0, 230, 0.4)",
      selectable: false,
    })
  );

  // 垂直辅助线
  canvas.add(
    new Line([x, 0, x, height], {
      stroke: "rgba(0, 0, 230, 0.4)",
      selectable: false,
    })
  );
}
