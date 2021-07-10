import React, { createContext, useState, useCallback, useEffect } from "react";

import { fabric } from "fabric";
import { drawGuideLines } from "@/services/fabric/draw";

import { BRUSH_NAME, INTERACTIVE_NAME } from "@/constants";

export const FabricContext = createContext({}) as unknown as React.Context<{
  canvas: fabric.Canvas | null;
  createCanvas: (el: HTMLCanvasElement, options: fabric.ICanvasOptions) => void;
  loadFromJSON: (el: HTMLCanvasElement, json: any) => void;
  activeObject: fabric.Object | null;
  // 画笔
  brush: BRUSH_NAME | INTERACTIVE_NAME | null;
  setBrush: React.Dispatch<
    React.SetStateAction<BRUSH_NAME | INTERACTIVE_NAME | null>
  >;
}>;

export function FabricContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null); // Fabric canvas 实例
  const [brush, setBrush] = useState<BRUSH_NAME | INTERACTIVE_NAME | null>(
    null
  ); // 画笔

  const [activeObject /* setActiveObject */] = useSelectionState(canvas); // 选中对象

  // 创建 Canvas
  const createCanvas = useCallback(
    (el: HTMLCanvasElement, options: fabric.ICanvasOptions) => {
      const canvas = new fabric.Canvas(el, {
        stopContextMenu: true,
        preserveObjectStacking: true,
        selection: true,
        defaultCursor: "default",
        backgroundColor: "#f3f3f3",
        isDrawingMode: false,
        ...options,
      });

      // canvas.selectionColor = "rgba(0,255,0,0.3)";
      // canvas.selectionBorderColor = "red";
      // canvas.selectionLineWidth = 5;

      canvas.renderAll();

      setCanvas(canvas);
    },
    []
  );

  // 通过 JSON 数据创建 Canvas
  const loadFromJSON = useCallback((el, json: any) => {
    const canvas = new fabric.Canvas(el);
    canvas.loadFromJSON(
      json,
      () => {
        canvas.renderAll.bind(canvas);
        canvas.setWidth(json.width);
        canvas.setHeight(json.height);
      },
      (o: any, object: any) => {
        // fabric.log(o, object);
      }
    );
    canvas.renderAll();
    setCanvas(canvas);
  }, []);

  // test
  useEffect(() => {
    if (!canvas) return;

    drawGuideLines(canvas, 100, 100);
  }, [canvas]);

  return (
    <FabricContext.Provider
      value={{
        canvas,
        createCanvas,
        loadFromJSON,
        activeObject,
        brush,
        setBrush,
      }}
    >
      {children}
    </FabricContext.Provider>
  );
}

// 处理选择元素
function useSelectionState(canvas: fabric.Canvas | null) {
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null);
  const updateActiveObject = useCallback(
    (e: fabric.IEvent) => {
      if (!e || !canvas) return;
      setActiveObject(canvas.getActiveObject());
      canvas.renderAll();
    },
    [canvas, setActiveObject]
  );

  useEffect(() => {
    if (!canvas) return;
    canvas.on("selection:created", updateActiveObject);
    canvas.on("selection:updated", updateActiveObject);
    canvas.on("selection:cleared", updateActiveObject);

    return () => {
      canvas.off("selection:created");
      canvas.off("selection:cleared");
      canvas.off("selection:updated");
    };
  }, [canvas, updateActiveObject]);

  return [activeObject, setActiveObject] as [
    typeof activeObject,
    typeof setActiveObject
  ];
}
