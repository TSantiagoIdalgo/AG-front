import React, {useEffect, useState} from 'react';

export const useOutClick = (ref: React.RefObject<HTMLDivElement>, eventName?: keyof DocumentEventMap) => {
  const [toggle, handleToggle] = React.useState(false);
  const handleClickOutside = (event: Event) => {
    handleToggle(Boolean(ref.current && ref.current.contains(event.target as Node)));
  };

  useEffect(() => {
    document.addEventListener(eventName ?? 'click', handleClickOutside);
    return () => {
      document.removeEventListener(eventName ?? 'click', handleClickOutside);
    };
  }, []);
  return toggle;
}; 

export const useOutClickExec = (
  ref: React.RefObject<HTMLElement>,
  onOutsideClick: () => void,
  eventName: keyof DocumentEventMap = 'click'
) => {
  const [firstInteraction, setFirstInteraction] = useState(false);
  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onOutsideClick();
    }
  };
  useEffect(() => {
    if (!firstInteraction) {
      setFirstInteraction(true);
      return () => {
        document.removeEventListener(eventName, handleClickOutside);
      };
    }
    document.addEventListener(eventName, handleClickOutside);
    return () => {
      document.removeEventListener(eventName, handleClickOutside);
    };
  }, [ref, onOutsideClick, eventName]);
};
