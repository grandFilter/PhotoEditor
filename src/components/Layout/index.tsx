import React from "react";
import TopHeader from "./TopHeader";
import LeftAside from "./LeftAside";
import RightPanel from "./RightPanel";

import styles from "./styles.module.less";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className={styles.main}>{children}</main>
      <TopHeader />
      <LeftAside />
      <RightPanel />
    </>
  );
}
