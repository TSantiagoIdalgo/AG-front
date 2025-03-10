import React from 'react';
import Style from './skeleton-card.module.css';

const SkeletonCard = (): React.JSX.Element => (
  <figure className={Style.card}>
    <span className={Style.card_img}></span>
    <div className={Style.card_title}>
      <div className={Style.title}></div>
      <span></span>
    </div>
  </figure>
);

export default SkeletonCard;