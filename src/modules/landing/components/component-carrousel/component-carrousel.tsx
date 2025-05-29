import {useGetBanners} from '#modules/landing/hooks/use-get-banners.ts';
import {GetAllProductsProps} from '#modules/landing/interfaces/landing.js';
import UUIDBase64 from '#src/common/uuid-base64.ts';
import React from 'react';
import {Link} from 'react-router-dom';
import Style from './component-carrousel.module.css';

export default function ComponentCarrousel(orderBy: Partial<GetAllProductsProps>): React.JSX.Element {
  const product = useGetBanners(orderBy);
  if (!product) return (
    <figure className={Style.card}>
      <span className={Style.card_img}></span>
    </figure>
  );
  const uuidBase64 = new UUIDBase64(product.id);

  const parsePrice = (price: number, discount: number) => {
    const fixedPrice = 2, total = 100;
    const discountedPrice = price - (price * discount) / total;

    return discountedPrice.toFixed(fixedPrice);
  };

  return (
    <Link to={`/${uuidBase64.uuidToBase64()}`}>
      <section className={Style.componentCarrousel} style={{backgroundImage: `url(${product?.backgroundImage})`}}>
        <div className={Style.gradient}/>
        <div className={Style.clip_path}/>
        <article className={Style.product_data}>
          <h2>{product.name}</h2>
          <div className={Style.price_data}>
            <span className={Style.discount}>-{product.discount}%</span>
            <span className={Style.price}>${parsePrice(product.price, product.discount)}</span>
          </div>
        </article>
      </section>
    </Link>
  );
} 