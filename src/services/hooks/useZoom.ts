import { useState, useEffect } from "react";
import { debounce } from "@/utils";

export default function useResize(
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
) {
  const [scale, setScale] = useState(1);
  // 放大 / 缩小
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let scale = 1;

    const _handleZoom = debounce((event: WheelEvent) => {
      if (event.deltaY < 0) {
        scale *= event.deltaY * -2; // Zoom in
      } else {
        scale /= event.deltaY * 2; // Zoom out
      }
      scale = Math.min(Math.max(0.125, scale), 4); // Restrict scale
      setScale(scale);
      console.log("scale", scale);
    }, 100);

    const handleZoom = (event: WheelEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      _handleZoom(event);
    };

    canvas.addEventListener("wheel", handleZoom);
    return () => {
      canvas.removeEventListener("wheel", handleZoom);
    };
  }, [canvasRef]);

  return { scale };
}
