import React from "react";
import logo from "../../assets/logo.svg";
import AppText from "~/compo/appText";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-[84%]  2xl:w-[47%] xl:w-[56%] w-auto px-[27px] py-[25px] xl:px-[60px] xl:py-[38px] lg:px-[50px] lg:py-[37px] md:px-[40px] md:py-[32px]  2xl:px-[70px] 2xl:py-[44px]">
      <div className=" w-full flex-row flex justify-center 2xl:mb-[30px] xl:mb-[26px] md:mb-[22px] mb-[17px]">
        <img
          src={logo}
          alt=""
          className="2xl:w-[234.58px] 2xl:h-[41.34px] xl:w-[214.58px] xl:h-[36.34px] lg:w-[200px] lg:h-[34.4px] md:w-[185px] md:h-[31.4px] w-[165px] h-[28.4px]"
        />
      </div>
      <AppText size={36} weight="semibold" align="center">
        Contact Super Admin
      </AppText>
      <div className="w-[90%] lg:w-[70%] md:w-[80%] flex items-center justify-center">
        <AppText
          size={16}
          smallText
          weight={"light"}
          color="#545454"
          mt={7}
          align="center"
        >
          Please contact your super admin for assistance with resetting your
          password
        </AppText>
      </div>
      <AppText
        size={14}
        smallText
        weight={"medium"}
        color="#036600"
        underline
        mt={55}
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/login");
        }}
        //   className="underline cursor-pointer"
      >
        Back to login
      </AppText>
    </div>
  );
};

export default ForgotPassword;
