// import { fabric } from "fabric";

import { useContext, useCallback, useEffect } from "react";
import { FabricContext } from "@/context/FabricContext";

export function useShortcut() {
  const { canvas } = useContext(FabricContext);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (!canvas) return;
      console.log(`e`, e);
      switch (e.key) {
        case "Backspace":
          // 删除, 删除单个 canvas.remove(canvas.getActiveObject())
          canvas.remove(...canvas.getActiveObjects());
          canvas.discardActiveObject();
          break;

        case "=":
          if (e.metaKey) {
            // Zoom In (meta+"+")
            e.preventDefault();
          }
          break;
        case "-":
          if (e.metaKey) {
            // Zoom Out (meta+"-")
            e.preventDefault();
          }
          break;
        case "0":
          if (e.metaKey) {
            // Reset Zoom (meta+"0")
            e.preventDefault();
          }
          break;
        default:
          break;
      }
    },
    [canvas]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);
}
