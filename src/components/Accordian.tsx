import Link from "next/link";
import React, { useState } from "react";
import { BiRadioCircle } from "react-icons/bi";
import { HiOutlineChevronRight } from "react-icons/hi";
import { type IconType } from "react-icons/lib";
import Icon from "./Icon";
import { useRouter } from "next/router";

type sidebarItemType = {
  head: string;
  icon?: IconType;
  url?: string;
  body?: sidebarItemType[];
};
type AccordianPropType = {
  sidebarContent: sidebarItemType[];
  depth: number;
};
type AccordianItemPropType = {
  head: string;
  icon?: IconType;
  url?: string;
  body?: sidebarItemType[];
  depth: number;
};
const AccordianItem = ({
  head,
  url,
  icon,
  body,
  depth,
}: AccordianItemPropType) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(() =>
    // !icon && depth === 0 ? true : false
    depth === 0 ? true : false
  );
  const onOpen = () => {
    if (body) {
      setIsOpen((prev) => !prev);
    }
  };
  return (
    <div className="flex flex-col gap-1 px-2">
      {url ? (
        <Link
          href={url}
          onClick={onOpen}
          className={`flex cursor-pointer flex-row items-center justify-between gap-2
        rounded-lg py-2 pl-4 pr-2 hover:bg-[#353A50] 
        ${isOpen ? "bg-[#353A50]" : ""}
        ${
          router.pathname == url
            ? "bg-[#635BC8] text-white shadow-2xl  hover:bg-[#3d61ff]"
            : ""
        }
          `}
        >
          <>
            <span className="flex h-full flex-row items-center justify-center gap-2">
              {icon ? (
                <Icon
                  icon={icon}
                  height="18px"
                  width="18px"
                  // color="#EE9543"
                  // className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#504448]"
                />
              ) : (
                depth !== 0 && <BiRadioCircle />
              )}
              <h1
                className={`${
                  !icon && depth === 0 ? "text-xs font-bold text-[#696D85]" : ""
                } `}
              >
                {!icon && depth === 0 ? head.toUpperCase() : head}
              </h1>
            </span>

            {body ? (
              <span
                className={`${
                  isOpen ? "rotate-90 transform" : ""
                } transition-all duration-500 ease-in-out`}
              >
                <HiOutlineChevronRight />
              </span>
            ) : (
              <></>
            )}
          </>
        </Link>
      ) : (
        <div
          onClick={onOpen}
          className={`flex cursor-pointer flex-row items-center justify-between gap-2
          rounded-lg py-2 pl-4 pr-2 hover:bg-[#353A50] 
          ${isOpen ? "bg-[#353A50]" : ""}
          `}
        >
          <span className="flex h-full flex-row items-center justify-center gap-2">
            {icon ? (
              <Icon
                icon={icon}
                height="18px"
                width="18px"
                color={`${body ? "" : "#696d8545"}`}
                // className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#504448]"
              />
            ) : (
              depth !== 0 && (
                <BiRadioCircle
                  style={{ color: `${body ? "" : "#696d8545"}` }}
                />
              )
            )}
            <h1
              className={`${body ? "" : "text-[#696d8545]"} ${
                !icon && depth === 0 ? "text-xs font-bold text-[#7367F0]" : ""
              } `}
            >
              {!icon && depth === 0 ? head.toUpperCase() : head}
            </h1>
          </span>

          {body ? (
            <span
              className={`${
                isOpen ? "rotate-90 transform" : ""
              } transition-all duration-500 ease-in-out`}
            >
              <HiOutlineChevronRight />
            </span>
          ) : null}
        </div>
      )}
      {
        // isOpen &&
        body && (
          <div
            className={`overflow-hidden transition-[max-height] duration-500 ${
              isOpen ? "max-h-[50rem]" : "max-h-0"
            }`}
          >
            <Accordian sidebarContent={body} depth={depth + 1} />
          </div>
        )
      }
    </div>
  );
};
const Accordian = ({ sidebarContent, depth }: AccordianPropType) => {
  return (
    <div className="flex flex-col gap-1 overflow-auto">
      {sidebarContent.map((item, index) => {
        return (
          <div key={index} className="">
            <AccordianItem
              head={item.head}
              icon={item?.icon}
              body={item?.body}
              depth={depth}
              url={item.url}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Accordian;
