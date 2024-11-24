import { FetchData, QueryParams, ResponseBody, ResponseData } from "../common/interfaces/fetch-data.interface";
import { useEffect, useRef, useState } from "react";
import { ErrorResponse } from "../common/interfaces/fetch-data.interface";

const getSearchParams = (baseUrl: string, endpoint: string, query?: QueryParams): string => {
  try {
    const url = new URL(`${baseUrl}/${endpoint}`);
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
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
  const [data, setData] = useState<ResponseData<T>>();
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchResponse = async () => {
    try {
      const { method = "GET", body, headers, query } = fetchData || {};
      const url = getSearchParams(baseUrl, endpoint, query);
      const controller = new AbortController();
      abortControllerRef.current = controller;
      const response = await globalThis.fetch(url, {
        body: body ? JSON.stringify(body) : null,
        credentials: "include",
        headers: { "Content-Type": "application/json", ...headers },
        method,
        signal: controller.signal
      });
      const responseData: ResponseBody<T> = await response.json();
      setData({ data: responseData, loading: false });
    } catch {
      const responseError: ErrorResponse = {
        error: "INTERNAL_ERROR",
        message: "FAILED_TO_FETCH",
        status: 500,
        timestamp: new Date()
      };
      setData({ error: responseError, loading: false });
    }
    
  };

  useEffect(() => {
    setData({ loading: true });
    fetchResponse();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [endpoint, fetchData?.method, fetchData?.body, fetchData?.query, baseUrl]);

  return data;
};