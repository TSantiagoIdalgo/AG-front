import IconCheck from '#assets/icons/icon-check.svg';
import IconClose from '#assets/icons/icon-close.svg';
import IconTag from '#assets/icons/icon-tag.svg';
import {Platform, Product} from '#src/common/interfaces/product.interface.ts';
import React from 'react';
import * as libs from '../../libs/product-detail-libs';
import Style from './panel-detail.module.css';

const calculateTotalPrice = (discount: number, price: number): number => {
  const initValue = 100;
  return (initValue - discount) * price / initValue;
};
export default function PanelModalDetail({product}: { product: Product, inWishlist: boolean }): React.JSX.Element {
  const {platforms, mainImage, name, stock, price, discount} = product;
  const fixedPrice = 2, minStock = 1, timeToRefresh = 80;
  const inStock = stock >= minStock;
  const platformFind = platforms.find(platform => !platform.disabled);
  const [onSelectPlatform, handleOnSelectPlatfrom] = libs.useState(false);
  const [selectedPlatform, setSelectedPlatform] = libs.useState<Platform | undefined>(platformFind);

  const selectPlatform = (platform: Platform) => {
    setSelectedPlatform(platform);
    setTimeout(() => {
      handleOnSelectPlatfrom(false);
    }, timeToRefresh);
  };

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
      </div>
    </div>
  );
}