import { Product } from '#src/common/interfaces/product.interface.ts';
import { ProductCard } from '#modules/core/components/core-index.ts';
import React from 'react';
import Style from './main-catalogue.module.css';

interface IMainCatalogue {
  products: Product[];
  numberOfElements: number;
}

const MainCatalogue: React.FC<IMainCatalogue> = ({ numberOfElements, products }): React.JSX.Element => (
  <main className={Style.mainContent}>
    <div className={Style.wrapper}>
      <h2 className={Style.cuantity_results}>{numberOfElements} Results</h2>
      <div className={Style.items}>
        {products.map((product) => (
          <ProductCard
            discount={product.discount}
            id={product.id}
            mainImage={product.mainImage}
            name={product.name}
            price={product.price}
            trailer={product.trailer}
            key={product.id}
          />
        ))}
      </div>
    </div>
  </main>
);

export default MainCatalogue;