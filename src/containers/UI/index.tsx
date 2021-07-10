import React, { useCallback } from "react";

import Button from "@/components/UI/Button";
import Icon from "@/components/UI/Icon";

const copyToClipboard = (str: string) => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

export default function UI() {
  const handleCopyIcon = useCallback((name: string) => {
    copyToClipboard(`<Icon name="${name}" />`);
  }, []);
  return (
    <>
      <h2>Icon</h2>

      {alphabets.map((name) => (
        <Icon onClick={() => handleCopyIcon(name)} key={name} name={name} />
      ))}
      <br />
      {frances.map((name) => (
        <Icon onClick={() => handleCopyIcon(name)} key={name} name={name} />
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
