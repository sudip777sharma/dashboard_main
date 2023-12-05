import React, { useRef, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsEnvelopeCheck } from "react-icons/bs";
import useCloseOnClickOutside from "~/hooks/useCloseOnClickOutside";
import Image from "next/image";
const notifications = [
  {
    userImage: "n1u.png",
    subject: "Congratulation Flora! 🎉",
    description: "Won the monthly best seller badge",
    time: "Today",
  },
  {
    userImage: "n5u.png",
    subject: "New user registered.",
    description: "5 hours ago",
    time: "Yesterday",
  },
  {
    userImage: "n3u.png",
    subject: "New message received 👋🏻",
    description: "You have 10 unread messages",
    time: "11 Aug",
  },
  {
    userImage: "n1u.png",
    subject: "Paypal",
    description: "Received Payment ",
    time: "25 May",
  },
  {
    userImage: "n5u.png",
    subject: "Received Order 📦",
    description: "New order received from john",
    time: "19 Mar",
  },
];
const Notifications = () => {
  const [isNotificationsActive, setIsNotificationsActive] = useState(false);
  const NotificationsRef = useRef<HTMLDivElement | null>(null);
  const closeNotifications = () => {
    setIsNotificationsActive(false);
  }
  useCloseOnClickOutside(closeNotifications, NotificationsRef);
  return (
    <div
      className="relative"
      onClick={() => setIsNotificationsActive((prev) => !prev)}
      ref={NotificationsRef}
    >
      <IoNotificationsOutline style={{ height: "25px", width: "25px" }} />
      <span className="absolute -right-1 -top-1 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#FF3B30] text-[10px] text-white">
        2
      </span>
      {/* {isNotificationsActive && ( */}
        <>
          <div className={`transform ${
    isNotificationsActive ? 'scale-x-100 scale-y-100' : 'scale-x-0 scale-y-0'
  } transition-transform origin-top-right duration-300 absolute -right-10 md:right-0 top-[2.9rem] flex w-[16rem] md:w-[24rem] flex-col items-center justify-center rounded-lg border-[1px] border-[#484D64] bg-[#2F3349]`}>
            <div
                className="flex flex-row w-full items-center justify-between border-b-[1px] border-[#484D64] p-3 px-4 py-4 text-xl font-bold"
            >
              Notifications
              <BsEnvelopeCheck />
            </div>
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="flex w-full flex-row items-center justify-between border-b-[1px] border-[#484D64] gap-3 px-4 py-2"
              >
                <span className="relative h-full w-12">
                  <Image
                    height={10}
                    width={10}
                    src={`/${notification.userImage}`}
                    // src='avatar.png'
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </span>
                <div className="flex w-full flex-col justify-center ">
                  <span
                    className="font-bold text-sm"
                  >{notification.subject}</span>
                  <p
                    className="text-xs"
                  >{notification.description}</p>
                  <p
                    className="text-xs text-gray-500"
                  >{notification.time}</p>
                </div>
              </div>
            ))}
            <div
                className="px-4 py-4"
            >View All Notifications</div>
          </div>
        </>
      {/* )} */}
    </div>
  );
};

export default Notifications;
