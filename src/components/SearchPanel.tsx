import React, { useContext, useRef, useEffect } from "react";
import { TfiClose } from "react-icons/tfi";
import { GoSearch } from "react-icons/go";
import { PopupBoxContext } from "~/contexts/PopupBoxContext";
import { AiFillFileAdd, AiOutlineStar } from "react-icons/ai";
import { BsTabletLandscape } from "react-icons/bs";
import { CgUserList } from "react-icons/cg";
import { CiCalendarDate } from "react-icons/ci";
import { DiGoogleAnalytics } from "react-icons/di";
import { GoMultiSelect, GoTypography } from "react-icons/go";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { PiCurrencyDollarSimple } from "react-icons/pi";
import { RiUser3Line } from "react-icons/ri";
import { SiUnderscoredotjs } from "react-icons/si";
import { SlCalender } from "react-icons/sl";
import { TbCircles, TbHandFinger, TbKeyboard } from "react-icons/tb";

const SearchPanelItems = [
  {
    title: "Popular Searches",
    content: [
      {
        name: "Analytics",
        icon: <DiGoogleAnalytics />,
      },
      {
        name: "CRM",
        icon: <TbCircles />,
      },
      {
        name: "Invoice List",
        icon: <LiaFileInvoiceSolid />,
      },
      {
        name: "User List",
        icon: <CgUserList />,
      },
    ],
  },
  {
    title: "Apps & pages",
    content: [
      {
        name: "Calender",
        icon: <SlCalender />,
      },
      {
        name: "Invoice Add",
        icon: <AiFillFileAdd />,
      },
      {
        name: "Pricing",
        icon: <PiCurrencyDollarSimple />,
      },
      {
        name: "Account Settings",
        icon: <RiUser3Line />,
      },
    ],
  },
  {
    title: "User Interface",
    content: [
      {
        name: "Typography",
        icon: <GoTypography />,
      },
      {
        name: "Tabs",
        icon: <BsTabletLandscape />,
      },
      {
        name: "Buttons",
        icon: <TbHandFinger />,
      },
      {
        name: "Statistics",
        icon: <TbKeyboard />,
      },
    ],
  },
  {
    title: "Tools",
    content: [
      {
        name: "Select",
        icon: <GoMultiSelect />,
      },
      {
        name: "Combobox",
        icon: <SiUnderscoredotjs />,
      },
      {
        name: "Date & Time Picker",
        icon: <CiCalendarDate />,
      },
      {
        name: "Rating",
        icon: <AiOutlineStar />,
      },
    ],
  },
];
const SearchPanel = () => {
  const popupBoxContext = useContext(PopupBoxContext);
  const searchInputRef = useRef<HTMLInputElement  | null>(null);
  useEffect(() => {
    searchInputRef.current?.focus();
  }, [popupBoxContext?.isPopupBoxOpen]);
  return (
    <>
      <div className="flex h-16 items-center justify-center gap-2 border-b-[1px] border-b-[#484D64] px-5">
        <span className="flex h-full items-center justify-center">
          <GoSearch style={{ height: "20px", width: "20px" }} />
        </span>
        <input
          ref={searchInputRef}
          className="w-full rounded-lg bg-[#2F3349] px-2 py-1 text-white/60 outline-none"
          type="text"
        />
        <span className="flex h-full items-center justify-center">{`[esc]`}</span>
        <span
          className="flex h-full items-center justify-center"
          onClick={() => popupBoxContext?.setIsPopupBoxOpen(false)}
        >
          <TfiClose />
        </span>
      </div>
      <div className="grid overflow-auto h-[25.9rem] md:h-[30rem] w-full grid-cols-1 gap-2 md:gap-0 md:grid-cols-2 items-center justify-center p-6 px-2 md:px-10 cursor-pointer">
        {SearchPanelItems.map((item, index) => (
          <div className="flex flex-col gap-0 md:gap-3 p-1 md:p-4" key={item.title}>
            <h1 className="text-xs text-[#6B7088]">
              {item.title.toUpperCase()}
            </h1>
            <div className="flex flex-col justify-center gap-1 md:gap-4 text-[#A6AAC6]">
              {item.content.map((content) => (
                <span
                  className="flex flex-row items-center justify-start gap-2 hover:text-[#4d51a0]"
                  key={content.name}
                >
                  {content.icon}
                  <p>{content.name}</p>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchPanel;
