import './index.css'
import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ptPT from "antd/locale/pt_PT";
import { AuthProvider } from '@/hooks/useAuth';

const queryClient = new QueryClient();

const App = lazy(() => import('@/App'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const ChatPage = lazy(() => import('@/pages/ChatPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const PlanPage = lazy(() => import('@/pages/PlanPage'))
const SettingsPage = lazy(() => import('@/pages/SettingsPage'))
const LoadingPage = lazy(() => import('@/pages/LoadingPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

const ProtectedRoute = lazy(() => import('@/components/ProtectedRoute'))
const PublicRoute = lazy(() => import('@/components/PublicRoute'))

const NavBar = lazy(() => import('@/components/NavBar'))

const RootRedirect = () => {
  const isAuthenticated = !!sessionStorage.getItem('authToken');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to="/profile" replace />;
};

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <RootRedirect />,
      },

      {
        element: (
          <PublicRoute>
            <Suspense fallback={<LoadingPage />}>
              <LoginPage />
            </Suspense>
          </PublicRoute>
        ),
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
          path: 'register',
          element: <RegisterPage />,
          },
        ],
      },

      {
        element: (
          <ProtectedRoute>
            <NavBar />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'chat',
            element: <ChatPage />,
          },
          {
            path: 'profile',
            element: <ProfilePage />,
          },
          {
            path: 'plan',
            element: <PlanPage />,
          },
          {
            path: 'settings',
            element: <SettingsPage />,
          },
        ],
      },

      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        locale={ptPT}
        theme={{
          token: {
            colorPrimary: sessionStorage.getItem("colorMode") === "light" ? "#D2F1E4" : "#48304D",
          },
        }}
      >
        <AuthProvider>
            <Suspense fallback={<LoadingPage />}>
              <RouterProvider router={router} />
            </Suspense>
        </AuthProvider>
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
);