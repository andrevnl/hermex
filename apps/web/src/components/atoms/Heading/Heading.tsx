import type { HTMLAttributes } from "react";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  size?: "xs" | "xxl";
};

const sizes = {
  xs: "text-heading-xs",
  xxl: "text-heading-xxl",
};

export function Heading({
  as: Tag = "h2",
  size = "xs",
  className = "",
  ...props
}: HeadingProps) {
  return (
    <Tag className={`font-heading font-bold ${sizes[size]} ${className}`} {...props} />
  );
}
