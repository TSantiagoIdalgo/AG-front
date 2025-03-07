import * as Catalogue from './components/catalogue-components';
import * as libs from './libs/catalogue-libs';
import React from "react";
import Style from './catalogue-index.module.css';

export default function CatalogueIndex(): React.JSX.Element {

  libs.useEffect(() => {
    document.title = "Resultados";
  }, []);

  return (
    <section className={Style.catalogue}>
      <Catalogue.FiltersCatalogue/>
      <Catalogue.MainCatalogue/>
    </section>
  );
}