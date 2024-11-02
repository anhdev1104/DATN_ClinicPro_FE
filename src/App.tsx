import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/router';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
