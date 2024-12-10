import * as libs from '../../libs/libs';
import { Product } from '#src/common/interfaces/product.interface.ts';
import React from 'react';
import Style from './product-card.module.css';

type TProductCard = Pick<Product, 'name' | 'price' | 'discount' | 'mainImage' | 'trailer' | 'id'>

export default  function ProductCard ({ id, name, price, discount, mainImage, trailer }: TProductCard): React.JSX.Element {
  const [onMouseEnter, setOnMouseEnter] = libs.useState(false);

  const mouseEnter = () => {
    setOnMouseEnter(!onMouseEnter);
  };

  const parsePrice = (num: number) => {
    const fixedPrice = 2, isPar = 1, sliceString = -1, toZero = 0;
    const number = num.toString();
    let numberString = parseFloat(number).toFixed(fixedPrice);
    if (num % isPar === toZero) return numberString;
    while (numberString.endsWith('0')) {
      numberString = numberString.slice(fixedPrice, sliceString);
    }
    return numberString;
  };

  return (
    <figure className={Style.card}>
      <a href={`/ancore/${id}`} className={Style.card_url} onMouseEnter={mouseEnter} onMouseLeave={mouseEnter}>
        <img src={mainImage} alt={name} className={Style.card_img}/>
        <video preload='none' loop autoPlay muted playsInline className={Style.card_video}>
          <source src={trailer} type='video/webm'/>
        </video>
        <span className={Style.discount} hidden={onMouseEnter}>-{discount}%</span>
      </a>
      <div className={Style.card_title}>
        <h2>{name}</h2>
        <span>${parsePrice(price)}</span>
      </div>
    </figure>
  );
}