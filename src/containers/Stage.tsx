import React, { useRef, useState, useEffect } from "react";

import {
  setupCanvas,
  getStageSize,
  // drawGrid,
  drawBackground,
  drawAxes,
  debounce,
} from "@/utils";

import styles from "./styles.module.less";

/**
 * canvas 舞台
 *
 */
export default function Stage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [size, setSize] = useState(getStageSize());

  useEffect(() => {
    const ctx = setupCanvas(canvasRef.current);

    if (!ctx) return;

    const { width, height } = size;
    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    // drawGrid(ctx);
    drawBackground(ctx);
    drawAxes(ctx);
  }, [size]);

  // 窗口改变
  useEffect(() => {
    const handleResize = debounce((e: UIEvent) => {
      setSize(getStageSize());
    }, 200);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 放大 / 缩小
  useEffect(() => {
    const el = canvasRef.current;

    if (!el) return;

    let scale = 1;

    const _handleZoom = debounce((event: WheelEvent) => {
      if (event.deltaY < 0) {
        scale *= event.deltaY * -2; // Zoom in
      } else {
        scale /= event.deltaY * 2; // Zoom out
      }
      scale = Math.min(Math.max(0.125, scale), 4); // Restrict scale
      console.log("scale", scale);
    }, 100);

    const handleZoom = (event: WheelEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      _handleZoom(event);
    };

    el.addEventListener("wheel", handleZoom);
    return () => {
      el.removeEventListener("wheel", handleZoom);
    };
  }, []);

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
