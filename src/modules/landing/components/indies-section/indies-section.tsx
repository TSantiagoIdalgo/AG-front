import * as libs from '../../libs/landing-libs';
import { DataResponse } from '#src/common/interfaces/pageable-data.interface.ts';
import { PRODUCT_ENDPOINT } from '#src/config/endpoints.ts';
import { Product } from '#src/common/interfaces/product.interface.ts';
import { ProductCard } from '#modules/core/components/core-index.ts';
import React from "react";
import Style from './indies-section.module.css';
import arrowLeft from '#assets/icons/icon-arrow.svg';


export default function IndiesSection (): React.JSX.Element {
  const { data, loading, error } = libs.useFetchData<DataResponse<Product>>(PRODUCT_ENDPOINT.GET_FIND_ALL, {
    query: { genres: "indie", pageNumber: 0, pageSize: 4 }
  });
  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>ERROR: { error.message }</p>;
  return (
    <section className={Style.indies}>
      <div className={Style.indies_character}/>
      <div className={Style.indies_games}>
        <div className={Style.indie_games_headline}>
          <h2 className={Style.title}>Top juegos indie</h2>
          <img src={arrowLeft} alt='arrow'/>
        </div>
        <div className={Style.indie_games_items}>
          {data.body.data?.content.map(item => (
            <ProductCard
              discount={item.discount}
              id={item.id}
              mainImage={item.mainImage}
              name={item.name}
              price={item.price}
              trailer={item.trailer}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}