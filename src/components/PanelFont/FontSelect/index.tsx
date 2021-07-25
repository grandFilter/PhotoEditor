import React, { useState } from "react";
import Select from "react-select";
import styles from "./styles.module.less";

export default function FontSelect({
  options = [],
  onChange,
}: {
  options?: any;
  onChange?: (v: string) => void;
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (value: Record<string, string> | any) => {
    setSelectedOption(value);
    onChange && onChange(value.value);
  };

  return (
    <>
      <Select
        className={styles.select}
        defaultValue={selectedOption}
        onChange={handleChange}
        options={options}
      />
    </>
  );
}
