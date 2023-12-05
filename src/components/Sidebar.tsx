import React, { useContext } from "react";
import Accordian from "./Accordian";

import { BiHomeSmile, BiUser } from "react-icons/bi";
import { AiOutlineMail, AiFillSetting } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { FaFileInvoiceDollar, FaMapMarkerAlt } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { TbFileInvoice } from "react-icons/tb";
import { LuNewspaper } from "react-icons/lu";
import { AiFillLock } from "react-icons/ai";
import { PiTextboxLight } from "react-icons/pi";
import { MdEventNote, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { BiCommand } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiSightDisabled } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
import { IoBarChartSharp } from "react-icons/io5";
import { IoIosSwitch } from "react-icons/io";
import { BiCube } from "react-icons/bi";
import { SiWebcomponentsdotorg } from "react-icons/si";
import { LiaIdCardSolid } from "react-icons/lia";
import { LiaIconsSolid } from "react-icons/lia";
import { TbClipboardTypography } from "react-icons/tb";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { BiCheckboxChecked } from "react-icons/bi";
import { FaTableList } from "react-icons/fa6";
import { SidebarContext } from "~/contexts/SidebarContext";

import { IoLogoVercel } from "react-icons/io5";
import { TfiClose } from "react-icons/tfi";
import { type IconType } from "react-icons/lib";

type sidebarItemType = {
  head: string;
  icon?: IconType;
  url?: string;
  body?: sidebarItemType[];
};

const sidebarContent: sidebarItemType[] = [
  {
    head: "Dashboards",
    icon: BiHomeSmile,
    body: [
      {
        head: "Analytics",
        url: "/dashboard/Analytics",
      },
      // {
      //   head: "eCommerce",
      // },
      // {
      //   head: "CRM",
      // },
    ],
  },
  {
    head: "Analysis",
    body: [
      {
        head: "Charts",
        icon: IoBarChartSharp,
        body: [
          {
            head: "Apex Chart",
            url: "/charts/ApexChart",
          },
          {
            head: "d3js &Chartjs",
            url: "/charts/Chartjs",
          },
        ],
      },
      {
        head: "Maps",
        icon: FaMapMarkerAlt,
        body: [
          {
            head: "clientsMap",
            url: "/maps/clientsMap",
          },
        ],
      },
      {
        head: "Events",
        icon: MdEventNote,
        body: [
          {
            head: "Events",
            url: "/events/ClientsEvent",
          },
        ],
      },
      {
        head: "Tabular Data",
        icon: MdEventNote,
        body: [
          {
            head: "Project Table",
            url: "/tables/tableData",
          },
        ],
      },
      {
        head: "Courses",
        icon: MdEventNote,
        body: [
          {
            head: "Explore Course",
            url: "/allCourse/CourseList",
          },
        ],
      },
    ],
  },
  {
    head: "Apps & Pages",
    body: [
      {
        head: "Email",
        icon: AiOutlineMail,
      },
      {
        head: "Chat",
        icon: BsChatDots,
      },
      {
        head: "Calender",
        icon: SlCalender,
      },
      {
        head: "Invoice",
        icon: FaFileInvoiceDollar,
        body: [
          {
            head: "List",
          },
          {
            head: "Preview",
          },
          {
            head: "Edit",
          },
          {
            head: "Add",
          },
        ],
      },
      {
        head: "User",
        icon: BiUser,
        body: [
          {
            head: "List",
          },
          {
            head: "View",
          },
        ],
      },
      {
        head: "Roles & Permissions",
        icon: AiFillSetting,
        body: [
          {
            head: "Roles",
          },
          {
            head: "Permissions",
          },
        ],
      },
      {
        head: "Pages",
        icon: TbFileInvoice,
        body: [
          {
            head: "Help Center",
          },
          {
            head: "User Profile",
          },
          {
            head: "Account Settings",
          },
          {
            head: "Pricing",
          },
          {
            head: "FAQ",
          },
          {
            head: "Miscellaneous",
            body: [
              {
                head: "Coming Soon",
              },
              {
                head: "Under Maintenance",
              },
              {
                head: "Page Not Found - 404",
              },
              {
                head: "Not Authorized-401",
              },
              {
                head: "Server Error-500",
              },
            ],
          },
        ],
      },
      {
        head: "Authentication",
        icon: AiFillLock,
        body: [
          {
            head: "Login",
            body: [
              {
                head: "Login V1",
              },
              {
                head: "Login V2",
              },
            ],
          },
          {
            head: "Register",
            body: [
              {
                head: "Register V1",
              },
              {
                head: "Register V2",
              },
              {
                head: "Register Multi-Steps",
              },
            ],
          },
          {
            head: "Verify Email",
            body: [
              {
                head: "Verify Email V1",
              },
              {
                head: "Verify Email V2",
              },
            ],
          },
          {
            head: "Forgot Password",
            body: [
              {
                head: "Forgot Password V1",
              },
              {
                head: "Forgot Password V2",
              },
            ],
          },
          {
            head: "Reset Password",
            body: [
              {
                head: "Reset Password V1",
              },
              {
                head: "Reset Password V2",
              },
            ],
          },
          {
            head: "Two Steps",
            body: [
              {
                head: "Two Steps V1",
              },
              {
                head: "Two Steps V2",
              },
            ],
          },
        ],
      },
      {
        head: "Wizard Examples",
        icon: PiTextboxLight,
        body: [
          {
            head: "Checkout",
          },
          {
            head: "Property Listing",
          },
          {
            head: "Create Deal",
          },
        ],
      },
      {
        head: "Dialog Examples",
        icon: MdOutlineCheckBoxOutlineBlank,
      },
    ],
  },
  {
    head: "UI Elements",
    body: [
      {
        head: "Typography",
        icon: TbClipboardTypography,
      },
      {
        head: "Icons",
        icon: LiaIconsSolid,
      },
      {
        head: "Cards",
        icon: LiaIdCardSolid,
        body: [
          {
            head: "Basic",
          },
          {
            head: "Advance",
          },
          {
            head: "Statistics",
          },
          {
            head: "Widgets",
          },
          {
            head: "Actions",
          },
        ],
      },
      {
        head: "Components",
        icon: SiWebcomponentsdotorg,
        body: [
          {
            head: "Alert",
          },
          {
            head: "Avatar",
          },
          {
            head: "Badge",
          },
          {
            head: "Button",
          },
          {
            head: "Chip",
          },
          {
            head: "Dialog",
          },
          {
            head: "Expansion Panel",
          },
          {
            head: "List",
          },
          {
            head: "Menu",
          },
          {
            head: "Pagination",
          },
          {
            head: "Progress Circular",
          },
          {
            head: "Progress Linear",
          },
          {
            head: "Snackbar",
          },
          {
            head: "Tabs",
          },
          {
            head: "Timeline",
          },
          {
            head: "Tooltip",
          },
        ],
      },
      {
        head: "Extensions",
        icon: BiCube,
        body: [
          {
            head: "Tour",
          },
        ],
      },
    ],
  },
  {
    head: "Forms & Tables",
    body: [
      {
        head: "Form ELements",
        icon: IoIosSwitch,
        body: [
          {
            head: "Autocomplete",
          },
          {
            head: "Checkbox",
          },
          {
            head: "Combobox",
          },
          {
            head: "Date Time Picker",
          },
          {
            head: "File Input",
          },
          {
            head: "Radio",
          },
          {
            head: "Custom Input",
          },
          {
            head: "Range Slider",
          },
          {
            head: "Rating",
          },
          {
            head: "Select",
          },
          {
            head: "Slider",
          },
          {
            head: "Switch",
          },
          {
            head: "Textarea",
          },
          {
            head: "Textfield",
          },
        ],
      },
      {
        head: "Form Layouts",
        icon: TbLayoutSidebarLeftExpand,
      },
      {
        head: "Form Validation",
        icon: BiCheckboxChecked,
      },
      {
        head: "Table",
        icon: FaTableList,
        body: [
          {
            head: "Simple Table",
          },
          {
            head: "Data Table",
          },
        ],
      },
    ],
  },
  {
    head: "Others",
    body: [
      {
        head: "Access Control",
        icon: BiCommand,
      },
      {
        head: "Nav Levels",
        icon: RxHamburgerMenu,
        body: [
          {
            head: "Level 2.1",
          },
          {
            head: "Level 2.2",
          },
        ],
      },
      {
        head: "Disabled Menu",
        icon: GiSightDisabled,
      },
      {
        head: "Raise Support",
        icon: BiSupport,
      },
      {
        head: "Documentation",
        icon: LuNewspaper,
      },
    ],
  },
];

const Sidebar = () => {
  const sidebarContext = useContext(SidebarContext);
  return (
    <div className="z-50 flex-col">
      <div className="flex h-16 flex-row items-center justify-between gap-1 border-b-[1px] border-[#484D64] px-4">
        <span className="flex h-full items-center justify-center gap-2">
          <IoLogoVercel
            style={{ color: "#7367F0", width: "25px", height: "25px" }}
          />
          <h1 className="text-lg font-bold">sudip777sharma</h1>
        </span>
        <span
          className={`flex h-full cursor-pointer items-center justify-center gap-1 xl:hidden `}
          onClick={() => sidebarContext?.setIsSidebarOpen(false)}
        >
          <span className="flex h-full items-center justify-center">[esc]</span>
          <TfiClose />
        </span>
      </div>
      <div className="custom-scrollbar h-[90vh] overflow-auto py-4">
        <Accordian sidebarContent={sidebarContent} depth={0} />
      </div>
    </div>
  );
};

export default Sidebar;
