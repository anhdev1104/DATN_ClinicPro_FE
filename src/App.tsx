import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/router';
import { Suspense } from 'react';
import LoadingPage from './pages/client/loading';
import MainProvider from './providers/MainProvider';
import Chatbox from './components/chatbox/Chatbox';
import { QueryParamOptions, QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import query from 'query-string';

const configOptionParams: QueryParamOptions = {
  enableBatching: true,
  skipUpdateWhenNoChange: true,
  objectToSearchString: encoded => query.stringify(encoded, { skipEmptyString: true, skipNull: true }),
};
function App() {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <QueryParamProvider adapter={ReactRouter6Adapter} options={configOptionParams}>
        <MainProvider>
          <Suspense fallback={<LoadingPage />}>
            <Chatbox />
            <AppRouter />
          </Suspense>
        </MainProvider>
      </QueryParamProvider>
    </BrowserRouter>
  );
}

export default App;
