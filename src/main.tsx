import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { createRoot } from 'react-dom/client';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
