import React from "react";
import ngn from "../assets/ngn.svg";
import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div className="bg-[#F4F4F4] w-full h-screen xl:p-[40px] p-[27px] md:p-[30px] relative flex flex-col items-center">
      <div className="flex w-full h-[30px] xl:h-[40px] justify-end">
        <img src={ngn} alt="Logo" className="h-full w-[24px] xl:w-[30px]" />
      </div>
      <div className="flex items-center justify-center h-auto md:grow mt-7 w-full md:mt-0">
          <Outlet />
        {/* <div className="flex items-center justify-center bg-white h-[84%] w-[47%] px-[70px] py-[44px]">
          
        </div> */}
      </div>
    </div>
  );
}

export default AuthLayout;
