import React from "react";
import { Button } from "~/components/ui/button";
import { BadgeCheck, ArrowLeft } from "lucide-react";
import AppText from "~/compo/appText";
import ShopImage from "../../../assets/form.png";
import CopyIcon from "../../../assets/copy.svg";
import ShopLogo from "../../../assets/store-logo.svg";
import AppButton from "~/compo/button";
import { useNavigate } from "react-router";
import {
  getAVendor,
  getCategories,
  approveStore,
  rejectStore,
} from "~/service/authService";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "~/lib/utils";
import AnimatedLoading from "~/compo/AnimatedLoading";
import { truncateText } from "~/hooks/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  MoreVertical,
  SlidersHorizontal,
  Search,
  CircleX,
  Eye,
} from "lucide-react";
import Pagination from "~/compo/pagination";
import { useToast } from "~/compo/use-toast";
import { RejectionModal } from "~/compo/RejectionModal";

interface CustomError {
  data?: {
    message?: string;
    data?: any;
  };
}

export default function VendorDetails() {
  const navigate = useNavigate();
  const { toast, dismiss } = useToast();
  const goBack = () => {
    navigate(-1); // this goes back one step in history
  };

  const { state } = useLocation();
  // console.log(state?.vendorId, "id");
  const [selectedStore, setSelectedStore] = React.useState<any>(null);
  const [approveLoading, setApproveLoading] = React.useState(false);
  const [rejectLoading, setRejectLoading] = React.useState(false);
  const [reject, setReject] = React.useState(false);
  const [rejectReason, setRejectReason] = React.useState("");

  const {
    data: Avendor = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ["vendors"],
    queryFn: () => getAVendor(state?.vendorId),
    retry: 3,
    enabled: !!state?.vendorId, // optional: prevent query on initial mount if filters are empty
  });

  // React.useEffect(() => {
  //   if (isSuccess && Avendor?.vendor?.stores?.length > 0) {
  //     if (!selectedStore) {
  //       setSelectedStore(Avendor?.vendor?.stores[0]);
  //     }
  //   } else {
  //     setSelectedStore(null);
  //   }
  // }, [isSuccess, Avendor, selectedStore]);

  const {
    data: category = [],
    isLoading: loadingCat,
    isSuccess: catSuccess,
    isError: catError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(state?.vendorId),
    retry: 3,
    enabled: !!state?.vendorId, // optional: prevent query on initial mount if filters are empty
  });

  React.useEffect(() => {
    setSelectedStore(null);
  }, []);

  const statusColors = {
    pending: "bg-[#E07B39] ",
    approved: "bg-[#3A8E42]",
    rejected: "bg-[#B33A3A]",
    deleted: "bg-[#B33A3A]",
    active: "bg-[#3A8E42]",
    live: "bg-[#3A8E42]",
  };

  const approveStoreMutation = useMutation({
    mutationFn: approveStore,
    onError: (error: CustomError) => {
      setApproveLoading(false);
      toast({
        title: "Error Occurred",
        description: error?.data?.message,
        emoji: "Error",
      });
    },
    onSuccess: () => {
      setApproveLoading(false);
      toast({
        title: "Store Approved Successful",
        description: "Store approved successfully",
        emoji: "success",
      });
    },
  });

  const handleAprroveStore = () => {
    approveStoreMutation.mutate(
      selectedStore?.id || Avendor?.vendor?.stores[0]?.id
    );
    setApproveLoading(true);
  };

  const rejectStoreMutation = useMutation({
    mutationFn: rejectStore,
    onError: (error: CustomError) => {
      setRejectLoading(false);

      toast({
        title: "Error Occurred",
        description: error?.data?.message,
        emoji: "Error",
      });
    },
    onSuccess: () => {
      setRejectLoading(false);
      setReject(false);
      setRejectReason("");
      toast({
        title: "Store Rejection Successful",
        description: "Store rejected successfully",
        emoji: "success",
      });
    },
  });

  const handleRejectStore = () => {
    const data = {
      id: selectedStore?.id || Avendor?.vendor?.stores[0]?.id,
      update: {
        reason: rejectReason,
      },
    };
    rejectStoreMutation.mutate(data);
    setRejectLoading(true);
  };

  return (
    <div className="px-2 space-y-5 no-scrollbar ">
      {/* Back Button */}
      <div className="flex flex-row justify-start">
        <button
          className="flex items-center p-3 border border-black rounded-[4px] mb-6 cursor-pointer"
          onClick={() => goBack()}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Info Cards */}
      {isLoading ? (
        <div className="w-full  h-[80vh] xl:h-[480px] grid place-items-center">
          <AnimatedLoading />
        </div>
      ) : (
        <div className="w-full h-full space-y-5">
          {!isError && Avendor?.length !== 0 ? (
            <div className="flex flex-row justify-between flex-wrap gap-5">
              {/* Vendor Information */}
              <div className="w-full flex flex-col gap-5 xl:w-[41.3%]">
                <div className="bg-[#FDFDFD] px-6 py-10 rounded-[6px]  h-fit ">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-6  bg-[#036600] rounded-[2px] " />
                    <AppText
                      smallText
                      weight="semibold"
                      size={20}
                      color="#1A1A1A"
                    >
                      Vendor Information
                    </AppText>
                  </div>
                  <div className="w-full h-[1px] bg-[#E4E7EC] mb-4" />
                  <ul className="space-y-4 text-sm flex flex-col gap-3">
                    <li className="flex justify-between gap-2">
                      <AppText
                        smallText
                        weight="light"
                        size={14}
                        color="#1A1A1A"
                        className="w-[45%]"
                      >
                        Date Joined
                      </AppText>
                      {/* <span>Date Joined</span> */}
                      <AppText
                        smallText
                        weight="semibold"
                        size={14}
                        color="#1A1A1A"
                        align="left"
                        className="grow"
                      >
                        {Avendor?.vendor?.createdAt
                          ? format(Avendor?.vendor?.createdAt, "dd/MM/yyyy")
                          : "N/A"}
                        {/* 11/01/2025 */}
                      </AppText>
                    </li>
                    <li className="flex justify-between gap-2">
                      <AppText
                        smallText
                        weight="light"
                        size={14}
                        color="#1A1A1A"
                        className="w-[45%]"
                      >
                        First Name
                      </AppText>
                      {/* <span>Date Joined</span> */}
                      <AppText
                        smallText
                        weight="semibold"
                        size={14}
                        color="#1A1A1A"
                        align="left"
                        className="grow "
                      >
                        {Avendor?.vendor?.staff?.[0]?.firstName}
                      </AppText>

                      {/* <span className="font-medium"></span> */}
                    </li>
                    <li className="flex justify-between gap-2">
                      <AppText
                        smallText
                        weight="light"
                        size={14}
                        color="#1A1A1A"
                        className="w-[45%]"
                      >
                        Last Name
                      </AppText>
                      {/* <span>Date Joined</span> */}
                      <AppText
                        smallText
                        weight="semibold"
                        size={14}
                        color="#1A1A1A"
                        align="left"
                        className="grow "
                      >
                        {Avendor?.vendor?.staff?.[0]?.lastName}
                      </AppText>
                    </li>

                    <li className="flex justify-between gap-2">
                      <AppText
                        smallText
                        weight="light"
                        size={14}
                        color="#1A1A1A"
                        className="w-[45%]"
                      >
                        Phone Number
                      </AppText>
                      <AppText
                        smallText
                        weight="semibold"
                        size={14}
                        color="#1A1A1A"
                        align="left"
                        className="grow "
                      >
                        {Avendor?.vendor?.staff?.[0]?.phone}
                      </AppText>
                    </li>

                    <li className="flex justify-between gap-2">
                      <AppText
                        smallText
                        weight="light"
                        size={14}
                        color="#1A1A1A"
                        className="w-[45%]"
                      >
                        Vendor Name
                      </AppText>
                      <AppText
                        smallText
                        weight="semibold"
                        size={14}
                        color="#1A1A1A"
                        align="left"
                        className="grow "
                      >
                        {Avendor?.vendor?.businessName}
                      </AppText>
                    </li>

                    <li className="flex justify-between gap-2">
                      <AppText
                        smallText
                        weight="light"
                        size={14}
                        color="#1A1A1A"
                        className="w-[45%]"
                      >
                        Email
                      </AppText>
                      <AppText
                        smallText
                        weight="semibold"
                        size={14}
                        color="#1A1A1A"
                        align="left"
                        className="grow "
                      >
                        {Avendor?.vendor?.staff?.[0]?.email}
                      </AppText>
                    </li>

                    <li className="flex justify-between gap-2">
                      <AppText
                        smallText
                        weight="light"
                        size={14}
                        color="#1A1A1A"
                        className="w-[45%]"
                      >
                        Status
                      </AppText>
                      <span className="grow">
                        {/* <span className="bg-[#3A8E42] text-white px-2 py-2 rounded text-xs"> */}
                        <AppText
                          smallText
                          weight="medium"
                          size={14}
                          color="#FFFFFF"
                          align="center"
                          className={cn(
                            " text-white px-2 py-1 rounded ",
                            statusColors[
                              Avendor?.vendor?.staff?.[0]
                                ?.status as keyof typeof statusColors
                            ]
                          )}
                          transform="capitalize"
                        >
                          {Avendor?.vendor?.staff?.[0]?.status}
                        </AppText>
                        {/* </span> */}
                      </span>
                    </li>
                  </ul>
                </div>
                {Avendor?.vendor?.stores &&
                  Avendor?.vendor?.stores?.length > 1 && (
                    <div className="bg-[#FDFDFD] lg:px-6 px-2 md:px-4 py-10 rounded-[6px]  h-fit ">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-6  bg-[#036600] rounded-[2px] " />
                        <AppText
                          smallText
                          weight="semibold"
                          size={20}
                          color="#1A1A1A"
                        >
                          List of Stores
                        </AppText>
                      </div>
                      <div className="w-full h-[1px] bg-[#E4E7EC] mb-4" />

                      <div className=" flex flex-col gap-3">
                        {Avendor?.vendor?.stores?.map((_: any, i: number) => (
                          <div
                            className={`flex flex-row items-center gap-4 lg:px-[10px] px-2 py-[12px] cursor-pointer hover:bg-[#03660007] ${
                              _?.id ===
                              (selectedStore?.id ||
                                Avendor?.vendor?.stores[0]?.id)
                                ? "bg-[#0366000D]"
                                : ""
                            }`}
                            onClick={() => {
                              setSelectedStore(_);
                            }}
                            key={i}
                          >
                            <span className=" w-[50.22px] h-[50.22px] flex-shrink-0">
                              <img
                                src={_?.logo}
                                alt="shopLogo.png"
                                className="object-contain w-full h-full rounded-full"
                              />
                            </span>
                            <div className="flex flex-col gap-[2px]">
                              <span className="flex flex-row gap-2 items-center">
                                <AppText
                                  smallText
                                  weight="medium"
                                  size={16}
                                  color="#1A1A1A"
                                >
                                  {_?.name}
                                </AppText>
                                {/* <span className="bg-[#3A8E42] text-white px-[6px] py-[6px] w-[48px] h-[16px] rounded-[4px] flex flex-row items-center"> */}
                                <AppText
                                  smallText
                                  weight="light"
                                  size={12}
                                  color="#FFFFFF"
                                  className={cn(
                                    " text-white px-[6px] py-1 rounded ",
                                    statusColors[
                                      _?.status as keyof typeof statusColors
                                    ]
                                  )}
                                  transform="capitalize"
                                >
                                  {_?.status}
                                </AppText>
                                {/* </span> */}
                              </span>

                              {/* <AppText
                            smallText
                            weight="light"
                            size={14}
                            color="#545454"
                            className="lg:hidden"
                          >
                            {truncateText(_?.address, 40)}
                          </AppText> */}

                              <AppText
                                smallText
                                weight="light"
                                size={14}
                                color="#545454"
                                className=""
                              >
                                {_?.address}
                              </AppText>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>

              {/* Store Information */}

              {Avendor?.vendor?.stores?.length > 0 && (
                <div className="w-full flex flex-col  xl:w-[56%]">
                  <div className="bg-[#FDFDFD] lg:px-6 px-4 py-10 rounded-[6px] ">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2 lg:mb-4">
                        <div className="w-2 h-6  bg-[#036600] rounded-[2px] " />
                        <AppText
                          smallText
                          weight="semibold"
                          size={20}
                          color="#1A1A1A"
                        >
                          Store Information
                        </AppText>
                      </div>
                      <span className=" w-[116.39px] h-[47.54px] rounded-[8px]">
                        <img
                          src={selectedStore?.coverImage ||
                            Avendor?.vendor?.stores[0]?.coverImage}
                          alt="shopImage.png"
                          className="object-cover w-full h-full rounded-[8px]"
                        />
                      </span>
                    </div>

                    <div className="w-full h-[1px] bg-[#E4E7EC] mb-4" />

                    <ul className="space-y-4 text-sm flex flex-col gap-3">
                      <li className="flex justify-between gap-2">
                        <AppText
                          smallText
                          weight="light"
                          size={14}
                          color="#1A1A1A"
                          className="w-[45%]"
                        >
                          Store Name
                        </AppText>
                        <AppText
                          smallText
                          weight="semibold"
                          size={14}
                          color="#1A1A1A"
                          align="left"
                          className="grow w-[55%]"
                        >
                          {selectedStore?.name ||
                            Avendor?.vendor?.stores[0]?.name}
                        </AppText>
                      </li>
                      <li className="flex justify-between gap-2">
                        <AppText
                          smallText
                          weight="light"
                          size={14}
                          color="#1A1A1A"
                          className="w-[45%]"
                        >
                          Store Address
                        </AppText>
                        <span className="grow w-[55%]">
                          <AppText
                            smallText
                            weight="semibold"
                            size={14}
                            color="#1A1A1A"
                            align="left"
                          >
                            {selectedStore?.address ||
                              Avendor?.vendor?.stores[0]?.address}
                          </AppText>
                        </span>
                      </li>
                      <li className="flex justify-between gap-2">
                        <AppText
                          smallText
                          weight="light"
                          size={14}
                          color="#1A1A1A"
                          className="w-[45%]"
                        >
                          Date Created
                        </AppText>

                        <AppText
                          smallText
                          weight="semibold"
                          size={14}
                          color="#1A1A1A"
                          align="left"
                          className="grow w-[55%]"
                        >
                          {selectedStore?.createdAt ||
                          Avendor?.vendor?.stores[0]?.createdAt
                            ? format(
                                selectedStore?.createdAt ||
                                  Avendor?.vendor?.stores[0]?.createdAt,
                                "dd/MM/yyyy"
                              )
                            : "N/A"}
                        </AppText>
                      </li>
                      <li className="flex justify-between gap-2">
                        <AppText
                          smallText
                          weight="light"
                          size={14}
                          color="#1A1A1A"
                          className="w-[45%]"
                        >
                          Contact email
                        </AppText>

                        <AppText
                          smallText
                          weight="semibold"
                          size={14}
                          color="#1A1A1A"
                          align="left"
                          className="grow w-[55%]"
                        >
                          {selectedStore?.email ||
                            Avendor?.vendor?.stores[0]?.email}
                        </AppText>
                      </li>
                      <li className="flex justify-between gap-2">
                        <AppText
                          smallText
                          weight="light"
                          size={14}
                          color="#1A1A1A"
                          className="w-[45%]"
                        >
                          Store ID
                        </AppText>
                        <span className="grow flex flex-row gap-2 w-[55%]">
                          <AppText
                            smallText
                            weight="semibold"
                            size={14}
                            color="#1A1A1A"
                            align="left"
                            className="lg:hidden"
                          >
                            #
                            {truncateText(
                              selectedStore?.id ||
                                Avendor?.vendor?.stores[0]?.id,
                              15
                            )}
                          </AppText>
                          <AppText
                            smallText
                            weight="semibold"
                            size={14}
                            color="#1A1A1A"
                            align="left"
                            className="hidden lg:block"
                          >
                            #
                            {selectedStore?.id ||
                              Avendor?.vendor?.stores[0]?.id}
                          </AppText>
                          <span className=" w-[15px] h-[16.67px] cursor-pointer flex-shrink-0">
                            <img
                              src={CopyIcon}
                              alt="shopImage.png"
                              className="object-contain w-full h-full"
                            />
                          </span>
                        </span>
                      </li>
                      {/* <li className="flex justify-between gap-2">
                      <AppText
                        smallText
                        weight="light"
                        size={14}
                        color="#1A1A1A"
                        className="w-[45%]"
                      >
                        Store Type
                      </AppText>

                      <AppText
                        smallText
                        weight="semibold"
                        size={14}
                        color="#1A1A1A"
                        align="left"
                        className="grow"
                      >
                        Supermarket
                      </AppText>
                    </li> */}
                      <li className="flex justify-between gap-2">
                        <AppText
                          smallText
                          weight="light"
                          size={14}
                          color="#1A1A1A"
                          className="w-[45%]"
                        >
                          Fulfillment Option
                        </AppText>

                        <AppText
                          smallText
                          weight="semibold"
                          size={14}
                          color="#1A1A1A"
                          align="left"
                          className="grow w-[55%]"
                        >
                          {selectedStore?.fulfillmentOption === "both" ||
                          Avendor?.vendor?.stores[0]?.fulfillmentOption ===
                            "both"
                            ? "Delivery & Pick-up"
                            : selectedStore?.fulfillmentOption === "pick_up" ||
                              Avendor?.vendor?.stores[0]?.fulfillmentOption ===
                                "pick_up"
                            ? "Pick up"
                            : "Delivery"}
                        </AppText>
                      </li>
                      {/* <li className="flex justify-between gap-2">
                      <AppText
                        smallText
                        weight="light"
                        size={14}
                        color="#1A1A1A"
                        className="w-[45%]"
                      >
                        Working Days & Times
                      </AppText>
                      <span className="grow">
                        <AppText
                          smallText
                          weight="semibold"
                          size={14}
                          color="#1A1A1A"
                          align="left"
                        >
                          Monday - Friday (8:30AM - 10:00PM)
                          <br />
                          Monday - Saturday (8:30AM - 10:00PM)
                        </AppText>
                      </span>
                    </li> */}
                      {/* <li className="flex justify-between gap-2">
                        <AppText
                          smallText
                          weight="light"
                          size={14}
                          color="#1A1A1A"
                          className="w-[45%]"
                        >
                          Payment Info
                        </AppText>
                        <span className="grow">
                          <AppText
                            smallText
                            weight="semibold"
                            size={14}
                            color="#1A1A1A"
                            align="left"
                          >
                            Access Bank (Shoprite Lekki NG)
                            <br />
                            00123456789
                          </AppText>
                        </span>
                      </li> */}
                      <li className="flex justify-between gap-2">
                        <AppText
                          smallText
                          weight="light"
                          size={14}
                          color="#1A1A1A"
                          className="w-[45%]"
                        >
                          Store Status
                        </AppText>
                        <span className="grow m-0 p-0">
                          <AppText
                            smallText
                            weight="medium"
                            size={14}
                            color="#FFFFFF"
                            align="center"
                            className={cn(
                              " text-white px-[6px] py-1 rounded ",
                              statusColors[
                                (selectedStore?.status ||
                                  Avendor?.vendor?.stores[0]
                                    ?.status) as keyof typeof statusColors
                              ]
                            )}
                            transform="capitalize"
                          >
                            {selectedStore?.status ||
                              Avendor?.vendor?.stores[0]?.status}
                          </AppText>
                        </span>
                      </li>
                    </ul>
                  </div>

                  {!catError &&
                    !loadingCat &&
                    category?.categories?.length > 0 && (
                      <div className="w-full h-full space-y-5">
                        <div className="bg-white p-4 rounded-[4px] md:rounded-[10px] xl:rounded-[16px] flex  flex-col gap-y-6 mt-16 ">
                          <div className="flex justify-between items-center ">
                            <AppText
                              color="#111827"
                              smallText
                              weight="semibold"
                              size={20}
                            >
                              Store Product Details
                            </AppText>
                          </div>

                          {/* Table */}
                          <div className="overflow-auto no-scrollbar">
                            <div className="min-w-max">
                              <table className="min-w-full text-sm ">
                                <thead className="bg-[#F3F4F7]">
                                  <tr className="text-left ">
                                    {/* <th className="px-4 py-3">
                              <Checkbox className="border-[1.5px] border-[#6F767E66] rounded-[4px] data-[state=checked]:bg-[#036600] data-[state=checked]:border-[#036600] w-5 h-5" />
                            </th> */}
                                    <th className="px-4 py-3">
                                      <AppText
                                        color="#1A1A1A"
                                        smallText
                                        weight="light"
                                        size={16}
                                      >
                                        Product Category
                                      </AppText>
                                    </th>
                                    <th className="px-4 py-3">
                                      <AppText
                                        color="#1A1A1A"
                                        smallText
                                        weight="light"
                                        size={16}
                                      >
                                        Category Type
                                      </AppText>
                                    </th>
                                    {/* <th className="px-4 py-3">
                            <AppText
                              color="#1A1A1A"
                              smallText
                              weight="light"
                              size={16}
                            >
                              Total Price
                            </AppText>
                          </th>
                          <th className="px-4 py-3">
                            <AppText
                              color="#1A1A1A"
                              smallText
                              weight="light"
                              size={16}
                            >
                              Last Updated
                            </AppText>
                          </th> */}
                                  </tr>
                                </thead>

                                <tbody className="divide-y">
                                  {category?.categories &&
                                    category?.categories?.map(
                                      (item: any, index: number) => (
                                        <tr
                                          key={index}
                                          className="hover:bg-muted/50 cursor-pointer"
                                          onClick={() => {
                                            navigate("/vendor-products", {
                                              state: { catId: item?.id },
                                            });
                                          }}
                                        >
                                          {/* <td className="px-4 py-3">
                                    <Checkbox className="border-[1.5px] border-[#6F767E66] rounded-[4px] data-[state=checked]:bg-[#036600] data-[state=checked]:border-[#036600] w-5 h-5"
                                     onClick={(e) => e.stopPropagation()}
                                    />
                                  </td> */}
                                          <td className="px-4 py-3">
                                            <AppText
                                              color="#1A1A1A"
                                              smallText
                                              weight="light"
                                              size={14}
                                            >
                                              {item?.name}
                                            </AppText>
                                          </td>
                                          <td className="px-4 py-3">
                                            <AppText
                                              color="#1A1A1A"
                                              smallText
                                              weight="light"
                                              size={14}
                                            >
                                              {item?.type}
                                            </AppText>
                                          </td>
                                          {/* <td className="px-4 py-3">
                                <AppText
                                  color="#1A1A1A"
                                  smallText
                                  weight="light"
                                  size={14}
                                >
                                  {item?.total}
                                </AppText>
                              </td>
                              <td className="px-4 py-3">
                                <AppText
                                  color="#1A1A1A"
                                  smallText
                                  weight="light"
                                  size={14}
                                >
                                  {item?.last_update}
                                </AppText>
                              </td> */}
                                        </tr>
                                      )
                                    )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-[150px] md:h-[250px] lg:h-[320px] xl:h-[480px] grid place-items-center">
              <AppText>Oops sorry an error occurred...</AppText>
            </div>
          )}

          {selectedStore?.status === "pending" ||
            (Avendor?.vendor?.stores[0]?.status === "pending" && (
              <div className="mt-8 flex flex-col lg:flex-row justify-center gap-4">
                <span className="min-w-[140px]">
                  <AppButton
                    text="Approve"
                    fullWidth
                    textColor="#1A1A1A"
                    borderRad={24}
                    bg="#E2E8F0"
                    py={12}
                    px={16}
                    className="shadow hover:opacity-[0.7]"
                    onClick={() => {
                      handleAprroveStore();
                    }}
                    loading={approveLoading}
                  />
                </span>
                <span className="min-w-[140px]">
                  <AppButton
                    text="Reject"
                    fullWidth
                    textColor="#FFFFFF"
                    borderRad={24}
                    bg="#D82C0D"
                    py={12}
                    px={16}
                    className="shadow hover:opacity-[0.7]"
                    onClick={() => {
                      setReject(true);
                    }}
                    // loading={rejectLoading}
                  />
                </span>
                {/* <Button variant="outline">Approve</Button> */}
                {/* <Button variant="destructive">Reject</Button> */}
              </div>
            ))}
        </div>
      )}

      {reject && (
        <RejectionModal
          open={reject}
          onClose={() => setReject(false)}
          rejectReason={rejectReason}
          setRejectReason={setRejectReason}
          handleRejectStore={handleRejectStore}
          rejectLoading={rejectLoading}
        />
      )}
      {/* Action Buttons */}
    </div>
  );
}
