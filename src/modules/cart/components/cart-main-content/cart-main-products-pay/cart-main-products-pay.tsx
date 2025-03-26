import {Cart} from "#modules/cart/interfaces/cart.interface.ts";
import * as libs from "#modules/cart/libs/cart-libs.ts";
import UUIDBase64 from "#src/common/uuid-base64.ts";
import {CART_ENDPOINT} from "#src/config/endpoints.ts";
import React from "react";
import Style from './cart-main-products-pay.module.css';

const CartMainProductsPay = (): React.JSX.Element => {
  const {loading, data} = libs.useFetchData<Cart>(CART_ENDPOINT.GET.getUserCart());
  const navigate = libs.useNavigate();
  const {search} = libs.useLocation();
  libs.useEffect(() => {
    if (!search.includes("cart_id")) navigate("/user/cart");
  }, [search]);
  if (loading || !data?.body.data) return <p></p>;
  const {items} = data.body.data;

  return (
    <div className={Style.cart_activation}>
      <span>Thank you for your purchase!</span>
      <p>Activate your games now!</p>
      <div className={Style.cart_activation_container}>
        {items.map((item) => {
          const base64 = new UUIDBase64(item.product.id);
          const firstPlatform = 0;
          const id = crypto.randomUUID();
          return (
            <figure key={item.id} className={Style.cart_item}>
              <div className={Style.item_container}>
                <div className={Style.cart_item_flex}>
                  <a href={`/ancore/${base64.uuidToBase64()}`}>
                    <img src={item.product.mainImage} alt={item.product.name}/>
                  </a>
                  <div className={Style.information}>
                    <span className={Style.title}>{item.product.name}</span>
                    <div className={Style.type}>{item.product.platforms[firstPlatform].name}</div>
                  </div>
                </div>

                <div className={Style.code}>
                  Activation code: {id}
                </div>
              </div>
            </figure>
          );
        })}
      </div>
    </div>
  );
};

export default CartMainProductsPay;