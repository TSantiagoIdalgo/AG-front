import { Route, Routes } from 'react-router-dom';
import React from 'react';

export default function App(): React.JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<h1>hola</h1>}/>
    </Routes>
  );
}
