import IconCart from '#assets/icons/icon-cart.svg';
import CartMainContentCard
  from "#modules/cart/components/cart-main-content/cart-main-content-card/cart-main-content-card.tsx";
import CartMainResume from "#modules/cart/components/cart-main-content/cart-main-resume/cart-main-resume.tsx";
import {Cart} from "#modules/cart/interfaces/cart.interface.ts";
import * as libs from '#modules/cart/libs/cart-libs';
import Button from "#modules/core/components/button/button.tsx";
import {CART_ENDPOINT} from "#src/config/endpoints.ts";
import React, {useMemo} from "react";
import Style from './cart-main-content.module.css';

const CartEmpty = () => (
  <div className={Style.cart_empty}>
    <img src={IconCart} alt="cart" className={Style.cart_icon}/>
    <h2>Tu cesta esta vacia</h2>
    <span className={Style.content}>No has añadido ningún producto a tu cesta todavía. ¡Navega por la web y encuentra ofertas increíbles!</span>
    <a href="/ancore">
      <Button text="Descubre juegos" type="button" id={Style.button_content}/>
    </a>
  </div>
);

export default function CartMainContent(): React.JSX.Element {
  const fixedPrice = 2, initValue = 0, totalPercentage = 100;
  const {loading, data} = libs.useFetchData<Cart>(CART_ENDPOINT.GET.getUserCart());

  const totalDiscount = useMemo(() => data?.body.data?.items.reduce((acc, item) => {
    const discountedPrice = (item.product.price * item.product.discount) / totalPercentage;
    return acc + discountedPrice;
  }, initValue), [data?.body.data?.total]);

  if (loading || !data?.body.data) return <div></div>;
  const {items, subtotal, total} = data.body.data;

  return (
    <main className={Style.main_content}>
      <section className={Style.cart_page_container}>
        <article className={Style.cart_page_left}>
          <h2>Cesta</h2>
          <article className={Style.cart_listing}>
            {items.length ? (
              items.map((item) =>
                <CartMainContentCard
                  productMainImage={item.product.mainImage}
                  itemId={item.id}
                  productName={item.product.name}
                  productPlatforms={item.product.platforms}
                  productId={item.product.id}
                  key={item.id}
                  productPrice={item.product.price}
                  productDiscount={item.product.discount}/>)
            ) : <CartEmpty/>}
          </article>
        </article>
        <CartMainResume subtotal={subtotal.toFixed(fixedPrice)} totalPrice={total.toFixed(fixedPrice)}
          discount={totalDiscount ? totalDiscount.toFixed(fixedPrice) : "0.00"}/>
      </section>
    </main>
  );
}