import { fabric } from "fabric";
import { useContext, useEffect } from "react";

import { FabricContext } from "@/context/FabricContext";

export function useParse() {
  const { canvas } = useContext(FabricContext);

  useEffect(() => {
    if (!canvas) return;
    const handler = (e: ClipboardEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const items = e.clipboardData?.items || [];

      const files = Array.from(items)
        .filter((item) => item.type?.indexOf("image") > -1)
        .map((file) => {
          const imageData = file.getAsFile();
          const img = new Image();
          img.src = URL.createObjectURL(imageData);
          return img;
        });

      files.forEach((file) => {
        fabric.Image.fromURL(
          file.src,
          (obj) => {
            obj.scaleToWidth(350);
            canvas.add(obj).centerObject(obj);
            obj.setCoords();
            canvas.renderAll();
          },
          {
            originY: "center",
            originX: "center",
          }
        );
      });

      console.log("files", files);
    };

    document.addEventListener("paste", handler);
    return () => {
      document.removeEventListener("paste", handler);
    };
  }, [canvas]);
}
