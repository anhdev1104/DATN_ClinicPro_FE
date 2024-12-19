import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import './index.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import persistor, { store } from './redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { StyledEngineProvider } from '@mui/material';
import { StrictMode } from 'react';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StyledEngineProvider injectFirst>
          <App />
          <ToastContainer position="bottom-right" theme="colored" autoClose={4000} pauseOnHover={false} />
          <Toaster />
        </StyledEngineProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
