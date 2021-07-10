import React from "react";

import styles from "./styles.module.less";

export default function Button({
  children,
  onClick,
  className,
  icon,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  icon?: React.ReactNode;
}) {
  return (
    <>
      <button className={[styles.button, className || ''].join(' ')} type="button" onClick={onClick}>
        <div className={styles.content}>
          <span className={styles.icon}>{icon}</span>
          {children}
          <span className={styles.index}>9</span>
        </div>
      </button>
    </>
  );
}
