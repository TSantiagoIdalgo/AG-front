import React, { useEffect } from "react";

export const useOutClick = (ref: React.RefObject<HTMLDivElement>) => {
  const [toggle, handleToggle] = React.useState(false);
  const handleClickOutside = (event: MouseEvent) => {
    handleToggle(Boolean(ref.current && ref.current.contains(event.target as Node)));
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return toggle;
};