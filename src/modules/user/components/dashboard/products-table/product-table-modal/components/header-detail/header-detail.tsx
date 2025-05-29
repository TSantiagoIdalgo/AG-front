import { Product } from '#src/common/interfaces/product.interface.ts';
import React from 'react';
import Style from './header-detail.module.css';
import DropzoneComponent from '#modules/core/components/dropzone/dropzone.tsx';

type ProductDetail = Partial<Pick<Product, 'backgroundImage' | 'name'>> & {
  setProductState: React.Dispatch<React.SetStateAction<Product | undefined>>
}

export default function HeaderModalDetail ({ backgroundImage, name, setProductState }: ProductDetail): React.JSX.Element {
  const onDropImage = (image: unknown) => {
    setProductState((prev) => ({ ...prev, backgroundImage: image }) as Product);
  };
  return (
    <div className={Style.header_detail}>
      <div className={Style.header_gradient}/>
      <DropzoneComponent defaultImage={backgroundImage} styleImage={Style.header_parallax} altImage={name} onAfterDrop={onDropImage}/>
    </div>
  );
}

/*
  <picture className={Style.header_parallax}>
        <img src={backgroundImage} alt={name} />
      </picture>
*/