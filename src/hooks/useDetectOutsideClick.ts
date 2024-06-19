import { useEffect, useRef } from "react";

const useDetectOutsideClick = (close: () => void) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        close();
      }
    };

    const closeEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };
    document.addEventListener("keydown", closeEsc);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", closeEsc, true);
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [close]);

  return { modalRef };
};

export default useDetectOutsideClick;
