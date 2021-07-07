import React from "react";
import styles from "./styles.module.less";

// @ts-ignore
const requireAll = (requireContext) => {
  // @ts-ignore
  console.log(
    requireContext
      .keys()
      .filter((i: any) => /(france)/.test(i))
      .map((i: any) => i.replace("./france/", ""))
      .map((i: any) => i.replace(".svg", ""))
  );
  return requireContext.keys().map(requireContext);
};

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
