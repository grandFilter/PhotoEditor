import React from "react";

import Button from "@/components/UI/Button";
import Icon from "@/components/UI/Icon";

const alphabets = (() => {
  const alpha = Array.from(Array(10)).map((e, i) => "" + i);
  const caps = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
  return alpha.concat(caps).concat(caps.map((letter) => letter.toLowerCase()));
})();

export default function UI() {
  return (
    <>
      <h2>Icon</h2>

      {alphabets.map((name) => (
        <Icon key={name} name={name} />
      ))}

      <h2>Button</h2>
      <Button>Basic Button</Button>
    </>
  );
}
