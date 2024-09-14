import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routers/router';

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
