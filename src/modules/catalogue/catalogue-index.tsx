import * as Catalogue from './components/catalogue-components';
import * as libs from './libs/catalogue-libs';
import React from 'react';
import Style from './catalogue-index.module.css';
import { useFilterProducts } from './hooks/use-filter-products';

export default function CatalogueIndex(): React.JSX.Element {
  const { loading, data, searchParams } = useFilterProducts();
  const defaultValue = 0, initValue = 1;
  libs.useEffect(() => {
    document.title = 'Resultados';
  }, []);  

  return (
    <section className={Style.catalogue}>
      <Catalogue.FiltersCatalogue/>
      <Catalogue.MainCatalogue searchParams={searchParams} totalElements={data?.totalElements ?? defaultValue} loading={loading} products={data?.content}/>
      { data && data.totalPages > initValue && <Catalogue.PageableCatalogue numberOfPages={data.totalPages}/> }
    </section>
  );
}