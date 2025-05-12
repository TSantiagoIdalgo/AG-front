import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, ColGroupDef } from 'node_modules/ag-grid-community/dist/types/src/entities/colDef';
import { ProductCheckout } from '#src/common/interfaces/checkout.interface.ts';
import ChartCellRenderer from './cell-render/cell-render';
import ImageCellRenderer from './image-cell-render/image-cell-render';
import BooleanCellRender from './boolean-cell-render/boolean-cell-render';
import TotalProfit from './total-profit/total-profit';
import LastPayment from './last-payment-cell/last-payment-cell';
import Style from './product-sales.module.css';

interface ProductSalesProps {
    productCheckouts: ProductCheckout[];
    loading: boolean;
}

const ProductSales: React.FC<ProductSalesProps> = ({ productCheckouts, loading }): React.JSX.Element => { 
  const columnDefs: (ColDef<ProductCheckout> | ColGroupDef<ProductCheckout>)[] = [
    { cellRenderer: ImageCellRenderer, field: 'mainImage', headerName: '', width: 80},
    { field: 'name', flex: 1, headerName: 'Producto'},
    { cellRenderer: ChartCellRenderer, field: 'cartItems', headerName: 'Ventas (Ultimos 6 meses)',},
    { cellRenderer: BooleanCellRender, field: 'stock', headerName: 'En stock', maxWidth: 100, suppressAutoSize: true },
    { cellRenderer: BooleanCellRender, field: 'disabled', headerName: 'Deshabilitado', maxWidth: 125, suppressAutoSize: true, type: 'boolean' },
    { cellRenderer: LastPayment, field: 'cartItems', headerName: 'Ultimo pago', maxWidth: 125, suppressAutoSize: true },
    { cellRenderer: TotalProfit, field: 'cartItems', headerClass: 'Total profit', headerName: 'Ganancia total', maxWidth: 125, suppressAutoSize: true  }
  ];

  if (!productCheckouts.length || loading) return <p>Loading...</p>;
  return (
    <div className="ag-theme-alpine" style={{ marginTop: '80px', position: 'relative', width: '100%' }}>
      <h2 className={Style.title}>Productos más vendidos</h2>
      <AgGridReact
        rowData={productCheckouts}
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

export default ProductSales;