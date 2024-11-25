import { Route, Routes } from 'react-router-dom';
import LandingIndex from './modules/landing/landing-index';
import React from 'react';

export default function App(): React.JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<LandingIndex/>}/>
    </Routes>
  );
}
