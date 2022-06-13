import { Router } from './routes/Router';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store';

function App() {
  return (
    <div>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </div>
  );
}

export default App;
