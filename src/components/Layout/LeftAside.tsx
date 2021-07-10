import React, { useState, useCallback } from "react";

import TextShape from "@/components/TextShape";
import LayerTree from "@/components/LayerTree";
import Icon from "@/components/UI/Icon";

import styles from "./styles.module.less";

enum TAB_TYPE {
  text = "text",
  layer = "layer",
}

export default function LeftAside() {
  const [state, setState] = useState({
    tab: TAB_TYPE.text,
  });

  const handleIcon = useCallback((tab: TAB_TYPE) => {
    setState((pre) => ({ ...pre, tab }));
  }, []);
  return (
    <aside className={styles.leftAside}>
      <div className={styles.toolbar}>
        {[
          {
            icon: "j",
            title: "Text",
            tab: TAB_TYPE.text,
          },
          {
            icon: "ċ",
            title: "Layer",
            tab: TAB_TYPE.layer,
          },
        ].map(({ icon, tab }, index) => (
          <span key={index} onClick={(e) => handleIcon(tab)}>
            <Icon
              name={icon}
              className={[styles.icon, state.tab === tab && styles.active].join(
                " "
              )}
            />
          </span>
        ))}
      </div>
      <div className={styles.panels}>
        {(() => {
          switch (state.tab) {
            case TAB_TYPE.text:
              return <TextShape />;
            case TAB_TYPE.layer:
              return <LayerTree />;
            default:
              return null;
          }
        })()}
      </div>
    </aside>
  );
}
