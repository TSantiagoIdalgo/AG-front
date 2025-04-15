import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import Style from './cart-index.module.css';
import * as CartComponents from './components/cart-components';


export default function CartIndex(): React.JSX.Element {
  const {pathname} = useLocation();
  useEffect(() => {
    window.document.title = 'Cart';
  }, []);
  return (
    <div className={Style.cart_index}>
      <CartComponents.CartHeader/>
      {pathname.includes('activation') ? <CartComponents.CartMainProductsPay/> : <CartComponents.CartMainContent/>}
    </div>
  );
}

export const CartActivationIndex = (): React.JSX.Element => {
  useEffect(() => {
    window.document.title = 'Activacion';
  }, []);
  return (
    <div className={Style.cart_index}>
      <CartComponents.CartHeader/>
      <CartComponents.CartMainProductsPay/>
    </div>
  );
};