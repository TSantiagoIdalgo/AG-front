import { Checkout } from '#src/common/interfaces/checkout.interface.ts';
import { CHECKOUT_ENDPOINT } from '#src/config/endpoints.ts';
import React from 'react';
import Style from './orders.module.css';
import Masonry from 'react-masonry-css';
import OrderCard from './order-card/order-card';
import * as libs from '#modules/user/libs/user-libs';
import { parsePrice } from '#src/common/parse-price.ts';

const MyOrders = (): React.JSX.Element => {
  const { data, loading } = libs.useFetchData<Checkout[]>(CHECKOUT_ENDPOINT.GET.getUserCheckouts());
  libs.useEffect(() => {
    window.document.title = 'Mis pedidos';
  }, []);
  if (loading || !data?.body) return <p>LOADING...</p>;
  else if (!data.body.data) return <div className={Style.notice}>No tienes compras en este momento</div>;
  const checkouts = data.body.data;
  return (
    <div className={Style.orders}>
      <div className={Style.spacer}></div>
      <h2>Mis pedidos</h2>
      <Masonry breakpointCols={{ 768: 1, default: 2 }} className={Style.checkout_container} columnClassName={Style.checkout_container_column}>
        {checkouts.map(({ id, paymentStatus, total, subTotal, checkoutItems, createdAt }) => (
          <div key={id} className={Style.checkout}>
            <span className={Style.status}><span>{paymentStatus.at(0)?.toUpperCase().concat(paymentStatus.slice(1, paymentStatus.length))}</span></span>
            <div className={Style.items}>
              {checkoutItems.map(({ cartItem }) => <OrderCard key={cartItem.id} item={cartItem}/>)}
            </div>
            <div className={Style.checkout_price}>
              <div className={Style.checkout_price_info}>
                <h2>Subtotal</h2>
                <span>{parsePrice(subTotal)}</span>
              </div>
              <div className={Style.checkout_price_info} id={Style.total}>
                <h2>Total</h2>
                <span>{parsePrice(total)}</span>
              </div>
            </div>
            <button className={Style.checkout_view}>View order</button>
            <div className={Style.checkout_date}>
              <p>{new Intl.DateTimeFormat('es-AR', { dateStyle: 'full' }).format(new Date(createdAt))}</p>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default MyOrders;