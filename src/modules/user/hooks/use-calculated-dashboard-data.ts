import { Checkout } from '#src/common/interfaces/checkout.interface.ts';
import { useMemo } from 'react';
import { months } from '../components/dashboard/sales-chart/sales-chart';

export const useCalculateDashboardData = (checkouts: Checkout[]) => {
  const groupedData = useMemo(() => {
    const currentMonthIndex = new Date().getMonth();
    const fixedPrice = 2, initValue = 0, percentage = 100, prevCheckout = 1, prevMonth = 1;
    const grouped = Object.groupBy(checkouts, ({ createdAt }) =>
      months[new Date(createdAt).getMonth()]
    );

    const completeGrouped = months.reduce((acc, month, index) => {
      if (grouped[month]) {
        const hasSales = grouped[month]?.length > initValue;
    
        if (index <= currentMonthIndex || hasSales) {
          acc[month] = grouped[month] ?? [];
        }
      }

      return acc;
    }, {} as Record<string, typeof checkouts>);

    const currentMonthWithPrevMonth = months.filter((_month, index) => index === currentMonthIndex - prevMonth || index === currentMonthIndex);
    const [previousMonth, currentMonth] = currentMonthWithPrevMonth;
    const monthSales = {
      currentMonth: grouped[currentMonth]?.reduce((acc, checkout) => acc + checkout.total, initValue) ?? initValue,
      previousMonth: grouped[previousMonth]?.reduce((acc, checkout) => acc + checkout.total, initValue) ?? initValue
    };

    const itemsGrouped = Object.entries(completeGrouped).map(([month, sales], index, arr) => { 
      const currentSales = sales.length;
      const currentProfit = sales.reduce((sum, sale) => sum + sale.total, initValue);

      const previous = arr[index - prevCheckout];
      const previousSales = previous ? previous[prevCheckout].length : initValue;
      const previousProfit = previous ? previous[prevCheckout].reduce((sum, sale) => sum + sale.total, initValue) : initValue;

      const salesDifference = currentSales - previousSales;
      const growthRate = previousSales > initValue
        ? ((salesDifference) / previousSales) * percentage
        : initValue;

      const profitDifference = previousProfit > initValue
        ? ((currentProfit - previousProfit) / previousProfit) * percentage
        : initValue;
        
      return {
        'Growth rate': Number(growthRate.toFixed(fixedPrice)),
        Sales: currentSales,
        'Sales diff': salesDifference,
        'Total profit': currentProfit,
        month,
        salesPriceDiff: Number(profitDifference.toFixed(fixedPrice)),
      };
    });


    return { itemsGrouped, monthSales };
  }, [checkouts]);

  return groupedData;
};