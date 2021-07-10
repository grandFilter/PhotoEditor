import React from "react";
import { useTextShape } from "@/services/fabric/brush";
import { BRUSH_NAME } from "@/constants";

import Button from "@/components/UI/Button";

import { ReactComponent as TextSvg } from "@/assets/svg/action/text.svg";
import { ReactComponent as RectSvg } from "@/assets/svg/action/rect.svg";
import { ReactComponent as LineSvg } from "@/assets/svg/action/line.svg";
import { ReactComponent as CircleSvg } from "@/assets/svg/action/circle.svg";
import { ReactComponent as TriangleFSvg } from "@/assets/svg/action/polygon.svg";
import { ReactComponent as StarSvg } from "@/assets/svg/action/star.svg";
import { ReactComponent as ArrowSvg } from "@/assets/svg/action/arrow.svg";
import { ReactComponent as PencilSvg } from "@/assets/svg/action/pencil.svg";

import styles from "./styles.module.less";

export default function TextShape() {
  const [
    brush,
    { setText, setLine, setEllipse, setRect, setTriangle, setPencil, setArrow, setStar },
  ] = useTextShape();

  return (
    <>
      <div className={styles.textShape}>
        <h3 className={styles.title}>Text & Shapes</h3>
        {[
          {
            name: BRUSH_NAME.Text,
            icon: <TextSvg className={styles.icon} />,
            text: "Add Text",
            onClick: setText,
          },
          {
            name: BRUSH_NAME.Line,
            icon: <LineSvg className={styles.icon} />,
            text: "Line",
            onClick: setLine,
          },
          {
            name: BRUSH_NAME.Pencil,
            icon: <PencilSvg className={styles.icon} />,
            text: "Pencil",
            onClick: setPencil,
          },
          {
            name: BRUSH_NAME.Ellipse,
            icon: <CircleSvg className={styles.icon} />,
            text: "Ellipse",
            onClick: setEllipse,
          },
          {
            name: BRUSH_NAME.Rect,
            icon: <RectSvg className={styles.icon} />,
            text: "Rectangle",
            onClick: setRect,
          },
          {
            name: BRUSH_NAME.Triangle,
            icon: <TriangleFSvg className={styles.icon} />,
            text: "Triangle",
            onClick: setTriangle,
          },
          {
            name: BRUSH_NAME.Arrow,
            icon: <ArrowSvg className={styles.icon} />,
            text: "Arrow",
            onClick: setArrow,
          },
          {
            name: BRUSH_NAME.Star,
            icon: <StarSvg className={styles.icon} />,
            text: "Star",
            onClick: setStar,
          },
        ].map(({ name, icon, onClick, text }, index) => (
          <Button
            onClick={onClick}
            icon={icon}
            key={index}
            data-name={name}
            className={name === brush ? styles.active : ""}
          >
            {text}
          </Button>
        ))}
      </div>
    </>
  );
}
