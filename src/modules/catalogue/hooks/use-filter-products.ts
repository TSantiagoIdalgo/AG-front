import * as libs from '../libs/catalogue-libs';
import { DataResponse } from '#src/common/interfaces/pageable-data.interface.ts';
import { PRODUCT_ENDPOINT } from '#src/config/endpoints.ts';
import { Product } from '#src/common/interfaces/product.interface.ts';
import { getOrdersTypes } from './get-orders-types';

export const useFilterProducts = () => {
  const [searchParams] = libs.useSearchParams();
  const ordersTypes = getOrdersTypes();
  const initValue = 1;
  const page = parseInt((searchParams.get("page") ?? "1"), 10) - initValue;
  const getArrayOrNull = (query: string | string[]) => query.length ? query : null;

  const getQueryValues = () => {
    const orderType = ordersTypes.find(order => order.visualString === searchParams.get("orderBy"));
    const query = {
      genres: getArrayOrNull(searchParams.getAll("genre")),
      maxPrice: searchParams.get("maxPrice"),
      minPrice: searchParams.get("minPrice"),
      pageNumber: page,
      pageSize: initValue,
      platform: getArrayOrNull(searchParams.getAll("platform")),
      system: getArrayOrNull(searchParams.getAll("system")),
    };

    if (!orderType) return query;

    return { ...query, [orderType.value]: true };
  };

  const { data, loading, refetch } = libs.useFetchData<DataResponse<Product>>(PRODUCT_ENDPOINT.GET.findAll(), {
    query: { ...getQueryValues() }
  });

  libs.useEffect(() => {
    refetch();
  }, [searchParams]);

  return { data: data?.body.data, loading  };
};