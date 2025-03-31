import React from "react";
import ngn from "../assets/ngn.svg";
import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div className="bg-[#F4F4F4] w-full h-screen p-[40px] relative">
      <div className="flex w-full h-[40px] justify-end">
        <img src={ngn} alt="Logo" className="h-full w-[30px]" />
      </div>
      <div className="flex items-center justify-center h-[calc(100%-80px)] w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
