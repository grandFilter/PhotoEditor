import React from "react";
import styles from "./styles.module.less";

import { ReactComponent as LogoSvg } from "@/assets/svg/logo.svg";

export default function TopHeader() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <LogoSvg  />
      </h1>
    </header>
  );
}
