import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { Platform, Product } from '#src/common/interfaces/product.interface.ts';
import { DataResponse } from '#src/common/interfaces/pageable-data.interface.ts';
import { AgGridReact } from 'ag-grid-react';
import ImageCellRenderer from '../product-sales/image-cell-render/image-cell-render';
import { ColDef, ColGroupDef } from 'node_modules/ag-grid-community/dist/types/src/entities/colDef';
import { FaEdit } from 'react-icons/fa';
import Style from './products.module.css';

import ProductModalIndex from './product-table-modal/product-modal-detail-index';
import BooleanCellRender from '../product-sales/boolean-cell-render/boolean-cell-render';
import { useFetchData } from '#src/hooks/use-fetch-data.tsx';
import { PLATFORM_ENDPOINT } from '#src/config/endpoints.ts';
interface ProductsProps {
    products?: DataResponse<Product>
}

const ProductsTable: React.FC<ProductsProps> = ({ products }): React.JSX.Element => {
  const fixedPrice = 2;
  const { data: platforms } = useFetchData<Platform[]>(PLATFORM_ENDPOINT.GET.findAll());

  const [product, setProduct] = useState<Product | undefined>();
  const columnDefs = useMemo(() => [
    {
      cellRenderer: ImageCellRenderer,
      field: 'mainImage',
      headerName: '',
      maxWidth: 80,
    },
    { field: 'name', flex: 1, headerName: 'Nombre' },
    { field: 'distributor', headerName: 'Distribuidor'},
    {
      field: 'price',
      headerName: 'Precio',
      maxWidth: 100,
      valueFormatter: (params: { value: number }) => `$${params.value?.toFixed(fixedPrice)}`,
    },
    {
      field: 'discount',
      headerName: 'Descuento',
      maxWidth: 110,
      valueFormatter: (params: { value: number }) => `${params.value?.toFixed(fixedPrice)}%`,
    },
    { cellRenderer: BooleanCellRender, field: 'disabled', headerName: 'Deshabilitado', maxWidth: 125, suppressAutoSize: true, type: 'boolean' },
    { field: 'pegi', headerName: 'PEGI', maxWidth: 80, minWidth: 60 },
    { cellRenderer: FaEdit, field: 'disabled', headerName: '', onCellClicked: (event) => setProduct(event.data), width: 60,  }
  ] as (ColDef<Product> | ColGroupDef<Product>)[], []);

  return (
    <div className="ag-theme-alpine" id={Style.container}>
      <h2 className={Style.title}>Productos</h2>
      <AgGridReact
        rowData={products?.content}
        columnDefs={columnDefs}
        rowHeight={60}
        domLayout="autoHeight"
        defaultColDef={{
          cellClass: 'ag-center-cols-cell'
        }}
      />
      {product && ReactDOM.createPortal(<ProductModalIndex platforms={platforms?.body.data} product={product} setProduct={setProduct}/>, document.getElementById('modal') as HTMLElement)}
    </div>
  );
};

export default ProductsTable;