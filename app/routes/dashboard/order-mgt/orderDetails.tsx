import React from "react";
import AppText from "~/compo/appText";
import { FaCheckCircle } from "react-icons/fa";
import Print from "~/assets/print.svg";
import OrderTimeline from "~/compo/OrderTimeline";

const OrderDetails = () => {
  const items = {
    confirmed: {
      message: "Order confirmed by customer",
      timestamp: "2025-03-22T15:09:28.805Z",
    },
    processing: {
      message: "Order was accepted by vendor",
      timestamp: "2025-03-22T15:12:21.554Z",
    },
    ready_for_pickup: {
      message: "Order is ready for pickup",
      timestamp: "2025-03-22T15:12:45.385Z",
    },
  };
  return (
    <div className="px-2 space-y-5 no-scrollbar ">
      {/* Header */}
      <div className="rounded-[8px] bg-[#FDFDFD] p-4 h-[106px] w-full  ">
        <div className="flex flex-row gap-x-16">
          <div className="flex flex-row gap-6 items-center ">
            <div className="w-[20px] h-[17.14px]">
              <img
                src={Print}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <AppText size={16} color="#111315" weight="semibold" smallText>
              Order ID #12009
            </AppText>
            <AppText
              smallText
              weight="medium"
              size={14}
              color="#FFFFFF"
              className="bg-[#3278B3] text-white px-2 py-1 rounded opacity-[90%]"
            >
              In Transit
            </AppText>
          </div>
          <span className="flex flex-row gap-2 items-center">
            <AppText
              smallText
              weight="light"
              size={12}
              color="#6F767E"
              className=""
            >
              Sat, Nov 28
            </AppText>

            <div className="bg-[#6F767E99] w-1 h-1 rounded-full" />

            <AppText
              smallText
              weight="light"
              size={12}
              color="#6F767E"
              className=""
            >
              08:30 PM
            </AppText>
          </span>
        </div>
      </div>
      <div className="w-full flex gap-2">
        <div className="flex flex-col grow w-[72%]">
          <div className="bg-[#FDFDFD] rounded-[8px] p-4">
            <OrderTimeline items={items}/>
          </div>
        </div>
        {/* <div className="grow w-[20%]">

        </div> */}
      </div>
    </div>
  );
};

export default OrderDetails;
