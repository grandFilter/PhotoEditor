import { fabric } from "fabric";

import React, { useContext, useState, useEffect } from "react";
import { FabricContext } from "@/context/FabricContext";

import styles from "./styles.module.less";

import FontSelect from "./FontSelect";

const FONT_SIZES = [
  9, 10, 11, 12, 13, 14, 18, 24, 36, 64, 72, 96, 144, 288,
].map((value) => ({ value, label: value }));

const TEXT_ALIGN = [
  "left",
  "center",
  "right",
  "justify",
  "justify-left",
  "justify-center",
  "justify-right",
].map((value) => ({ value, label: value }));

export default function PanelFont() {
  const { canvas, activeObject } = useContext(FabricContext);

  const fonts = useFonts();

  const [state, setState] = useState({
    fontFamily: "items",
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: 1,
    charSpacing: 20,
    textAlign: "left",
  });

  const handleFont = (key: string, value: string | number) => {
    if (activeObject?.type === "textbox") {
      const result = { [key]: value };

      setState((pre) => ({ ...pre, ...result }));
      (activeObject as fabric.Textbox).set(result);
      canvas?.renderAll();
    }
  };

  return (
    <section className={styles.fontPanel}>
      <h3 className={styles.title}>Text</h3>
      <p>fontFamily</p>
      <FontSelect
        options={fonts}
        onChange={(v) => handleFont("fontFamily", v)}
      />
      <p>fontSize</p>
      <FontSelect
        options={FONT_SIZES}
        onChange={(v) => handleFont("fontSize", v)}
      />
      <p>textAlign</p>
      <FontSelect
        options={TEXT_ALIGN}
        onChange={(v) => handleFont("textAlign", v)}
      />
      <p>lineHeight</p>
      <input
        type="number"
        value={state.lineHeight}
        onChange={(e) =>
          handleFont("lineHeight", Number(e.currentTarget.value))
        }
      />
      <p>charSpacing</p>
      <input
        type="number"
        value={state.charSpacing}
        onChange={(e) =>
          handleFont("charSpacing", Number(e.currentTarget.value))
        }
      />
    </section>
  );
}

function useFonts() {
  const [state, setState] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://127.0.0.1:18412/figma/font-files`).then(
        (res) => res.json()
      );

      const result = Object.entries(res.fontFiles).map(([label, list]: any) => {
        // return {
        //   label: label.split("/").reverse()[0],
        //   options: list.map((item: any) => ({
        //     label: `${item.family} (${item.style})`,
        //     value: item.postscript,
        //     ...item,
        //   })),
        // };
        return list.map((item: any) => ({
          label: `${item.family} (${item.style})`,
          value: item.postscript,
          ...item,
        }));
      });

      setState(result.flat());
    })();
  }, []);

  return state;
}
