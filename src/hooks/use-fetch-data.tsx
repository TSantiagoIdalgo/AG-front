import { FetchData, ResponseBody, ResponseData } from "../common/interfaces/fetch-data.interface";
import { addRequest, removeRequest } from "#src/state/reducers/fetch-queue-slice.ts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ErrorResponse } from "../common/interfaces/fetch-data.interface";
import { IState } from "#src/state/store.ts";
import { buildUrl } from "#src/common/build-url.ts";



const getError = () =>  ({
  error: "INTERNAL_ERROR",
  message: "FAILED_TO_FETCH",
  status: 500,
  timestamp: new Date()
} as ErrorResponse);

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
  const { activeRequests } = useSelector((state: IState) => state.fetchQueue);
  const dispatch = useDispatch();
  const [data, setData] = useState<Partial<ResponseData<T>>>(initState);

  const fetchResponse = async () => {
    setData({ ...initState, loading: true });
    dispatch(addRequest(endpoint));
    try {
      const { method = "GET", body, headers, query, id, params } = fetchData || {};
      const url = buildUrl(baseUrl, { endpoint, id, params, querys: query });
      const response = await globalThis.fetch(url, {
        body: body ? JSON.stringify(body) : null,
        credentials: "include",
        headers: { "Content-Type": "application/json", ...headers },
        method,
      });
      const responseData: ResponseBody<T> = await response.json();
      setData((prev) => ({ ...prev, data: responseData, loading: false }));
    } catch {
      setData((prev) => ({ ...prev, error: getError(), loading: false }));
    } finally {
      dispatch(removeRequest(endpoint));
    }
    
  };

  useEffect(() => {
    fetchResponse();
  }, []);

  return { ...data, isPending: activeRequests.includes(endpoint), refetch: fetchResponse };
};