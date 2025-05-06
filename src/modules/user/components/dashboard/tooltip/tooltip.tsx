import React from 'react';
import Style from './tooltip.module.css';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>): React.JSX.Element => {
  if (active && payload && Array.isArray(payload)) {
    const firstElement = 0;
    const { value } = payload[firstElement];

    return (
      <div className={Style.custom_tooltip}>
        <p className={Style.label}><span>Total: </span>{`${value}`}</p>
      </div>
    );
  }

  return <p></p>;
};

export default CustomTooltip;