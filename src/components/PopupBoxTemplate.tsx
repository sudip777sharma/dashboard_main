import React, { useEffect, useContext, useRef } from "react";
import { PopupBoxContext } from "~/contexts/PopupBoxContext";
type props = {
  children: React.ReactNode;
};
const PopupBoxTemplate = ({ children }: props) => {
  const popupBoxContext = useContext(PopupBoxContext);
  const popupBoxRef = useRef<HTMLDivElement | null>(null);

  const onClickOutsideSearchPanel = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (popupBoxRef.current?.contains(e.target as Node) === false) {
      popupBoxContext?.setIsPopupBoxOpen(false);
    }
  };
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        popupBoxContext?.setIsPopupBoxOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);
  return (
    <div
      onClick={(e) => onClickOutsideSearchPanel(e)}
      // border-[2px] border-[#37e1ff]
      className={`
      transition-opacity ${
        popupBoxContext?.isPopupBoxOpen
          ? "opacity-100"
          : "pointer-events-none opacity-0"
      }
      fixed inset-0 flex items-center justify-center 
      bg-[#070915] bg-opacity-50 
      backdrop-blur-sm
      duration-500
      z-50
      `}
      id="popupBoxContainer"
    >
      <div
        ref={popupBoxRef}
        className={`h-[30rem] w-[19.5rem] transform rounded-lg border-[1px] border-[#484D64]
        bg-[#2F3349] md:h-[33rem]
        md:w-[38rem]
        ${popupBoxContext?.isPopupBoxOpen ? "scale-100" : "scale-90"}
        transition-transform 
        duration-300
      `}
      >
        {children}
      </div>
    </div>
  );
};

export default PopupBoxTemplate;
