import { Product } from '#src/common/interfaces/product.interface.ts';
import React from 'react';
import Style from './header-detail.module.css';

type ProductDetail = Pick<Product, 'backgroundImage' | 'name'>

export default function HeaderDetail ({ backgroundImage, name }: ProductDetail): React.JSX.Element {
  return (
    <div className={Style.header_detail}>
      <div className={Style.header_gradient}/>
      <picture className={Style.header_parallax}>
        <img src={backgroundImage} alt={name} />
      </picture>
    </div>
  );
}