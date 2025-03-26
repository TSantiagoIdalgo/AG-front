import IconCheck from '#assets/icons/icon-check.svg';
import React, {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Style from './cart-main-progress.module.css';

export default function CartMainProgress(): React.JSX.Element {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!pathname.includes("cart") && !pathname.includes("activation")) navigate("/user/cart");
  }, [pathname]);
  return (
    <div className={Style.progress_bar}>
      {/* eslint-disable-next-line no-nested-ternary */}
      <div id={pathname.includes("cart") ? Style.active : pathname.includes("activation") ? Style.done : ""}
        className={Style.step}>
        <span className={Style.number}>
          {pathname.includes("activation")
            ? <img src={IconCheck} alt="check"/>
            : "1"}
        </span>
        <span className={Style.text}>Cesta</span>
        <span className={Style.spacer}></span>
      </div>
      <div className={Style.step} id={pathname.includes("activation") ? Style.done : ""}>
        <span className={Style.number}>
          {pathname.includes("activation")
            ? <img src={IconCheck} alt="check"/>
            : "2"}
        </span>
        <span className={Style.text}>Pago</span>
        <span className={Style.spacer}></span>
      </div>
      <div className={Style.step} id={pathname.includes("activation") ? Style.finish : ""}>
        <span className={Style.number}>3</span>
        <span className={Style.text}>Activación del juego</span>
      </div>
    </div>
  );
}