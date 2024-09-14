// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <>
    <App />
    <ToastContainer position="bottom-right" theme="colored" autoClose={3000} />
  </>,
  // </StrictMode>,
);
