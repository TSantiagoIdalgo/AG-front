import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './state/store.ts';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([
  AllCommunityModule,
]);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="ancore">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
