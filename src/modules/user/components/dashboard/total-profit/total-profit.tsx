import { CartItemWithoutProduct } from '#src/common/interfaces/checkout.interface.ts';
import { parsePrice } from '#src/common/parse-price.ts';
import React, { useMemo } from 'react';
import Style from './total-profit.module.css';

interface ITotalProfit {
  value: CartItemWithoutProduct[]
}

const TotalProfit = (props: ITotalProfit): React.JSX.Element => {
  const initNumber = 0;
  const totalProfit = useMemo(() => props.value.reduce((acc, bcc) => acc + bcc.total, initNumber), [props.value]);

  return (
    <div className={Style.total_profit}>
      <p>
        {parsePrice(totalProfit)}
      </p>
    </div>
  );
};

export default TotalProfit;