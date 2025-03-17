import { useSearchParams } from "react-router-dom";


export const useChangeSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const updateParams = (newParams: Record<string, string | string[]>) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      currentParams.delete(key);

      if (Array.isArray(value)) {
        value.forEach((val) => currentParams.append(key, val));
      } else {
        currentParams.set(key, value);
      }
    });

    setSearchParams(currentParams);

    return currentParams;
  };

  return { searchParams, setSearchParams, updateParams };
};
