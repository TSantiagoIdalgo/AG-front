import Style from './product-modal-detail-index.module.css';
import * as Detail from './components/product-detail-components';
import { Product } from '#src/common/interfaces/product.interface.ts';
import React, { useRef, useState } from 'react';
import { useOutClickExec } from '#modules/catalogue/hooks/use-out-click.ts';

interface ProductModalProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product | undefined>>
}

export default function ProductModalIndex({ product, setProduct }: ProductModalProps): React.JSX.Element {
  const [productState, setProductState] = useState<Product | undefined>(product);
  if (!productState) return <p>Loading...</p>;
  const productWasChange = JSON.stringify(product) !== JSON.stringify(productState);
  const { backgroundImage, name, description, developer, tags, genres, release_date, distributor, pegi, trailer, images, requirements, id } = productState;
  const containerRef = useRef<HTMLElement>(null);
  useOutClickExec(containerRef, () => {
    setProduct(undefined);
  });
  return (
    <div className={Style.container}>
      <main className={Style.product_modal_index} ref={containerRef}>
        <Detail.HeaderModalDetail backgroundImage={backgroundImage} name={name}/>
        <section className={Style.panel_modal_section}>
          <Detail.PanelModalDetail inWishlist={false} product={productState}/>
          <Detail.AboutModalDetail id={id} description={description} developer={developer} genres={genres} tags={tags} distributor={distributor} release_date={release_date} pegi={pegi}/>
          <Detail.VisualsModalDetail images={images} trailer={trailer}/>
          <Detail.DescriptionModalDetail description={description} />
          <Detail.ConfigurationModalDetail requirements={requirements}/>
        </section>
      </main>
      <div className={Style.close}>
        <button onClick={() => setProductState(undefined)}>Cancelar</button>
        <button disabled={!productWasChange}>Aceptar</button>  
      </div>  
    </div>
  );
}