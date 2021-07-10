import React, { useContext, useRef, useLayoutEffect } from "react";

import { FabricContext } from "@/context/FabricContext";

import { useDraw } from "@/services/fabric/draw";

import useResize from "@/services/hooks/useResize";

import styles from "./styles.module.less";

/**
 * canvas 舞台
 *
 */
export default function Stage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { canvas, createCanvas, loadFromJSON } = useContext(FabricContext);

  const { size } = useResize(); // 窗口改变

  useDraw();

  // init
  useLayoutEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const debug = false;
    if (debug && canvasObject) {
      loadFromJSON(el, { ...size, ...canvasObject });
    } else {
      createCanvas(el, size);
    }
  }, [createCanvas, loadFromJSON, size]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ width: `${size.width}px`, height: `${size.height}px` }}
        className={styles.stage}
      />
    </>
  );
}

// test data
const canvasObject = {
  objects: [
    {
      type: "circle",
      originX: "center",
      originY: "center",
      left: 50,
      top: 50,
      width: 100,
      height: 100,
      fill: "#FF00FF",
      stroke: null,
      strokeWidth: 1,
      strokeDashArray: null,
      strokeLineCap: "butt",
      strokeLineJoin: "miter",
      strokeMiterLimit: 10,
      scaleX: 1,
      scaleY: 1,
      angle: 0,
      flipX: false,
      flipY: false,
      opacity: 1,
      shadow: null,
      visible: true,
      clipTo: null,
      backgroundColor: "",
      fillRule: "nonzero",
      globalCompositeOperation: "source-over",
      transformMatrix: null,
      radius: 50,
      startAngle: 0,
      endAngle: 6.283185307179586,
    },
    {
      type: "rect",
      originX: "center",
      originY: "center",
      left: 126,
      top: 210,
      width: 100,
      height: 100,
      fill: "#FF0000",
      stroke: null,
      strokeWidth: 1,
      strokeDashArray: null,
      strokeLineCap: "butt",
      strokeLineJoin: "miter",
      strokeMiterLimit: 10,
      scaleX: 1,
      scaleY: 1,
      angle: 0,
      flipX: false,
      flipY: false,
      opacity: 1,
      shadow: null,
      visible: true,
      clipTo: null,
      backgroundColor: "",
      fillRule: "nonzero",
      globalCompositeOperation: "source-over",
      transformMatrix: null,
      radius: 50,
      startAngle: 0,
      endAngle: 6.283185307179586,
    },
    {
      type: "triangle",
      originX: "center",
      originY: "center",
      left: 250,
      top: 100,
      width: 100,
      height: 100,
      fill: "#00F00F",
      stroke: null,
      strokeWidth: 1,
      strokeDashArray: null,
      strokeLineCap: "butt",
      strokeLineJoin: "miter",
      strokeMiterLimit: 10,
      scaleX: 1,
      scaleY: 1,
      angle: 0,
      flipX: false,
      flipY: false,
      opacity: 1,
      shadow: null,
      visible: true,
      clipTo: null,
      backgroundColor: "",
      fillRule: "nonzero",
      globalCompositeOperation: "source-over",
      transformMatrix: null,
      radius: 50,
      startAngle: 0,
      endAngle: 6.283185307179586,
    },
  ],
  background: "",
};
