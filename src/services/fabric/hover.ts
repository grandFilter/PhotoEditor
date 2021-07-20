import { fabric } from "fabric";

import { useContext, useEffect } from "react";
import { FabricContext } from "@/context/FabricContext";
import { STROKE_COLOR } from "@/constants";

// @see https://stackoverflow.com/questions/56172212/how-to-show-object-bounding-box-when-mouse-hover-objects-in-fabricjs

export function useHover() {
  const { canvas } = useContext(FabricContext);

  useEffect(() => {
    if (!canvas) return;

    const handleOver = (e: fabric.IEvent) => {
      const { target } = e;
      if (!target) return;
      if (target.name === "custom_background") return;

      // skip group hover
      //   if (canvas.getActiveObjects().length > 0) return;
      if (target === canvas.getActiveObject()) return;

      // skip group hover
      if (target instanceof fabric.Object && !(target instanceof Array)) {
        const bound = target.getBoundingRect();
        const ctx = canvas.getContext();
        ctx.strokeStyle = STROKE_COLOR;
        ctx.lineWidth = 2;
        ctx.strokeRect(bound.left, bound.top, bound.width, bound.height);
      }
    };
    const handleOut = (e: fabric.IEvent) => {
      const { target } = e;
      if (!target) return;
      if (target.name === "custom_background") return;

      if (target === canvas.getActiveObject()) return;
      // skip group hover
      //   if (canvas.getActiveObjects().length > 0) return;

      // skipp group hover
      if (target instanceof fabric.Object && !(target instanceof Array)) {
        canvas.renderAll(); // render all, will clear bounds box drawed by mouse:over
      }
    };

    canvas.on("mouse:over", handleOver);
    canvas.on("mouse:out", handleOut);

    return () => {
      canvas.off("mouse:over", handleOver);
      canvas.off("mouse:out", handleOut);
    };
  }, [canvas]);
}
