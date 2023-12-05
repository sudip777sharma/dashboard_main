import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import React, { useContext } from "react";

import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineDarkMode } from "react-icons/md";
import { TbCommand } from "react-icons/tb";
import { TbLanguage } from "react-icons/tb";
import Loader from "./Loader";
import ProfileOptions from "./ProfileOptions";
import Notifications from "./Notifications";
import Shortcuts from "./Shortcuts";
import { PopupBoxContext } from "~/contexts/PopupBoxContext";
import { SidebarContext } from "~/contexts/SidebarContext";
import { ThemeContext } from "~/contexts/ThemeContext";

const Navbar = () => {
  const { data: sessionData } = useSession();
  const popupBoxContext = useContext(PopupBoxContext);
  const themeContext = useContext(ThemeContext);
  const sidebarContext = useContext(SidebarContext);
  return (
    <>
      <Head>
        <title>Navbar</title>
        <meta name="description" content="Navbar of the app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`sticky top-0 z-10 flex w-full cursor-pointer flex-col items-center justify-between px-1 pt-4 backdrop-blur-lg
        md:px-6
        `}
      >
        <div
          className={`flex w-full items-center justify-between rounded-lg border-[1px] border-[#484D64] bg-[#2F3349] bg-opacity-50 
          px-3 py-3 backdrop-blur-sm md:px-6
          `}
        >
          <div className="flex flex-row items-center justify-between gap-2 md:gap-3">
            <div className={`flex xl:hidden`}>
              <RxHamburgerMenu
                onClick={() =>
                  sidebarContext?.setIsSidebarOpen((prev) => !prev)
                }
                style={{ height: "25px", width: "25px" }}
              />
            </div>
            <div
              onClick={() => popupBoxContext?.setIsPopupBoxOpen(true)}
              className="flex flex-row items-center justify-between gap-3"
            >
              <AiOutlineSearch style={{ height: "25px", width: "25px" }} />
              <span className={`hidden md:flex`}>Search</span>
              <span className="hidden flex-row items-center justify-center rounded-lg border-[1px] border-[#484D64] px-[3px] md:flex">
                <TbCommand style={{ height: "15px", width: "15px" }} />K
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between gap-2 md:gap-4">
            {!sessionData && (
              <div>
                <button
                  className="rounded-full bg-white/10 px-2 py-1 font-semibold text-white no-underline transition hover:bg-white/20"
                  onClick={() => void signIn()}
                >
                  sign in
                </button>
              </div>
            )}
            <div>
              <TbLanguage style={{ height: "25px", width: "25px" }} />
            </div>
            <div
              onClick={() => {
                themeContext?.setIsDarkMode((prev) => !prev);
              }}
            >
              <MdOutlineDarkMode style={{ height: "25px", width: "25px" }} />
            </div>
            {sessionData ? <Shortcuts /> : <Loader />}
            {sessionData ? <Notifications /> : <Loader />}
            {sessionData ? <ProfileOptions /> : <Loader />}
          </div>
        </div>
      </main>
    </>
  );
};

export default Navbar;
