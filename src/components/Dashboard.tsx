import React, { useContext, useEffect } from "react";
import { PopupBoxContext } from "~/contexts/PopupBoxContext";
// import ImageSlider from "./Slider";
import Carousel from "./Carousel";
import { MdOutlineMail, MdOutlinePayment } from "react-icons/md";
import RevenueChart from "./Charts/RevenueChart";
import EarningChart from "./Charts/EarningChart";
import StorkedGaugeChart from "./Charts/StrokedGaugeChart";
import Icon from "./Icon";
import {
  FaCircleHalfStroke,
  FaDollarSign,
  FaLink,
  FaRegStar,
  FaTicket,
} from "react-icons/fa6";
import { IoPeopleSharp, IoTimeOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp, IoMdTime } from "react-icons/io";
import { CiCircleCheck, CiWarning } from "react-icons/ci";
import { TbBrandPaypal, TbClick } from "react-icons/tb";
import SingleHorizontalBar from "./Charts/SingleHorizontalBar";
// import { type IconType } from "react-icons/lib";
import Image from "next/image";
import StackedBarChart2 from "./Charts/StackedBarChart2";
import { IconType } from "react-icons/lib";
import { AiOutlineStop } from "react-icons/ai";
import { LiaNetworkWiredSolid } from "react-icons/lia";
import { LuExternalLink } from "react-icons/lu";
import { RiAdvertisementLine } from "react-icons/ri";
import ProjectTable from "./Tables/projectTable";

import dynamic from "next/dynamic";
import ReactBigCalendar from "./Events/ReactBigCalender";
import ReactCalendar from "./Events/ReactCalender";
import MyEvents from "./Events/MyEvents";
import ImageSlider from "./Slider";

const DynamicClientsMap = dynamic(() => import("./Maps/ClientsMap"), {
  loading: () => <p>Loading map...</p>,
  ssr: false, // Disable server-side rendering
});

type countriesSaleDetailType = {
  imgSrc: string;
  salePrice: number;
  country: string;
  saleRate: number;
};
type monthlyCampaignStateType = {
  icon: IconType;
  iconColor: string;
  name: string;
  visitors: number;
  rate: number;
};
type SourceVisitsType = {
  icon: IconType;
  name: string;
  desc: string;
  visitors: number;
  rate: number;
};
const monthlyCampaignState: monthlyCampaignStateType[] = [
  {
    icon: MdOutlineMail,
    iconColor: "#28C56E",
    name: "Emails",
    visitors: 12346,
    rate: 0.3,
  },
  {
    icon: FaLink,
    iconColor: "#03C4DD",
    name: "Opened",
    visitors: 8734,
    rate: 2.1,
  },
  {
    icon: TbClick,
    iconColor: "#E59043",
    name: "Clicked",
    visitors: 967,
    rate: -1.4,
  },
  {
    icon: IoPeopleSharp,
    iconColor: "#6058C0",
    name: "Subscribe",
    visitors: 345,
    rate: 8.5,
  },
  {
    icon: CiWarning,
    iconColor: "#7C7F89",
    name: "Complaints",
    visitors: 10,
    rate: -1.5,
  },
  {
    icon: AiOutlineStop,
    iconColor: "#DF5154",
    name: "Unsubscribe",
    visitors: 86,
    rate: 0.8,
  },
];
const SourceVisits: SourceVisitsType[] = [
  {
    icon: FaCircleHalfStroke,
    name: "Direct Source",
    desc: "Direct link click",
    visitors: 1.2,
    rate: 4.2,
  },
  {
    icon: LiaNetworkWiredSolid,
    name: "Social Network",
    desc: "Social Channels",
    visitors: 31.5,
    rate: 8.2,
  },
  {
    icon: MdOutlineMail,
    name: "Email Newsletter",
    desc: "Mail Campaigns",
    visitors: 893,
    rate: 2.4,
  },
  {
    icon: LuExternalLink,
    name: "Referrals",
    desc: "Impact Radius Visits",
    visitors: 342,
    rate: -0.4,
  },
  {
    icon: RiAdvertisementLine,
    name: "ADVT",
    desc: "Google ADVT",
    visitors: 2.15,
    rate: 9.1,
  },
  {
    icon: FaRegStar,
    name: "Other",
    desc: "Many Sources",
    visitors: 12.5,
    rate: 6.2,
  },
];
const countriesSaleDetail: countriesSaleDetailType[] = [
  {
    imgSrc: "/unitedStates.png",
    salePrice: 8.45,
    country: "United States",
    saleRate: 25.8,
  },
  {
    imgSrc: "/Brazil.png",
    salePrice: 7.78,
    country: "Brazil",
    saleRate: -16.2,
  },
  {
    imgSrc: "/India.png",
    salePrice: 6.48,
    country: "India",
    saleRate: 12.3,
  },
  {
    imgSrc: "/Australia.png",
    salePrice: 5.12,
    country: "Australia",
    saleRate: -11.9,
  },
  {
    imgSrc: "/France.png",
    salePrice: 4.45,
    country: "France",
    saleRate: 16.2,
  },
  {
    imgSrc: "/China.png",
    salePrice: 3.9,
    country: "China",
    saleRate: 14.8,
  },
];

function darkenHexColorWithOpacity(hex, factor, opacity) {
  // Ensure the factor is between 0 and 1
  factor = Math.min(1, Math.max(0, factor));

  // Convert hex to RGB
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  // Darken each component
  r = Math.round(r * (1 - factor));
  g = Math.round(g * (1 - factor));
  b = Math.round(b * (1 - factor));

  // Convert opacity to a valid range (0 to 1)
  opacity = Math.min(1, Math.max(0, opacity));

  // Convert back to hex with opacity
  const darkenedHexWithOpacity = `rgba(${r}, ${g}, ${b}, ${opacity})`;

  return darkenedHexWithOpacity;
}

const Dashboard = () => {
  const popupBoxContext = useContext(PopupBoxContext);
  // console.log(monthlyCampaignState[0]?.iconColor.slice(1));
  useEffect(() => {
    const handleCtrlK = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        popupBoxContext?.setIsPopupBoxOpen(true);
      }
    };
    document.addEventListener("keydown", handleCtrlK);

    return () => {
      document.removeEventListener("keydown", handleCtrlK);
    };
  }, []);

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-6">
        {/* first row */}
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="w-full">
            {/* <ImageSlider /> */}
            <Carousel />
          </div>
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            <div className="w-full rounded-lg border-[1px] border-[#484D64]">
              <div className="w-full flex-col px-6 pt-6">
                <div className="flex items-center justify-between">
                  <p>Sales Overview</p>
                  <p className="text-lg text-[#28C66F]">+18.2%</p>
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-[#ACB0CC]">
                    $42.5k
                  </h1>
                </div>
              </div>
              <div className="w-full flex-col items-center justify-center p-6">
                <div className="flex w-full items-center justify-between">
                  <div className="p-3">
                    <h1 className="text-lg">Order</h1>
                    <h1 className="text-xl font-semibold">62.2%</h1>
                    <h1>6440</h1>
                  </div>
                  <div className="p-3">VS</div>
                  <div className="p-3">
                    <h1 className="text-lg">Visits</h1>
                    <h1 className="text-xl font-semibold">25.5%</h1>
                    <h1>12749</h1>
                  </div>
                </div>
                <div className="pt-4">
                  <SingleHorizontalBar
                    barColor="#00CFE8"
                    percentage={80}
                    backgroundColor="#2B3F55"
                    name="profit"
                    barWidth="8px"
                  />
                </div>
              </div>
            </div>
            <div className="w-full rounded-lg border-[1px] border-[#484D64]">
              <div className="flex-col px-6 pt-6">
                <Icon
                  icon={MdOutlinePayment}
                  height="25px"
                  width="25px"
                  color="#28C66F"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2E4B4F]"
                />
                <div>
                  <h1 className="text-2xl font-semibold">97.5k</h1>
                  <p>Revenue Generated</p>
                </div>
              </div>
              <div className="">
                <RevenueChart />
              </div>
            </div>
          </div>
        </div>
        {/* second row */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex w-full flex-col rounded-lg border-[1px] border-[#484D64] p-6">
            <div>
              <h1 className="text-2xl font-semibold">Earning Reports</h1>
              <h2>Weekly Earnings Overview</h2>
            </div>
            <div className="flex flex-col items-center justify-between md:flex-row">
              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center gap-2">
                  <h1 className="text-4xl font-semibold">$468</h1>
                  <h2 className="flex items-center justify-center font-semibold text-[#28C66F]">
                    <p className="rounded-lg bg-[#2E4B4F] px-2 py-0">+4.2%</p>
                  </h2>
                </div>
                <div>
                  <p>You informed of this week compared to last week</p>
                </div>
              </div>
              <div className="">
                <EarningChart />
              </div>
            </div>
            <div className="grid grid-cols-1 items-center justify-between rounded-lg border-[1px] border-[#484D64] p-3 md:grid-cols-3">
              <div className="w-full p-2">
                <div className="flex items-center gap-1">
                  <Icon
                    icon={FaDollarSign}
                    height="17px"
                    width="17px"
                    color="#6F63E4"
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#393B63]"
                  />
                  <h1 className="text-lg font-semibold">Earnings</h1>
                </div>
                <h2 className="text-2xl font-semibold">$545.69</h2>
                <div className="pt-4">
                  <SingleHorizontalBar
                    barColor="#5A68EB"
                    percentage={55}
                    backgroundColor="#343756"
                    name="Earnings"
                    barWidth="6px"
                  />
                </div>
              </div>
              <div className="w-full p-2">
                <div className="flex items-center gap-1">
                  <Icon
                    icon={IoTimeOutline}
                    height="17px"
                    width="17px"
                    color="#00CFE8"
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2B3F55]"
                  />
                  <h1 className="text-lg font-semibold">Profit</h1>
                </div>
                <h2 className="text-2xl font-semibold">$256.34</h2>
                <div className="pt-4">
                  <SingleHorizontalBar
                    barColor="#00CFE8"
                    percentage={25}
                    backgroundColor="#2B3F55"
                    name="Profit"
                    barWidth="6px"
                  />
                </div>
              </div>
              <div className="w-full p-2">
                <div className="flex items-center gap-1">
                  <Icon
                    icon={TbBrandPaypal}
                    height="17px"
                    width="17px"
                    color="#EA5455"
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#3E364A]"
                  />
                  <h1 className="text-lg font-semibold">Expense</h1>
                </div>
                <h2 className="text-2xl font-semibold">$74.19</h2>
                <div className="pt-4">
                  <SingleHorizontalBar
                    barColor="#EA5455"
                    percentage={70}
                    backgroundColor="#3E364A"
                    name="Expense"
                    barWidth="6px"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-6 rounded-lg border-[1px] border-[#484D64] p-6">
            <div>
              <h1 className="text-2xl font-semibold">Support Tracker</h1>
              <h2>Last 7 Days</h2>
            </div>
            <div className="flex w-full flex-col items-center justify-between md:flex-row">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-semibold">164</h1>
                    <p>Total Tickets</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 items-center  justify-between gap-4 sm:grid-cols-3 md:grid-cols-1">
                  <div className="w-full p-2">
                    <div className="flex items-center gap-3">
                      <Icon
                        icon={FaTicket}
                        height="20px"
                        width="20px"
                        color="#6F63E4"
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#393B63]"
                      />
                      <div>
                        <h1 className="text-lg font-semibold">New Tickets</h1>
                        <h2 className="">142</h2>
                      </div>
                    </div>
                  </div>
                  <div className="w-full p-2">
                    <div className="flex items-center gap-3">
                      <Icon
                        icon={CiCircleCheck}
                        height="23px"
                        width="23px"
                        color="#00CFE8"
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2B3F55]"
                      />
                      <div>
                        <h1 className="text-lg font-semibold">Open Tickets</h1>
                        <h2 className="">28</h2>
                      </div>
                    </div>
                  </div>
                  <div className="w-full p-2">
                    <div className="flex items-center gap-3">
                      <Icon
                        icon={IoMdTime}
                        height="23px"
                        width="23px"
                        color="#EE9543"
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#504448]"
                      />
                      <div>
                        <h1 className="text-lg font-semibold">Open Tickets</h1>
                        <h2 className="">28</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-0 md:-mt-24">
                <StorkedGaugeChart />
              </div>
            </div>
          </div>
        </div>
        {/* third row */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex w-full flex-col gap-3 rounded-lg border-[1px] border-[#484D64] p-6">
            <div>
              <h1 className="text-2xl font-semibold">Sales by Countries</h1>
              <p>Monthly Sales Overview</p>
            </div>
            <div className="flex flex-col gap-4">
              {countriesSaleDetail.map((detail, index) => {
                return (
                  <div
                    key={detail.country}
                    className="flex w-full justify-between"
                  >
                    <div className="flex w-fit items-center gap-3">
                      <div className="flex h-fit w-fit items-center justify-center p-2">
                        <Image
                          src={detail.imgSrc}
                          alt={detail.country}
                          width={60}
                          height={60}
                        />
                      </div>
                      <div className="flex w-full flex-col">
                        <h1 className="text-md font-semibold">
                          ${detail.salePrice}k
                        </h1>
                        <h1 className="text-sm">{detail.country}</h1>
                      </div>
                    </div>
                    {detail.saleRate > 0 ? (
                      <div className="flex w-fit items-center justify-center gap-2 p-2 text-lg font-semibold text-green-500">
                        <IoIosArrowUp />
                        <h1>{detail.saleRate}%</h1>
                      </div>
                    ) : (
                      <div className="flex w-fit items-center justify-center gap-2 p-2 text-lg font-semibold text-red-500">
                        <IoIosArrowDown />
                        <h1>{detail.saleRate * -1}%</h1>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex w-full flex-col rounded-lg border-[1px] border-[#484D64] p-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">Total Earning</h1>
              <div className="flex">
                <h1 className="text-4xl">87%</h1>
                <div className="flex w-fit items-center justify-center gap-0 p-2 text-green-500">
                  <IoIosArrowUp />
                  <h1>25.8%</h1>
                </div>
              </div>
            </div>
            <div>
              <StackedBarChart2 />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex w-full justify-between">
                <div className="flex w-fit items-center gap-3">
                  <div className="flex w-full flex-col">
                    <h1 className="text-md font-semibold">Total Sales</h1>
                    <h1 className="text-sm">Total Sales</h1>
                  </div>
                </div>
                <div className="flex w-fit items-center justify-center gap-2 p-2 text-lg font-semibold text-green-500">
                  <h1>+$98</h1>
                </div>
              </div>
              <div className="flex w-full justify-between">
                <div className="flex w-fit items-center gap-3">
                  <div className="flex w-full flex-col">
                    <h1 className="text-md font-semibold">Total Revenue</h1>
                    <h1 className="text-sm">Client Payment</h1>
                  </div>
                </div>
                <div className="flex w-fit items-center justify-center gap-2 p-2 text-lg font-semibold text-green-500">
                  <h1>+$126</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* fourth row */}
        <ProjectTable />
        {/* fifth row */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          <MyEvents />
          <DynamicClientsMap />
        </div>

        {/* sixth row */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex w-full flex-col gap-3 rounded-lg border-[1px] border-[#484D64] p-6">
            <div>
              <h1 className="text-2xl font-semibold">Monthly Campaign State</h1>
              <p>8.52k Social Visitors</p>
            </div>
            <div className="flex flex-col gap-4">
              {monthlyCampaignState.map((detail, index) => {
                return (
                  <div
                    key={detail.name}
                    className="flex w-full justify-between"
                  >
                    <div className="flex w-full items-center justify-between gap-3">
                      <div className="flex h-fit w-fit items-center justify-center gap-2 p-2">
                        <div
                          style={{
                            backgroundColor: `${darkenHexColorWithOpacity(
                              detail.iconColor,
                              0.3,
                              0.3
                            )}`,
                          }}
                          className="rounded-lg"
                        >
                          <Icon
                            icon={detail.icon}
                            color={detail.iconColor}
                            className={`flex h-10 w-10 items-center justify-center rounded-lg`}
                            height="23px"
                            width="23px"
                          />
                        </div>
                        <h1 className="flex w-fit items-center justify-center gap-2 p-1 text-lg font-semibold">
                          {detail.name}
                        </h1>
                      </div>
                      <div className="flex w-fit gap-2">
                        <h1 className="flex w-fit items-center justify-center gap-2 p-2 text-lg font-semibold">
                          {detail.visitors}
                        </h1>
                        <h1
                          className={`flex w-fit items-center justify-center gap-2 p-2 text-lg font-semibold ${
                            detail.rate > 0 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {detail.rate > 0 ? detail.rate : detail.rate * -1}%
                        </h1>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 rounded-lg border-[1px] border-[#484D64] p-6">
            <div>
              <h1 className="text-2xl font-semibold">Source Visits</h1>
              <p>38.4k Visitors</p>
            </div>
            <div className="flex flex-col gap-4">
              {SourceVisits.map((detail, index) => {
                return (
                  <div
                    key={detail.name}
                    className="flex w-full justify-between"
                  >
                    <div className="flex w-full items-center justify-between gap-3">
                      <div className="flex h-fit w-fit items-center justify-center gap-2 ">
                        <Icon
                          icon={detail.icon}
                          color="#96999F"
                          className={` flex h-10 w-10 items-center justify-center rounded-lg bg-[#424659]`}
                          height="23px"
                          width="23px"
                        />
                        <div className="flex flex-col">
                          <h1 className="flex w-fit items-center justify-center gap-2 p-1 text-lg font-semibold">
                            {detail.name}
                          </h1>
                          <p>{detail.desc}</p>
                        </div>
                      </div>
                      <div className="flex w-fit gap-2">
                        <h1 className="flex w-fit items-center justify-center gap-2 p-2 text-lg font-semibold">
                          {detail.visitors}k
                        </h1>
                        <div className="flex items-center justify-center">
                          <h1
                            className={`flex w-fit items-center justify-center gap-2 rounded-lg px-1 text-lg font-semibold ${
                              detail.rate > 0
                                ? `bg-[#2E4B4F] text-green-500`
                                : `bg-[#4C384B] text-red-500`
                            }`}
                          >
                            {detail.rate > 0 ? `+${detail.rate}` : detail.rate}%
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
