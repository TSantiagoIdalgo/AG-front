import * as libs from '../libs/landing-libs';
import { IGetAllProducts, Product } from '../interfaces/landing';
import { PRODUCT_ENDPOINT } from '#src/config/endpoints';
import { useFetchData } from '#src/hooks/use-fetch-data';

export const useGetBanners = () => {
  const initIndex = 0;
  const [bannerIndex, setBannerIndex] = libs.useState<number>(initIndex);
  const { loading, data, error } = useFetchData<IGetAllProducts>(PRODUCT_ENDPOINT.GET_FIND_ALL, {
    method: "GET",
    query: { pageNumber: 0, pageSize: 10 }
  });

  libs.useEffect(() => {
    if (!data || !data?.body?.data) return;
    const intervalTime = 30000, maxProductLength = 1, minProductlength = 0;
    // eslint-disable-next-line init-declarations
    let intervalId: NodeJS.Timeout;
    const { content } = data.body.data;
    if (!loading && !error && data && content.length) {
      intervalId = setInterval(() => {
        setBannerIndex((prevIndex) =>
          prevIndex === content.length - maxProductLength ? minProductlength : prevIndex + maxProductLength
        );
      }, intervalTime);
    }
  
    // eslint-disable-next-line consistent-return
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [data, error, loading]);

  if (error) return null;
  if (loading || !data) return null;
  if (!data.body.data?.content) return null;
  
  const banner: Product = data.body.data.content[bannerIndex];
  return banner;
};