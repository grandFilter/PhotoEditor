import React from "react";

import { useInteraction } from "@/services/fabric/brush";
import { INTERACTIVE_NAME } from "@/constants";

import { ReactComponent as LogoSvg } from "@/assets/svg/logo.svg";
import { ReactComponent as MoveSvg } from "@/assets/svg/action/move.svg";
import { ReactComponent as HandSvg } from "@/assets/svg/action/hand.svg";

import styles from "./styles.module.less";

export default function TopHeader() {
  const [brush, { setMove, setHand }] = useInteraction();
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <LogoSvg />
      </h1>
      <menu className={styles.menu}>
        {[
          {
            icon: <MoveSvg className={styles.icon} />,
            onClick: setMove,
            name: INTERACTIVE_NAME.Move,
          },
          {
            icon: <HandSvg className={styles.icon} />,
            onClick: setHand,
            name: INTERACTIVE_NAME.Hand,
          },
        ].map(({ icon, onClick, name }, index) => (
          <span
            key={index}
            className={[styles.span, name === brush ? styles.active : ""].join(
              " "
            )}
            onClick={onClick}
          >
            {icon}
          </span>
        ))}
      </menu>
      <aside></aside>
    </header>
  );
}
