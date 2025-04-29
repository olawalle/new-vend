import React, { useCallback } from "react";
import _ from "lodash";
import clsx from "clsx";
import AppText from "../compo/appText";

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  outline?: boolean;
  loading?: boolean;
  mt?: number;
  mb?: number;
  borderColor?: string;
  px?: number;
  py?: number;
  borderWidth?: number;
  outlineTextColor?: string;
  bg?: string;
  disabled?: boolean;
  textSize?: number;
  textColor?: string;
  small?: boolean;
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
  children?: React.ReactNode;
  debounceTime?: number;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  dontDebounce?: boolean;
  borderRad?: number;
  className?: string;
  textClassName?: string;
}

const AppButton: React.FC<AppButtonProps> = ({
  text,
  outline = false,
  loading = false,
  mt,
  mb,
  borderColor,
  px,
  py,
  borderWidth = 0,
  outlineTextColor,
  bg,
  textSize,
  textColor,
  disabled = false,
  fullWidth,
  variant = "primary",
  debounceTime = 300,
  onClick,
  style,
  small,
  children,
  icon,
  borderRad,
  className,
  textClassName,
  dontDebounce,
  ...rest
}) => {
  const { debounce } = _;

  const debouncedClick = useCallback(
    debounce((e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) onClick(e);
    }, debounceTime),
    [onClick, debounceTime]
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) return;
    dontDebounce ? onClick?.(e) : debouncedClick(e);
  };

  const btnStyle: React.CSSProperties = {
    marginTop: mt,
    marginBottom: mb,
    ...(px ? { paddingLeft: px } : {}),
    ...(px ? { paddingRight: px } : {}),
    ...(py ? { paddingTop: py ?? 14 } : {}),
    ...(py ? { paddingBottom: py ?? 14 } : {}),
    width: fullWidth ? "100%" : "auto",
    borderColor: borderColor ?? (variant === "primary" ? "#036600" : "#334155"),
    borderWidth: outline ? 1 : borderWidth,
    ...(bg ? { backgroundColor: bg } : {}),
    ...style,
  };

  const contentColor =
    outline && outlineTextColor
      ? outlineTextColor
      : textColor ?? (outline ? "#036600" : "#ffffff");

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      style={{
        ...btnStyle,
        borderRadius: borderRad ?? 24,
        borderStyle: "solid",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className={clsx("transition-all", className)}
      {...rest}
    >
      {loading ? (
        <div
          className={`animate-spin w-5 h-5 rounded-full border-2 border-t-2 border-t-[#036600] border-white `}
        />
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            justifyContent: "center",
          }}
        >
          {icon}
          {(text || children) && (
            <AppText
              size={textSize || 14}
              weight="medium"
              smallText
              className={textClassName} // ✅ Tailwind text color can go here
              color={textColor} // ✅ optional: remove this if you only want Tailwind to control color
            >
              {text || children}
            </AppText>
          )}
        </div>
      )}
    </button>
  );
};

export default AppButton;
