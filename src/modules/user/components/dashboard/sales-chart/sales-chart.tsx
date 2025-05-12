import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import React from 'react';
import { Checkout } from '#src/common/interfaces/checkout.interface.ts';
import { parsePrice } from '#src/common/parse-price.ts';
import Style from './sales-chart.module.css';
import DashboardTooltip from '../dashboard-tooltip/dashboard-tooltip';
import { useCalculateDashboardData } from '#modules/user/hooks/use-calculated-dashboard-data.ts';

interface SalesChartProps {
    checkouts: Checkout[];
    loading: boolean;
}

export const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export const SalesChart: React.FC<SalesChartProps> = ({ checkouts }): React.JSX.Element => {
  const groupedData = useCalculateDashboardData(checkouts);
  if (!checkouts.length) return <p>Loading...</p>;
  return (
    <article className={Style.sales}>
      <h2>Revenue</h2>
      <div className={Style.sales_months}>
        <div className={Style.current_sales}>
          <span className={Style.current_sales_month_title}>Current month</span>  
          <span className={Style.current_sales_month}>{parsePrice(groupedData.monthSales.currentMonth)}</span>
        </div>
        <div className={Style.previous_sales}>
          <span className={Style.previous_sales_month_title}>Previous month</span>  
          <span className={Style.previous_sales_month}>{parsePrice(groupedData.monthSales.previousMonth)}</span>
        </div>
      </div>
      <ResponsiveContainer width={'100%'} height={450}>
        <LineChart
          width={1000}
          height={500}
          data={groupedData.itemsGrouped}
        >
          <XAxis dataKey={'month'}/>
          <YAxis />
          <Tooltip content={<DashboardTooltip/>}/>
          <Legend />
          <Line type="monotone" dataKey="Total profit" stroke="#ff5400"/>
        </LineChart>
      </ResponsiveContainer>
    </article>
  );
};