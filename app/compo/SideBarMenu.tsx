import React from "react";
import logo from "../assets/logo.svg";
import DashboardIcon from "~/assets/icons/DashboardIcon";
import CustomerIcon from "~/assets/icons/CustomerIcon";
import DeliveryIcon from "~/assets/icons/DeliveryIcon";
import FinanceIcon from "~/assets/icons/FinanceIcon";
import OrderIcon from "~/assets/icons/OrderIcon";
import VendorIcon from "~/assets/icons/VendorIcon";
import LogOutIcon from "~/assets/icons/LogOutIcon";
import ReckonIcon from "~/assets/icons/ReckonIcon";
import ReportsIcon from "~/assets/icons/ReportsIcon";
import SettingsIcon from "~/assets/icons/SettingsIcon";

import AppText from "~/compo/appText";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";

const SideBarMenu = ({ setShowSidebar }: any) => {
  const navigate = useNavigate();

  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (item: (typeof sidebarMenu)[number]) => {
    if (item.link && item.link === currentPath) {
      return true;
    }

    if (item.children && item.children.length > 0) {
      return item.children.some((child) => currentPath?.includes(child?.link));
    }

    return false;
  };

  const isChildActive = (childLink: string) => currentPath?.includes(childLink);

  const sidebarMenu = [
    {
      title: "Dashboard",
      icon: DashboardIcon,
      link: "/dashboard",
    },
    {
      title: "Orders Management",
      icon: OrderIcon,
      children: [
        {
          title: "All Orders",
          link: "/all-orders",
        },
      ],
      // no link because it may have children
    },
    {
      title: "Vendor & Store Mgmt",
      icon: VendorIcon,
      children: [
        { title: "Vendor List", link: "/vendors" },
      ],
    },
    {
      title: "Customer Mgmt",
      icon: CustomerIcon,
      children: [{ title: "Customer List", link: "/customers" }],
      // no link because it may have children
    },
    {
      title: "Finance & Payouts",
      icon: FinanceIcon,
      children: [],
      // no link because it may have children
    },
    {
      title: "Delivery & Logistics",
      icon: DeliveryIcon,
      children: [],
      // no link because it may have children
    },
    {
      title: "Recon & Audit",
      icon: ReckonIcon,
      children: [],
      // no link because it may have children
    },
    {
      title: "Reports & Analytics",
      icon: ReportsIcon,
      children: [],
      // no link because it may have children
    },
    {
      title: "Settings & Config",
      icon: SettingsIcon,
      children: [],
      // no link because it may have children
    },
  ];

  const [active, setActive] = React.useState({
    activeTab: "",
    activeChild: "",
  });

  const [activeDrop, setActiveDrop] = React.useState("");

  const handleActiveTab = (tab: string, child: string, link: any) => {
    setActive({
      activeTab: tab,
      activeChild: child,
    });
    navigate(link);
    setShowSidebar(false);
  };

  const handleActiveDrop = (title: string) => {
    if (activeDrop === title) {
      setActiveDrop("");
    } else {
      setActiveDrop(title);
    }
  };
  return (
    <div className="w-full flex flex-col gap-4 px-[10px] z-30 overflow-y-scroll mb-5 no-scrollbar">
      <div className="my-3 flex justify-between xl:hidden items-center">
        <img src={logo} alt="" className="w-[180px] xl:w-auto" />
        {/* <span
          className="h-10 w-10 bg-[#0366000D] rounded-[25px] flex flex-row items-center justify-center cursor-pointer"
          onClick={() => {
            setShowSidebar(false);
          }}
        >
          <IoClose size={20} />
        </span> */}
      </div>
      {sidebarMenu?.map((_, i) => {
        const active = isActive(_);

        return (
          <div key={i}>
            <span
              className={`flex flex-row justify-between  px-[14px] py-3 items-center cursor-pointer ${
                active ? "bg-[#0366000D]" : ""
              } `}
              onClick={() => {
                _?.children
                  ? handleActiveDrop(_?.title)
                  : handleActiveTab(_?.title, "", _?.link);
              }}
            >
              <span className="flex flex-row gap-3 items-center">
                <_.icon
                  color={active ? "#036600" : "#1A1A1A"}
                  className="w-[18.3px] h-[18.24px]"
                />
                <AppText
                  weight="medium"
                  smallText
                  size={14}
                  color={active ? "#036600" : "#1A1A1A"}
                >
                  {_?.title}
                </AppText>
              </span>
              {_?.children && (
                <span>
                  {activeDrop === _?.title ? (
                    <IoIosArrowUp color={active ? "#036600" : "#1A1A1A"} />
                  ) : (
                    <IoIosArrowDown color={active ? "#036600" : "#1A1A1A"} />
                  )}
                </span>
              )}
            </span>
            {activeDrop === _?.title && (
              <div className="flex flex-col mt-1 gap-1">
                {_?.children &&
                  _?.children?.map((child, i) => (
                    <span
                      className={`py-[10px] lg:pl-[44px] pl-[42px] cursor-pointer ${
                        isChildActive(child?.link) ? "bg-[#0366000D]" : ""
                      }`}
                      key={i}
                      onClick={() => {
                        handleActiveTab(_?.title, child?.title, child?.link);
                      }}
                    >
                      <AppText
                        weight="medium"
                        smallText
                        size={14}
                        color={
                          isChildActive(child?.link) ? "#036600" : "#1A1A1A"
                        }
                      >
                        {child?.title}
                      </AppText>
                    </span>
                  ))}
              </div>
            )}
          </div>
        );
      })}
      <div>
        <span
          className={`flex flex-row justify-between  px-[14px] py-3 items-center  mt-3`}
          
        >
          <span className="flex flex-row gap-3 items-center cursor-pointer" onClick={() => {
            navigate("/login")
            localStorage.removeItem("token");
            localStorage.removeItem("savedUser");
          }}>
            <LogOutIcon
              color="#F04438"
              className="w-[18.3px] h-[18.24px]"
            />
            <AppText
              weight="medium"
              smallText
              size={14}
              color="#F04438"
            >
              Log out
            </AppText>
          </span>
        </span>
      </div>
    </div>
  );
};

export default SideBarMenu;
