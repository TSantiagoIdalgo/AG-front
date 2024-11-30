import { Route, Routes } from 'react-router-dom';
import LandingIndex from './modules/landing/landing-index';
import { Navbar } from '#modules/core/components/core-index.ts';
import React from 'react';

export default function App(): React.JSX.Element {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<LandingIndex/>}/>
      </Routes>
    </div>
  );
}
