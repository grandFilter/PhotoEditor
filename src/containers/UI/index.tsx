import React from "react";

import Button from "@/components/UI/Button";
import Icon from "@/components/UI/Icon";

export default function UI() {
  return (
    <>
      <h2>Icon</h2>

      {alphabets.map((name) => (
        <Icon key={name} name={name} />
      ))}
      <br />
      {frances.map((name) => (
        <Icon key={name} name={name} />
      ))}

      <h2>Button</h2>
      <Button>Basic Button</Button>
    </>
  );
}

const alphabets = (() => {
  const alpha = Array.from(Array(10)).map((e, i) => "" + i);
  const caps = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
  return alpha.concat(caps).concat(caps.map((letter) => letter.toLowerCase()));
})();

const frances = [
  "À",
  "Á",
  "Â",
  "Ã",
  "Ä",
  "Å",
  "Æ",
  "Ç",
  "È",
  "É",
  "Ê",
  "Ë",
  "Ì",
  "Í",
  "Î",
  "Ï",
  "Ð",
  "Ñ",
  "Ò",
  "Ó",
  "Ô",
  "Õ",
  "Ö",
  "Ø",
  "Ù",
  "Ú",
  "Û",
  "Ü",
  "Ý",
  "Þ",
  "ß",
  "ÿ",
  "Ā",
  "Ă",
  "Ą",
  "ć",
  "ĉ",
  "ċ",
  "č",
  "Ď",
  "Đ",
  "Ē",
  "Ĕ",
  "Ė",
  "Ę",
  "Ġ",
  "Ĥ",
  "Ħ",
  "Ĩ",
  "Ī",
  "Ĭ",
  "Į",
  "İ",
  "ı",
  "Ĳ",
];
