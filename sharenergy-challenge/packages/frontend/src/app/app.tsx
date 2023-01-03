import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { AuthProvider } from './lib/authContext';
import Login from './pages/login';

const Home = lazy(() => import('./pages/home'));
const HttpCat = lazy(() => import('./pages/http-cat'));

const queryClient = new QueryClient();

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <Suspense fallback={<Header />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/http-cat"
            element={
              <Suspense fallback={<Header />}>
                <HttpCat />
              </Suspense>
            }
          />
        </Routes>
      </QueryClientProvider>
    </AuthProvider>
  );
}
