/* eslint-disable max-statements */

import {buildUrl} from '#src/common/build-url.ts';
import {addRequest, removeRequest} from '#src/state/reducers/fetch-queue-slice.ts';
import {IState} from '#src/state/store.ts';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ResponseBody, ResponseData} from '../common/interfaces/fetch-data.interface';

type QueryParams = Record<string, string | number | undefined | boolean | string[]>;

interface FetchData {
  method?: 'POST' | 'PUT' | 'DELETE' | 'GET' | 'PATCH';
  headers?: HeadersInit;
}

interface IMutation<B> {
  id?: string | number;
  query?: QueryParams;
  params?: QueryParams;
  body?: B
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
  const {activeRequests} = useSelector((state: IState) => state.fetchQueue);
  const dispatch = useDispatch();

  const callMutation = async <B>(properties?: IMutation<B>) => {
    dispatch(addRequest(endpoint));
    try {
      setMutation({...initState, loading: true});
      const {method = 'POST', headers} = fetchData || {};
      const {body, id, params, query} = properties || {};
      const url = buildUrl(baseUrl, {endpoint, id, params, querys: query});
      const response = await globalThis.fetch(url, {
        body: body ? JSON.stringify(body) : undefined,
        credentials: 'include',
        headers: {'Content-Type': 'application/json', ...headers},
        method,
      });
      const responseData: ResponseBody<T> = await response.json();
      setMutation({data: responseData, error: undefined, loading: false});
      return responseData;
    } finally {
      dispatch(removeRequest(endpoint));
    }
  };

  return {callMutation, isPending: activeRequests.includes(endpoint), mutation};
};