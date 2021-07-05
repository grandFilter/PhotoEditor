import React from "react";
import styles from "./styles.module.less";

// @ts-ignore
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
// @ts-ignore
const req = require.context("@/assets/sprites", true, /\.svg$/i);
requireAll(req);

export default function Icon({ name }: { name: string }) {
  return (
    <>
      <i className={styles.icon} data-name={name}>
        <svg className={styles.svg}>
          <use xlinkHref={`#icon-${name}`} />
        </svg>
      </i>
    </>
  );
}
