import React, { createContext, useMemo, useState } from "react";

type PopupBoxContextType = {
    isPopupBoxOpen: boolean;
    setIsPopupBoxOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const PopupBoxContext = createContext<null | PopupBoxContextType>(null);
type props = {
    children: React.ReactNode;
};

export const PopupBoxContextProvider = ({ children }: props) => {
    const [isPopupBoxOpen, setIsPopupBoxOpen] = useState(false);

    // const memoizedContextValue = useMemo(() => ({
    //     isPopupBoxOpen,
    //     setIsPopupBoxOpen,
    // }), [is, setIsPopupBoxOpen]);

    return <PopupBoxContext.Provider value={{ isPopupBoxOpen, setIsPopupBoxOpen}}>
        {children}
    </PopupBoxContext.Provider>
}