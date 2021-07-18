import { fabric } from "fabric";
import { useContext, useCallback, useLayoutEffect } from "react";
import { FabricContext } from "@/context/FabricContext";

export function useZoom() {
  const { canvas, zoom, setZoom } = useContext(FabricContext);

  const handleZoom = useCallback(
    (options: fabric.IEvent) => {
      if (!canvas) return;

      const event = options.e as any;
      const delta = event.deltaY;
      let zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      zoom = Number(zoom.toFixed(2));

      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      canvas.setZoom(zoom);
      setZoom(zoom);
      options.e.preventDefault();
      options.e.stopPropagation();
    },
    [canvas, setZoom]
  );

  useLayoutEffect(() => {
    if (!canvas) return;
    canvas.setZoom(zoom);

    canvas.on("mouse:wheel", handleZoom);
    return () => {
      canvas.off("mouse:wheel", handleZoom);
    };
  }, [canvas, handleZoom, zoom]);
}
