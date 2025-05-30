import { Cart } from '#modules/cart/interfaces/cart.interface.ts';
import * as libs from '#modules/cart/libs/cart-libs.ts';
import UUIDBase64 from '#src/common/uuid-base64.ts';
import React from 'react';
import Style from './cart-main-products-pay.module.css';
import { useSelector } from 'react-redux';
import { IState } from '#src/state/store.ts';
import { generateGameKey } from '#src/hooks/generate-game-key.ts';

const CartMainProductsPay = (): React.JSX.Element => {
  const [cart, setCart] = libs.useState<Cart>();
  const { newPayment } = useSelector((state: IState) => state.websocket);

  libs.useEffect(() => {
    if (newPayment) setCart(newPayment);
  },[newPayment]);

  return (
    <div className={Style.cart_activation}>
      <span>Thank you for your purchase!</span>
      <p>Activate your games now!</p>
      <div className={Style.cart_activation_container}>
        {cart ? (
          cart.items.map((item) => {
            const base64 = new UUIDBase64(item.product.id);
            const firstPlatform = 0;
            const quantity = Array.from({ length: item.quantity }, (_unknown, index) => index);
            return quantity.map((index) => {
              const id = generateGameKey();
              return (
                <figure key={`${index}-${item.id}}`} className={Style.cart_item}>
                  <div className={Style.item_container}>
                    <div className={Style.cart_item_flex}>
                      <a href={`/ancore/${base64.uuidToBase64()}`}>
                        <img
                          src={item.product.mainImage}
                          alt={item.product.name}
                        />
                      </a>
                      <div className={Style.information}>
                        <span className={Style.title}>{item.product.name}</span>
                        <div className={Style.type}>
                          {item.product.platforms[firstPlatform].name}
                        </div>
                      </div>
                    </div>
                    <div className={Style.code}>Activation code: {id}</div>
                  </div>
                </figure>
              );
            });
          })
        ) : (
          <p>LOADING...</p>
        )}
      </div>
    </div>
  );
};

export default CartMainProductsPay;
