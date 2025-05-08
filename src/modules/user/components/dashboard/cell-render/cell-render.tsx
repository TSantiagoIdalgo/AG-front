import { Bar, BarChart, Cell, Tooltip } from 'recharts';
import CustomTooltip from '../tooltip/tooltip';
import { CartItemWithoutProduct } from '#src/common/interfaces/checkout.interface.ts';
import React from 'react';
import { PaymentStatus } from '#modules/cart/interfaces/cart.interface.ts';

interface IChartCellCheckout {
  value: CartItemWithoutProduct[]
}

const ChartCellRenderer: React.FC<IChartCellCheckout> = ({ value }): React.JSX.Element => {
  const getBarColor = (paymentType: PaymentStatus) => {
    switch(paymentType) {
    case 'paid': return '#8884d8';
    case 'unpaid': return '#fef08a';
    case 'canceled': return '#b91c1c';
    case 'created': return '#48e';
    default: return '#8884d8';
    }
  };
  
  return (
    <BarChart width={150} height={60} data={value}>
      <Tooltip content={<CustomTooltip/>}/>
      <Bar dataKey="total" >
        {value.map(checkout => {
          const color = getBarColor(checkout.paymentStatus);
          return <Cell key={`cell-${checkout.id}`} fill={color}/>;
        })}
      </Bar>
    </BarChart>
  );
};

export default ChartCellRenderer;