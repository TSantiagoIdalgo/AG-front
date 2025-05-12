import { parsePrice } from '#src/common/parse-price.ts';
import React from 'react';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

const DashboardTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const firstPayload = 0;
    const data = payload[firstPayload].payload;
    return (
      <div className="bg-white border rounded p-2 shadow-sm">
        <p><strong>{label}</strong></p>
        <p>Ventas: {data.Sales}</p>
        <p>Ganancias: {parsePrice(data['Total profit'])}</p>
        <p>Tasa de crecimiento: {data['Growth rate']}%</p>
      </div>
    );
  }

  return null;
};

export default DashboardTooltip;