import IconSecurity from '#assets/icons/icon-security.svg';
import React from "react";
import Style from './cart-secure.module.css';

export default function CartSecure(): React.JSX.Element {
  return (
    <div className={Style.secure}>
      <img src={IconSecurity} alt="icon" className={Style.icon_secure}/>
      <div className={Style.text}>
        <span className={Style.secured}>Pago seguro</span>
        <span className={Style.ssl}>256-bit SSL Secured</span>
      </div>
    </div>
  );
}