import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import AuthStates from './context/AuthStates';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <AuthStates>
      <App />
    </AuthStates>
  </React.StrictMode>
  </BrowserRouter>
);
