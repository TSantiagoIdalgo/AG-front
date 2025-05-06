import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, ColGroupDef } from 'node_modules/ag-grid-community/dist/types/src/entities/colDef';
import { useFetchData } from '#src/hooks/use-fetch-data.tsx';
import { ProductWithCheckouts } from '#src/common/interfaces/checkout.interface.ts';
import { CHECKOUT_ENDPOINT } from '#src/config/endpoints.ts';
import ChartCellRenderer from './cell-render/cell-render';
import ImageCellRenderer from './image-cell-render/image-cell-render';
import BooleanCellRender from './boolean-cell-render/boolean-cell-render';
import TotalProfit from './total-profit/total-profit';
import LastPayment from './last-payment-cell/last-payment-cell';



const Dashboard = (): React.JSX.Element => { 
  const { data, loading } = useFetchData<ProductWithCheckouts[]>(CHECKOUT_ENDPOINT.GET.getProductCheckouts(), {
    query: { pageNumber: 0, pageSize: 100 }
  });
  const columnDefs: (ColDef<ProductWithCheckouts> | ColGroupDef<ProductWithCheckouts>)[] = [
    { cellRenderer: ImageCellRenderer, field: 'product.mainImage', headerName: '', width: 80},
    { field: 'product.name', flex: 1, headerName: 'Product'},
    { cellRenderer: ChartCellRenderer, field: 'checkouts', flex: 1, headerName: 'Sales (last 6 months)'},
    { cellRenderer: BooleanCellRender, field: 'product.stock', headerName: 'In stock', maxWidth: 100, suppressAutoSize: true },
    { cellRenderer: BooleanCellRender, field: 'product.disabled', headerName: 'Is disabled', maxWidth: 105, suppressAutoSize: true, type: 'boolean' },
    { cellRenderer: LastPayment, field: 'checkouts', headerName: 'Last Payment' },
    { cellRenderer: TotalProfit, field: 'checkouts', headerClass: 'Total profit', headerName: 'Total profit' }
  ];

  if (!data?.body || loading) return <p>Loading...</p>;
  const checkouts = data.body.data;

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