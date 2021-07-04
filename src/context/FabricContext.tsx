import React, { createContext, useState, useCallback, useEffect } from "react";

import { fabric } from "fabric";
import { draw, drawGuideLines } from "@/services/draw";

export const FabricContext = createContext({}) as unknown as React.Context<{
  canvas: fabric.Canvas | null;
  createCanvas: (el: HTMLCanvasElement, options: fabric.ICanvasOptions) => void;
  loadFromJSON: (el: HTMLCanvasElement, json: any) => void;
  activeObject: fabric.Object | null;
}>;

export function FabricContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null);

  // 创建 Canvas
  const createCanvas = useCallback(
    (el: HTMLCanvasElement, options: fabric.ICanvasOptions) => {
      const canvas = new fabric.Canvas(el, {
        stopContextMenu: true,
        preserveObjectStacking: true,
        selection: true,
        defaultCursor: "default",
        backgroundColor: "#f3f3f3",
        ...options,
      });

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
      function (o: any, object: any) {
        fabric.log(o, object);
      }
    );
    canvas.renderAll();
    setCanvas(canvas);
  }, []);

  const updateActiveObject = useCallback(
    (e: fabric.IEvent) => {
      if (!e || !canvas) return;
      setActiveObject(canvas.getActiveObject());
      canvas.renderAll();
    },
    [canvas, setActiveObject]
  );

  // 处理选择元素
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

  // test
  useEffect(() => {
    if (!canvas) return;
    draw(canvas, {
      from: [0, 0],
      to: [100, 100],
      degree: 10,
    });
    drawGuideLines(canvas, 100, 100);
  }, [canvas]);

  return (
    <FabricContext.Provider
      value={{ canvas, createCanvas, loadFromJSON, activeObject }}
    >
      {children}
    </FabricContext.Provider>
  );
}
