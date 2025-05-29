import { Product } from '#src/common/interfaces/product.interface.ts';
import { ProductCard } from '#modules/core/components/core-index.ts';
import React from 'react';
import SkeletonCard from '#modules/core/components/skeleton-card/skeleton-card.tsx';
import Style from './main-catalogue.module.css';

interface IMainCatalogue {
  products?: Product[];
  totalElements: number;
  loading: boolean;
  searchParams: URLSearchParams
}

const MainCatalogue: React.FC<IMainCatalogue> = ({ totalElements, products, loading, searchParams }): React.JSX.Element => {
  const skeleton = Array.from({ length: 60 }, (_unknow, index) => index);
  const getTitle = () => {
    if (searchParams.has('developer')) return `Desarrollador ${searchParams.get('developer')}`;
    else if (searchParams.has('distributor')) return `Distribuidor ${searchParams.get('distributor')}`;
    return `${totalElements} Resultados`;
  };
  return (
    (
      <main className={Style.mainContent}>
        <div className={Style.wrapper}>
          <h2 className={Style.cuantity_results}>{getTitle()}</h2>
          <div className={Style.items}>
            {loading
              ? skeleton.map((index) => <SkeletonCard key={index}/>)
              : products?.map((product) => (
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
    )
  );
};

export default MainCatalogue;