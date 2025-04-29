import React, { useEffect, useState } from "react";
import clsx from "clsx";

interface AppTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode | string;
  color?: string;
  weight?: "bold" | "semibold" | "light" | "medium" | "regular";
  size?: number;
  align?: "left" | "right" | "center" | "justify";
  mb?: number;
  mt?: number;
  ml?: number;
  mr?: number;
  italic?: boolean;
  underline?: boolean;
  transform?: "capitalize" | "lowercase" | "uppercase";
  smallText?: boolean;
  className?: string;
}

const AppText: React.FC<AppTextProps> = ({
  children,
  color,
  weight = "light",
  size,
  align,
  mb = 0,
  mt = 0,
  ml = 0,
  mr = 0,
  italic = false,
  underline = false,
  transform,
  smallText = false,
  className,
  style,
  ...props
}) => {
  const [scaledFontSize, setScaledFontSize] = useState<number | undefined>(size);

  useEffect(() => {
    if (!size) return;

    const BASE_WIDTH = 375;
    const BASE_HEIGHT = 812;

    const scaleFontSize = (size: number): number => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const scaleWidth = width / BASE_WIDTH;
      const scaleHeight = height / BASE_HEIGHT;

      const scale = Math.min(scaleWidth, scaleHeight);
      const newSize = Math.round(size * scale);

      return Math.max(newSize, 10);
    };

    const updateSize = () => {
      setScaledFontSize(scaleFontSize(size));
    };

    updateSize(); // Run once on mount
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [size]);

  const selectedFont = smallText
    ? `inter-${weight}`
    : `clash-display-${weight}`;

  return (
    <span
      className={clsx(
        className,
        italic && "italic",
        underline && "underline",
        transform && transform,
        align && {
          left: "text-left",
          right: "text-right",
          center: "text-center",
          justify: "text-justify",
        }[align]
      )}
      style={{
        ...style,
        ...(color ? { color } : {}),
        fontFamily: selectedFont,
        ...(scaledFontSize ? { fontSize: scaledFontSize } : {}),
        marginBottom: mb,
        marginTop: mt,
        marginLeft: ml,
        marginRight: mr,
      }}
      {...props}
    >
      {children}
    </span>
  );
};

export default AppText;
