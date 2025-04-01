import React, {useEffect} from "react";

export const useOutClick = (ref: React.RefObject<HTMLDivElement>, eventName?: keyof DocumentEventMap) => {
  const [toggle, handleToggle] = React.useState(false);
  const handleClickOutside = (event: Event) => {
    handleToggle(Boolean(ref.current && ref.current.contains(event.target as Node)));
  };

  useEffect(() => {
    document.addEventListener(eventName ?? "click", handleClickOutside);
    return () => {
      document.removeEventListener(eventName ?? "click", handleClickOutside);
    };
  }, []);
  return toggle;
};