"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "~/components/ui/dialog";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import AppText from "./appText";
import ShirtSm from "~/assets/shirt-sm.png";
import { Textarea } from "~/components/ui/textarea";
import AppButton from "./button";

export function RejectionModal({
  open,
  onClose,
  rejectReason,
  setRejectReason,
  handleRejectStore,
  rejectLoading,
}: {
  open: any;
  onClose: any;
  rejectReason: string;
  setRejectReason: any;
  handleRejectStore: any;
  rejectLoading:any
}) {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-md  [&>button]:hidden overflow-y-scroll  no-scrollbar lg:px-[30px] px-[14px] py-4">
        <DialogHeader>
          <DialogTitle className="flex flex-row justify-between">
            <span className="w-[80%]">
              <AppText
                smallText
                weight="bold"
                color="#1A1A1A"
                align="left"
                className="text-base md:text-lg lg:text-[26px]"
              >
                Reason for rejection
              </AppText>
            </span>
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
        <Textarea
          placeholder="Reason for rejection"
          className="w-full h-[126px] border border-[#114A45] rounded-[8px] text-[13px] p-3 focus:outline-0 focus:shadow-none bg-[#F3F4F7] text-[#545454]"
          onChange={(e:any) => {
            setRejectReason(e.target.value);
          }}
          value={rejectReason}
        />
        <DialogFooter className="mt-4 mb-6 sm:justify-center flex flex-row justify-center lg:px-[30px] px-[14px]">
          <div className="w-[100%] lg:w-[90%]">
            <AppButton
              text="Reject"
              fullWidth
              textColor="white"
              onClick={() => {
                handleRejectStore();
              }}
              py={14}
               bg="#D82C0D"
               loading={rejectLoading}
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
  );
}
