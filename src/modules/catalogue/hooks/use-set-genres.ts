import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSetGenres = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>(searchParams.getAll("genre") || []);

  useEffect(() => {
    if(selectedOptions.length) {
      const newParams = new URLSearchParams(searchParams);
      selectedOptions.forEach(value => {
        if (!newParams.has("genre", value)) newParams.append("genre", value);
      });
      setSearchParams(newParams);
    }
  }, [selectedOptions.length]);

  const handleOptionSelect = (option: string) => {
    setSelectedOptions((prev) => prev.includes(option) ? prev.filter((op) => op !== option) : [...prev, option]);
    const params = new URLSearchParams(searchParams);
    if (params.has("genre", option)) params.delete("genre", option);
    setSearchParams(params);
  };

  const handleDeleteOption = () => {
    const params = new URLSearchParams(searchParams);
    setSelectedOptions([]);
    params.delete("genre");
    setSearchParams(params);
  };

  return { handleDeleteOption, handleOptionSelect, selectedOptions };
};