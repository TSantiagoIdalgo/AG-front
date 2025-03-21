import BackIcon from '#assets/icons/icon-arrow.svg';
import IconCart from '#assets/icons/icon-cart.svg';
import Button from "#modules/core/components/button/button.tsx";
import React from "react";
import Style from './cart-main-content.module.css';

export default function CartMainContent(): React.JSX.Element {
  return (
    <main className={Style.main_content}>
      <section className={Style.cart_page_container}>
        <article className={Style.cart_page_left}>
          <h2>Cesta</h2>
          <article className={Style.cart_listing}>
            <div className={Style.cart_empty}>
              <img src={IconCart} alt="cart" className={Style.cart_icon}/>
              <h2>Tu cesta esta vacia</h2>
              <span className={Style.content}>No has añadido ningún producto a tu cesta todavía. ¡Navega por la web y encuentra ofertas increíbles!</span>
              <Button text="Descubre juegos" type="button" id={Style.button_content}/>
            </div>
          </article>
        </article>
        <article className={Style.cart_page_right}>
          <h2>Resumen</h2>
          <div className={Style.cart_summary}>
            <div className={Style.summary_row}>
              <span>Precio oficial</span>
              <span>$0</span>
            </div>
            <div className={Style.summary_row}>
              <span>Descuento</span>
              <span>$0</span>
            </div>
            <div className={Style.summary_row_total}>
              <span>Subtotal</span>
              <span>$0</span>
            </div>
            <Button disabled={true} text="Proceder con el pago" type="button" style={{width: '100%'}}/>
            <span className={Style.choice}>O</span>
            <a className={Style.back} href="/ancore">
              <img src={BackIcon} alt="back"/>
              Continuar comprando
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}