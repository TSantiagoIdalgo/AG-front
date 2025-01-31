import * as Catalogue from './components/catalogue-components';
import React from "react";
import Style from './catalogue-index.module.css';

export default function CatalogueIndex(): React.JSX.Element {

  return (
    <section className={Style.catalogue}>
      <Catalogue.FiltersCatalogue/>
    </section>
  );
}