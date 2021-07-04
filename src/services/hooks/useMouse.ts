import { useCallback, useEffect } from "react";

import { getDegree } from "@/utils/math";

type TMouseOptions = {
  ctx: CanvasRenderingContext2D;
  from: [number, number];
  to: [number, number];
  degree: number;
};

/**
 * (hook) 鼠标事件钩子
 *
 * @param {(React.MutableRefObject<HTMLCanvasElement | null>)} canvasRef - 画布引用
 * @param {{}} options
 * @param {boolean} [resetEnd] - 鼠标移动结束后是否重置状态
 * @param {(options: TMouseOptions) => void} options.start - 鼠标移动开始
 * @param {(options: TMouseOptions) => void} options.moving - 鼠标移动进行中
 * @param {(options: TMouseOptions) => void} options.end - 鼠标移动结束
 * @param {number} [dep] - 依赖项 (特指视口的变化)
 */
export default function useMouse(
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  options: Partial<{
    resetEnd: boolean;
    start: (options: TMouseOptions) => void;
    moving: (options: TMouseOptions) => void;
    end: (options: TMouseOptions) => void;
  }>,
  dep?: number
) {
  const loop = (options: TMouseOptions) => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleStart = useCallback(options.start || loop, []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    handlerMoving = useCallback(options.moving || loop, []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    handlerEnd = useCallback(options.end || loop, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();

    let started = false;
    let imageData = null as ImageData | null;
    let from = [0, 0] as [number, number], // 起点
      to = [0, 0] as [number, number]; // 终点

    const getPosition = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      return [clientX - rect.left, clientY - rect.top] as [number, number];
    };

    // 开始
    const handleDown = (event: MouseEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      started = true;

      // 绘制之前的存储
      imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

      from = getPosition(event);
      const degree = getDegree(from, to);

      handleStart({ ctx, from, to, degree });
    };

    // 移动中
    const handleMove = (event: MouseEvent) => {
      if (!started) return; // 标识来自点击开始
      event.preventDefault();
      event.stopImmediatePropagation();

      // 还原开始的状态
      imageData && ctx.putImageData(imageData, 0, 0);

      to = getPosition(event);
      const degree = getDegree(from, to);

      handlerMoving({ ctx, from, to, degree });
    };

    // 结束
    const handleUp = (event: MouseEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      started = false;

      to = getPosition(event);
      const degree = getDegree(from, to);

      handlerEnd({ ctx, from, to, degree });

      // 还原开始的状态
      if (options.resetEnd) {
        imageData && ctx.putImageData(imageData, 0, 0);
      }
      imageData = null;
    };

    const handleOut = (event: MouseEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      started = false;
      // 还原开始的状态
      imageData && ctx.putImageData(imageData, 0, 0);
    };

    canvas.addEventListener("mousedown", handleDown);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseup", handleUp);
    canvas.addEventListener("mouseenter", handleOut);
    return () => {
      canvas.removeEventListener("mousedown", handleDown);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseup", handleUp);
      canvas.addEventListener("mouseenter", handleOut);
    };
  }, [
    canvasRef,
    dep,
    handleStart,
    handlerEnd,
    handlerMoving,
    options.resetEnd,
  ]);
}
