import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../src/redux/Store.js';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> {/* Wrap App with BrowserRouter here */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
