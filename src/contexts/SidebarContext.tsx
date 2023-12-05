import { createContext, useState } from "react";

type SidebarContextType = {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SidebarContext = createContext<SidebarContextType | null>(null);

type propsType = {
  children: React.ReactNode;
};

export const SidebarContextProvider = ({ children }: propsType) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  return (
    <SidebarContext.Provider value={{isSidebarOpen, setIsSidebarOpen}}>{children}</SidebarContext.Provider>
  );
};
