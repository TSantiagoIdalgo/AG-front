import {useSearchParams} from "react-router-dom";

interface IDeleteParams {
  key: string;
  value?: string | boolean | number
}

export const useChangeSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = (newParams: Record<string, string | string[]>) => {
    const currentParams = new URLSearchParams(window.location.search);
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

  const deleteParams = (keys?: IDeleteParams[]) => {
    const newParams = new URLSearchParams(searchParams);
    if (Array.isArray(keys)) return keys.forEach((keyVal) => {
      if (searchParams.has(keyVal.key)) {
        if (keyVal.value) newParams.delete(keyVal.key, keyVal.value.toString());
        else newParams.delete(keyVal.key);
        setSearchParams(newParams);
      }
    });
    return searchParams.forEach(([key]) => {
      if (searchParams.has(key)) {
        newParams.delete(key);
        setSearchParams(newParams);
      }
    });
  };

  return {deleteParams, searchParams, updateParams};
};
