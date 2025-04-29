import React, { useState } from "react";
import AppText from "~/compo/appText";
// import {
//   Entypo
// } from "react-icons/";

const formatDate = (timestamp: any) => {
  const date = new Date(timestamp);
  return date
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();
};

const OrderTimeline = ({ items, fullOption }: any) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fullfillmentOption, setFullfillmentOption] = useState("delivery");

  const delStatuses = [
    { key: "confirmed", text: "Pending" },
    { key: "processing", text: "Order Accepted" },
    { key: "ready_for_pickup", text: "Order Ready" },
    { key: "shipped", text: "Rider in Transit" },
    { key: "delivered", text: "Order Completed" },
  ];

  const statuses = [
    { key: "confirmed", text: "Pending" },
    { key: "processing", text: "Order Accepted" },
    { key: "ready_for_pickup", text: "Order Ready" },
    { key: "customer_picked_up", text: "Order Completed" },
  ];

  if (fullfillmentOption === "delivery") {
    if (items?.cancelled) {
      delStatuses.push({ key: "cancelled", text: "Order Cancelled" });

      const filteredStatuses = delStatuses.filter(
        (status) =>
          status.key !== "processing" &&
          status.key !== "shipped" &&
          status.key !== "ready_for_pickup" &&
          status.key !== "delivered"
      );

      delStatuses.length = 0; // Clear original array
      delStatuses.push(...filteredStatuses);
    }else{
      if (items?.cancelled) {
        statuses.push({ key: "cancelled", text: "Order Cancelled" });
        const filteredStatuses = statuses.filter(
          (status) =>
            status.key !== "processing" &&
            status.key !== "ready_for_pickup" &&
            status.key !== "customer_picked_up"
        );
        statuses.length = 0;
        statuses.push(...filteredStatuses);
      }
    }
  }


  if (fullfillmentOption === "delivery") {
    if (items?.refunded) {
      statuses.push({ key: "refunded", text: "Order Refunded" });
      const filteredStatuses = statuses.filter(
        (status) =>
          status.key !== "processing" &&
          status.key !== "shipped" &&
          status.key !== "ready_for_pickup" &&
          status.key !== "delivered"
      );
  
      statuses.length = 0; // Clear original array
      statuses.push(...filteredStatuses);
    }
  }else{
    if (items?.refunded) {
      statuses.push({ key: "refunded", text: "Order Refunded" });
      const filteredStatuses = statuses.filter(
        (status) =>
          status.key !== "processing" &&
          status.key !== "ready_for_pickup" &&
          status.key !== "customer_picked_up"
      );
      statuses.length = 0;
      statuses.push(...filteredStatuses);
    }
  }
  

 

  return (
    <div style={{ marginTop: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <AppText size={16} color="#1A1A1A" weight="medium">Order Status</AppText>
        {/* <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} style={{ padding: "4px 6px", background: "none", border: "none" }}>
          {isDropdownOpen ? (
            <Entypo name="chevron-small-up" size={22} color="#1A1A1A" />
          ) : (
            <Entypo name="chevron-small-down" size={22} color="#1A1A1A" />
          )}
        </button> */}
      </div>
          

          {
            fullfillmentOption === "delivery" ? (
              <div
              style={{
                padding: "30px 20px 16px",
                backgroundColor: "#ffffff",
                marginTop: 5,
              }}
            >
              
              {delStatuses.map(({ key, text }, index) => {
                const isCompleted = items?.[key];
                return (
                  <div
                    key={key}
                    style={{ display: "flex", alignItems: "flex-start",  }}
                    className="h-[60px]"
                  >
                    <div
                     
                      className=" flex flex-col h-full w-[24px] items-center mt-[6.2px]"
                    >
                      <div
                        style={{
                          width: 11,
                          height: 11,
                          borderRadius: "50%",
                          border: "1px solid #036600",
                          backgroundColor: isCompleted ? "#036600" : "transparent",
                        }}
                      />
                      {index !== delStatuses?.length - 1 && (
                        <div
                          style={{
                            width: 1.2,
                            backgroundColor: "#036600",
                            height: "100%",
                          }}
                        />
                      )}
                    </div>
                    <div style={{ marginLeft: 8, paddingBottom: 20 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <AppText
                          weight="medium"
                          color={isCompleted ? "#036600" : "#545454"}

                        >
                          {text}
                        </AppText>
                        {/* {isCompleted && (
                          <AppText weight="light" color="#545454" size={11}>
                            {formatDate(items?.[key]?.timestamp)}
                          </AppText>
                        )} */}
                      </div>
                      {isCompleted ? (
                         <AppText weight="light" color="#545454" size={11}>
                         {formatDate(items?.[key]?.timestamp)}
                       </AppText>
                      ): (
                        <AppText weight="light" color="#545454" size={11}>
                        00:00
                      </AppText>
                      ) 
                    }
                    </div>
                  </div>
                );
              })}
            </div>
            ): (
              <div
              style={{
                padding: "30px 20px 16px",
                backgroundColor: "#ffffff",
                marginTop: 15,
              }}
            >
              
              {statuses.map(({ key, text }, index) => {
                const isCompleted = items?.[key];
                return (
                  <div
                    key={key}
                    style={{ display: "flex", alignItems: "flex-start" }}
                  >
                    <div
                      style={{
                        width: 24,
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        marginTop: 3.2,
                      }}
                    >
                      <div
                        style={{
                          width: 11,
                          height: 11,
                          borderRadius: "50%",
                          border: "1px solid #036600",
                          backgroundColor: isCompleted ? "#036600" : "transparent",
                        }}
                      />
                      {index !== statuses.length - 1 && (
                        <div
                          style={{
                            width: 1.2,
                            backgroundColor: "#036600",
                            flexGrow: 1,
                            height: 30,
                          }}
                        />
                      )}
                    </div>
                    <div style={{ marginLeft: 8, paddingBottom: 20 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <AppText
                          weight="medium"
                          color={isCompleted ? "#036600" : "#545454"}
                        >
                          {text}
                        </AppText>
                        {/* {isCompleted && (
                          <AppText weight="light" color="#545454" size={11}>
                            {formatDate(items?.[key]?.timestamp)}
                          </AppText>
                        )} */}
                      </div>
                      {isCompleted ? (
                         <AppText weight="light" color="#545454" size={11}>
                         {formatDate(items?.[key]?.timestamp)}
                       </AppText>
                      ): (
                        <AppText weight="light" color="#545454" size={11}>
                        00:00
                      </AppText>
                      ) 
                    }
                    </div>
                  </div>
                );
              })}
            </div>
            )
          }
     
    </div>
  );
};

export default OrderTimeline;
