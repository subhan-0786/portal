import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { DarkModeProvider } from './contexts/DarkModeContext';
import AuthWrapper from './components/auth/AuthWrapper';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <DarkModeProvider>
        <div className="App">
          <AuthWrapper />
        </div>
      </DarkModeProvider>
    </Provider>
  );
}

export default App;