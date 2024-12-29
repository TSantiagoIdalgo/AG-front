import * as libs from '../../libs/product-detail-libs';
import { Platform, Product } from '#src/common/interfaces/product.interface.ts';
import CartIcon from '#assets/icons/icon-cart.svg';
import FavoriteIcon from '#assets/icons/icon-favorite.svg';
import IconCheck from '#assets/icons/icon-check.svg';
import IconClose from '#assets/icons/icon-close.svg';
import IconTag from '#assets/icons/icon-tag.svg';
import React from 'react';
import Style from './panel-detail.module.css';

export default function PanelDetail({ product }: { product: Product }): React.JSX.Element {
  const {  platforms, mainImage, name, stock, price, discount } = product;
  const platformFind = platforms.find(platform => !platform.disabled);
  const [selectedPlatform, setSelectedPlatform] = libs.useState<Platform | undefined>(platformFind);
  const [onSelectPlatfrom, handleOnSelectPlatfrom] = libs.useState(false);
  const minStock = 1, timeToRefresh = 80;
  const inStock = stock >= minStock;

  const selectPlatfrom = (platform: Platform) => {
    setSelectedPlatform(platform);
    setTimeout(() => {
      handleOnSelectPlatfrom(false);
    }, timeToRefresh);
  };

  const calculateTotalPrice = (): number => {
    const initValue = 100;
    return (initValue - discount) * price / initValue;
  };
  return (
    <div className={Style.content_panel}>
      <img className={Style.content_img} src={mainImage} alt={name} />
      <div className={Style.content_info}>
        <h1 className={Style.name}>{name}</h1>
        <div className={Style.subinfos}>
          <a href="#">{selectedPlatform?.name}</a>
          <div className={Style.spacer}></div>
          {inStock ? (
            <div className={Style.instock}> 
              <img src={IconCheck} alt="check" />
              <span>En stock</span>
            </div>
          ) : (
            <div className={Style.nostock}>
              <img src={IconClose} alt="close" />
              <span>Fuera de stock</span>
            </div>
          )}
        </div>
        <div className={Style.select_platform}>
          <div className={onSelectPlatfrom ? Style.platfrom_select : Style.platform}>
            <span onClick={() => handleOnSelectPlatfrom(!onSelectPlatfrom)} className={Style.selected}>{selectedPlatform?.platform}</span>
            {onSelectPlatfrom && (
              <div className={Style.platform_options}>
                {platforms.map(plat => <span 
                  onClick={() => selectPlatfrom(plat)} 
                  className={selectedPlatform?.name === plat.name ? Style.selectedPlatform : Style.none} 
                  key={plat.name}>{plat.platform}</span>)}
              </div>
            )}
          </div>
        </div>
        <div className={Style.amount}>
          <span className={Style.amount_retail}>
            <img src={IconTag} alt="tag" />
            <span>{price}€</span>
          </span>
          <span className={Style.amount_discounted}>-{discount}%</span>
          <span className={Style.amount_total}>{calculateTotalPrice()}€</span>
        </div>
        <div className={Style.buttons}>
          <div className={Style.buttons_favorite} title="Añadir a mi wishlist">
            <img src={FavoriteIcon} alt="favorite" />
          </div>
          <div className={Style.buttons_add}>
            <img src={CartIcon} alt="cart" />
            <span>Añadir a la cesta</span>
          </div>
        </div>
      </div>
    </div>
  );
}