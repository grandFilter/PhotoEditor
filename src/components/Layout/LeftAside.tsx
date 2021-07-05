import React from "react";

import TextShape from "@/components/TextShape";
import Icon from "@/components/UI/Icon";

import styles from "./styles.module.less";

export default function LeftAside() {
  return (
    <aside className={styles.leftAside}>
      <div className={styles.toolbar}>
        <Icon name="j" />
        <Icon name="Ç" />
      </div>
      <div className={styles.panels}>
        <TextShape />
      </div>
    </aside>
  );
}
