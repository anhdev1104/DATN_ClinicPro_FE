import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/router';
import { Suspense } from 'react';
import LoadingPage from './pages/client/loading';
import MainProvider from './providers/MainProvider';

function App() {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <MainProvider>
        <Suspense fallback={<LoadingPage />}>
          <AppRouter />
        </Suspense>
      </MainProvider>
    </BrowserRouter>
  );
}

export default App;
