import { Bar, BarChart, Cell, Tooltip } from 'recharts';
import CustomTooltip from '../tooltip/tooltip';
import { ProductWithCheckouts } from '#src/common/interfaces/checkout.interface.ts';
import React from 'react';

interface IChartCellCheckout {
  data: ProductWithCheckouts
}

const ChartCellRenderer: React.FC<IChartCellCheckout> = ({ data }): React.JSX.Element => {
  const getBarColor = (paymentType: 'paid' | 'unpaid' | 'canceled',) => {
    switch(paymentType) {
    case 'paid': return '#8884d8';
    case 'unpaid': return '#fef08a';
    case 'canceled': return '#b91c1c';
    default: return '#8884d8';
    }
  };
  return (
    <BarChart width={150} height={60} data={data.checkouts}>
      <Tooltip content={<CustomTooltip/>}/>
      <Bar dataKey="total" >
        {data.checkouts.map(checkout => {
          const color = getBarColor(checkout.paymentStatus);
          return <Cell key={`cell-${checkout.id}`} fill={color}/>;
        })}
      </Bar>
    </BarChart>
  );
};

export default ChartCellRenderer;