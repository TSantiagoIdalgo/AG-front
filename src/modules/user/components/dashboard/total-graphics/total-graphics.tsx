 
import React from 'react';
import Style from './total-graphics.module.css';
import { Checkout, ProductCheckout } from '#src/common/interfaces/checkout.interface.ts';
import { useCalculateDashboardData } from '#modules/user/hooks/use-calculated-dashboard-data.ts';
import { parsePrice } from '#src/common/parse-price.ts';
import { useFetchData } from '#src/hooks/use-fetch-data.tsx';
import { USER_ENDPOINT } from '#src/config/endpoints.ts';
import { ImArrowUp } from 'react-icons/im';
import { ImArrowDown } from 'react-icons/im';
import { months } from '../sales-chart/sales-chart';


interface TotalGraphicsProps {
    productCheckouts: ProductCheckout[];
    checkouts: Checkout[];
    loading: boolean;
}
export const getPreviousMonthIndex = (monthIndex: number) => (monthIndex - 1 + 12) % 12;

const TotalGraphics: React.FC<TotalGraphicsProps> = ({ checkouts }): React.JSX.Element => {
  const { data } = useFetchData<number>(USER_ENDPOINT.GET.countClients());

  const groupedData = useCalculateDashboardData(checkouts);
  const previousMonthData = groupedData.itemsGrouped[getPreviousMonthIndex(new Date().getMonth())];
  const currentMonthData = groupedData.itemsGrouped[new Date().getMonth()] ?? {
    'Growth rate': 0,
    'Profit diff': 0,
    Sales: 0,
    'Sales diff': 0 - previousMonthData['Total profit'],
    'Sales quantity diff': 0 - previousMonthData.Sales,
    'Total profit': 0,
    month: months[new Date().getMonth()],
  };
  if (!checkouts.length) return <p>loading...</p>;

  const booleansProperties = {
    growRate: (currentMonthData['Growth rate'] - previousMonthData['Growth rate']) > 0 ,
    profit: currentMonthData['Sales diff'] > 0 ,
    sales: currentMonthData['Sales quantity diff'] > 0,
  };

  return (
    <article className={Style.container}>
      <div className={Style.users}>
        <div className={Style.content}>
          <h2 className={Style.title}>Clientes</h2>
          <span className={Style.data}>{data?.body.data}</span>
        </div>
      </div>
      <div className={Style.sales}>
        <div className={Style.content}>
          <h2 className={Style.title}>Ventas</h2>
          <span className={Style.data}>{currentMonthData.Sales}
            <span className={booleansProperties.sales ? Style.active : Style.inactive}>{booleansProperties.sales ? (
              <>
                <ImArrowUp fontSize={15} style={{marginTop: '3px'}}/>
                <span>{currentMonthData['Sales quantity diff']}</span>
              </>
            ): (
              <>
                <ImArrowUp fontSize={15} style={{marginTop: '3px'}}/>
                <span>{currentMonthData['Sales quantity diff']}</span>
              </>
            )}
            </span>
          </span>
          <span className={Style.description}>Desde el mes pasado</span>
        </div>
      </div>
      <div className={Style.earnings}>
        <div className={Style.content}>
          <h2 className={Style.title}>Ganancias</h2>
          <span className={Style.data}>{parsePrice(currentMonthData['Total profit'])}
            <span className={booleansProperties.profit ? Style.active_profit : Style.inactive_profit}>{booleansProperties.profit
              ? (
                <>
                  <ImArrowUp fontSize={15} style={{marginTop: '3px'}}/>
                  <span>{parsePrice(currentMonthData['Sales diff'])}</span>
                </>
              )
              : (
                <>
                  <ImArrowDown fontSize={15} style={{marginTop: '3px'}}/>
                  <span>{parsePrice(currentMonthData['Sales diff'])}</span>
                </>
              )}</span>
          </span>
          <span className={Style.description}>Desde el mes pasado</span>
        </div>
      </div>
      <div className={Style.growth}>
        <div className={Style.content}>
          <h2 className={Style.title}>Crecimiento</h2>
          <span className={Style.data}>{currentMonthData['Growth rate']}%
            <span className={booleansProperties.growRate ? Style.active_growrate : Style.inactive_growrate}>{(currentMonthData['Growth rate'] - previousMonthData['Growth rate']) > 0 
              ? (
                <>
                  <ImArrowUp/>
                  <span>{(currentMonthData['Growth rate'] - previousMonthData['Growth rate']).toFixed(2)}%</span>
                </>
              )
              : (
                <>
                  <ImArrowDown/>
                  <span>{(currentMonthData['Growth rate'] - previousMonthData['Growth rate']).toFixed(2)}%</span>
                </>
              )}</span>
          </span>
          <span className={Style.description}>Tasa de crecimiento desde el mes pasado</span>
        </div>
      </div>
    </article>
  );
};

export default TotalGraphics;