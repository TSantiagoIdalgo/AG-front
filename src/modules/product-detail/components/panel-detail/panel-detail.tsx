 
import CartIcon from '#assets/icons/icon-cart.svg';
import IconCheck from '#assets/icons/icon-check.svg';
import IconClose from '#assets/icons/icon-close.svg';
import FavoriteIcon from '#assets/icons/icon-favorite.svg';
import FavoriteIconActive from '#assets/icons/icon-favorited.svg';
import IconTag from '#assets/icons/icon-tag.svg';
import {Cart} from '#modules/cart/interfaces/cart.interface.ts';
import {Platform, Product} from '#src/common/interfaces/product.interface.ts';
import {CART_ENDPOINT, WISHLIST_ENDPOINT} from '#src/config/endpoints.ts';
import React from 'react';
import * as libs from '../../libs/product-detail-libs';
import {useMutation} from '../../libs/product-detail-libs';
import Style from './panel-detail.module.css';
import { useUserCartCount } from '#modules/core/hooks/use-user-cart-count.ts';
import { debounce } from '#src/common/debounce.ts';
import PanelModal from './panel-modal/panel-modal';

const calculateTotalPrice = (discount: number, price: number): number => {
  const initValue = 100;
  return (initValue - discount) * price / initValue;
};

export default function PanelDetail({product, inWishlist}: { product: Product, inWishlist: boolean }): React.JSX.Element {
  const {platforms, mainImage, name, stock, price, discount} = product;
  const fixedPrice = 2, minStock = 1, timeToRefresh = 80;
  const inStock = stock >= minStock;
  const debounceTime = 300;
  const { refetch, newItemSetted, cart } = useUserCartCount();
  const platformFind = platforms.find(platform => !platform.disabled);
  const [onSelectPlatform, handleOnSelectPlatfrom] = libs.useState(false);
  const {callMutation} = useMutation<Cart>(CART_ENDPOINT.POST.increaseProduct());
  const [isProductInWishlist, setProductIsInWishlist] = libs.useState(inWishlist);
  const [selectedPlatform, setSelectedPlatform] = libs.useState<Platform | undefined>(platformFind);
  const { callMutation: addToWishlist } = useMutation(WISHLIST_ENDPOINT.POST.addProductToWishlist(product.id));
  const { callMutation: removeFromWishlist } = useMutation(WISHLIST_ENDPOINT.DELETE.removeProductFromWishlist(product.id), {
    method: 'DELETE'
  });
  const selectPlatform = (platform: Platform) => {
    setSelectedPlatform(platform);
    setTimeout(() => {
      handleOnSelectPlatfrom(false);
    }, timeToRefresh);
  };

  const handleProductForWishlsit = debounce(async () => {
    if (isProductInWishlist) {
      await removeFromWishlist();
      return setProductIsInWishlist(false);
    } 
    await addToWishlist();
    return setProductIsInWishlist(true);
  }, debounceTime);

  return (
    <div className={Style.content_panel}>
      <img className={Style.content_img} src={mainImage} alt={name}/>
      <div className={Style.content_info}>
        <h1 className={Style.name}>{name}</h1>
        <div className={Style.subinfos}>
          <a href="#">{selectedPlatform?.name}</a>
          <div className={Style.spacer}></div>
          {inStock ? (
            <div className={Style.instock}>
              <img src={IconCheck} alt="check"/>
              <span>En stock</span>
            </div>
          ) : (
            <div className={Style.nostock}>
              <img src={IconClose} alt="close"/>
              <span>Fuera de stock</span>
            </div>
          )}
        </div>
        <div className={Style.select_platform}>
          <div className={onSelectPlatform ? Style.platfrom_select : Style.platform}>
            <span onClick={() => handleOnSelectPlatfrom(!onSelectPlatform)}
              className={Style.selected}>{selectedPlatform?.platform}</span>
            {onSelectPlatform && (
              <div className={Style.platform_options}>
                {platforms.map(plat => <span
                  onClick={() => selectPlatform(plat)}
                  className={selectedPlatform?.name === plat.name ? Style.selectedPlatform : Style.none}
                  key={plat.name}>{plat.platform}</span>)}
              </div>
            )}
          </div>
        </div>
        <div className={Style.amount}>
          <span className={Style.amount_retail}>
            <img src={IconTag} alt="tag"/>
            <span>{price}€</span>
          </span>
          <span className={Style.amount_discounted}>-{discount}%</span>
          <span className={Style.amount_total}>{calculateTotalPrice(discount, price).toFixed(fixedPrice)}€</span>
        </div>
        <div className={Style.buttons}>
          <div 
            className={isProductInWishlist ? Style.buttons_favorite_active : Style.buttons_favorite} 
            title="Añadir a mi wishlist" 
            onClick={handleProductForWishlsit}>
            <img src={isProductInWishlist ? FavoriteIconActive : FavoriteIcon} alt="favorite"/>
          </div>
          <div className={Style.buttons_add} onClick={async () => {
            await callMutation({params: {productId: product.id}});
            await refetch();
          }}>
            <img src={CartIcon} alt="cart"/>
            <span>Añadir a la cesta</span>
          </div>
        </div>
      </div>
      {newItemSetted && <PanelModal getUserCart={refetch} cart={cart}/>}
    </div>
  );
}