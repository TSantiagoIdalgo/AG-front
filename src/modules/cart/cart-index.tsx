import React, {useEffect} from 'react';
import Style from './cart-index.module.css';
import * as CartComponents from './components/cart-components';

export default function CartIndex(): React.JSX.Element {
  useEffect(() => {
    window.document.title = "Cart";
  }, []);
  return (
    <div className={Style.cart_index}>
      <CartComponents.CartHeader/>
      <CartComponents.CartMainContent/>
    </div>
  );
}