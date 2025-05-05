import React, { useState, useRef, useEffect } from "react";
// import Eye from "@/assets/images/eye.svg";
// import EyeOff from "@/assets/images/eyeoff.svg";
import clsx from "clsx";
import AppText from "./appText";
import { HiOutlineEyeSlash, HiOutlineEye } from "react-icons/hi2";

interface AppInputProps {
  placeholder?: string;
  passwordInput?: boolean;
  inputValue?: string;
  disable?: boolean;
  textTrigger?: (text: string) => void;
  label?: string;
  prefix?: React.ReactNode; // Allow ReactNode for prefix and suffix
  suffix?: React.ReactNode;
  h?: number | string;
  inputLoading?: boolean;
  errors?: boolean;
  mb?: number;
  errText?: string;
  blur?: boolean;
  register?: any;
  type?: string; // Optional type for the input
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const AppInput: React.FC<AppInputProps> = ({
  inputValue = "",
  textTrigger,
  placeholder,
  disable,
  passwordInput = false,
  label,
  suffix,
  prefix,
  h,
  inputLoading = false,
  errors,
  mb = 12,
  errText,
  blur,
  type = "text",
  register,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(passwordInput);
  function mergeRefs(...refs: any[]) {
    return (element: any) => {
      refs.forEach(ref => {
        if (typeof ref === "function") {
          ref(element);
        } else if (ref != null) {
          ref.current = element;
        }
      });
    };
  }
  const inputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if (blur && inputRef.current) inputRef.current.blur();
  // }, [blur]);

  // useEffect(() => {
  //  console.log(inputValue, isFocused);
   
  // }, [inputValue, isFocused]);

  return (
    <div className="relative w-full" style={{ marginBottom: errText ? 6 : mb }}>
      <div
        className={`relative w-full border rounded-md bg-transparent ${
          errors
            ? "border-[#F04438]"
            : disable
            ? "border-[#808080B2]"
            : isFocused || inputValue !== ""
            ? "border-[#334155]"
            : "border-[#CBD5E1]"
        }
          `}
        // onClick={() => inputRef.current?.focus()}
      >
        {placeholder && (
          <AppText
            weight="light"
            color={
              disable
                ? "#808080B2"
                : inputValue !== "" || isFocused
                ? "#000"
                : "#666"
            }
            size={13}
            style={{
              position: "absolute",
              top: isFocused || inputValue  ? -10 : "20%",
              left: 12,
              padding: "0 4px",
              background: "#fff",
              fontSize: isFocused || inputValue ? 12 : 14,
              transition: "all 0.2s",
              zIndex: 1,
            }}
            smallText
             // onClick={() => inputRef.current?.focus()}
          >
            {placeholder}
          </AppText>
        )}

        {prefix && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {prefix}
          </div>
        )}

        <input
           ref={register ? mergeRefs(inputRef, register.ref) : inputRef}
           {...register}
          type={showPassword ? "password" : type}
          value={inputValue}
          disabled={disable}
          onChange={(e) => textTrigger?.(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={clsx("w-full px-4 py-3 outline-none bg-transparent", {
            "pl-10": prefix,
            "pr-10": passwordInput || suffix || inputLoading,
            "text-gray-500": disable,
            "text-black": !disable,
          })}
          style={{
            height: h || "auto",
            fontFamily: "",
            fontWeight: 500,
            fontSize: 14,
            // borderColor: errors
            // ? "#F04438"
            // : disable
            // ? "#808080B2"
            // : isFocused || inputValue !== ""
            // ? "#334155"
            // : "#CBD5E1",
          }}
          {...props}
        />

        {passwordInput && (
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <HiOutlineEyeSlash size={16} color={disable ? "#808080B2" : inputValue !== "" || isFocused ? "#545454" : "#CCCCCC"}/>
            ) : (
              <HiOutlineEye size={16} />
            )}
          </div>
        )}

        {suffix && !inputLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {suffix}
          </div>
        )}

        {inputLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 animate-spin border-t-2 border-gray-800 rounded-full" />
          </div>
        )}
      </div>

      {errText && (
        <AppText color="#F04438" size={14} style={{ marginTop: 4 }} smallText weight="light">
          {errText}
        </AppText>
      )}
    </div>
  );
};

export default AppInput;
