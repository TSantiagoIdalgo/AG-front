import {Product} from '#src/common/interfaces/product.interface.ts';
import UUIDBase64 from '#src/common/uuid-base64.ts';
import React from 'react';
import * as libs from '../../libs/libs';
import Style from './product-card.module.css';


type TProductCard = Pick<Product, 'name' | 'price' | 'discount' | 'mainImage' | 'trailer' | 'id'> & { onDelete?: () => Promise<void> }

export default function ProductCard({id, name, price, discount, mainImage, trailer, onDelete}: TProductCard): React.JSX.Element {
  const [onMouseEnter, setOnMouseEnter] = libs.useState(false);
  const base64 = new UUIDBase64(id);
  const mouseEnter = () => {
    setOnMouseEnter(!onMouseEnter);
  };

  const parsePrice = () => {
    const fixedPrice = 2, total = 100;
    const discountedPrice = price - (price * discount) / total;

    return discountedPrice.toFixed(fixedPrice);
  };

  return (
    <figure className={Style.card}>
      {onDelete ? <span className={Style.delete} onClick={onDelete}>X</span> : null}
      <a href={`/ancore/${base64.uuidToBase64()}`} className={Style.card_url} onMouseEnter={mouseEnter}
        onMouseLeave={mouseEnter}>
        <img src={mainImage} alt={name} className={Style.card_img}/>
        <video preload='none' loop autoPlay muted playsInline className={Style.card_video}>
          <source src={trailer} type='video/webm'/>
        </video>
        <span className={Style.discount} hidden={onMouseEnter}>-{discount}%</span>
      </a>
      <div className={Style.card_title}>
        <h2>{name}</h2>
        <span>${parsePrice()}</span>
      </div>
    </figure>
  );
}