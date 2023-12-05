import React, { useRef, useState } from "react";

import { BiHelpCircle } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { LuUser } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { TbLayoutDashboard } from "react-icons/tb";
import { TbLayoutGridAdd } from "react-icons/tb";
import useCloseOnClickOutside from "~/hooks/useCloseOnClickOutside";
const shortcuts = [
  {
    icon: <SlCalender />,
    name: "Calender",
    description: "Appointments",
  },
  {
    icon: <LiaFileInvoiceSolid />,
    name: "Invoice App",
    description: "Manage Account",
  },
  {
    icon: <LuUser />,
    name: "Users",
    description: "Manage Users",
  },
  {
    icon: <TbLayoutDashboard />,
    name: "Dashboard",
    description: "Dashboard Analytics",
  },
  {
    icon: <FiSettings />,
    name: "Settings",
    description: "Account Settings",
  },
  {
    icon: <BiHelpCircle />,
    name: "Help Center",
    description: "FAQs and Articles",
  },
];
const Shortcuts = () => {
  const shortcutsRef = useRef<HTMLDivElement | null>(null);
  const [isShortcutsActive, setIsShortcutsActive] = useState(false);
  const closeShortcuts = () => {
    setIsShortcutsActive(false);
  }
  useCloseOnClickOutside(closeShortcuts, shortcutsRef);
  return (
    <div
      className="relative"
      onClick={() => setIsShortcutsActive((prev) => !prev)}
      ref={shortcutsRef}
    >
      <TbLayoutGridAdd style={{ height: "25px", width: "25px" }} />
      {/* {isShortcutsActive && ( */}
        <>
          <div className={`transform ${
    isShortcutsActive ? 'scale-x-100 scale-y-100' : 'scale-x-0 scale-y-0'
  } transition-transform origin-top-right duration-300 absolute -right-16 md:right-0 top-[2.9rem] flex w-[16rem] md:w-[21rem] flex-col items-center justify-center rounded-lg border-[1px] border-[#484D64] bg-[#2F3349]`}>
            <div className="flex w-full flex-row items-center justify-between border-b-[1px] border-[#484D64] p-3 px-4 py-4 text-xl font-bold">
              Shortcuts
              <TbLayoutGridAdd />
            </div>
            <div
                className="grid grid-cols-2 w-full"
            >
              {shortcuts.map((shortcut, index) => (
                <div
                  key={index}
                  className={`flex w-full flex-row items-center justify-between gap-3 px-4 py-4 border-b border-[#484D64] ${index % 2 === 0 && 'border-r border-[#484D64]'}`}
                >
                  <div className="flex w-full flex-col items-center justify-center gap-1">
                    <span className="relative h-12 w-12 rounded-full flex items-center justify-center bg-[#41445B] text-white">
                      {shortcut.icon}
                    </span>
                    <span className="text-sm font-bold">{shortcut.name}</span>
                    <p className="text-xs">{shortcut.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      {/* )} */}
    </div>
  );
};

export default Shortcuts;
