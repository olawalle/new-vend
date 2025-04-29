import React from "react";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { Badge } from "~/components/ui/badge";
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
import UsersIcon from "~/assets/icons/UsersIcon";
import AppText from "~/compo/appText";
import { TbFilter } from "react-icons/tb";
import AppButton from "~/compo/button";
import FilterDropdown from "~/compo/filter";
import { Checkbox } from "~/components/ui/checkbox";
import { cn } from "~/lib/utils";
import Pagination from "~/compo/pagination";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "~/components/ui/dialog";
import { IoClose } from "react-icons/io5";
import { Textarea } from "~/components/ui/textarea";

const data = [
  {
    name: "Emma Watson",
    email: "jaysky4@gmail.com",
    phone: "09012345678",
    vendorId: "#VD98012",
    dateJoined: "11/01/2025",
    status: "Pending",
  },
  {
    name: "Emma Watson James",
    email: "jayskylord4@gmail.com",
    phone: "09012345678",
    vendorId: "#VD98012",
    dateJoined: "11/01/2025",
    status: "Approved",
  },
  {
    name: "Emma Watson James",
    email: "jayskylord4@gmail.com",
    phone: "09012345678",
    vendorId: "#VD98012",
    dateJoined: "11/01/2025",
    status: "Rejected",
  },
];

const statusColors = {
  Pending: "bg-[#E07B39] ",
  Approved: "bg-[#3A8E42]",
  Rejected: "bg-[#B33A3A]",
  Active: "bg-[#3A8E42]",
};

export default function VendorList() {
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalItems, setTotalItems] = React.useState(20);
  const [pageSize, setPageSize] = React.useState(10);
  const navigate = useNavigate();
  const handlePagechange = (num: any) => {
    console.log(num);

    setCurrentPage(num);
    // const filter = createFilterObject();
    // const queryParams = createQueryParams(filter);
    // const pageFilters = `?page=${num}${
    //   admin ? "&role=admin&limit=20" : "&limit=20"
    // }`;
    // const allFilters = `?page=${num}&${queryParams}${
    //   admin ? "&role=admin&limit=20" : "&limit=20"
    // }`;
    // const searchFilter = `?page=${num}&${searchChoice?.id}=${searchText}${
    //   admin ? "&role=admin" : "&limit=20"
    // }`;

    // if (applyFilter) {
    //   getAllUsersMutation.mutate(allFilters);
    //   setLoading(true);
    // } else if (searchText !== "") {
    //   getAllUsersMutation.mutate(searchFilter);
    //   setLoading(true);
    // } else {
    //   getAllUsersMutation.mutate(pageFilters);
    //   setLoading(true);
    // }
  };

  const [blockReason, setBlockReason] = React.useState("");

  const [open, setOpen] = useState(false);

  return (
    <div className="px-2  space-y-5">
      <span className="flex justify-between items-center gap-4 xl:hidden w-full">
        <span className="relative flex items-center bg-white grow w-auto">
          <Search
            className="absolute w-[19px] h-[19px] left-2"
            color="#6F767E"
          />
          <Input
            placeholder="Search"
            className=" h-10  rounded-[4px] px-7 text-[#1A1A1A] text-[15px] grow w-auto"
          />
        </span>
        <div className="flex items-center gap-3">
          <FilterDropdown />
        </div>
      </span>
      {/* Metrics */}
      {/* <span className="mt-16"> */}
      <AppText weight="semibold" smallText size={24} color="#1E2134">
        Metrics
      </AppText>
      {/* </span> */}
      <div className="grid grid-cols-2 md:grid-cols-3  lg:gap-3 xl:gap-4 gap-2 mt-6">
        {["Total Users", "Active Users", "Inactive Users"].map(
          (label, index) => (
            <div
              key={label}
              className="bg-white lg:rounded-[8px] rounded-[3.72px] md:rounded-[6px] lg:shadow px-2 py-4 lg:px-4 lg:py-6 lg:space-y-1 flex flex-row items-center gap-2 lg:gap-4"
            >
              {/* <div className="flex items-center space-x-2"> */}
              <div
                className={`w-[32px] h-[32px] md:w-[55px] md:h-[55px] lg:w-[75px] lg:h-[75px] lg:rounded-[11px] rounded-[4.69px] md:rounded-[7px]  flex items-center justify-center ${
                  index === 0
                    ? "bg-[#4BCC0026]"
                    : index === 1
                    ? "bg-[#39C27226]"
                    : "bg-[#4785BB26]"
                }`}
              >
                <UsersIcon
                  color={index === 2 ? "#4785BB" : "#036600"}
                  className="w-[17px] md:w-[30px] lg:w-[40px]"
                />
              </div>
              {/* </div> */}
              <div className="flex flex-col lg:gap-y-3 md:gap-y-2 gap-y-1">
                {/* <p className="font-medium text-sm text-gray-600">{label}</p> */}
                <AppText
                  weight="medium"
                  color="#545454"
                  smallText
                  className="text-[11px] md:text-xs lg:text-sm"
                >
                  {label}
                </AppText>
                <AppText
                  weight="bold"
                  smallText
                  className="text-base md:text-lg lg:text-2xl"
                >
                  355,560,000
                </AppText>
                {/* <p className="text-xl font-semibold text-gray-800">34,560</p> */}
              </div>
            </div>
          )
        )}
      </div>

      {/* Table Controls */}
      <div className="bg-white p-4 rounded-[4px] md:rounded-[10px] lg:rounded-[16px] flex  flex-col gap-y-6 mt-16 ">
        <div className="flex justify-between items-center ">
          <AppText color="#111827" smallText weight="semibold" size={20}>
            Customer List
          </AppText>

          <span className="flex justify-between items-center gap-4">
            <span className="relative  items-center hidden xl:flex">
              <Search
                className="absolute w-[19px] h-[19px] left-2"
                color="#6F767E"
              />
              <Input
                placeholder="Search"
                className="w-[384px] rounded-[4px] px-7 text-[#1A1A1A] text-[15px]"
              />
            </span>
            <div className="flex items-center gap-3">
              <span className="hidden xl:flex">
                <FilterDropdown />
              </span>
              {/* <AppButton
                // variant="outline"
                className="border  border-[#EAEAEA] flex flex-row"
                outline
                icon={<TbFilter className=" mr-2" size={23} />}
                borderColor="#EAEAEA"
                px={14}
                py={6}
                borderRad={4}
                // size={"lg"}
              >
                

                <AppText size={15} weight="light" smallText color="#1A1A1A">
                  Filter
                </AppText>
              </AppButton> */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="outline-0">
                  <AppButton
                    text="Download report"
                    fullWidth
                    textColor="white"
                    borderRad={4}
                    py={8}
                    px={12}
                    className="min-w-[145px]"
                    bg="#036600"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>PDF</DropdownMenuItem>
                  <DropdownMenuItem>Excel</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </span>
        </div>

        {/* Table */}
        <div className="overflow-auto no-scrollbar">
          <div className="min-w-max">
            <table className="min-w-full text-sm">
              <thead className="bg-[#F3F4F7]">
                <tr className="text-left ">
                  <th className="px-4 py-3">
                    <Checkbox className="border-[1.5px] border-[#6F767E66] rounded-[4px] data-[state=checked]:bg-[#036600] data-[state=checked]:border-[#036600] w-5 h-5" />
                  </th>
                  <th className="px-4 py-3">
                    <AppText color="#1A1A1A" smallText weight="light" size={16}>
                      Name
                    </AppText>
                  </th>
                  <th className="px-4 py-3">
                    <AppText color="#1A1A1A" smallText weight="light" size={16}>
                      Email
                    </AppText>
                  </th>
                  <th className="px-4 py-3">
                    <AppText color="#1A1A1A" smallText weight="light" size={16}>
                      Phone no.
                    </AppText>
                  </th>
                  <th className="px-4 py-3">
                    <AppText color="#1A1A1A" smallText weight="light" size={16}>
                      User ID
                    </AppText>
                  </th>
                  <th className="px-4 py-3">
                    <AppText color="#1A1A1A" smallText weight="light" size={16}>
                      Joined
                    </AppText>
                  </th>
                  <th className="px-4 py-3">
                    <AppText color="#1A1A1A" smallText weight="light" size={16}>
                      Status
                    </AppText>
                  </th>
                  <th className="px-4 py-3">
                    <AppText color="#1A1A1A" smallText weight="light" size={16}>
                      Action
                    </AppText>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-muted/50 cursor-pointer"
                    // onClick={() => {
                    //   navigate("/vendors-details", {});
                    // }}
                  >
                    <td className="px-4 py-3">
                      <Checkbox className="border-[1.5px] border-[#6F767E66] rounded-[4px] data-[state=checked]:bg-[#036600] data-[state=checked]:border-[#036600] w-5 h-5" />
                    </td>
                    <td className="px-4 py-3">
                      <AppText
                        color="#1A1A1A"
                        smallText
                        weight="light"
                        size={14}
                      >
                        {item.name}
                      </AppText>
                    </td>
                    <td className="px-4 py-3">
                      <AppText
                        color="#1A1A1A"
                        smallText
                        weight="light"
                        size={14}
                      >
                        {item.email}
                      </AppText>
                    </td>
                    <td className="px-4 py-3">
                      <AppText
                        color="#1A1A1A"
                        smallText
                        weight="light"
                        size={14}
                      >
                        {item.phone}
                      </AppText>
                    </td>
                    <td className="px-4 py-3">
                      <AppText
                        color="#1A1A1A"
                        smallText
                        weight="light"
                        size={14}
                      >
                        {item.vendorId}
                      </AppText>
                    </td>
                    <td className="px-4 py-3">
                      <AppText
                        color="#1A1A1A"
                        smallText
                        weight="light"
                        size={14}
                      >
                        {item.dateJoined}
                      </AppText>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "px-2 py-1 rounded-[4px]",
                          statusColors[item.status as keyof typeof statusColors]
                        )}
                      >
                        <AppText
                          color="#FFFFFF"
                          smallText
                          weight="light"
                          size={14}
                        >
                          {item.status}
                        </AppText>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger asChild className="outline-0">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 p-0 text-muted-foreground cursor-pointer"
                            >
                              <MoreHorizontal
                                className="h-4 w-4"
                                color="#000000"
                              />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent className="p-1 rounded-[6px]">
                            <DropdownMenuItem
                              className="flex flex-row gap-2 hover:bg-[#0366000D] cursor-pointer"
                              // onSelect={() => {
                              //   navigate("/vendors-details", {});
                              // }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {/* <span> */}
                              <Eye className="h-5 w-5" color="#545454" />
                              <AppText
                                color="#545454"
                                weight="medium"
                                size={14}
                                smallText
                              >
                                View
                              </AppText>
                              {/* </span> */}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex flex-row gap-2 hover:bg-[#0366000D] cursor-pointer"
                              onSelect={(event) => {
                                event.preventDefault();
                                setOpen(true);
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {/* <span> */}
                              <CircleX className="h-5 w-5" color="#545454" />
                              <AppText
                                color="#545454"
                                weight="medium"
                                size={14}
                                smallText
                              >
                                Block
                              </AppText>
                              {/* </span> */}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <DialogContent className="max-w-md bg-[#FFFFFF] rounded-[16px] [&>button]:hidden p-0 m-0 w-[90%] lg:w-auto">
                          <DialogHeader className="text-left">
                            <DialogTitle className="flex flex-row justify-between lg:px-[30px] px-[14px] py-4">
                              <span className="w-[80%]">
                                <AppText
                                  smallText
                                  weight="bold"
                                  color="#1A1A1A"
                                  align="left"
                                   className="text-base md:text-lg lg:text-[26px]"
                                >
                                  Are you sure you want to block this user?
                                </AppText>
                              </span>
                              <DialogClose className="outline-0">
                                <span
                                  className="h-10 w-10 bg-[#0366000D] rounded-[25px] flex flex-row items-center justify-center cursor-pointer"
                                  onClick={() => {
                                    setOpen(false);
                                  }}
                                >
                                  <IoClose size={20} />
                                </span>
                              </DialogClose>
                            </DialogTitle>
                            <div className="w-full h-[1px] bg-[#ECEBF5]" />
                            <DialogDescription className="lg:px-[30px] px-[14px] pt-3">
                              <AppText
                                smallText
                                size={16}
                                weight="light"
                                color="#1A1A1A"
                              >
                                Kindly state the reason for blocking this user
                              </AppText>
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-3 pt-2 lg:px-[30px] px-[14px]">
                            {[
                              "Violation of Terms of Service",
                              "Suspicious Activity",
                              "Non-Payment Issues",
                              "Abuse or Misconduct",
                              "Requested by Customer",
                              "Others",
                            ].map((reason) => (
                              <label
                                key={reason}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <Checkbox
                                  className="border-[1.5px] border-[#6F767E66] rounded-[4px] data-[state=checked]:bg-[#036600] data-[state=checked]:border-[#036600] w-5 h-5 cursor-pointer"
                                  checked={reason === blockReason}
                                  onCheckedChange={() => setBlockReason(reason)}
                                />
                                <AppText
                                  smallText
                                  size={14}
                                  weight="light"
                                  color="#1A1A1A"
                                >
                                  {reason}
                                </AppText>
                                {/* <span>{reason}</span> */}
                              </label>
                            ))}
                            {blockReason === "Others" && (
                              <Textarea
                                placeholder="Enter text here"
                                className="w-full h-[126px] border border-[#114A45] rounded-[8px] text-[13px] p-3 focus:outline-0 focus:shadow-none bg-[#F3F4F7] text-[#545454]"
                              />
                            )}
                          </div>

                          <DialogFooter className="mt-4 mb-6 sm:justify-center flex flex-row justify-center lg:px-[30px] px-[14px]">
                          <div className="w-[100%] lg:w-[90%]">
                              <AppButton
                                text="Block User"
                                fullWidth
                                textColor="white"
                                onClick={() => {
                                  setOpen(false);
                                }}
                                py={14}
                                bg="#036600"
                              />
                            </div>
                            {/* <button
                              className="bg-muted text-black px-4 py-2 rounded-md"
                              onClick={() => setOpen(false)}
                            >
                              Block User
                            </button> */}
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col lg:flex-row  justify-between items-center text-sm">
        <div className="flex flex-row items-center gap-3">
          <AppText color="#1A1A1A" smallText weight="light" size={14}>
            Showing 1 to 10 of 52
          </AppText>
          <div className="h-[30px] w-[0.5px] bg-[#000000CC]" />
          <div className="flex flex-row gap-3 items-center">
            <AppText color="#1A1A1A" smallText weight="light" size={14}>
              Go to:
            </AppText>
            <Input
              placeholder=""
              className="w-[40px] h-[40px] border border-[#114A45] rounded-[8px] p-2 text-[#1A1A1A] text-[13px]"
            />
          </div>
        </div>
        <div className=" py-2 px-2 mt-3 lg:my-0">
          <Pagination
            totalPages={Math.ceil(totalItems / pageSize)}
            handlePagechange={handlePagechange}
            currentPage={currentPage}
            totalItems={totalItems}
          />
        </div>
      </div>
    </div>
  );
}
