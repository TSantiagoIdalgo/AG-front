import * as libs from '../../libs/product-detail-libs';
import IconCheck from '#assets/icons/icon-check.svg';
import IconClose from '#assets/icons/icon-close.svg';
import { Product } from "#src/common/interfaces/product.interface.ts";
import React from "react";
import Style from './content-detail.module.css';


export default function ContentDetail({ product }: { product: Product }): React.JSX.Element {
  const {  platforms, mainImage, name, stock } = product;
  const platformFind = platforms.find(platform => !platform.disabled);
  const [selectedPlatform, setSelectedPlatform] = libs.useState(platformFind?.name);
  const [onSelectPlatfrom, handleOnSelectPlatfrom] = libs.useState(false);
  const minStock = 1, timeToRefresh = 80;
  const inStock = stock >= minStock;

  const selectPlatfrom = (platformName: string) => {
    setSelectedPlatform(platformName);
    setTimeout(() => {
      handleOnSelectPlatfrom(false);
    }, timeToRefresh);
  };

  return (
    <section className={Style.content}>
      <div className={Style.content_panel}>
        <img className={Style.content_img} src={mainImage} alt={name} />
        <div className={Style.content_info}>
          <h1 className={Style.name}>{name}</h1>
          <div className={Style.subinfos}>
            <a href="#">{platformFind?.name}</a>
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
              <span onClick={() => handleOnSelectPlatfrom(!onSelectPlatfrom)} className={Style.selected}>{selectedPlatform}</span>
              {onSelectPlatfrom && (
                <div className={Style.platform_options}>
                  {platforms.map(plat => <span 
                    onClick={() => selectPlatfrom(plat.name)} 
                    className={selectedPlatform === plat.name ? Style.selectedPlatform : Style.none} 
                    key={plat.name}>{plat.name}</span>)}
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}