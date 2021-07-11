import React, { useCallback } from "react";
import Layout from "@/components/Layout";

import useResize from "../../services/hooks/useResize";
import useMouse from "./hooks/useMouse";

import {
  setupCanvas,
  drawBackground,
  drawAxes,
  drawSelectRange,
  drawGuideLines,
} from "./toolkit";

export default function StageCanvas() {
  const { size } = useResize(); // 窗口改变

  const canvasRef = useCanvas(
    useCallback(
      (ctx: CanvasRenderingContext2D) => {
        setupCanvas(ctx.canvas);

        const { width, height } = size;
        ctx.save();
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, width, height);
        ctx.restore();

        drawBackground(ctx);
        drawAxes(ctx);
      },
      [size]
    )
  );

  useMouse(
    canvasRef,
    {
      resetEnd: true, // 结束后应清除
      moving({ ctx, from, to }) {
        // 辅助工具
        drawSelectRange(ctx, from, to); // 选择区域
        drawGuideLines(ctx, ...from); // 起点辅助性
        drawGuideLines(ctx, ...to); // 终点辅助性
      },
    },
    size.width + size.height
  );

  return (
    <Layout>
      <canvas
        ref={canvasRef}
        style={{ width: `${size.width}px`, height: `${size.height}px` }}
      />
    </Layout>
  );
}

function useCanvas<T = CanvasRenderingContext2D>(
  draw: (gl: T) => void,
  context: "2d" | "webgl2" = "2d"
) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const ctx = canvasRef.current?.getContext(context) as null | T;
    if (!ctx) return;

    let animationFrameId = requestAnimationFrame(renderFrame);

    function renderFrame() {
      //   animationFrameId = requestAnimationFrame(renderFrame);
      ctx && draw(ctx);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [draw, context]);

  return canvasRef;
}
