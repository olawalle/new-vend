import React from "react";
import { Outlet } from "react-router";
import logo from "../assets/logo.svg";
import DashboardIcon from "~/assets/icons/DashboardIcon";
import AppText from "~/compo/appText";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import SideBarMenu from "~/compo/SideBarMenu";
import Menu from "~/assets/menu.svg";
import UserImage from "~/assets/user-image.png";

function DashboardLayout() {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const savedUser = localStorage.getItem("savedUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  const getInitials = (firstName?: string, lastName?: string): string => {
    const first = firstName ? firstName.charAt(0).toUpperCase() : "";
    const last = lastName ? lastName.charAt(0).toUpperCase() : "";
    return `${first}${last}`;
  };

  return (
    <div>
      <div className="h-screen w-full">
        <div
          className={`h-[70px] w-full bg-white border-b border-[#d7d7d] flex justify-between items-center px-[22px]`}
        >
          <div className="flex gap-x-2">
            <div className="flex gap-x-2 xl:hidden items-center ">
              <img
                src={Menu}
                className="h-7 w-7"
                alt="user"
                width={200}
                height={200}
                onClick={() => setShowSidebar(!showSidebar)}
              />
            </div>
            <img
              src={logo}
              alt=""
              className="w-[180px] xl:w-auto hidden xl:block"
            />
          </div>
          <div className=" flex flex-row gap-x-3 items-center">
            <div className=" flex-col gap-y-1 hidden xl:flex">
              <AppText
                weight="semibold"
                smallText
                size={14}
                color="#1A1A1A"
                align="right"
              >
                {user?.firstName} {user?.lastName}
              </AppText>
              <AppText
                weight="light"
                smallText
                size={14}
                color="#545454"
                align="right"
              >
                Admin
              </AppText>
            </div>

            <AppText
              weight="semibold"
              smallText
              size={14}
              color="#1A1A1A"
              align="right"
              className="flex xl:hidden"
            >
              {getInitials(user?.firstName, user?.lastName)}
            </AppText>
            <div className="w-10 h-10 rounded-full">
              <img
                src={UserImage}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className="w-full h-[calc(100%-70px)] flex overflow-hidden">
          <div className="xl:hidden ">
            <AnimatePresence>
              {showSidebar && (
                <motion.div
                  initial={{ width: "0rem" }}
                  animate={{ width: "100vw" }}
                  exit={{ width: "0rem" }}
                  className="min-h-screen z-20  absolute  top-0 left-0 flex flex-row overflow-hidden bg-[#51525C3B]"
                >
                  <div className="bg-white min-w-[270px] lg:min-w-[500px]">
                    <SideBarMenu setShowSidebar={setShowSidebar} />
                  </div>
                  <div
                    className="grow min-h-screen"
                    onClick={() => setShowSidebar(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className=" xl:min-w-[285px]  h-full bg-white  flex-col mt-6 hidden xl:flex">
            <SideBarMenu setShowSidebar={setShowSidebar} />
          </div>
          <div className="min-h-[90%] grow overflow-y-scroll bg-[#F4F6FA] px-[10px] py-[30px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
