import * as libs from '#modules/catalogue/libs/catalogue-libs';
import { DataResponse } from '#src/common/interfaces/pageable-data.interface.ts';
import { PRODUCT_ENDPOINT } from '#src/config/endpoints.ts';
import { Product } from '#src/common/interfaces/product.interface.ts';
import { ProductCard } from '#modules/core/components/core-index.ts';
import React from 'react';
import Style from './main-catalogue.module.css';

const MainCatalogue = (): React.JSX.Element => {
  const { data, loading, error } = libs.useFetchData<DataResponse<Product>>(PRODUCT_ENDPOINT.GET.findAll(), {
    query: { pageNumber: 0, pageSize: 60 }
  });

  if (!data || !data.body.data || loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <main className={Style.mainContent}>
      <div className={Style.wrapper}>
        <h2 className={Style.cuantity_results}>{data.body.data.numberOfElements} Results</h2>
        <div className={Style.items}>
          {data.body.data.content.map((product) => (
            <ProductCard
              discount={product.discount}
              id={product.id}
              mainImage={product.mainImage}
              name={product.name}
              price={product.price}
              trailer={product.trailer}
              key={product.id}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default MainCatalogue;