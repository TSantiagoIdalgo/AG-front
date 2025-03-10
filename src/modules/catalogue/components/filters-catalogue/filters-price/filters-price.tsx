import * as libs from '#modules/catalogue/libs/catalogue-libs';
import React from "react";
import Style from './filters-price.module.css';
import reloadIcon from '#assets/icons/icon-reload.svg';

const FiltersPrice = (): React.JSX.Element => {
  const [searchParams, setSearchParams] = libs.useSearchParams();
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const [prices, setPrices] = libs.useState<{ minPrice: string, maxPrice: string }>({
    maxPrice: maxPrice ? maxPrice : "",
    minPrice: minPrice ? minPrice : ""
  });

  const onChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const isNumber = !Number.isNaN(parseInt(value, 10));
    if (isNumber || !value.length) {
      const setQueryTime = 1000;
      setPrices((prev) => ({ ...prev, [name]: value }));

      setTimeout(() => {
        if (value) searchParams.set(name, value);
        else searchParams.delete(name);
        setSearchParams(searchParams);
      }, setQueryTime);
    }
  };

  const resetPrices = () => {
    if (searchParams.has("minPrice")) searchParams.delete("minPrice");
    if (searchParams.has("maxPrice")) searchParams.delete("maxPrice");
    setSearchParams(searchParams);
    setPrices({ maxPrice: "", minPrice: "" });
  };

  return (
    <div className={Style.price}>
      <span>Entre</span>
      <input name='minPrice' placeholder='0' id='minPrice' value={prices.minPrice} onChange={onChangePrice} type="text" className={Style.input}/>
      <span>y</span>
      <input name='maxPrice' placeholder='200' value={prices.maxPrice} onChange={onChangePrice} type="text" className={Style.input} />
      <span>$</span>
      {Boolean(prices.minPrice || prices.maxPrice) && (
        <img src={reloadIcon} alt="reload" className={Style.reload} onClick={resetPrices}/>
      )}
    </div>
  );
};

export default FiltersPrice;