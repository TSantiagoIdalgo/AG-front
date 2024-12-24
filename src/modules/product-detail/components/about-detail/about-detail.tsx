import { Product } from "#src/common/interfaces/product.interface.ts";
import React from "react";
import Style from './about-detail.module.css';

type TAboutDetail = Pick<Product, "description">

export default function AboutDetail({ description }: TAboutDetail): React.JSX.Element {
  return (
    <div className={Style.details}>
      <section className={Style.about}>
        <div>
          <div className={Style.headline}>
            <h2>Acerca de</h2>
          </div>  
        </div>
        <div className={Style.text_readable}>
          {description}
        </div>
      </section>
      <section className={Style.specifics}>

      </section>
    </div>
  );
}