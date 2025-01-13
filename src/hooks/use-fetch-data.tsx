import { FetchData, QueryParams, ResponseBody, ResponseData } from "../common/interfaces/fetch-data.interface";
import { useEffect, useState } from "react";
import { ErrorResponse } from "../common/interfaces/fetch-data.interface";

interface IGetSearchParams {
  query?: QueryParams;
  id?: string | number
}

export const getSearchParams = (baseUrl: string, endpoint: string, params: IGetSearchParams): string => {
  try {
    const url = new URL(`${baseUrl}/${endpoint}`);
    if (params.id) url.href += params.id; 
    if (params.query) {
      Object.entries(params.query).forEach(([key, value]) => {
        if (value) {
          url.searchParams.append(key, value.toString());
        }
      });
    }
    
    return url.toString();
  } catch {
    throw new Error("URL_MALFORMED");
  }
};

export const useFetchData = <T, B = undefined>(
  endpoint: string,
  fetchData?: FetchData<B>,
  baseUrl: string = import.meta.env.VITE_API_URL
) => {
  const initState: Partial<ResponseData<T>> = {
    data: undefined,
    error: undefined,
    loading: false,
  };
  const [data, setData] = useState<Partial<ResponseData<T>>>(initState);

  const fetchResponse = async () => {
    setData({ ...initState, loading: true });
    try {
      const { method = "GET", body, headers, query, id } = fetchData || {};
      const url = getSearchParams(baseUrl, endpoint, { id, query });
      const response = await globalThis.fetch(url, {
        body: body ? JSON.stringify(body) : null,
        credentials: "include",
        headers: { "Content-Type": "application/json", ...headers },
        method,
      });
      const responseData: ResponseBody<T> = await response.json();
      setData((prev) => ({ ...prev, data: responseData, loading: false }));
    } catch {
      const responseError: ErrorResponse = {
        error: "INTERNAL_ERROR",
        message: "FAILED_TO_FETCH",
        status: 500,
        timestamp: new Date()
      };
      setData((prev) => ({ ...prev, error: responseError, loading: false }));
    }
    
  };

  useEffect(() => {
    fetchResponse();
  }, []);

  return { ...data, fetchResponse };
};