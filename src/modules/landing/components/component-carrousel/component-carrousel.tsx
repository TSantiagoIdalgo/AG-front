import { GetAllProductsProps } from '#modules/landing/interfaces/landing.js';
import React from 'react';
import Style from './component-carrousel.module.css';
import { useGetBanners } from '#modules/landing/hooks/use-get-banners.ts';

export default function ComponentCarrousel (orderBy: Partial<GetAllProductsProps>): React.JSX.Element {
  const product = useGetBanners(orderBy);
  if (!product) return <div/>;
  const toFixedPrice = 2;
  return (
    <section className={Style.componentCarrousel} style={{backgroundImage: `url(${product?.backgroundImage})`}}>
      <div className={Style.gradient}/>
      <div className={Style.clip_path}/>
      <article className={Style.product_data}>
        <h2>{product.name}</h2>
        <div className={Style.price_data}>
          <span className={Style.discount}>-{product.discount}%</span>
          <span className={Style.price}>${product.price.toFixed(toFixedPrice)}</span>
        </div>
      </article>
    </section>
  );
} 