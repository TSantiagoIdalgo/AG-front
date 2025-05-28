/* eslint-disable no-console */
import { Genre, Platform, Product, Requirements } from '#src/common/interfaces/product.interface.ts';
import React, { useState } from 'react';

interface ProductDTO {
    id:              string;
    name:            string;
    description:     string;
    franchise: string;
    platforms:       Platform[];
    developer:       string;
    genres:          Genre[];
    tags:            string[];
    disabled:        boolean;
    stock:           number;
    price:           number;
    discount:        number;
    images:          string[] | File[];
    backgroundImage: string | File;
    trailer:         string | File;
    mainImage:       string | File;
    requirements: Requirements[]
    release_date: string;
    distributor: string
    pegi: string
}

export const useUpdateProduct = (productId: string, setProduct: React.Dispatch<React.SetStateAction<Product | undefined>>) => {
  const [isPending, setIsPending] = useState(false);
  const onUpdateProduct = async (product: ProductDTO) => {
    setIsPending(true);
    const { mainImage, trailer, backgroundImage, images, ...productToUpdate } = product;
    const updateProduct = {
      ...productToUpdate,
      images: images.filter((image) => typeof image === 'string')
    };
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(updateProduct)], { type: 'application/json' }));
      
    if (mainImage instanceof File) {
      formData.append('mainImage', product.mainImage);
    }
    if (trailer instanceof File) {
      formData.append('trailer', product.trailer);
    }
    if (backgroundImage instanceof File) {
      formData.append('backgroundImage', product.backgroundImage);
    }
    const productImageFiles = product.images.filter((image) => image instanceof File);
    if (productImageFiles.length) {
      Object.values(product.images).forEach((image) => {
        formData.append('images', image); 
      });
    }
    try {
      const response = await globalThis.fetch(`http://localhost:8080/product/update/${productId}`, {
        body: formData,
        credentials: 'include',
        method: 'PATCH',
      });
      const data = await response.json();
      if (data.body?.data) setProduct(data.body.data);
      else if(data.body?.error) throw new Error(data.body.error.message);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, onUpdateProduct };
};