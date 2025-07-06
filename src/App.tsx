// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './shared/context/AuthContext';

function App() {
  return (
    <BrowserRouter basename="/creedmoorroadbaptist">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
