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
import { useQuery, useMutation } from "@tanstack/react-query";
import { getVendors } from "~/service/authService";
import AnimatedLoading from "~/compo/AnimatedLoading";
import { format } from "date-fns";

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
  pending: "bg-[#E07B39] ",
  approved: "bg-[#3A8E42]",
  rejected: "bg-[#B33A3A]",
  deleted: "bg-[#B33A3A]",
  active: "bg-[#3A8E42]",
};

export default function VendorList() {
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalItems, setTotalItems] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [tableLoading, setTableLoading] = React.useState<boolean>(false);
  const [filters, setFilters] = useState({
    dateTo: null,
    dateFrom: null,
    status: "",
    page: currentPage,
    format: "",
    onboardingComplete: "",
  });
  // const [currentData, setCurrentData] = React.useState<any>([]);

  const {
    data: currentData = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["vendors", filters],
    queryFn: () => getVendors(filters),
    retry: 3,
    enabled: !!filters, // optional: prevent query on initial mount if filters are empty
  });

  // const createFilterObject = () => {
  //   const filter: Partial<FormState> = {};

  //   Object.keys(formState).forEach((key) => {
  //     if (formState[key] !== "") {
  //       filter[key] = formState[key];
  //     }
  //   });

  //   return filter;
  // };
  // const toQueryString = (options: OptionsType): string[] => {
  //   return Object.entries(options)
  //     .filter(([_, value]) => value) // Only keep entries with value === true
  //     .map(([key]) => `fieldsToExport[]=${key}`); // Return only the keys
  // };

  // const createQueryParams = (filter: Record<string, string>): string => {
  //   const params = new URLSearchParams(filter).toString();
  //   return params;
  // };

  const handlePagechange = (num: any) => {
    console.log(num);

    // const filter = createFilterObject();
    // const queryParams = createQueryParams(filter);
    const pageFilters = `?page=${num}`;
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
    // getVendorsMutation.mutate(pageFilters);
    setFilters({ ...filters, page: num });
    // setTableLoading(true);
    // }
  };

  // const filters = "";
  React.useEffect(() => {
    if (isSuccess) {
      setCurrentPage(currentData?.page);
      setTotalItems(currentData?.totalCount);
      setPageSize(currentData?.limit);
      console.log(isError);
    }
  }, [isSuccess, currentData]);

  return (
    <>
      {loading ? (
        <div className="w-full h-full grid place-items-center">
          <AnimatedLoading />
        </div>
      ) : (
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
              <FilterDropdown filters={filters} setFilters={setFilters} />
            </div>
          </span>
          {/* Metrics */}
          {/* <span className="mt-16"> */}
          <AppText weight="semibold" smallText size={24} color="#1E2134">
            Metrics
          </AppText>
          {/* </span> */}
          <div className="grid grid-cols-2 md:grid-cols-3  lg:gap-3 xl:gap-4 gap-2 mt-6">
            {["Total Vendors", "Active Vendors", "Inactive Vendors"].map(
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
                      className="text-xs md:text-xs lg:text-sm"
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
          {!isError ? (
            <div className="w-full h-full space-y-5">
              <div className="bg-white p-4 rounded-[4px] md:rounded-[10px] xl:rounded-[16px] flex  flex-col gap-y-6 mt-16 ">
                <div className="flex justify-between items-center ">
                  <AppText
                    color="#111827"
                    smallText
                    weight="semibold"
                    size={20}
                  >
                    Vendor List
                  </AppText>

                  <span className=" flex justify-between items-center gap-4 ">
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
                        <FilterDropdown
                          filters={filters}
                          setFilters={setFilters}
                        />
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
                            className="min-w-[140px]"
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
                {!isLoading && currentData?.vendors?.length > 0 && (
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
                                Name
                              </AppText>
                            </th>
                            <th className="px-4 py-3">
                              <AppText
                                color="#1A1A1A"
                                smallText
                                weight="light"
                                size={16}
                              >
                                Email
                              </AppText>
                            </th>
                            <th className="px-4 py-3">
                              <AppText
                                color="#1A1A1A"
                                smallText
                                weight="light"
                                size={16}
                              >
                                Phone no.
                              </AppText>
                            </th>
                            <th className="px-4 py-3">
                              <AppText
                                color="#1A1A1A"
                                smallText
                                weight="light"
                                size={16}
                              >
                                Vendor ID
                              </AppText>
                            </th>
                            <th className="px-4 py-3">
                              <AppText
                                color="#1A1A1A"
                                smallText
                                weight="light"
                                size={16}
                              >
                                Date Joined
                              </AppText>
                            </th>
                            <th className="px-4 py-3">
                              <AppText
                                color="#1A1A1A"
                                smallText
                                weight="light"
                                size={16}
                              >
                                Status
                              </AppText>
                            </th>
                            {/* <th className="px-4 py-3">
                              <AppText
                                color="#1A1A1A"
                                smallText
                                weight="light"
                                size={16}
                              >
                                Action
                              </AppText>
                            </th> */}
                          </tr>
                        </thead>

                        <tbody className="divide-y">
                          {currentData?.vendors &&
                            currentData?.vendors?.map(
                              (item: any, index: number) => (
                                <tr
                                  key={index}
                                  className={`hover:bg-muted/50 cursor-pointer ${
                                    item?.owner?.status === "deleted"
                                      ? "opacity-[60%]"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    navigate("/vendors-details", {
                                      state: { vendorId: item?.id },
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
                                      {item?.owner?.firstName}{" "}
                                      {item?.owner?.lastName}
                                    </AppText>
                                  </td>
                                  <td className="px-4 py-3">
                                    <AppText
                                      color="#1A1A1A"
                                      smallText
                                      weight="light"
                                      size={14}
                                    >
                                      {item?.owner?.email}
                                    </AppText>
                                  </td>
                                  <td className="px-4 py-3">
                                    <AppText
                                      color="#1A1A1A"
                                      smallText
                                      weight="light"
                                      size={14}
                                    >
                                      {item?.owner?.phone}
                                    </AppText>
                                  </td>
                                  <td className="px-4 py-3">
                                    <AppText
                                      color="#1A1A1A"
                                      smallText
                                      weight="light"
                                      size={14}
                                    >
                                      #{item?.ownerId}
                                    </AppText>
                                  </td>
                                  <td className="px-4 py-3">
                                    <AppText
                                      color="#1A1A1A"
                                      smallText
                                      weight="light"
                                      size={14}
                                    >
                                      {item?.createdAt
                                        ? format(item?.createdAt, "dd/MM/yyyy")
                                        : "N/A"}
                                    </AppText>
                                  </td>
                                  <td className="px-4 py-3">
                                    <span
                                      className={cn(
                                        "px-2 py-1 rounded-[4px]",
                                        statusColors[
                                          item?.owner
                                            ?.status as keyof typeof statusColors
                                        ]
                                      )}
                                    >
                                      <AppText
                                        color="#FFFFFF"
                                        smallText
                                        weight="light"
                                        size={14}
                                        transform="capitalize"
                                      >
                                        {item?.owner?.status}
                                      </AppText>
                                    </span>
                                  </td>
                                  {/* <td className="px-4 py-3">
                                    {item?.owner?.status === "pending" ? (
                                      <DropdownMenu>
                                        <DropdownMenuTrigger
                                          asChild
                                          className="outline-0"
                                        >
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
                                            <Eye
                                              className="h-5 w-5"
                                              color="#545454"
                                            />
                                            <AppText
                                              color="#545454"
                                              weight="medium"
                                              size={14}
                                              smallText
                                            >
                                              Approve
                                            </AppText>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                            className="flex flex-row gap-2 hover:bg-[#0366000D] cursor-pointer"
                                            onSelect={() => console.log("test")}
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            <CircleX
                                              className="h-5 w-5"
                                              color="#545454"
                                            />
                                            <AppText
                                              color="#545454"
                                              weight="medium"
                                              size={14}
                                              smallText
                                            >
                                              Reject
                                            </AppText>
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    ) : (
                                      <DropdownMenu>
                                        <DropdownMenuTrigger
                                          asChild
                                          className="outline-0"
                                        >
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
                                            onSelect={() => {
                                              navigate("/vendors-details", {
                                                state: { vendorId: item?.id },
                                              });
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            <Eye
                                              className="h-5 w-5"
                                              color="#545454"
                                            />
                                            <AppText
                                              color="#545454"
                                              weight="medium"
                                              size={14}
                                              smallText
                                            >
                                              View
                                            </AppText>
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    )}
                                  </td> */}
                                </tr>
                              )
                            )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {!isLoading && currentData?.vendors?.length === 0 && (
                  <div className="w-full h-[150px] md:h-[250px] lg:h-[320px] xl:h-[480px] grid place-items-center">
                    <AppText>Oops no vendor was found...</AppText>
                  </div>
                )}

                {isLoading && (
                  <div className="w-full h-[150px] md:h-[250px] lg:h-[320px] xl:h-[480px] grid place-items-center">
                    <AnimatedLoading />
                  </div>
                )}
              </div>

              {/* Pagination */}
              {currentData?.vendors?.length <= 10 && (
                <div className="flex flex-col lg:flex-row justify-between items-center text-sm">
                  <div className="flex flex-row items-center gap-3">
                    <AppText color="#1A1A1A" smallText weight="light" size={14}>
                      Showing 1 to 10 of {totalItems}
                    </AppText>
                    <div className="h-[30px] w-[0.5px] bg-[#000000CC]" />
                    <div className="flex flex-row gap-3 items-center">
                      <AppText
                        color="#1A1A1A"
                        smallText
                        weight="light"
                        size={14}
                      >
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
              )}
            </div>
          ) : (
            <div className="w-full h-[150px] md:h-[250px] lg:h-[320px] xl:h-[480px] grid place-items-center">
              <AppText>Oops sorry an error occurred...</AppText>
            </div>
          )}
        </div>
      )}
    </>
  );
}
