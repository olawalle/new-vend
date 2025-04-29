"use client";
import React from "react";
import AppText from "~/compo/appText";
// import { IoMdArrowBack } from "react-icons/io";
// import { confirm2Fa } from "@/services/apiServices";
// import { useToast } from "@/components/ui/use-toast";
// import { useMutation } from "@tanstack/react-query";
// import { setToken, loginUser, setUserId, setPermissions, setAdminType } from "@/slices/userSlice";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/atoms/Button";
// import { ClipLoader } from "react-spinners";

interface CustomError {
  response?: {
    message?: string;
    data?: any;
  };
}

const TwoFactorAuth = ({
  setStage,
  step,
  otp,
  setOtp,
  handleResendOtp,
  setSecondsLeft,
  secondsLeft,
}: any) => {
  const firstInputRef = React.useRef(null);
  //   const [otp, setOtp] = React.useState(Array(5).fill(""));
  const [otpComplete, setOtpComplete] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Check if the time is up
    if (step === 2) {
      if (secondsLeft > 0) {
        const timerId = setInterval(() => {
          setSecondsLeft((prev: any) => prev - 1);
        }, 1000); // Countdown every second

        return () => clearInterval(timerId);
      }
      // else {
      //     setStage("enter_code");
      // }
    }
  }, [step, secondsLeft]);

  React.useEffect(() => {
    // Automatically focus the first input when the component mounts
    if (firstInputRef.current) {
      //@ts-ignore
      firstInputRef.current?.focus();
    }
  }, []);

  const handleSubmitOtp = () => {
    const otpString = otp.join("");
    // Call the onSubmitOtp function if all fields are filled
    if (otpString.length === 6) {
      // twoFaAuthMutation.mutate({ code: otpString, token });
      setLoading(true);
      // onSubmitOtp(otpString);
    } else {
      // toast({
      //     title: "Error Occured",
      //     description: "Please fill all OTP fields.",
      //     emoji: "Error"
      //     // action: <button onClick={() => dismiss('unique-toast-id')}>Dismiss</button>, // Optional custom action
      // });
    }
  };

  React.useEffect(() => {
    const otpString = otp.join("");
    if (otpString.length === 6) {
      setOtpComplete(true);
    } else {
      setOtpComplete(false);
    }
  }, [otp]);

  const handleChange = (element: HTMLInputElement, index: number): void => {
    const value = element.value;
    const newOtp = [...otp];

    if (/^\d$/.test(value)) {
      // If user entered a valid digit
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field after entering a valid digit
      if (element.nextElementSibling instanceof HTMLInputElement) {
        element.nextElementSibling.focus();
      }
    }
  };

  // Handles backspace key press and focuses on the previous sibling
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    const element = e.target as HTMLInputElement;

    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (element.value !== "") {
        // Clear the current input and stay in the same input field
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (
        element.value === "" &&
        element.previousElementSibling instanceof HTMLInputElement
      ) {
        // If the input is empty and backspace is pressed, move to the previous input
        newOtp[index - 1] = ""; // Clear the previous input
        setOtp(newOtp);
        element.previousElementSibling.focus();
      }
    }
    // if (e.key === "Enter") {
    //   handleSubmitOtp();
    // }
  };

  // Function to resend code (mock action)
  const resendCode = (): void => {
    alert("Code resent");
  };

  return (
    // <div className="w-full md:w-[75%] lg:w-[40%] 2xl:w-[27%] xl:w-[35%] md:p-6 p-5 mt-4 md:mt-0 md:bg-white text-[#1c0708] transition ">

    <div className="w-full  md:p-6 p-5 mt-4 md:mt-0 md:bg-white text-[#1c0708] transition ">
      <div className=" w-full">
        {/* <IoMdArrowBack
                    color="#111111"
                    size={23}
                    onClick={() => {
                        setStage("init");
                        setSecondsLeft(30);
                    }}
                    className="mt-5 mb-7 cursor-pointer"
                />
                <h1 className="text-xl font-semibold flex gap-x-2 mt-2">Enter TOTP code</h1>
                <h2 className="text-sm font-normal my-4 text-[#000000]">
                    Please enter the code on your authenticator app.
                </h2> */}
        <div className="flex gap-x-2 mb-6 flex-row justify-center">
          {otp.map((data: any, index: number) => (
            <input
              className="w-11 h-11 xl:w-16 xl:h-16 md:w-15 md:h-15 text-center border font-bold border-[#ECEBF5] bg-[#F8F8FA] rounded-[10px] text-xl focus:outline-none focus:border-[#EE0027]"
              type="tel"
              maxLength={1}
              key={index}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              onKeyDown={(e) => handleKeyDown(e, index)}
              pattern="[0-9]*"
              ref={index === 0 ? firstInputRef : null}
            />
          ))}
        </div>
        {secondsLeft > 0 ? (
          <div className="flex w-full justify-center">
            <AppText
              size={14}
              smallText
              weight={"light"}
              color="#475569"
              mt={7}
            >
              Time Remaining:{" "}
              <AppText size={14} smallText weight={"medium"} color="#036600">
                00:{secondsLeft}s
              </AppText>
            </AppText>
          </div>
        ) : (
          <div className="flex w-full justify-center">
            <AppText
              size={14}
              smallText
              weight={"light"}
              color="#475569"
              mt={7}
            >
              Didn’t receive the code?{" "}
              <AppText
                size={14}
                smallText
                weight={"medium"}
                color="#036600"
                underline
                style={{
                  cursor: "pointer",
                }}
                onClick={() => handleResendOtp()}
                //   className="underline cursor-pointer"
              >
                Resend code
              </AppText>
            </AppText>
          </div>
        )}
        {/* <button
                    className={` font-semibold py-4 w-full rounded-full mb-4 ${
                        otpComplete ? "bg-[#01C38E] text-white" : "bg-[#CBD1D7] text-[#EEF0F2]"
                    }`}
                    onClick={() => handleSubmitOtp()}
                    disabled={!otpComplete}
                >
                    {!loading && "Send"} 
                    {loading && (
                        <ClipLoader
                        color="white"
                        size= "1.2rem"
                        className="m-auto mt-1"
                    />
                    )}
                </button> */}
        {/* <p
                    onClick={resendCode}
                    className="text-[#01C38E] font-semibold cursor-pointer mt-3 hover:underline text-center"
                >
                    Resend code
                </p> */}
      </div>
    </div>
  );
};

export default TwoFactorAuth;
