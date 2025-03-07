import * as Catalogue from './components/catalogue-components';
import * as libs from './libs/catalogue-libs';
import { DataResponse } from '#src/common/interfaces/pageable-data.interface.ts';
import { PRODUCT_ENDPOINT } from '#src/config/endpoints.ts';
import { Product } from '#src/common/interfaces/product.interface.ts';
import React from "react";
import Style from './catalogue-index.module.css';

export default function CatalogueIndex(): React.JSX.Element {
  const [searchParams] = libs.useSearchParams();
  const initValue = 1;
  const page = parseInt((searchParams.get("page") ?? "1"), 10) - initValue;
  const { data, loading, error, refetch } = libs.useFetchData<DataResponse<Product>>(PRODUCT_ENDPOINT.GET.findAll(), {
    query: { pageNumber: page, pageSize: 1 }
  });

  libs.useEffect(() => {
    document.title = "Resultados";
  }, []);

  libs.useEffect(() => {
    refetch();
  }, [page]);

  if (!data || !data.body.data || loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <section className={Style.catalogue}>
      <Catalogue.FiltersCatalogue/>
      <Catalogue.MainCatalogue numberOfElements={data.body.data.totalElements} products={data.body.data.content}/>
      <Catalogue.PageableCatalogue numberOfPages={data.body.data.totalPages}/>
    </section>
  );
}