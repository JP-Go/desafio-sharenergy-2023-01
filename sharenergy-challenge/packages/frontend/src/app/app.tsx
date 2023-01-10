import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { AuthProvider } from './context/authContext';
import Login from './pages/login';

const Home = lazy(() => import('./pages/home'));
const HttpCat = lazy(() => import('./pages/http-cat'));
const RandomDog = lazy(() => import('./pages/random-dog'));
const Clients = lazy(() => import('./pages/clients'));
const CreateClient = lazy(() => import('./pages/create-client'));
const Client = lazy(() => import('./pages/client'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <Suspense fallback={<Header path="/home" />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/http-cat"
            element={
              <Suspense fallback={<Header path="/http-cat" />}>
                <HttpCat />
              </Suspense>
            }
          />
          <Route
            path="/random-dog"
            element={
              <Suspense fallback={<Header path="/random-dog" />}>
                <RandomDog />
              </Suspense>
            }
          />
          <Route path="/clients">
            <Route
              index
              element={
                <Suspense fallback={<Header path="/clients" />}>
                  <Clients />
                </Suspense>
              }
            />
            <Route path=":id">
              <Route
                index
                element={
                  <Suspense fallback={<Header path="/clients" />}>
                    <Client />
                  </Suspense>
                }
              />
              <Route
                path="edit"
                element={
                  <Suspense fallback={<Header path="/clients" />}>
                    <Client />
                  </Suspense>
                }
              />
            </Route>
            <Route
              path="new"
              element={
                <Suspense fallback={<Header path="/clients" />}>
                  <CreateClient />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </QueryClientProvider>
    </AuthProvider>
  );
}
