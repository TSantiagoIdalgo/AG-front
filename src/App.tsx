import { Footer, Navbar } from '#modules/core/components/core-index.ts';
import { Navigate, Route, Routes } from 'react-router-dom';
import CreateProduct from './state/create-product';
import LandingIndex from './modules/landing/landing-index';
import ProductDetailIndex from '#modules/product-detail/product-detail-index.tsx';
import React from 'react';

export default function App(): React.JSX.Element {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='*'  element={<Navigate to="/"/>}/>
        <Route path='/' element={<LandingIndex/>}/>
        <Route path='/:id' element={<ProductDetailIndex/>}/>
        <Route path='/create' element={<CreateProduct/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}
