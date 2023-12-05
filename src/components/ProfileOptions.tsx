import React, { useEffect, useRef, useState } from "react";

import { LuUser } from "react-icons/lu";
import { RiSettings5Line } from "react-icons/ri";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
import { BiHelpCircle } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { signOut, useSession } from "next-auth/react";
import useCloseOnClickOutside from "~/hooks/useCloseOnClickOutside";

const ProfileOptions = () => {
  const { data: sessionData } = useSession();
  const [isProfileOptionActive, setIsProfileOptionActive] = useState(false);
  const profileOptionsRef = useRef<HTMLDivElement | null>(null);
  const closeProfileOptions = () => {
    setIsProfileOptionActive(false);
  };
  useCloseOnClickOutside(closeProfileOptions, profileOptionsRef);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className="relative h-9 w-9 rounded-full"
        onClick={() => setIsProfileOptionActive((prev) => !prev)}
        ref={profileOptionsRef}
      >
        {/* {sessionData && <img src={sessionData.user?.image ?? ''} />} */}
        {sessionData && (
          <img
            src={sessionData.user?.image ?? ""}
            className="h-full w-full rounded-full object-cover"
          />
        )}
        <span className="absolute bottom-[1px] right-[1px] h-3 w-3 rounded-full border-[2px] border-[#2F3349] bg-green-500" />
        {/* {isProfileOptionActive && ( */}

        <div
          className={`transform ${
            isProfileOptionActive
              ? "scale-x-100 scale-y-100"
              : "scale-x-0 scale-y-0"
          } absolute right-0 top-[3.2rem] 
  flex w-[14rem] origin-top-right flex-col items-center justify-center gap-2 rounded-lg border-[1px] border-[#484D64] 
  bg-[#2F3349] p-4 transition-transform duration-300`}
        >
          <div className="flex w-full flex-row items-center gap-3">
            <span className="relative h-9 w-9 rounded-full">
              {sessionData && (
                <>
                  <img
                    src={sessionData.user?.image ?? ""}
                    // src='avatar.png'
                    className="h-full w-full rounded-full object-cover"
                  />
                  <span className="absolute bottom-[1px] right-[1px] h-3 w-3 rounded-full border-[2px] border-[#2F3349] bg-green-500" />
                </>
              )}
            </span>
            <span className="flex flex-col">
              {sessionData && (
                <p className="flex flex-row font-bold">
                  {sessionData.user?.name ?? ""}
                </p>
              )}
              {<p>admin</p>}
            </span>
          </div>
          <div className="flex w-full flex-row gap-3 py-2">
            <LuUser style={{ height: "20px", width: "20px" }} />
            <p>Profile</p>
          </div>
          <div className="flex w-full flex-row gap-3 py-2">
            <RiSettings5Line style={{ height: "20px", width: "20px" }} />
            <p>Settings</p>
          </div>
          <div className="flex w-full flex-row gap-3 py-2">
            <FaMoneyCheckDollar style={{ height: "20px", width: "20px" }} />
            <p>Billing</p>
          </div>
          <div className="flex w-full flex-row gap-3 py-2">
            <IoHelpBuoyOutline style={{ height: "20px", width: "20px" }} />
            <p>Help</p>
          </div>
          <div className="flex w-full flex-row gap-3 py-2">
            <BsCurrencyDollar style={{ height: "20px", width: "20px" }} />
            <p>Pricing</p>
          </div>
          <div className="flex w-full flex-row gap-3 py-2">
            <BiHelpCircle style={{ height: "20px", width: "20px" }} />
            <p>FAQ</p>
          </div>
          <div
            className="flex w-full flex-row gap-3 py-2"
            onClick={() => void signOut()}
          >
            <HiOutlineLogout style={{ height: "20px", width: "20px" }} />
            <p>Logout</p>
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default ProfileOptions;
