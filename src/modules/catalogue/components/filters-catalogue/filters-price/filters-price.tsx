import * as libs from '#modules/catalogue/libs/catalogue-libs';
import React from "react";
import Style from './filters-price.module.css';
import { debounce } from '#src/common/debounce.ts';
import reloadIcon from '#assets/icons/icon-reload.svg';

const FiltersPrice = (): React.JSX.Element => {
  const { searchParams, deleteParams, updateParams } = libs.useChangeSearchParams();
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const changePriceTime = 200;
  const [prices, setPrices] = libs.useState<{ minPrice: string, maxPrice: string }>({
    maxPrice: maxPrice ? maxPrice : "",
    minPrice: minPrice ? minPrice : ""
  });

  const debouncePrince = libs.useRef(debounce((name, value) => {
    const isNumber = !Number.isNaN(parseInt(value, 10));
    if (isNumber || !value.length) {
      const setQueryTime = 1000;
      setTimeout(() => {
        updateParams({ [name]: value });
      }, setQueryTime);
    }
  }, changePriceTime));

  const onChangePrice = libs.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setPrices((prev) => ({ ...prev, [name]: value }));
    debouncePrince.current(name, value);
  }, []);

  const resetPrices = () => {
    deleteParams([{ key: "minPrice" }, { key: "maxPrice" }]);
    setPrices({ maxPrice: "", minPrice: "" });
  };

  return (
    <div className={Style.price}>
      <span>Entre</span>
      <input autoComplete='off' name='minPrice' placeholder='0' id='minPrice' value={prices.minPrice} onChange={onChangePrice} type="text" className={Style.input}/>
      <span>y</span>
      <input autoComplete='off' name='maxPrice' placeholder='200' value={prices.maxPrice} onChange={onChangePrice} type="text" className={Style.input} />
      <span>$</span>
      {Boolean(prices.minPrice || prices.maxPrice) && (
        <img src={reloadIcon} alt="reload" className={Style.reload} onClick={resetPrices}/>
      )}
    </div>
  );
};

export default FiltersPrice;