import React, { useContext, useRef, useLayoutEffect, useMemo } from "react";

import { FabricContext } from "@/context/FabricContext";
// import { drawAxes, drawGrid, drawBackground } from "@/services/fabric/toolkit";

import { useDraw } from "@/services/fabric/draw";
import { useZoom } from "@/services/fabric/zoom";
import { useResize } from "@/services/fabric/resize";
import { useShortcut } from "@/services/fabric/shortcut";
import { useTransparentBackground } from "@/services/fabric/transparentBackground";
import { useControls } from "@/services/fabric/controls";
import { useParse } from "@/services/fabric/parse";
import { getStageSize } from "@/utils";

import styles from "./styles.module.less";

/**
 * canvas 舞台
 *
 */
export default function Stage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { canvas, createCanvas, loadFromJSON } = useContext(FabricContext);

  const size = useMemo(() => getStageSize(), []); // 窗口改变

  // console.log("size", size);

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

  useDraw();
  useZoom();
  useResize();
  useShortcut();
  useTransparentBackground();
  useControls();
  useParse();

  return (
    <>
      <canvas ref={canvasRef} className={styles.stage} />
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
