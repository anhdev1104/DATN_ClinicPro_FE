import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import persistor, { store } from './redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { StyledEngineProvider } from '@mui/material';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StyledEngineProvider injectFirst>
          <App />
          <ToastContainer position="bottom-right" theme="colored" autoClose={4000} pauseOnHover={false} />
        </StyledEngineProvider>
      </PersistGate>
    </Provider>
    ,
  </StrictMode>,
);
