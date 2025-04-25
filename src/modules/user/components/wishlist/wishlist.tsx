import { WISHLIST_ENDPOINT } from '#src/config/endpoints.ts';
import React from 'react';
import * as libs from '#modules/user/libs/user-libs';
import { IWishlist } from '#src/common/interfaces/wishlist.interface.ts';
import { ProductCard } from '#modules/core/components/core-index.ts';
import Style from './wishlist.module.css';
import { useMutation } from '#src/hooks/use-mutation-data.ts';
import { Product } from '#src/common/interfaces/product.interface.ts';

interface IRenderCard {
  product: Product;
  beforeDelete: (productId: string) => void;
}

const RenderCard = ({ product, beforeDelete }: IRenderCard) => {
  const { callMutation } = useMutation(WISHLIST_ENDPOINT.DELETE.removeProductFromWishlist(product.id), {
    method: 'DELETE'
  });
  return (
    <ProductCard
      discount={product.discount}
      id={product.id}
      mainImage={product.mainImage}
      name={product.name}
      price={product.price}
      onDelete={async () => {
        await callMutation();
        beforeDelete(product.id);
      }}
      trailer={product.trailer}
    />
  );
};

const Wishlist = (): React.JSX.Element => {
  const [wishlist, setWishlist] = libs.useState<{ id: string, product: Product }[]>([]);
  const { loading, data } = libs.useFetchData<IWishlist>(
    WISHLIST_ENDPOINT.GET.getUserWishlist()
  );


  libs.useEffect(() => {
    if (data?.body.data) {
      setWishlist(data.body.data.whitelistItems);
    }
  }, [data?.body.data]);

  if (loading) return <p>Loading...</p>;

  const beforeDeleteItem = (productId: string) => {
    const deleteItem = 1, notFoundItem = -1;
    const wishlistClone = structuredClone(wishlist);
    const productIndex = wishlistClone.findIndex(item => item.product.id === productId);
    if (productIndex === notFoundItem) return;
    wishlistClone.splice(notFoundItem, deleteItem);
    setWishlist(wishlistClone);
  };

  return (
    <div className={Style.container}>
      <h2 className={Style.container_title}>{wishlist.length} juegos en tu lista de deseos</h2>
      <div className={Style.container_items}>
        {wishlist && wishlist.length 
          ? wishlist.map(({ id, product }) => <RenderCard key={id} product={product} beforeDelete={beforeDeleteItem}/>) 
          : <div className={Style.notice}>
        ¡No pierdas de vista los juegos que te gustan y añade tantos como quieras a tu wishlist! Para eliminarlos, simplemente visita la ficha del juego
          </div>}
      </div>
    </div>
  );
};

export default Wishlist;
