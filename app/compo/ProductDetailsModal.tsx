"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "~/components/ui/dialog";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import AppText from "./appText";
import ShirtSm from "~/assets/shirt-sm.png";

export function ProductDetailsModal({
  product,
  onClose,
}: {
  product: any;
  onClose: any;
}) {
  useEffect(() => {
    console.log(product, "djd");
    
  }, [product]);
  return (
    <Dialog open={!!product} onOpenChange={() => {}}>
      <DialogContent className="min-w-[90%] md:min-w-[80%] lg:min-w-[70%] 2xl:min-w-[56%] [&>button]:hidden overflow-y-scroll max-h-[80vh] no-scrollbar lg:px-[30px] px-[14px] py-4">
        <DialogHeader>
          <DialogTitle className="flex justify-end">
            <DialogClose className="outline-0">
              <span
                className="h-10 w-10 bg-[#0366000D] rounded-[25px] flex flex-row items-center justify-center cursor-pointer"
                onClick={() => {
                  onClose();
                }}
              >
                <IoClose size={20} />
              </span>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col xl:flex-row gap-6 grow">
          <div className="xl:w-[308px] xl:h-[249px] md:h-[240px]    w-full h-[200px]  bg-gray-100 rounded overflow-hidden flex items-center justify-center">
            <img
              src={product?.images[0]?.url}
              alt={product.name}
              className="object-contain w-[90%] h-[90%]"
            />
          </div>

          <div className="bg-[#FDFDFD] px-6 py-10 rounded-[6px]  h-fit  grow">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-6  bg-[#036600] rounded-[2px] " />
              <AppText smallText weight="semibold" size={20} color="#1A1A1A">
                Product Details
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
                  Product Name
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
                  {product?.name}
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
                  Price
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
                  ₦{product?.price || "N/A"}
                </AppText>

                {/* <span className="font-medium"></span> */}
              </li>
              {/* <li className="flex justify-between gap-2">
                <AppText
                  smallText
                  weight="light"
                  size={14}
                  color="#1A1A1A"
                  className="w-[45%]"
                >
                  Category
                </AppText>
                <AppText
                  smallText
                  weight="semibold"
                  size={14}
                  color="#1A1A1A"
                  align="left"
                  className="grow "
                >
                  {product?.price}
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
                  Stock Quantity
                </AppText>
                <AppText
                  smallText
                  weight="semibold"
                  size={14}
                  color="#1A1A1A"
                  align="left"
                  className="grow "
                >
                  {product?.stock}
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
                  Product description
                </AppText>
                <AppText
                  smallText
                  weight="semibold"
                  size={14}
                  color="#1A1A1A"
                  align="left"
                  className="grow "
                >
                  {product?.description || "N/A"}
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
                 SKU (if added)
                </AppText>
                <AppText
                  smallText
                  weight="semibold"
                  size={14}
                  color="#1A1A1A"
                  align="left"
                  className="grow "
                >
                   {product?.sku || "N/A"}
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
                Product Status
                </AppText>
                <AppText
                  smallText
                  weight="semibold"
                  size={14}
                  color="#1A1A1A"
                  align="left"
                  className="grow "
                  transform="capitalize"
                >
                   {product?.status || "N/A"}
                </AppText>
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
