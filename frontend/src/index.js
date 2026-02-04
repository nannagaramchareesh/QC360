import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import AuthStates from './context/AuthStates';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthStates>
      <App />
    </AuthStates>
  </React.StrictMode>
);
