import { fabric } from "fabric";

import { useState, useContext, useCallback, useEffect, useMemo } from "react";
import { FabricContext } from "@/context/FabricContext";
import { BRUSH_NAME, INTERACTIVE_NAME } from "@/constants";

import { useInteraction } from "@/services/fabric/brush";
import { drawArrow } from "@/services/fabric/toolkit";

type TMouseOptions = {
  from: [number, number];
  to: [number, number];
};

export function useDraw() {
  const { canvas, brush } = useContext(FabricContext);
  const [, { setMove, selectLatest }] = useInteraction();

  const handleControl = useCallback(
    (selected: boolean = true) => {
      if (
        brush &&
        ([INTERACTIVE_NAME.Move, INTERACTIVE_NAME.Hand] as string[]).includes(
          brush
        )
      )
        return;
      setMove?.();
      selected && selectLatest?.();
    },
    [brush, selectLatest, setMove]
  );

  const drawConfig = useMemo(() => {
    // fabric.Object | fabric.Textbox
    let drawingObject: any = null;

    return {
      down: ({ from, to }: TMouseOptions) => {
        if (!canvas) return;

        const { Textbox } = fabric;
        const [left, top] = from;
        switch (brush) {
          case BRUSH_NAME.Text:
            canvas.selection = false;
            drawingObject = new Textbox("", {
              left,
              top,
              fontSize: 16,
            });
            canvas.add(drawingObject);
            drawingObject?.enterEditing();
            drawingObject?.hiddenTextarea.focus();
            break;
          default:
            break;
        }
        if (drawingObject) {
          handleControl();
        }
        drawingObject = null;
      },
      move: ({ from, to }: TMouseOptions) => {
        if (!canvas) return;

        const [left, top] = from;

        const dx = to[0] - from[0],
          dy = to[1] - from[1];

        const { Line, Ellipse, Rect, Triangle, Path } = fabric;
        // const radius = Math.sqrt(dx * dx + dy * dy) / 2;
        // const { width, height } = canvas; // as Required<fabric.Canvas>;

        if (drawingObject) {
          canvas.remove(drawingObject);
        }

        switch (brush) {
          case BRUSH_NAME.Pencil:
            break;
          case BRUSH_NAME.Line:
            drawingObject = new Line([...from, ...to], {
              stroke: "green",
            });
            break;
          case BRUSH_NAME.Ellipse:
            drawingObject = new Ellipse({
              left,
              top,
              rx: Math.abs(dx),
              ry: Math.abs(dy),
            });
            break;
          case BRUSH_NAME.Rect:
            drawingObject = new Rect({
              left,
              top,
              width: dx,
              height: dy,
            });
            break;
          case BRUSH_NAME.Triangle:
            drawingObject = new Triangle({
              left,
              top,
              width: dx,
              height: dy,
            });
            break;
          case BRUSH_NAME.Arrow:
            drawingObject = new Path(
              drawArrow({
                from,
                to,
                theta: 20,
                headlen: 20,
              }),
              {
                stroke: "gred",
                fill: "rgba(255,255,255,0)",
              }
            );
            break;
          case BRUSH_NAME.Star:
            break;
          default:
            break;
        }
        drawingObject && canvas.add(drawingObject);
      },
      up: ({ from, to }: TMouseOptions) => {
        drawingObject && handleControl();
        drawingObject = null;
      },
    };
  }, [brush, canvas, handleControl]);

  useMouseDraw(canvas, drawConfig);
}

// 鼠标事件
function useMouseDraw(
  canvas: fabric.Canvas | null,
  config: Partial<{
    down: (options: TMouseOptions) => void;
    move: (options: TMouseOptions) => void;
    up: (options: TMouseOptions) => void;
  }>
) {
  const [drawing, setDrawing] = useState(false);
  const [mouse, setMouse] = useState({
    from: [0, 0] as [number, number],
    to: [0, 0] as [number, number],
  }); // 鼠标

  const handleDown = useCallback(
    (options: fabric.IEvent) => {
      const { pointer } = options;
      if (!pointer || !canvas) return;
      setDrawing(true);

      const data = { ...mouse, from: [pointer.x, pointer.y] } as TMouseOptions;
      config.down?.(data);
      setMouse((preValue) => ({ ...preValue, ...data }));
    },
    [canvas, config, mouse]
  );
  const handleMove = useCallback(
    (options: fabric.IEvent) => {
      if (!drawing) return;

      const { pointer } = options;
      if (!pointer) return;

      const data = { ...mouse, to: [pointer.x, pointer.y] } as TMouseOptions;
      config.move?.(data);
      setMouse((preValue) => ({ ...preValue, data }));
    },
    [config, drawing, mouse]
  );
  const handleUp = useCallback(
    (options: fabric.IEvent) => {
      setDrawing(false);

      const { pointer } = options;
      if (!pointer || !canvas) return;

      const data = { ...mouse, to: [pointer.x, pointer.y] } as TMouseOptions;
      config.up?.(data);
      setMouse((preValue) => ({ ...preValue, ...data }));
    },
    [canvas, config, mouse]
  );

  useEffect(() => {
    if (!canvas) return;
    canvas.on("mouse:down", handleDown);
    canvas.on("mouse:move", handleMove);
    canvas.on("mouse:up", handleUp);
    return () => {
      canvas.off("mouse:down", handleDown);
      canvas.off("mouse:move", handleMove);
      canvas.off("mouse:up", handleUp);
    };
  }, [canvas, handleDown, handleMove, handleUp]);
}
