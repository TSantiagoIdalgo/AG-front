import React from 'react';
import Style from './panel-detail.module.css';
import * as libs from '../../libs/product-detail-libs';
import IconTag from '#assets/icons/icon-tag.svg';

interface RenderPriceProps {
    price: number, onChangeValues: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const RenderPrice: React.FC<RenderPriceProps> = ({ onChangeValues, price }): React.JSX.Element => {
  const spanRef = libs.useRef<HTMLSpanElement>(null);
  const inputRef = libs.useRef<HTMLInputElement>(null);
  libs.useEffect(() => {
    const span = spanRef.current;
    const input = inputRef.current;
    const newWith = 20;
    if (span && input) {
      input.style.width = `${span.offsetWidth + newWith}px`;
    }
  }, [price]);

  return (
    <span className={Style.amount_retail}>
      <div style={{alignItems: 'center', display: 'flex'}}>
        <img src={IconTag} alt="tag"/>
        <input ref={inputRef} className={Style.price} type='number' value={price} min={0} name='price' onChange={onChangeValues}/>
        <span>€</span>
      </div>
      <span
        ref={spanRef}
        style={{
          font: 'inherit',
          left: 0,
          position: 'absolute',
          top: 0,
          visibility: 'hidden',
          whiteSpace: 'pre',
        }}
      >
        {price || ' '}
      </span>
    </span>
  );
};

export const RenderDiscount: React.FC<RenderPriceProps> = ({ onChangeValues, price }): React.JSX.Element => {
  const spanRef = libs.useRef<HTMLSpanElement>(null);
  const inputRef = libs.useRef<HTMLInputElement>(null);
  libs.useEffect(() => {
    const span = spanRef.current;
    const input = inputRef.current;
    if (Number(input?.value) === 100) return;
    const newWith = 20;
    if (span && input) {
      input.style.width = `${span.offsetWidth + newWith}px`;
    }
  }, [price]);

  return (
    <span className={Style.amount_discounted}>
      <div style={{alignItems: 'center', display: 'flex'}}>
        <span>-</span>
        <input ref={inputRef} className={Style.discount} type='number' value={price} min={0} max={100} name='discount' onChange={onChangeValues}/>
        <span>%</span>
      </div>
      <span
        ref={spanRef}
        style={{
          font: 'inherit',
          left: 0,
          position: 'absolute',
          top: 0,
          visibility: 'hidden',
          whiteSpace: 'pre',
        }}
      >
        {price || ' '}
      </span>
    </span>
  );
};