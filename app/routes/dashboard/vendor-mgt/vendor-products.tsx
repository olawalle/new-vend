import React from "react";
import { Button } from "~/components/ui/button";
import { BadgeCheck, ArrowLeft } from "lucide-react";
import AppText from "~/compo/appText";
import ShopImage from "../../../assets/form.png";
import CopyIcon from "../../../assets/copy.svg";
import ShopLogo from "../../../assets/store-logo.svg";
import AppButton from "~/compo/button";
import { useNavigate } from "react-router";
import { getAVendor, getProdsByCategories } from "~/service/authService";
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
import ShirtSm from "~/assets/shirt-sm.png";
import { ProductDetailsModal } from "~/compo/ProductDetailsModal";

const data = [
  {
    id: 1,
    name: "Classic Denim Jacket",
    image: "../../../assets/shirt-sm.png",
    price: "₦50,000",
    category: "James Watson",
    stock: 30,
    description: "Size 45 Denim Jacket",
    status: "Published",
  },
];

export default function VendorDetails() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // this goes back one step in history
  };

  const { state } = useLocation();
  // console.log(state?.vendorId, "id");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalItems, setTotalItems] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(0);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const [filter, setFilter] = React.useState({
    id: state?.catId,
    filters: {
      page: currentPage,
    },
  });
  // const [currentData, setCurrentData] = React.useState<any>([]);

  const {
    data: currentData = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["products", filter],
    queryFn: () => getProdsByCategories(filter),
    retry: 3,
    enabled: !!filter, // optional: prevent query on initial mount if filters are empty
  });

  const statusColors = {
    pending: "bg-[#E07B39] ",
    approved: "bg-[#3A8E42]",
    rejected: "bg-[#B33A3A]",
    deleted: "bg-[#B33A3A]",
    active: "bg-[#3A8E42]",
    live: "bg-[#3A8E42]",
  };

  const storeList = [
    {
      name: "Shoprite NG, Lekki",
      address: "Lekki Shop 231, Mile 12, Lagos Nigeria",
      status: "Active",
      value: true,
    },
    {
      name: "Shoprite NG, VI",
      address: "Lekki Shop 231, Mile 12, Lagos Nigeria",
      status: "Active",
    },
    {
      name: "Shoprite NG, Ajah",
      address: "Lekki Shop 231, Mile 12, Lagos Nigeria",
      status: "Active",
    },
    {
      name: "Shoprite NG, Eleganza",
      address: "Lekki Shop 231, Mile 12, Lagos Nigeria",
      status: "Active",
    },
  ];

  const handlePagechange = (num: any) => {
    setFilter((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        page: num,
      },
    }));
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
          {!isError ? (
            <div className="w-full h-full space-y-5">
              <div className="bg-white p-4 rounded-[4px] md:rounded-[10px] xl:rounded-[16px] flex  flex-col gap-y-6 mt-16 ">
                <div className="flex flex-row gap-x-2 items-center ">
                  <AppText
                    color="#111827"
                    smallText
                    weight="semibold"
                    size={20}
                  >
                    Catergory:
                  </AppText>
                  <AppText
                    color="#111827"
                    smallText
                    weight="light"
                    size={20}
                    className="hidden lg:block"
                  >
                    {currentData?.categoryWithProducts?.name}
                  </AppText>
                </div>

                {/* Table */}
                {!isLoading && (
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
                                Image
                              </AppText>
                            </th>
                            <th className="px-4 py-3">
                              <AppText
                                color="#1A1A1A"
                                smallText
                                weight="light"
                                size={16}
                              >
                                Product Name
                              </AppText>
                            </th>
                            <th className="px-4 py-3">
                              <AppText
                                color="#1A1A1A"
                                smallText
                                weight="light"
                                size={16}
                              >
                                Price
                              </AppText>
                            </th>
                            <th className="px-4 py-3">
                              <AppText
                                color="#1A1A1A"
                                smallText
                                weight="light"
                                size={16}
                              >
                                Stock Details
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

                            <th className="px-4 py-3">
                              <AppText
                                color="#1A1A1A"
                                smallText
                                weight="light"
                                size={16}
                              >
                                Last Updated
                              </AppText>
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y">
                          {currentData &&
                            currentData?.categoryWithProducts?.products?.map(
                              (item: any, index: number) => (
                                <tr
                                  key={index}
                                  className="hover:bg-muted/50 cursor-pointer w-full border"
                                  onClick={() => setSelectedProduct(item)}
                                >
                                  {/* <td className="px-4 py-3">
                                     <Checkbox className="border-[1.5px] border-[#6F767E66] rounded-[4px] data-[state=checked]:bg-[#036600] data-[state=checked]:border-[#036600] w-5 h-5"
                                      onClick={(e) => e.stopPropagation()}
                                     />
                                   </td> */}
                                  <td className="px-4 py-3">
                                    <div className=" bg-[#F2F7F2] rounded-full px-2 py-2 flex-row flex justify-center items-center 2xl:w-[48px] 2xl:h-[48px] xl:w-[45px] xl:h-[45px] lg:w-[40px] lg:h-[40px] md:w-[38px] md:h-[38px] w-[33px] h-[33px]">
                                      <img
                                        src={item?.images[0]?.url}
                                        alt={`${item?.name}.png`}
                                        className="w-[90%] h-[90%] object-contain"
                                      />
                                    </div>
                                  </td>
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
                                      ₦{item?.price}
                                    </AppText>
                                  </td>
                                  <td className="px-4 py-3">
                                    <AppText
                                      weight="light"
                                      size={14}
                                      align="center"
                                      color={
                                        parseInt(item?.stock || "0", 10) >
                                        parseInt(item?.minStockLevel || "0", 10)
                                          ? "#27AE60"
                                          : "#F04D58"
                                      }
                                      smallText
                                    >
                                      {parseInt(item?.stock || "0", 10) >
                                      parseInt(item?.minStockLevel || "0", 10)
                                        ? "In Stock"
                                        : "Out of Stock"}
                                    </AppText>
                                  </td>

                                  <td className="px-4 py-3">
                                    <AppText
                                      color="#1A1A1A"
                                      smallText
                                      weight="light"
                                      size={14}
                                      transform="capitalize"
                                    >
                                      {item?.status}
                                    </AppText>
                                  </td>

                                  <td className="px-4 py-3">
                                    <AppText
                                      color="#1A1A1A"
                                      smallText
                                      weight="light"
                                      size={14}
                                      transform="capitalize"
                                    >
                                      {item?.updatedAt
                                        ? format(item?.updatedAt, "dd/MM/yyyy")
                                        : "N/A"}
                                    </AppText>
                                  </td>
                                </tr>
                              )
                            )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {!isLoading &&
                  currentData?.categoryWithProducts?.products === 0 && (
                    <div className="w-full h-[150px] md:h-[250px] lg:h-[320px] xl:h-[480px] grid place-items-center">
                      <AppText>Oops no product was found...</AppText>
                    </div>
                  )}

                {isLoading && (
                  <div className="w-full h-[150px] md:h-[250px] lg:h-[320px] xl:h-[480px] grid place-items-center">
                    <AnimatedLoading />
                  </div>
                )}
              </div>

              {/* Pagination */}
              {currentData?.categoryWithProducts?.products <= 10 && (
                <div className="flex flex-col lg:flex-row justify-between items-center text-sm">
                  <div className="flex flex-row items-center gap-3">
                    <AppText color="#1A1A1A" smallText weight="light" size={14}>
                      Showing 1 to 10 of 52
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

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
