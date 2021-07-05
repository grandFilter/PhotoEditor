import React from "react";

import Icon from "@/components/UI/Icon";

import styles from "./styles.module.less";

export default function Button({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: string;
}) {
  return (
    <>
      <button className={styles.button} type="button">
        <div className={styles.content}>
          {icon && <Icon name={icon} />}
          {children}
          <span className={styles.index}>9</span>
        </div>
      </button>
    </>
  );
}
