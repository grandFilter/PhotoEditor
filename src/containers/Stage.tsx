import React, { useRef, useEffect } from "react";

import { getStageSize } from "@/utils";

import styles from "./styles.module.less";

/**
 * canvas 舞台
 *
 */
export default function Stage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { width, height } = getStageSize();

  useEffect(() => {
    const ctx = setupCanvas(canvasRef.current);

    if (!ctx) return;

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(200, 200);
    ctx.stroke();
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ width: `${width}px`, height: `${height}px` }}
        className={styles.stage}
      />
    </>
  );
}

/**
 * High DPI Canvas
 *
 * @param {(HTMLCanvasElement | null)} canvas - canvas元素
 * @return {CanvasRenderingContext2D | null}
 */
function setupCanvas(
  canvas: HTMLCanvasElement | null
): CanvasRenderingContext2D | null {
  if (!canvas) return null;

  const DPR = window.devicePixelRatio || 1;

  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * DPR;
  canvas.height = rect.height * DPR;
  const ctx = canvas.getContext("2d");

  ctx?.scale(DPR, DPR);

  return ctx;
}
