import React, { useEffect, useContext, useRef } from "react";
import { SidebarContext } from "~/contexts/SidebarContext";
import { ThemeContext } from "~/contexts/ThemeContext";

type props = {
  children: React.ReactNode;
};
const SidebarTemplate = ({ children }: props) => {
  const themeContext = useContext(ThemeContext);
  const sidebarContext = useContext(SidebarContext);
  const popupBoxRef = useRef<HTMLDivElement | null>(null);
  const onClickOutsideSearchPanel = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (popupBoxRef.current?.contains(e.target as Node) === false) {
      sidebarContext?.setIsSidebarOpen(false);
    }
  };
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        sidebarContext?.setIsSidebarOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);
  // if(!sidebarContext?.isSidebarOpen) return null;
  return (
    <>
      <div
        ref={popupBoxRef}
        style={{ resize: "horizontal", overflow: "hidden" }}
        className={`
        basis-0
        transform
        xl:basis-1/4
        ${
          sidebarContext?.isSidebarOpen
            ? ""
            : "-translate-x-full xl:translate-x-0"
        }
        z-20
        h-screen
        border-[1px] border-[#484D64]
        transition-all
        duration-300
        `}
      >
        {children}
      </div>
      <div
        className={`fixed left-0 top-0
          block xl:hidden
          ${
            sidebarContext?.isSidebarOpen
              ? ""
              : "-translate-x-full xl:translate-x-0"
          }
          z-20
          h-screen
        border-[1px] border-[#484D64]
          bg-[#2F3349] transition-all
          duration-300
        `}
      >
        {children}
      </div>
      <div
        onClick={(e) => onClickOutsideSearchPanel(e)}
        className={`
        transition-opacity ${
          sidebarContext?.isSidebarOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }
        fixed
        inset-0
        z-[19]
        h-screen
      bg-[#060712]
      bg-opacity-60 duration-300 
      xl:opacity-0
      `}
      ></div>
    </>
  );
};

export default SidebarTemplate;
