import React, { useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import AppText from "./appText";

const Pagination = ({
  totalPages,
  currentPage,
  handlePagechange,
  totalItems,
}: any) => {
  const changePage = (page: any) => {
    if (page >= 1 && page <= totalPages) {
      handlePagechange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            className={`  min-w-[33px]  h-[33px] xl:min-w-[40px] xl:h-[40px] xl:text-sm text-xs cursor-pointer ${
              currentPage === i ? "border border-[#036600]  rounded-[8px]" : " "
            }`}
            onClick={() => changePage(i)}
          >
            <AppText smallText size={14} color={currentPage === i ? "#036600" : "#1A1A1A"} weight="medium" align="center">{i}</AppText>
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages?.push(
          <span
            key={i}
            className="text-[#1A1A1A] min-w-[33px]  h-[33px] xl:min-w-[40px] xl:h-[40px] text-center rounded-[4px] cursor-pointer"
          >
            ...
          </span>
        );
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center space-x-4">
      {/* <span className="text-[#111111] font-medium xl:text-sm text-xs">Page {currentPage} of {totalPages}</span> */}
      <button
        className={`rounded-[4px] w-[25px] h-[25px] xl:w-[32px] xl:h-[32px]  flex justify-center items-center ${
          currentPage === 1 ? " cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <MdArrowBackIos
          size={14}
          color={currentPage === 1 ? "#9CA3AF" : "black"}
        />
      </button>
      {renderPageNumbers()}
      <button
        className={`w-[25px] h-[25px] xl:w-[32px] xl:h-[32px]  flex justify-center items-center rounded-[4px]  ${
          currentPage === totalPages ? "cursor-not-allowed" : " cursor-pointer"
        }`}
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <MdArrowForwardIos
          size={14}
          color={currentPage === totalPages ? "#9CA3AF" : "black"}
        />
      </button>
      {/* <p className="text-[#111111] font-medium xl:text-sm text-xs md:block hidden">Total : {totalItems}</p> */}
    </div>
  );
};

export default Pagination;
