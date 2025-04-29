import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { Calendar, Filter } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Calendar as DatePicker } from "~/components/ui/calendar";
import { format } from "date-fns";
import { Checkbox } from "~/components/ui/checkbox";
import AppButton from "./button";
import AppText from "./appText";

export default function FilterDropdown({ filters, setFilters }: any) {
  const statusFilters = ["active", "pending", "inactive", "blocked"];

  const [selStatus, setSelStatus] = React.useState("");

  const [startDate, setStartDate] = React.useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const [open, setOpen] = useState(false);
  // const calendarRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    console.log("start:", startDate, "end:", endDate);
  }, [startDate, endDate]);

  // React.useEffect(() => {
  //   console.log(open);
  // }, [open]);

  // const toggleStatus = (key: keyof typeof statusFilters) => {
  //   setStatusFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  // };

  function handleSelect(date: Date | undefined) {
    if (date) {
      setStartDate(date);
      // setOpen(false); // close only when a date is picked
    }
  }

  const handleApplyFilter = () => {
    setFilters((prev: any) => ({
      ...prev,
      ...(endDate && {
        dateTo: format(endDate, "yyyy-MM-dd"),
      }),
      ...(startDate && {
        dateFrom: format(startDate, "yyyy-MM-dd"),
      }),
      ...(selStatus && {
        status: selStatus,
      }),
    }));
  };

  const handleCancelFilter = () => {
    setSelStatus("")
    setStartDate(undefined);
    setEndDate(undefined);
    setFilters((prev: any) => ({
      ...prev,
      dateTo: null,
      dateFrom: null,
      status: "",
    }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <AppButton
          // variant="outline"
          className="border  border-[#EAEAEA] flex flex-row px-3 xl:py-[6px] xl:px-[14px] bg-white xl:bg-transparent h-10"
          outline
          icon={<Filter className="w-4 h-4" />}
          borderColor="#EAEAEA"
          // px={14}
          // py={6}
          borderRad={4}
          // size={"lg"}
        >
          <AppText
            size={15}
            weight="light"
            smallText
            color="#1A1A1A"
            className="xl:block hidden"
          >
            Filter
          </AppText>
        </AppButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-88 p-4 space-y-4">
        <div className="flex flex-col gap-4 px-4">
          {/* <DropdownMenuLabel>Status</DropdownMenuLabel> */}
          <AppText weight="semibold" smallText size={16} color="#121417">
            Status
          </AppText>
          <div className="flex flex-col space-y-1 mt-2 gap-4">
            {statusFilters?.map((_, i) => (
              <span
                key={i}
                className="flex flex-row justify-between w-full items-center "
              >
                <AppText
                  smallText
                  weight="light"
                  color="#121417"
                  size={14}
                  transform="capitalize"
                >
                  {_}
                </AppText>
                <Checkbox
                  // checked={value}
                  className="border-[2px] border-[#C0C0C0] rounded-[4px] data-[state=checked]:bg-[#036600] data-[state=checked]:border-[#036600]"
                  checked={_ === selStatus}
                  onCheckedChange={() => setSelStatus(_)}
                />
              </span>
              // <DropdownMenuCheckboxItem
              //   key={key}
              //   checked={value}
              //   onCheckedChange={() => toggleStatus(key as keyof typeof statusFilters)}
              //   className="border"
              // >
              //   {key.charAt(0).toUpperCase() + key.slice(1)}
              // </DropdownMenuCheckboxItem>
            ))}
          </div>
        </div>

        <DropdownMenuSeparator />

        <div className="my-5 ">
          {/* <DropdownMenuLabel></DropdownMenuLabel> */}
          <AppText
            weight="semibold"
            smallText
            size={16}
            color="#121417"
            ml={16}
          >
            Date Filter
          </AppText>
          <div className="flex flex-row justify-between gap-2 mt-2 mb-7">
            {/* Start Date */}
            <div className="w-[48.5%]">
              <Popover modal>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-between text-left text-sm rounded-[8px] h-[48px] ${
                      startDate !== undefined ? "border-[#1A1A1A]" : ""
                    }`}
                  >
                    <AppText smallText weight="light" size={14} color="#1A1A1A">
                      {startDate
                        ? format(startDate, "dd/MM/yyyy")
                        : "Start date"}
                    </AppText>

                    <Calendar className="mr-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <DatePicker
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    classNames={{
                      day_selected:
                        "bg-[#036600] text-white hover:bg-[#036600]",
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* End Date */}
            <div className="w-[48.5%]">
              <Popover modal>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-between text-left text-sm rounded-[8px] h-[48px] ${
                      endDate !== undefined ? "border-[#1A1A1A]" : ""
                    }`}
                  >
                    <AppText smallText weight="light" size={14} color="#1A1A1A">
                      {endDate ? format(endDate, "dd/MM/yyyy") : "End date"}
                    </AppText>

                    <Calendar className="mr-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <DatePicker
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    classNames={{
                      day_selected:
                        "bg-[#036600] text-white hover:bg-[#036600]",
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* <Button
          className="w-full mt-4 bg-[#1E7D4B] text-white"
          onClick={() => {
            // Call your filter logic here
            console.log({ statusFilters, startDate, endDate });
          }}
        >
          Apply Filters
        </Button> */}
        <div className="flex flex-row justify-between mb-3">
          <div className="w-[48%]">
            <AppButton
              py={14}
              text="Apply filter"
              fullWidth
              textColor="white"
              bg="#036600"
              onClick={() => {
                handleApplyFilter();
              }}
            />
          </div>
          <div className="w-[48%]">
            <AppButton
              py={14}
              text="Clear filter"
              fullWidth
              outline
              onClick={() => {
                handleCancelFilter()
              }}
            />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
