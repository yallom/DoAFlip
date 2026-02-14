import './index.css'
import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ptPT from "antd/locale/pt_PT";

const queryClient = new QueryClient();

const App = lazy(() => import('@/App'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const ChatPage = lazy(() => import('@/pages/ChatPage'))

const NavBar = lazy(() => import('@/components/NavBar'))
const PlanPage = lazy(() => import('@/pages/PlanPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const SettingsPage = lazy(() => import('@/pages/SettingsPage'))
const LoadingPage = lazy(() => import('@/pages/LoadingPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
  

export const router = createBrowserRouter([
    {
      element: <App />,
      errorElement: <NotFoundPage />,
      ErrorBoundary: NotFoundPage,
      children: [
        {
            path: '/',
            element: <Navigate to="/chatpage" replace />
        },                
        {
          element: <NavBar/>,
          children: [
            {
              path: 'chat',
              element: <ChatPage/>,
            },
            {
              path: 'profile',
              element: <ProfilePage/>,
            },
            {
              path: 'plan',
              element: <PlanPage/>,
            },
            {
              path: 'settings',
              element: <SettingsPage/>,
            },
            {
              path: 'login',
              element: <LoginPage/>,
            },
          ],
        },
      ],
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        locale={ptPT}
        theme={{
          token: {
            colorPrimary: sessionStorage.getItem("colorMode") == "light" ? "#D2F1E4" : "#48304D", 
          },
        }}
      >
        <Suspense fallback={<LoadingPage />}>
          <RouterProvider router={router} />
        </Suspense>
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
)