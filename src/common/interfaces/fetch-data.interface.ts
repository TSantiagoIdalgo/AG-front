
export type QueryParams = Record<string, string | number | undefined>;
export interface FetchData<B = undefined> {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: B;
  headers?: HeadersInit;
  query?: QueryParams;
};
export interface ErrorResponse {
  error: string;
  message: string;
  status: number;
  timestamp: Date;
}
export interface ResponseBody<T> {
  status?: string;
  body: { data?: T, error: ErrorResponse }
}
export interface ResponseData<T> {
  data?: ResponseBody<T>;
  loading: boolean;
  error?: ErrorResponse;
};