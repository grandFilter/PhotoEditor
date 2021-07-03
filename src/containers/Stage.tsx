import React, { useRef, useState, useEffect } from "react";

import {
  setupCanvas,
  getStageSize,
  drawGrid,
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

  useEffect(() => {
    const handleResize = debounce(() => {
      setSize(getStageSize());
    }, 200);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
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
