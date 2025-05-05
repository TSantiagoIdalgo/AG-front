import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { BarChart, Bar, Tooltip } from 'recharts';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, ColGroupDef } from 'node_modules/ag-grid-community/dist/types/src/entities/colDef';
import { useFetchData } from '#src/hooks/use-fetch-data.tsx';
import { Checkout } from '#src/common/interfaces/checkout.interface.ts';
import { CHECKOUT_ENDPOINT } from '#src/config/endpoints.ts';

const ChartCellRenderer = () => {
  const [data, setData] = useState([
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const dataMapped = data.map((item) => ({ ...item, id: Math.random() * 100 }));
      const dataOrdered = dataMapped.sort((a, b)=> a.id - b.id);
      setData(dataOrdered);
    }, 500);
    

    return () => {
      clearInterval(intervalId);
    };
  },[]);

  return (
    <BarChart width={150} height={60} data={data}>
      <Tooltip/>
      <Bar dataKey="uv" fill="#8884d8" />
    </BarChart>
  );
};

const Dashboard = (): React.JSX.Element => { 
  const { data, loading } = useFetchData<Checkout[]>(CHECKOUT_ENDPOINT.GET.getAllCheckouts(), {
    query: { pageNumber: 0, pageSize: 10 }
  });

  

  const columnDefs: (ColDef<Checkout> | ColGroupDef<Checkout>)[] = [
    { headerName: 'Producto', field: 'total', flex: 1 },
    {
      cellRenderer: ChartCellRenderer,
      field: 'subTotal',
      flex: 1,
      headerName: 'Ventas (últimos 6 meses)',
    },
  ];

  if (!data?.body || loading) return <p>Loading...</p>;
  const checkouts = data.body.data;
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        rowData={checkouts}
        columnDefs={columnDefs}
        rowHeight={60}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default Dashboard;