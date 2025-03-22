import arowLeft from '#assets/icons/icon-arrow.svg';
import {ProductCard} from '#modules/core/components/core-index.ts';
import SkeletonCard from '#modules/core/components/skeleton-card/skeleton-card.tsx';
import {GetAllProductsProps} from '#modules/landing/interfaces/landing.js';
import {DataResponse} from '#src/common/interfaces/pageable-data.interface.ts';
import {Product} from '#src/common/interfaces/product.interface.ts';
import {PRODUCT_ENDPOINT} from '#src/config/endpoints.ts';
import React from 'react';
import * as libs from '../../libs/landing-libs';
import Style from './render-sections.module.css';

interface RenderCadsProps {
  filter: Partial<GetAllProductsProps>;
  tittle: string
}

export default function RenderSections({tittle, filter}: RenderCadsProps): React.JSX.Element {
  const {data, loading, error} = libs.useFetchData<DataResponse<Product>>(PRODUCT_ENDPOINT.GET.findAll(), {
    query: {...filter}
  });

  if (error) return <p>{error.message}</p>;
  const skeleton = Array.from({length: filter.pageSize as number}, (_unkown, index) => index);
  return (
    <section className={Style.trends} id={tittle}>
      <section className={Style.trends_render}>
        <div className={Style.trends_title}>
          <h2 className={Style.title}>{tittle}</h2>
          <img src={arowLeft} alt='arrow'/>
        </div>
        <div className={Style.trends_cards}>
          {loading
            ? skeleton.map((index) => <SkeletonCard key={index}/>)
            : data?.body.data?.content.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                discount={product.discount}
                mainImage={product.mainImage}
                trailer={product.trailer}
              />
            ))}
        </div>
      </section>
    </section>
  );
}