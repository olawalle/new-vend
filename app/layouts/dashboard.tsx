import React from "react";
import { Outlet } from "react-router";
import logo from "../assets/logo.svg";

function DashboardLayout() {
  return (
    <div className="h-screen w-full">
      <div className="h-[70px] w-full bg-white border-b border-[#d7d7d] flex justify-between items-center px-[30px]">
        <img src={logo} alt="" />
      </div>
      <div className="w-full h-[calc(100%-70px)] flex">
        <div className="w-[270px] h-full bg-white"></div>
        <div className="flex-1 h-full bg-[#F4F6FA] p-[30px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
