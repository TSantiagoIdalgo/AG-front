import Style from './product-modal-detail-index.module.css';
import * as Detail from './components/product-detail-components';
import { Platform, Product } from '#src/common/interfaces/product.interface.ts';
import React, { useRef, useState } from 'react';
import { useOutClickExec } from '#modules/catalogue/hooks/use-out-click.ts';
import { useUpdateProduct } from '#modules/user/hooks/use-update-product.ts';

interface ProductModalProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
  platforms?: Platform[]
}


export default function ProductModalIndex({ product, setProduct, platforms }: ProductModalProps): React.JSX.Element {
  const [productState, setProductState] = useState<Product | undefined>(product);
  const { onUpdateProduct, isPending } = useUpdateProduct(product.id, setProduct);
  if (!productState) return <p>Loading...</p>;
  const productWasChange = JSON.stringify(product) !== JSON.stringify(productState);
  const { backgroundImage, name, description, developer, tags, genres, release_date, distributor, pegi, trailer, images, requirements, id, franchise } = productState;
  const containerRef = useRef<HTMLElement>(null);
  useOutClickExec(containerRef, () => {
    setProduct(undefined);
  });
  const onCancelEdit = () => {
    const cancelTime = 100;
    setTimeout(() => {
      setProduct(undefined);
    }, cancelTime);
  };
  return (
    <div className={Style.container}>
      <main id='product-modal-detail-index' className={Style.product_modal_index} ref={containerRef}>
        <Detail.HeaderModalDetail setProductState={setProductState} backgroundImage={backgroundImage} name={name}/>
        <section className={Style.panel_modal_section}>
          <Detail.PanelModalDetail product={productState} setProductState={setProductState} allPlatforms={platforms}/>
          <Detail.AboutModalDetail franchise={franchise} setProductState={setProductState} id={id} description={description} developer={developer} genres={genres} tags={tags} distributor={distributor} release_date={release_date} pegi={pegi}/>
          <Detail.VisualsModalDetail setProductState={setProductState} images={images} trailer={trailer}/>
          <Detail.DescriptionModalDetail description={description} setProductState={setProductState}/>
          <Detail.ConfigurationModalDetail setProductState={setProductState} requirements={requirements}/>
        </section>
      </main>
      <div className={Style.close}>
        <button onClick={onCancelEdit}>Cancelar</button>
        <button disabled={!productWasChange || isPending} onClick={() => onUpdateProduct(productState)}>Aceptar</button>  
      </div>  
    </div>
  );
}