import * as libs from '../../libs/landing-libs';
import { GetAllProductsProps, IGetAllProducts } from '#modules/landing/interfaces/landing.js';
import { PRODUCT_ENDPOINT } from '#src/config/endpoints.ts';
import ProductCard from '../product-card/product-card';
import React from 'react';
import Style from './render-sections.module.css';
import arowLeft from '#assets/icons/icon-arrow.svg';

interface RenderCadsProps {
    filter: Partial<GetAllProductsProps>;
    tittle: string
}

export default function RenderSections ({ tittle, filter }: RenderCadsProps): React.JSX.Element {
  const { data, loading, error } = libs.useFetchData<IGetAllProducts>(PRODUCT_ENDPOINT.GET_FIND_ALL, {
    query: { ...filter }
  });
  
  if (!data || !data.body.data || loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <section className={Style.trends}>
      <section className={Style.trends_render}>
        <div className={Style.trends_title}>
          <h2 className={Style.title}>{tittle}</h2>
          <img src={arowLeft} alt='arrow'/>
        </div>
        <div className={Style.trends_cards}>
          {data.body.data.content.map(product => (
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