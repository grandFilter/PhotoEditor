import { useState, useLayoutEffect, useContext } from "react";
import { fabric } from "fabric";
import { FabricContext } from "@/context/FabricContext";

import { drawBackground } from "@/services/fabric/toolkit";

export function useTransparentBackground() {
  const [background, setBackground] = useState<fabric.Group | null>(null);
  const { canvas, size, zoom } = useContext(FabricContext);

  // 窗口改变, 缩放
  useLayoutEffect(() => {
    if (!canvas) return;
    const handle = () => {
      if (!background) {
        const group = drawBackground(canvas);
        setBackground(group);
      }

      background?.scale(1 / zoom); // 反向缩放
      background?.set({ ...size });
      canvas.renderAll();
    };

    handle();
  }, [background, canvas, size, zoom]);
}
