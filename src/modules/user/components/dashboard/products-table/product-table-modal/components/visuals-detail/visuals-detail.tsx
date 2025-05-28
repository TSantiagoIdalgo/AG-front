import { Product } from '#src/common/interfaces/product.interface.ts';
import React, { useCallback, useEffect } from 'react';
import Style from './visuals-detail.module.css';
import { useDropzone } from 'react-dropzone';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { VisualImageDropzone } from './visual-image-dropzone';
import VisualTrailerDropzone from './visual-trailer-dropzone';

type TVisualDetail = Pick<Product, 'trailer' | 'images'> & {
  setProductState: React.Dispatch<React.SetStateAction<Product | undefined>>
}

export default function VisualsModalDetail({ images, trailer, setProductState }: TVisualDetail): React.JSX.Element {
  const onDrop = useCallback(() => undefined, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles  } = useDropzone({accept: { 'image/*': [] },  multiple: false, onDrop});
  const firstImage = 0, spliceImage = 1;
  const image = images[firstImage];

  useEffect(() => {
    if (acceptedFiles[0]) {
      const imagesClone = structuredClone(images);
      imagesClone.shift();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      imagesClone.unshift(acceptedFiles[0] as any);
      setProductState((prev) => ({ ...prev, images: imagesClone }) as Product);
    }
  }, [acceptedFiles[0]]);
  return (
    <section className={Style.visuals_container}>
      <div className={Style.headline}>
        <h2>Visuales</h2>
      </div>

      <VisualTrailerDropzone setProductState={setProductState} trailer={trailer}/>
      <div className={Style.screenshots}>
        <div {...getRootProps()} className={Style.screenshots_drop}>
          <input {...getInputProps()}/>
          <img className={Style.screenshots_wide} src={acceptedFiles[0] ? URL.createObjectURL(acceptedFiles[0]) : image} alt="img" />
          {isDragActive && <span className="dropzone_on_drop">
            <IoCloudUploadOutline fontSize={100} color='#fff'/>
          </span>}
        </div>
        <div className={Style.thumber_images}>
          {images.map((currentImage, index) => <VisualImageDropzone setProductState={setProductState} index={index} mainImage={currentImage} key={index}/>).slice(spliceImage)}
        </div>
      </div>
    </section>
  );
}