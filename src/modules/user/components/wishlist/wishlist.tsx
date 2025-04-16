import { WISHLIST_ENDPOINT } from '#src/config/endpoints.ts';
import React from 'react';
import * as libs from '#modules/user/libs/user-libs';
import { IWishlist } from '#src/common/interfaces/wishlist.interface.ts';
import { ProductCard } from '#modules/core/components/core-index.ts';
import Style from './wishlist.module.css';

const Wishlist = (): React.JSX.Element => {
  const { loading, data } = libs.useFetchData<IWishlist>(WISHLIST_ENDPOINT.GET.getUserWishlist());

  if (loading || !data || !data.body.data) return <p>Loading...</p>;
  else if (data.body.error) return <p>Error: {data.body.error.message}</p>;

  const { whitelistItems } = data.body.data;

  return (
    <div className={Style.container}>
      <h2 className={Style.container_title}>Lista de deseos</h2>
      <div className={Style.container_items}>
        {whitelistItems.map(({ id, product }) => <ProductCard 
          key={id}
          discount={product.discount}
          id={product.id}
          mainImage={product.mainImage}
          name={product.name}
          price={product.price}
          trailer={product.trailer}        
        />)}
      </div>
    </div>
  );
};

export default Wishlist;