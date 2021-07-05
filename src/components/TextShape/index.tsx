import React from "react";

import Button from "@/components/UI/Button";

import styles from "./styles.module.less";

export default function TextShape() {
  return (
    <>
      <div className={styles.textShape}>
        <h3 className={styles.title}>Text Tool</h3>
        <Button icon="Ù">Add Text</Button>
        <Button icon="add">Line</Button>
      </div>
    </>
  );
}
