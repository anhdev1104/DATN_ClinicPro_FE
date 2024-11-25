import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/router';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { DatesProvider } from '@mantine/dates';
import { createTheme, MantineProvider } from '@mantine/core';
import { Suspense } from 'react';
import LoadingPage from './pages/client/loading';

const theme = createTheme({});
function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <DatesProvider settings={{}}>
        <BrowserRouter>
          <Suspense fallback={<LoadingPage />}>
            <AppRouter />
          </Suspense>
        </BrowserRouter>
      </DatesProvider>
    </MantineProvider>
  );
}

export default App;
