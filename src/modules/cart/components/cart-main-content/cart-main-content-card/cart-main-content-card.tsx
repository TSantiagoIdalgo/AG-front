import ArrowIcon from '#assets/icons/icon-arrow.svg';
import DeleteIcon from "#assets/icons/icon-delete.svg";
import {useQuantityItem} from "#modules/cart/hooks/use-quantity-item.ts";
import {Platform} from "#src/common/interfaces/product.interface.ts";
import UUIDBase64 from "#src/common/uuid-base64.ts";
import React from "react";
import Style from './cart-main-content-card.module.css';

interface ICartMainContentCard {
  productId: string;
  itemId: string;
  productMainImage: string;
  productName: string;
  productPlatforms: Platform[];
  productPrice: number;
  productDiscount: number;
  quantity: number;
  productStock: number;
  refetch: () => Promise<void>;
}

const CartMainContentCard: React.FC<ICartMainContentCard> = ({
  productId,
  productMainImage,
  productName,
  productPlatforms,
  itemId,
  productPrice,
  productDiscount,
  quantity,
  productStock,
  refetch
}) => {
  const firstPlatform = 0;
  const {onDecreaseItem, onIncreaseItem, onRemoveItem} = useQuantityItem(productId, refetch);
  const base64 = new UUIDBase64(productId);
  const parsePrice = () => {
    const fixedPrice = 2, total = 100;
    const discountedPrice = productPrice - (productPrice * productDiscount) / total;

    return discountedPrice.toFixed(fixedPrice);
  };

  return (
    <figure key={itemId} className={Style.cart_item}>
      <div className={Style.item_container}>
        <a href={`/ancore/${base64.uuidToBase64()}`}>
          <img src={productMainImage} alt={productName}/>
        </a>
        <div className={Style.information}>
          <span className={Style.title}>{productName}</span>
          <div className={Style.type}>{productPlatforms[firstPlatform].name}</div>
          <div className={Style.actions}>
            <img src={DeleteIcon} className={Style.deleteItem} onClick={onRemoveItem} alt="delete"/>
            <span className={Style.moveToWishlist}>Mover a la lista de deseos</span>
          </div>
        </div>
        <div className={Style.price_container}>
          <div className={Style.price}>${parsePrice()}</div>
          <div className={Style.quantity_container}>
            <button type="button" className={Style.quantity_decrease} onClick={onDecreaseItem}>
              <img src={ArrowIcon} alt="arrow"/>
            </button>
            <span>{quantity}</span>
            <button type="button" className={Style.quantity_increase} onClick={onIncreaseItem}
              disabled={quantity === productStock}>
              <img src={ArrowIcon} alt="arrow"/>
            </button>
          </div>
        </div>
      </div>
    </figure>
  );
};

export default CartMainContentCard;