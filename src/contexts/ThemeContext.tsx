import React, { createContext, useMemo, useState } from "react";

type ThemeContextType = {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ThemeContext = createContext<null | ThemeContextType>(null);
type props = {
  children: React.ReactNode;
};

export const ThemeContextProvider = ({ children }: props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // const memoizedContextValue = useMemo(() => ({
  //     isPopupBoxOpen,
  //     setIsPopupBoxOpen,
  // }), [is, setIsPopupBoxOpen]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
