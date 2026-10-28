"use client";

import AppSelect from "./AppSelect";

export default function SelectComponent({ options }: { options: string[] }) {
  return (
    <AppSelect
      options={options.map((option) => ({ value: option, label: option }))}
      defaultValue={options[0] || ""}
      placeholder={options[0] || "Select"}
    />
  );
}
