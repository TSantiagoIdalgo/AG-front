 
import IconCheck from '#assets/icons/icon-check.svg';
import IconClose from '#assets/icons/icon-close.svg';
import {Platform, Product} from '#src/common/interfaces/product.interface.ts';
import React from 'react';
import * as libs from '../../libs/product-detail-libs';
import Style from './panel-detail.module.css';
import { RenderDiscount, RenderPrice } from './prices';
import { PlatformEditable } from './platform';

interface PanelModalDetailProps { 
  product: Product, 
  setProductState: React.Dispatch<React.SetStateAction<Product | undefined>>;
  allPlatforms?: Platform[]
}

const calculateTotalPrice = (discount: number, price: number): number => {
  const initValue = 100;
  return (initValue - discount) * price / initValue;
};
export default function PanelModalDetail({product, setProductState, allPlatforms}: PanelModalDetailProps): React.JSX.Element {
  const {platforms, mainImage, name, stock, price, discount} = product;
  const fixedPrice = 2, minStock = 1;
  const inStock = stock >= minStock;
  const platformFind = platforms.find(platform => !platform.disabled);
  const [editInfo, handleEditInfo] = libs.useState(false);
  const [selectedPlatform, setSelectedPlatform] = libs.useState<Platform | undefined>(platformFind);
  
  const onChangeValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: targetName, value } = event.target;
    setProductState((prev) => ({ ...prev, [targetName]: Number.isNaN(value) ? value : Number(value) }) as Product);
  };

  const onEditValue = (setter: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => {
    const time_to_init_edit = 100;
    setTimeout(() => { setter(value);}, time_to_init_edit);
  };

  return (
    <div className={Style.content_panel}>
      <img className={Style.content_img} src={mainImage} alt={name}/>
      <div className={Style.content_info}>
        <input className={Style.name} value={name} name='name' onChange={onChangeValues}/>
        <div className={Style.subinfos}>
          <a href="#">{selectedPlatform ? selectedPlatform?.name : ''}</a>
          <div className={Style.spacer}></div>
          <div onClick={() => onEditValue(handleEditInfo, true)}>
            {inStock ? (
              <div className={Style.instock}>
                <img src={IconCheck} alt="check"/>
                {editInfo 
                  ? <input type='number' className={Style.editStock} onBlur={() => handleEditInfo(false)} min={0} max={100} value={stock} name='stock' onChange={onChangeValues}/> 
                  : <span>En stock</span>}
              </div>
            ) : (
              <div className={Style.nostock}>
                <img src={IconClose} alt="close"/>
                {editInfo 
                  ? <input type='number' className={Style.editStock} onBlur={() => handleEditInfo(false)} min={0} max={100} value={stock} name='stock' onChange={onChangeValues}/> 
                  : <span>Fuera de stock</span>}
              </div>
            )}
          </div>
          
        </div>
        <PlatformEditable 
          allPlatforms={allPlatforms} 
          platforms={platforms} 
          setSelectedPlatform={setSelectedPlatform} 
          selectedPlatform={selectedPlatform} 
          setProductState={setProductState}/>
        <div className={Style.amount}>
          <RenderPrice onChangeValues={onChangeValues} price={price}/>
          <RenderDiscount onChangeValues={onChangeValues} price={discount}/>
          <span className={Style.amount_total}>{calculateTotalPrice(discount, price).toFixed(fixedPrice)}€</span>
        </div>
      </div>
    </div>
  );
}