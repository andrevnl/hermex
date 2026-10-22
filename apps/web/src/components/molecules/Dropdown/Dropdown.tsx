import type { ComponentProps } from "react";
import { Icon, Select } from "@/components/atoms";
import { fieldTones, type FieldTone } from "../IconField";

type DropdownProps = ComponentProps<typeof Select> & {
  tone?: FieldTone;
};

export function Dropdown({
  tone = "neutral",
  className = "",
  "aria-label": ariaLabel,
  placeholder,
  ...props
}: DropdownProps) {
  return (
    <label
      className={`relative flex items-center gap-2 rounded border ${fieldTones[tone]} ${className}`}
    >
      <Select
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        className="py-3 pr-10 pl-4"
        {...props}
      />
      <Icon
        name="keyboard_arrow_down"
        className="pointer-events-none absolute right-4"
      />
    </label>
  );
}
