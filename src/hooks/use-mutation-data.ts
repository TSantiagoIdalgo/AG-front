
import { ResponseBody, ResponseData } from "../common/interfaces/fetch-data.interface";
import { getSearchParams } from "./use-fetch-data";
import { useState } from "react";

type QueryParams = Record<string, string | number | undefined | boolean | string[]>;
interface FetchData {
  method?: "POST" | "PUT" | "DELETE";
  headers?: HeadersInit;
};

interface IMutation<B> {
    id?: string | number;
    query?: QueryParams;
    body: B
}
export const useMutation = <T>(
  endpoint: string,
  fetchData?: FetchData,
  baseUrl: string = import.meta.env.VITE_API_URL
) => {
  const initState: ResponseData<T> = {
    data: undefined,
    error: undefined,
    loading: false,
  };
  const [mutation, setMutation] = useState<ResponseData<T>>(initState);

  const callMutation = async <B>(properties: IMutation<B>) => {
    if (!properties.body) throw new Error("Body required");
    setMutation({ ...initState, loading: true });
    const { method = "POST", headers } = fetchData || {};
    const url = getSearchParams(baseUrl, endpoint, { id: properties.id, query: properties.query });
    const response = await globalThis.fetch(url, {
      body: JSON.stringify(properties.body),
      credentials: "include",
      headers: { "Content-Type": "application/json", ...headers },
      method,
    });
    const responseData: ResponseBody<T> = await response.json();
    setMutation({ data: responseData, error: undefined, loading: false });
    return responseData;
  };

  return { callMutation, mutation };
};