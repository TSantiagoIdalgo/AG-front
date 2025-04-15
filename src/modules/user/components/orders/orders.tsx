import { Checkout } from '#src/common/interfaces/checkout.interface.ts';
import { CHECKOUT_ENDPOINT } from '#src/config/endpoints.ts';
import { useFetchData } from '#src/hooks/use-fetch-data.tsx';
import React from 'react';
import Style from './orders.module.css';
import UUIDBase64 from '#src/common/uuid-base64.ts';

const MyOrders = (): React.JSX.Element => {
  const { data, loading } = useFetchData<Checkout[]>(CHECKOUT_ENDPOINT.GET.getUserCheckouts());
  if (loading || !data?.body) return <p>LOADING...</p>;
  else if (!data.body.data) return <p>{data.body.error.message}</p>;
  const checkouts = data.body.data;
  return (
    <div className={Style.orders}>
      <div className={Style.spacer}></div>
      <h2>Mis pedidos</h2>
      {checkouts.map(checkout => (
        <div key={checkout.id}>
          <span>{checkout.stripePaymentId}</span>
          {checkout.checkoutItems.map(({ cartItem: item }) => {
            const base64 = new UUIDBase64(item.product.id);
            return (
              <figure key={item.id} className={Style.cart_item}>
                <a href={`/ancore/${base64.uuidToBase64()}`}>
                  <img
                    src={item.product.mainImage}
                    alt={item.product.name}
                  />
                </a>
              </figure>
            );
          }).slice(0, 4)}
        </div>
      ))}
      <div className={Style.notice}>No tienes compras en este momento</div>
    </div>
  );
};

export default MyOrders;