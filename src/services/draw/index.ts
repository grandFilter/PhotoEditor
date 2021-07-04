import { fabric } from "fabric";

// test
export function draw(
  canvas: fabric.Canvas,
  options: {
    from: [number, number];
    to: [number, number];
    degree: number;
  }
) {
  const { Rect } = fabric;
  const { width, height } = canvas; // as Required<fabric.Canvas>;

  canvas.add(
    new Rect({
      height: 100,
      width: 100,
      originX: "center",
      originY: "center",
      fill: "red",
      top: (height ?? 0) / 2,
      left: (width ?? 0) / 2,
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
export function drawGuideLines(canvas: fabric.Canvas, x: number, y: number) {
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
