import React, { useEffect } from "react";

export const useOutClick = (ref: React.RefObject<HTMLDivElement>) => {
  const [toggle, handleToggle] = React.useState(false);
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      handleToggle(false);
    } else handleToggle(true);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return toggle;
};