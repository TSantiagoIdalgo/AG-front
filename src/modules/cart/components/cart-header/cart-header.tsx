import {CartSecure} from "#modules/cart/components/cart-components.ts";
import React from "react";
import Style from './cart-header.module.css';

export default function CartHeader(): React.JSX.Element {
  return (
    <header className={Style.header}>
      <a href="/ancore" className={Style.logo}></a>
      <CartSecure/>
    </header>
  );
}