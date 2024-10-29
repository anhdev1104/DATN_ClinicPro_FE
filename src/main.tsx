import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/inter';
import { Provider } from 'react-redux';
import persistor, { store } from './redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { StyledEngineProvider } from '@mui/material';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StyledEngineProvider injectFirst>
        <App />
        <ToastContainer position="bottom-right" theme="colored" autoClose={4000} pauseOnHover={false} />
      </StyledEngineProvider>
    </PersistGate>
  </Provider>,
);
