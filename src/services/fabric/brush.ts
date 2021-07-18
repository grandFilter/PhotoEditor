import { useContext, useMemo } from "react";
import { FabricContext } from "@/context/FabricContext";
import { BRUSH_NAME, INTERACTIVE_NAME } from "@/constants";

/**
 * 文本与形状
 *
 */
export function useTextShape() {
  const { canvas, setBrush, brush } = useContext(FabricContext);

  const action = useMemo(() => {
    if (!canvas) return {};

    return {
      // 文字
      setText() {
        canvas.isDrawingMode = false;
        canvas.discardActiveObject();

        setBrush(BRUSH_NAME.Text);
      },
      // 自由线
      setPencil() {
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.color = "green";

        canvas.discardActiveObject();

        setBrush(BRUSH_NAME.Pencil);
      },
      // 线 Line
      setLine() {
        canvas.isDrawingMode = false;
        canvas.discardActiveObject();

        setBrush(BRUSH_NAME.Line);
      },
      // 椭圆 Ellipse / 圆 Circle
      setEllipse() {
        canvas.isDrawingMode = false;
        canvas.discardActiveObject();

        setBrush(BRUSH_NAME.Ellipse);
      },
      // 矩形
      setRect() {
        canvas.isDrawingMode = false;
        canvas.discardActiveObject();

        setBrush(BRUSH_NAME.Rect);
      },
      // 三角形
      setTriangle() {
        canvas.isDrawingMode = false;
        canvas.discardActiveObject();

        setBrush(BRUSH_NAME.Triangle);
      },
      // 箭头
      setArrow() {
        canvas.isDrawingMode = false;
        canvas.discardActiveObject();

        setBrush(BRUSH_NAME.Arrow);
      },
      // 星
      setStar() {
        canvas.isDrawingMode = false;
        canvas.discardActiveObject();

        setBrush(BRUSH_NAME.Star);
      },
    };
  }, [canvas, setBrush]);

  return [brush, action] as [typeof brush, typeof action];
}

/**
 * 可交互性
 *
 */
export function useInteraction() {
  const { canvas, setBrush, brush } = useContext(FabricContext);

  const action = useMemo(() => {
    if (!canvas) return {};

    return {
      // 移动
      setMove() {
        canvas.isDrawingMode = false;
        canvas.skipTargetFind = false;
        canvas.selection = true;

        setBrush(INTERACTIVE_NAME.Move);
      },
      // 选中最后一个
      selectLatest() {
        const item = canvas._objects[canvas._objects.length - 1];
        canvas.setActiveObject(item);
        canvas.requestRenderAll();
      },
      // 不可交互
      setHand() {
        canvas.isDrawingMode = false;
        canvas.skipTargetFind = true; //画板元素不能被选中
        canvas.selection = false; //画板不显示选中
        canvas.discardActiveObject();
        // canvas.forEachObject((o) => (o.selectable = false));

        setBrush(INTERACTIVE_NAME.Hand);
      },
    };
  }, [canvas, setBrush]);

  return [brush, action] as [typeof brush, typeof action];
}
