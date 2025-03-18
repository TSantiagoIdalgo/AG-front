import React, { useEffect } from 'react';
import { useChangeSearchParams } from '#src/hooks/use-change-search-params.ts';

export const useSetGenres = () => {
  const { deleteParams, searchParams, updateParams } = useChangeSearchParams();
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>(searchParams.getAll("genre") || []);

  useEffect(() => {
    if(selectedOptions.length) updateParams({ genre: selectedOptions });
  }, [selectedOptions.length]);

  const handleOptionSelect = (option: string) => {
    setSelectedOptions((prev) => prev.includes(option) ? prev.filter((op) => op !== option) : [...prev, option]);
    if (searchParams.has("genre", option)) deleteParams([{ key: "genre", value: option }]);
  };

  const handleDeleteOption = () => {
    setSelectedOptions([]);
    deleteParams([{ key: "genre" }]);
  };

  return { handleDeleteOption, handleOptionSelect, selectedOptions };
};