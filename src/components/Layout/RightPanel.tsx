// import { fabric } from "fabric";

import React, { useContext } from "react";
import { FabricContext } from "@/context/FabricContext";
import styles from "./styles.module.less";

import PanelFont from "@/components/PanelFont";

export default function RightPanel() {
  const { activeObject } = useContext(FabricContext);
  return (
    <aside className={styles.panel}>
      {activeObject?.type === "textbox" && <PanelFont />}
    </aside>
  );
}
