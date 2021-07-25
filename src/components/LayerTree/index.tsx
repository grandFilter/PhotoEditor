// import { fabric } from "fabric";

import React, { useContext, useState, useEffect } from "react";
import { FabricContext } from "@/context/FabricContext";
// import styles from "./styles.module.less";

export default function LayerTree() {
  const { canvas } = useContext(FabricContext);
  const [list, setList] = useState<any>([]);

  useEffect(() => {
    if (!canvas) return;

    setList(canvas.getObjects());
  }, [canvas]);

  return (
    <>
      <dl>
        <dt>LayerTree</dt>
        {list.map((item: any) => (
          <dd>{item.type}</dd>
        ))}
      </dl>
    </>
  );
}
