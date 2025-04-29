import React from "react";
import logo from "../../assets/logo.svg";
import AppText from "~/compo/appText";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AppInput from "~/compo/input";
import AppButton from "~/compo/button";
import { useNavigate } from "react-router";
import TwoFactorAuth from "~/compo/TwoFA";
import { useMutation } from "@tanstack/react-query";
import {
  forgotPassword,
  getStaff,
  resetPassword,
  sendEmailOtp,
  sendSmsOtp,
  signIn,
  signUp,
  verifyEmail,
  verifyPhone,
  verifyResetPassOtp,
} from "~/service/authService";
import vendeSquareApi from "~/service/axios";
import { useToast } from "~/compo/use-toast";

interface CustomError {
  data?: {
    message?: string;
    data?: any;
  };
}

function Login() {
  const navigate = useNavigate();
  const { toast, dismiss } = useToast();
  const [step, setStep] = React.useState(1);
  const [otp, setOtp] = React.useState(Array(5).fill(""));
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingOtp, setLoadingOtp] = React.useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = React.useState(30);

  const schema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  type FormData = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const loginMutation = useMutation({
    mutationFn: signIn,
    onError: (error: any) => {
      console.log(error?.data);
      setLoading(false);
      const err =
        error?.data?.message?.includes("This account is") ||
        error?.data?.message?.includes("Invalid")
          ? error?.data?.message
          : error?.data?.data?.email?.message;

      toast({
        title: "Error Occurred",
        description: err,
        emoji: "Error",
        // action: <button onClick={() => dismiss('unique-toast-id')}>Dismiss</button>, // Optional custom action
      });
    },
    onSuccess: (data) => {
      const res = data?.data;
      console.log(res?.accessToken, "token");

      setLoading(false);
      setStep(2);

      // if (res) {
      //   vendeSquareApi.defaults.headers.common[
      //     "Authorization"
      //   ] = `Bearer ${res?.accessToken}`;
      //   localStorage.setItem("token", res?.accessToken);
      //   // navigate("/dashboard");

      // }
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    setLoading(true);
    loginMutation.mutate({
      identifier: data?.email,
      password: data?.password,
    });
  };

  const twoFaAuthMutation = useMutation({
    mutationFn: verifyEmail,
    onError: (error: CustomError) => {
      setLoadingOtp(false);
      toast({
        title: "Error Occurred",
        description: error?.data?.message,
        emoji: "Error",
      });
    },
    onSuccess: (data) => {
      setLoadingOtp(false);
      navigate("/dashboard");

      const res = data?.data;
      console.log(res, "logs");
      vendeSquareApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res?.accessToken}`;
      localStorage.setItem("token", res?.accessToken);
      localStorage.setItem("savedUser", JSON.stringify(res?.admin));
      toast({
        title: "Login Successful",
        description: "You've logged in successfully",
        emoji: "success",
      });
    },
  });

  const handleOtpSubmit = async (e: any) => {
    e.preventDefault();
    // navigate("/dashboard");
    const otpString = otp.join("");
    if (otpString.length === 5) {
      // console.log(schema?.e);
      const email = watch("email");

      twoFaAuthMutation.mutate({ email: email, token: otpString });
      setLoadingOtp(true);
    } else {
    }
  };

  const sendEmailMutation = useMutation({
    mutationFn: sendEmailOtp,
    onError: (error: CustomError) => {
      toast({
        title: "Error Occurred",
        description: error?.data?.message,
        emoji: "Error",
      });
    },
    onSuccess: () => {
      toast({
        title: "Resend Otp Successful",
        description: "Otp resent successfully",
        emoji: "success",
      });
      setSecondsLeft(40);
    },
  });

  const handleResendOtp = () => {
    const email = watch("email");
    const mailData = {
      email: email,
    };

    sendEmailMutation.mutate(mailData);
  };

  return (
    <div className="flex items-center justify-center bg-white h-fit  2xl:w-[47%] xl:w-[56%] w-auto px-[27px] py-[25px] xl:px-[60px] xl:py-[38px] lg:px-[50px] lg:py-[37px] md:px-[40px] md:py-[32px]  2xl:px-[70px] 2xl:py-[44px]">
      <div className=" w-full flex-col flex justify-center items-center">
        <div className=" w-full flex-row flex justify-center 2xl:mb-[30px] xl:mb-[26px] md:mb-[22px] mb-[17px]">
          <img
            src={logo}
            alt=""
            className="2xl:w-[234.58px] 2xl:h-[41.34px] xl:w-[214.58px] xl:h-[36.34px] lg:w-[200px] lg:h-[34.4px] md:w-[185px] md:h-[31.4px] w-[165px] h-[28.4px]"
          />
        </div>
        {step === 1 && (
          <div className="flex flex-col w-full items-center">
            <AppText size={36} weight="semibold" align="center">
              Log in to your Account
            </AppText>
            <AppText
              size={16}
              smallText
              weight={"light"}
              color="#545454"
              mt={7}
              align="center"
            >
              Hello again! Please enter your login details.
            </AppText>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex-col flex justify-center items-center 2xl:mt-16 xl:mt-12 mt-6 md:mt-10"
            >
              <AppInput
                register={register("email")}
                inputValue={watch("email") || ""}
                textTrigger={(text) => setValue("email", text)}
                placeholder="Email address"
                mb={20}
                // errors={!!errors.email}
                errText={errors.email?.message}
              />
              {/* <p>{errors.email?.message}</p> */}

              <AppInput
                register={register("password")}
                inputValue={watch("password") || ""}
                textTrigger={(text) => setValue("password", text)}
                placeholder="Password"
                passwordInput
                errors={!!errors.password}
                errText={errors.password?.message}
              />

              <div className="flex flex-row justify-end w-full">
                <AppText
                  onClick={() => {
                    navigate("/forgotPassword");
                  }}
                  size={14}
                  color="#475569"
                  smallText
                  weight="light"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Forget password
                </AppText>
              </div>
              {/* <p>{errors.password?.message}</p> */}
              <div className="w-[93%] 2xl:mt-20 xl:mt-16  md:mt-10 mt-8">
                <AppButton
                  type="submit"
                  text="Login"
                  fullWidth
                  loading={loading}
                  textColor="white"
                  py={14}
                  bg="#036600"
                />
              </div>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col w-full items-center ">
            <AppText size={36} weight="semibold" align="center">
              OTP Verification
            </AppText>
            <AppText
              size={16}
              smallText
              weight={"light"}
              color="#545454"
              mt={7}
              align="center"
            >
              We’ve sent a 5-digit OTP to your registered email.
            </AppText>
            <AppText
              size={16}
              smallText
              weight={"light"}
              color="#545454"
              mt={7}
              align="center"
            >
              Enter it below to proceed
            </AppText>
            <form
              onSubmit={handleOtpSubmit}
              className="flex flex-col w-full items-center"
            >
              <TwoFactorAuth
                step={step}
                otp={otp}
                setOtp={setOtp}
                handleResendOtp={handleResendOtp}
                setSecondsLeft={setSecondsLeft}
                secondsLeft={secondsLeft}
              />
              <div className="w-[90%] mt-12">
                <AppButton
                  type="submit"
                  text="Verify"
                  fullWidth
                  textColor="white"
                  py={14}
                  bg="#036600"
                  loading={loadingOtp}
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
