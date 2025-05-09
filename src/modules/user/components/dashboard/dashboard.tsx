/* eslint-disable max-statements */
import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, ColGroupDef } from 'node_modules/ag-grid-community/dist/types/src/entities/colDef';
import { useFetchData } from '#src/hooks/use-fetch-data.tsx';
import { ProductCheckout } from '#src/common/interfaces/checkout.interface.ts';
import { CHECKOUT_ENDPOINT } from '#src/config/endpoints.ts';
import ChartCellRenderer from './cell-render/cell-render';
import ImageCellRenderer from './image-cell-render/image-cell-render';
import BooleanCellRender from './boolean-cell-render/boolean-cell-render';
import TotalProfit from './total-profit/total-profit';
import LastPayment from './last-payment-cell/last-payment-cell';
import { useSelector } from 'react-redux';
import { IState } from '#src/state/store.ts';

const Dashboard = (): React.JSX.Element => { 
  const [checkouts, setCheckouts] = useState<ProductCheckout[]>([]);
  const { newPaymentReceived } = useSelector((state: IState) => state.websocket);
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
    if (newPaymentReceived) {
      if (checkouts.some(checkout => checkout.id === newPaymentReceived.id)) {
        const notFound = -1;
        const checkoutClone = structuredClone(checkouts);
        const checkoutIndex = checkoutClone.findIndex(checkout => checkout.id === newPaymentReceived.id);
        if (checkoutIndex !== notFound) {
          const mergedItems = checkoutClone[checkoutIndex].cartItems.concat(newPaymentReceived.cartItems);
          const sortedItems = mergedItems.sort((itemA, itemB) => {
            const dateItemA = new Date(itemA.paidAt);
            const dateItemB = new Date(itemB.paidAt);
            return dateItemA.getTime() - dateItemB.getTime();
          });

          checkoutClone[checkoutIndex].cartItems = sortedItems;
          setCheckouts(checkoutClone);
        }
      } else {
        setCheckouts(prev => [...prev, newPaymentReceived]);
      }
    }
  }, [newPaymentReceived]);

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