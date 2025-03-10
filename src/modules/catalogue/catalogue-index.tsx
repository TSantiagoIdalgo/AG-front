import * as Catalogue from './components/catalogue-components';
import * as libs from './libs/catalogue-libs';
import React from "react";
import Style from './catalogue-index.module.css';
import { useFilterProducts } from './hooks/use-filter-products';

export default function CatalogueIndex(): React.JSX.Element {
  const { loading, data } = useFilterProducts();
  const initValue = 1;
  libs.useEffect(() => {
    document.title = "Resultados";
  }, []);

  if (loading || !data) return <p>Loading...</p>;

  

  return (
    <section className={Style.catalogue}>
      <Catalogue.FiltersCatalogue/>
      <Catalogue.MainCatalogue numberOfElements={data.totalElements} products={data.content}/>
      { data.totalPages > initValue && <Catalogue.PageableCatalogue numberOfPages={data.totalPages}/> }
    </section>
  );
}