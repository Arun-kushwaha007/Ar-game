import React, { CSSProperties } from "react";
import styles from "./Text.module.css";

export type BodyType =
  | "modeBackground"
  | "modeOnBackground"
  | "accentGrey"
  | "error"
  | "brandPrimary"
  | "brandOnPrimary"
  | "onBackgroundGrey"
  | "themeL1"
  | "themeL2"
  | "gray100"
  | "gray200"
  | "gray300"
  | "gray400"
  | "gray500"
  | "gray600"
  | "gray700"
  | "gray800"
  | "gray900"
  | "white"
  | "success"
  | "onSuccess";

export type BodySize = "XXS" | "XS" | "S" | "M" | "L" | "XL";

export type Props = {
  children: React.ReactNode;
  type?: BodyType;
  size?: BodySize;
  wide?: boolean;
  weight?: "semi" | "medium" | "regular";
  center?: boolean;
  className?: string;
  style?: CSSProperties;
  lines?: number;
};

export default function Body({
  children,
  type = "modeOnBackground",
  size = "S",
  center = false,
  wide = false,
  weight,
  className,
  lines,
  style
}: Props) {
  return (
    <span
      className={[
        className,
        styles.text,
        styles[size],
        styles[type],
        center ? styles.center : undefined,
        lines ? styles.clamp : undefined,
        weight === "semi" ? styles.semibold : undefined,
        weight === "medium" ? styles.medium : undefined,
        wide ? styles.wide : undefined
      ].join(" ")}
      style={{ ...style, WebkitLineClamp: lines }}
    >
      {children}
    </span>
  );
}
