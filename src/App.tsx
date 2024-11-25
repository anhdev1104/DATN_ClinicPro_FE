import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/router';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { DatesProvider } from '@mantine/dates';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({});
function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <DatesProvider settings={{}}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </DatesProvider>
    </MantineProvider>
  );
}

export default App;
