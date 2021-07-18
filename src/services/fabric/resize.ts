import { useContext, useLayoutEffect } from "react";
import { getStageSize } from "@/utils";
import { FabricContext } from "@/context/FabricContext";

export function useResize() {
  const { canvas, size, setSize } = useContext(FabricContext);

  // 窗口改变
  useLayoutEffect(() => {
    if (!canvas) return;

    const handleResize = (e: UIEvent) => {
      const size = getStageSize();
      setSize(size);
      //   canvas.setWidth(size.width);
      //   canvas.setHeight(size.height);
      canvas.setDimensions(size);
      canvas.calcOffset();
      canvas.renderAll();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [canvas, setSize]);

  return { size };
}
