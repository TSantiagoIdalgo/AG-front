import './product-detail-index.css';
import * as Detail from './components/product-detail-components';
import * as libs from './libs/product-detail-libs';
import { PRODUCT_ENDPOINT } from '#src/config/endpoints.ts';
import { Product } from '#src/common/interfaces/product.interface.ts';
import React from "react";

export default function ProductDetailIndex(): React.JSX.Element {
  const { id } = libs.useParams();
  const { loading, data, error } = libs.useFetchData<Product>(PRODUCT_ENDPOINT.GET_FIND_ONE, { id });
  if (loading || !data?.body.data) return <p>Loading...</p>;
  if (error) return <p>ERROR: { error.message }</p>;
  const { backgroundImage, name, description } = data.body.data;

  return (
    <main className='product-detail-index'>
      <Detail.HeaderDetail backgroundImage={backgroundImage} name={name}/>
      <section className='panel-section'>
        <Detail.PanelDetail product={data.body.data}/>
        <Detail.AboutDetail description={description}/>
      </section>
    </main>
  );
}