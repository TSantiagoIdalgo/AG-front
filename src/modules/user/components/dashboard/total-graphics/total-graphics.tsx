/* eslint-disable no-magic-numbers */
import React from 'react';
import Style from './total-graphics.module.css';
import { Checkout, ProductCheckout } from '#src/common/interfaces/checkout.interface.ts';
import { useCalculateDashboardData } from '#modules/user/hooks/use-calculated-dashboard-data.ts';
import { parsePrice } from '#src/common/parse-price.ts';
import { useFetchData } from '#src/hooks/use-fetch-data.tsx';
import { USER_ENDPOINT } from '#src/config/endpoints.ts';
import { ImArrowUp } from 'react-icons/im';
import { ImArrowDown } from 'react-icons/im';


interface TotalGraphicsProps {
    productCheckouts: ProductCheckout[];
    checkouts: Checkout[];
    loading: boolean;
}

const TotalGraphics: React.FC<TotalGraphicsProps> = ({ checkouts }): React.JSX.Element => {
  const { data } = useFetchData<number>(USER_ENDPOINT.GET.countClients());

  const groupedData = useCalculateDashboardData(checkouts);
  const previousMonthData = groupedData.itemsGrouped[new Date().getMonth() - 1];
  const currentMonthData = groupedData.itemsGrouped[new Date().getMonth()];
  if (!checkouts.length) return <p>loading...</p>;

  return (
    <article className={Style.container}>
      <div className={Style.users}>
        <div className={Style.content}>
          <h2 className={Style.title}>Clientes</h2>
          <span>{data?.body.data}</span>
        </div>
      </div>
      <div className={Style.sales}>
        <div className={Style.content}>
          <h2 className={Style.title}>Ventas</h2>
          <span>{currentMonthData.Sales}</span>
          <span>{currentMonthData['Sales quantity diff'] > 0 ? (
            <>
              <ImArrowUp/>
              {currentMonthData['Sales quantity diff']}
            </>
          ): (
            <>
              <ImArrowDown/>
              {currentMonthData['Sales quantity diff']}
            </>
          )}
          </span>
          <span>Desde el mes pasado</span>
        </div>
      </div>
      <div className={Style.earnings}>
        <div className={Style.content}>
          <h2 className={Style.title}>Ganancias</h2>
          <span>{parsePrice(currentMonthData['Total profit'])}</span>
          <span>{currentMonthData['Sales diff'] > 0 
            ? (
              <>
                <ImArrowUp/>
                <span>{parsePrice(currentMonthData['Sales diff'])}</span>
              </>
            )
            : (
              <>
                <ImArrowDown/>
                <span>{parsePrice(currentMonthData['Sales diff'])}</span>
              </>
            )}</span>
          <span>Desde el mes pasado</span>
        </div>
      </div>
      <div className={Style.growth}>
        <div className={Style.content}>
          <h2 className={Style.title}>Crecimiento</h2>
          <span>{currentMonthData['Growth rate']}%</span>
          <span>{(currentMonthData['Growth rate'] - previousMonthData['Growth rate']) > 0 
            ? (
              <>
                <ImArrowUp/>
                <span>{(currentMonthData['Growth rate'] - previousMonthData['Growth rate']).toFixed(2)}</span>
              </>
            )
            : (
              <>
                <ImArrowDown/>
                <span>{(currentMonthData['Growth rate'] - previousMonthData['Growth rate']).toFixed(2)}</span>
              </>
            )}</span>
          <span>Tasa de crecimiento desde el mes pasado</span>
        </div>
      </div>
    </article>
  );
};

export default TotalGraphics;