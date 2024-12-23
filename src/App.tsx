import { Route, Routes } from 'react-router-dom';
import LandingIndex from './modules/landing/landing-index';
import { Navbar } from '#modules/core/components/core-index.ts';
import ProductDetailIndex from '#modules/product-detail/product-detail-index.tsx';
import React from 'react';

export default function App(): React.JSX.Element {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<LandingIndex/>} loader/>
        <Route path='/:id' element={<ProductDetailIndex/>}/>
      </Routes>
    </div>
  );
}
