import ProductSales from './product-sales/product-sales';
import React from 'react';
import Style from './dashboard.module.css';
import { useDashboardData } from '#modules/user/hooks/useDashboardData.ts';
import { SalesChart } from './sales-chart/sales-chart';
import TotalGraphics from './total-graphics/total-graphics';

export default function Dashboard(): React.JSX.Element {
  const { productCheckouts, loading, checkouts} = useDashboardData();
  if (!checkouts.length || !productCheckouts.length) return <p>Loading...</p>;
  return (
    <main className={Style.container}>
      <section className={Style.sales_charts}>
        <TotalGraphics checkouts={checkouts} loading={loading} productCheckouts={productCheckouts}/>
        <SalesChart checkouts={checkouts} loading={loading}/>
      </section>
      <ProductSales productCheckouts={productCheckouts} loading={loading}/>
    </main>
  );
}