/* eslint-disable no-console */
import { DataResponse } from '#src/common/interfaces/pageable-data.interface.ts';
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

export const useUpdateProduct = (originalProduct: Product | undefined, setProduct: React.Dispatch<React.SetStateAction<Product | undefined>> ) => {
  const [productState, setProductState] = useState<Product | undefined>(originalProduct);
  const [isPending, setIsPending] = useState(false);
  const onUpdateProduct = async (product: ProductDTO, setPageableProducts: React.Dispatch<React.SetStateAction<DataResponse<Product> | undefined>>) => {
    setIsPending(true);
    console.log('se llamo');
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
      const response = await globalThis.fetch(`http://localhost:8080/product/update/${originalProduct?.id}`, {
        body: formData,
        credentials: 'include',
        method: 'PATCH',
      });
      const data = await response.json();
      if (data.body?.data) {
        setProduct(data.body.data);
        setPageableProducts?.((prev) => {
          const contentClone = structuredClone(prev?.content || []);
          const productIndex = contentClone.findIndex(productContent => productContent.id === data.body.data.id);
          if (productIndex !== -1) {
            contentClone.splice(productIndex, 1);
            contentClone.push(data.body.data);
          }
          return { ...prev, content: contentClone } as DataResponse<Product>;
        });
      }
      else if(data.body?.error) throw new Error(data.body.error.message);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    } finally {
      setIsPending(false);
    }
  };

  const onCreateProduct = async (product: ProductDTO, setPageableProducts: React.Dispatch<React.SetStateAction<DataResponse<Product> | undefined>>) => {
    setIsPending(true);
    if (product?.id) return await onUpdateProduct(product, setPageableProducts);
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
      const response = await globalThis.fetch('http://localhost:8080/product/create', {
        body: formData,
        credentials: 'include',
        method: 'POST',
      });
      const data = await response.json();
      if (data.body?.data) {
        setProduct(data.body.data);
        setPageableProducts?.(prev => ({ ...prev, content: [...(prev?.content || []), data.body.data] }) as  DataResponse<Product>);
        setProductState(data.body.data);
      } else if(data.body?.error) throw new Error(data.body.error.message);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    } finally {
      setIsPending(false);
    }
    return product;
  };

  return { isPending, onCreateProduct, onUpdateProduct, productState, setProductState };
};