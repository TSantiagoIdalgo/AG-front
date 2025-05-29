/* eslint-disable @typescript-eslint/no-explicit-any */
 
import React, { useCallback, useEffect } from 'react';
import Style from './visuals-detail.module.css';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useDropzone } from 'react-dropzone';
import { Product } from '#src/common/interfaces/product.interface.ts';
import ImageNotFound from '#assets/background/not-found-without-text.png';

interface VisualImageDropzoneProps { 
  mainImage: string, 
  index: number, 
  setProductState: React.Dispatch<React.SetStateAction<Product | undefined>> 
}

export const VisualImageDropzone = ({ mainImage, index, setProductState }: VisualImageDropzoneProps): React.JSX.Element => {
  const onDrop = useCallback(() => undefined, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles  } = useDropzone({accept: { 'image/*': [] },  multiple: false, onDrop});
  const image = mainImage.length > 1 ? mainImage : ImageNotFound;
  useEffect(() => {
    if (acceptedFiles[0]) {
      setProductState((prev) => {
        const imagesClone = structuredClone(prev?.images || []) as string[];
        imagesClone[index] = acceptedFiles[0] as any;

        return { ...prev, images: imagesClone } as Product;
      });
    }
  }, [acceptedFiles[0]]);
  return (
    <div {...getRootProps()} className={Style.visual_images}>
      <input {...getInputProps()}/>
      <img src={acceptedFiles[0] ? URL.createObjectURL(acceptedFiles[0]) : image} alt={`image ${index}`} className={Style.thumber_images_image}/>
      {isDragActive && <span className="dropzone_on_drop">
        <IoCloudUploadOutline fontSize={100} color='#fff'/>
      </span>}
    </div>
  );
};