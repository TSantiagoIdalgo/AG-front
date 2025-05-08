import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, ColGroupDef } from 'node_modules/ag-grid-community/dist/types/src/entities/colDef';
import { useFetchData } from '#src/hooks/use-fetch-data.tsx';
import { CheckoutProduct, ProductCheckout } from '#src/common/interfaces/checkout.interface.ts';
import { CHECKOUT_ENDPOINT } from '#src/config/endpoints.ts';
import ChartCellRenderer from './cell-render/cell-render';
import ImageCellRenderer from './image-cell-render/image-cell-render';
import BooleanCellRender from './boolean-cell-render/boolean-cell-render';
import TotalProfit from './total-profit/total-profit';
import LastPayment from './last-payment-cell/last-payment-cell';
import { eventSource } from '#src/main.tsx';
import { EventTypes } from '#src/common/interfaces/event-types.ts';

const Dashboard = (): React.JSX.Element => { 
  const [checkouts, setCheckouts] = useState<ProductCheckout[]>([]);
  const [newPayment, setNewPayment] = useState<CheckoutProduct>();
  const { data, loading } = useFetchData<ProductCheckout[]>(CHECKOUT_ENDPOINT.GET.getProductCheckouts(), {
    query: { pageNumber: 0, pageSize: 100 }
  });
  
  const columnDefs: (ColDef<ProductCheckout> | ColGroupDef<ProductCheckout>)[] = [
    { cellRenderer: ImageCellRenderer, field: 'mainImage', headerName: '', width: 80},
    { field: 'name', flex: 1, headerName: 'Product'},
    { cellRenderer: ChartCellRenderer, field: 'cartItems', flex: 1, headerName: 'Sales (last 6 months)'},
    { cellRenderer: BooleanCellRender, field: 'stock', headerName: 'In stock', maxWidth: 100, suppressAutoSize: true },
    { cellRenderer: BooleanCellRender, field: 'disabled', headerName: 'Is disabled', maxWidth: 105, suppressAutoSize: true, type: 'boolean' },
    { cellRenderer: LastPayment, field: 'cartItems', headerName: 'Last Payment' },
    { cellRenderer: TotalProfit, field: 'cartItems', headerClass: 'Total profit', headerName: 'Total profit' }
  ];

  useEffect(() => {
    const paymentEntry = (event: MessageEvent<string>) => {
      setNewPayment(JSON.parse(event.data));
      
    };

    eventSource.addEventListener(EventTypes.NEW_PAYMENT_RECEIVED, paymentEntry);

    return () => {
      eventSource.removeEventListener(EventTypes.NEW_PAYMENT_RECEIVED, paymentEntry);
    };
  }, []);



  useEffect(() => {
    if (data?.body.data) setCheckouts(data.body.data);
  }, [data?.body]);

  if (!data?.body || loading) return <p>Loading...</p>;
  return (
    <div className="ag-theme-alpine" style={{ marginTop: '60px', width: '100%' }}>
      <AgGridReact
        rowData={checkouts}
        columnDefs={columnDefs}
        rowHeight={60}
        domLayout="autoHeight"  
        defaultColDef={{
          cellClass: 'ag-center-cols-cell'
        }}
      />
    </div>
  );
};

export default Dashboard;