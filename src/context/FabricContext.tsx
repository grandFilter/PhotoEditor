import React, { createContext, useState, useCallback, useEffect } from "react";

import { fabric } from "fabric";
import { getStageSize } from "@/utils";
import {
  BRUSH_NAME,
  INTERACTIVE_NAME,
  BASE_COLOR,
  STROKE_COLOR,
} from "@/constants";

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
  // 缩放
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  // 宽高
  size: { width: number; height: number };
  setSize: React.Dispatch<
    React.SetStateAction<{ width: number; height: number }>
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

  const [zoom, setZoom] = useState(1);
  const [size, setSize] = useState(getStageSize());

  const [activeObject /* setActiveObject */] = useSelectionState(canvas); // 选中对象

  // 创建 Canvas
  const createCanvas = useCallback(
    (el: HTMLCanvasElement, options: fabric.ICanvasOptions) => {
      const canvas = new fabric.Canvas(el, {
        stopContextMenu: true,
        preserveObjectStacking: true, // 阻止选中时层级提示
        selection: true,
        defaultCursor: "default",
        backgroundColor: "#fff",
        isDrawingMode: false,
        ...options,
      });

      // 选择样式
      canvas.selectionColor = BASE_COLOR;
      canvas.selectionBorderColor =STROKE_COLOR;
      canvas.selectionLineWidth = 1;

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

  return (
    <FabricContext.Provider
      value={{
        canvas,
        createCanvas,
        loadFromJSON,
        activeObject,

        brush,
        setBrush,
        zoom,
        setZoom,
        size,
        setSize,
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
