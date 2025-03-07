import * as libs from '#modules/catalogue/libs/catalogue-libs';
import React from "react";
import Style from './filters-price.module.css';

const FiltersPrice = (): React.JSX.Element => {
  const [searchParams, setSearchParams] = libs.useSearchParams();
  const [prices, setPrices] = libs.useState<{ minPrice?: number, maxPrice?: number }>({
    maxPrice: undefined,
    minPrice: undefined
  });

  const onChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const isNumber = !Number.isNaN(parseInt(value, 10));
    if (isNumber || !value.length) {
      const parseValue = value.length ? parseInt(value, 10) : undefined;
      setPrices((prev) => ({ ...prev, [name]: parseValue }));
      if (parseValue) searchParams.set(name, parseValue.toString());
      else searchParams.delete(name);
      setSearchParams(searchParams);
    }
  };

  return (
    <div className={Style.price}>
      <span>Entre</span>
      <input name='minPrice' placeholder='0' id='minPrice' value={prices.minPrice} onChange={onChangePrice} type="text" className={Style.input}/>
      <span>y</span>
      <input name='maxPrice' placeholder='200' value={prices.maxPrice} onChange={onChangePrice} type="text" className={Style.input} />
      <span>$</span>
    </div>
  );
};

export default FiltersPrice;