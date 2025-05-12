/* eslint-disable no-magic-numbers */
import React from 'react';
import Style from './total-graphics.module.css';
import { Checkout, ProductCheckout } from '#src/common/interfaces/checkout.interface.ts';
import { useCalculateDashboardData } from '#modules/user/hooks/use-calculated-dashboard-data.ts';
import { parsePrice } from '#src/common/parse-price.ts';

interface TotalGraphicsProps {
    productCheckouts: ProductCheckout[];
    checkouts: Checkout[];
    loading: boolean;
}

const TotalGraphics: React.FC<TotalGraphicsProps> = ({ checkouts }): React.JSX.Element => {
  const groupedData = useCalculateDashboardData(checkouts);
  const previousMotnhData = groupedData.itemsGrouped[new Date().getMonth() - 1];
  const currentMonthData = groupedData.itemsGrouped[new Date().getMonth()];
  if (!checkouts.length) return <p>loading...</p>;
  return (
    <article className={Style.container}>
      <div className={Style.users}>
        <h2>Clientes</h2>
      </div>
      <div className={Style.sales}>
        <h2>Ventas</h2>
        <span>{currentMonthData.Sales}</span>
        <br />
        <span>{currentMonthData['Sales diff']}</span>
        <br />
        <span>Desde el mes pasado</span>
      </div>
      <div className={Style.earnings}>
        <h2>Ganancias</h2>
        <span>{parsePrice(currentMonthData['Total profit'])}</span>
        <br />
        <span>{currentMonthData.salesPriceDiff}</span>
        <br />
        <span>Desde el mes pasado</span>
      </div>
      <div className={Style.growth}>
        <h2>Crecimiento</h2>
        <span>{currentMonthData['Growth rate']}%</span>
        <br />
        <span>{currentMonthData['Growth rate'] - previousMotnhData['Growth rate']}%</span>
        <br />
        <span>Desde el mes pasado</span>
      </div>
    </article>
  );
};

export default TotalGraphics;