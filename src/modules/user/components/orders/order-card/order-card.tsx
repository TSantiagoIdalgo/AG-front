import UUIDBase64 from '#src/common/uuid-base64.ts';
import React from 'react';
import Style from './order-card.module.css';
import { parsePrice } from '#src/common/parse-price.ts';
import { CheckoutItem } from '#src/common/interfaces/checkout.interface.ts';

interface IOrderCard {
  item: CheckoutItem;
}

const OrderCard: React.FC<IOrderCard> = ({ item }) => {
  const base64 = new UUIDBase64(item.product.id);
  const firstPlatform = 0;
  return (
    <figure key={item.id} className={Style.item}>
      <div className={Style.item_info}>
        <a href={`/ancore/${base64.uuidToBase64()}`}>
          <img src={item.product.mainImage} alt={item.product.name} />
        </a>
        <div className={Style.item_info_name}>
          <h2>{item.product.name}</h2>
          <p>Platform: {item.product.platforms.at(firstPlatform)?.name}</p>
        </div>
      </div>
      <p className={Style.item_price}>
        {parsePrice(item.product.price, item.product.discount)}
      </p>
    </figure>
  );
};

export default OrderCard;
