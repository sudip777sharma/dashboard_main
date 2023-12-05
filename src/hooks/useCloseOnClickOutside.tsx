import {
  useEffect,
  type RefObject,
} from "react";

const useCloseOnClickOutside = <T extends HTMLElement>(
  closeComponent: () => void,
  componentRef: RefObject<T>
): void => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (componentRef.current && componentRef.current.contains(event.target as Node) === false) {
        closeComponent();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeComponent();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [componentRef, closeComponent]);
};

export default useCloseOnClickOutside;
