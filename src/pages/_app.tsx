import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Navbar from "~/components/Navbar";
import { PopupBoxContextProvider } from "~/contexts/PopupBoxContext";
import { SidebarContextProvider } from "~/contexts/SidebarContext";
import SidebarTemplate from "~/components/SidebarTemplate";
import Sidebar from "~/components/Sidebar";
import PopupBoxTemplate from "~/components/PopupBoxTemplate";
import SearchPanel from "~/components/SearchPanel";
import { useContext } from "react";
import { ThemeContext, ThemeContextProvider } from "~/contexts/ThemeContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const themeContext = useContext(ThemeContext);
  return (
    <ThemeContextProvider>
      <div
        className={`flex flex-row 
        bg-[#2F3349] text-[#9599B3]
    `}
      >
        <SessionProvider session={session}>
          <SidebarContextProvider>
            <PopupBoxContextProvider>
              <SidebarTemplate>
                <Sidebar />
              </SidebarTemplate>
              <div
                className={`custom-scrollbar flex h-screen w-full flex-col gap-4 overflow-auto
            `}
              >
                <Navbar />
                <PopupBoxTemplate>
                  <SearchPanel />
                </PopupBoxTemplate>
                <Component {...pageProps} />
              </div>
            </PopupBoxContextProvider>
          </SidebarContextProvider>
        </SessionProvider>
      </div>
    </ThemeContextProvider>
  );
};

export default api.withTRPC(MyApp);
