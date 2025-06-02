import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import React, { useMemo } from 'react';
import { Checkout } from '#src/common/interfaces/checkout.interface.ts';
import { parsePrice } from '#src/common/parse-price.ts';
import Style from './sales-chart.module.css';
import DashboardTooltip from '../dashboard-tooltip/dashboard-tooltip';
import { useCalculateDashboardData } from '#modules/user/hooks/use-calculated-dashboard-data.ts';
import { getPreviousMonthIndex } from '../total-graphics/total-graphics';

interface SalesChartProps {
    checkouts: Checkout[];
    loading: boolean;
}

export const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export const SalesChart: React.FC<SalesChartProps> = ({ checkouts }): React.JSX.Element => {
  const groupedMonthData = useCalculateDashboardData(checkouts);
  const groupedData: typeof groupedMonthData = useMemo(() => {
    const monthFound = groupedMonthData.itemsGrouped.find((item) => item.month === months[new Date().getMonth()]);
    if (monthFound) return groupedMonthData;
    const previuosMonth = groupedMonthData.itemsGrouped.find(item => item.month[getPreviousMonthIndex(new Date().getMonth())]) as typeof groupedMonthData.itemsGrouped[0];
    groupedMonthData.itemsGrouped.push({
      'Growth rate': 0,
      'Profit diff': 0,
      Sales: 0,
      'Sales diff': 0 - previuosMonth?.['Total profit'],
      'Sales quantity diff': 0 - previuosMonth?.Sales,
      'Total profit': 0,
      month: months[new Date().getMonth()]
    });
    return groupedMonthData;
  }, [groupedMonthData]);
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