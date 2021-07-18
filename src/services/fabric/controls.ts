import { fabric } from "fabric";
import { useContext, useCallback, useEffect } from "react";
import { FabricContext } from "@/context/FabricContext";
import { STROKE_COLOR } from "@/constants";

// @see https://github.com/fabricjs/fabric.js/blob/master/src/mixins/default_controls.js
// @see http://fabricjs.com/controls-customization
// @see https://codepen.io/nono1526/pen/PxNxzQ?editors=0010

export function useControls() {
  const { canvas } = useContext(FabricContext);

  useEffect(() => {
    if (!canvas) return;

    const { Control } = fabric;

    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "white"; // 角落点
    fabric.Object.prototype.cornerStyle = "rect"; // rect | circle
    fabric.Object.prototype.cornerSize = 8; //
    fabric.Object.prototype.borderColor = STROKE_COLOR; // 边框
    fabric.Object.prototype.borderScaleFactor = 1;
    fabric.Object.prototype.padding = -1;
    // fabric.Object.prototype.rotatingPointOffset = 10;
    fabric.Object.prototype.cornerStrokeColor = STROKE_COLOR;

    canvas.requestRenderAll();
  }, [canvas]);
}
