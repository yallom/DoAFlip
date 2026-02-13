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
const LoadingPage = lazy(() => import('@/pages/LoadingPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

const NavBar = lazy(() => import('@/components/NavBar'))
const HomePage = lazy(() => import('@/pages/HomePage'))
const ExchangesPage = lazy(() => import('@/pages/ExchangesPage'))
const CoinsPage = lazy(() => import('@/pages/CoinsPage'))
const SettingsPage = lazy(() => import('@/pages/SettingsPage'))
  

export const router = createBrowserRouter([
    {
      element: <App />,
      errorElement: <NotFoundPage />,
      ErrorBoundary: NotFoundPage,
      children: [
        {
            path: '/',
            element: <Navigate to="/homepage" replace />
        },                
        {
          element: <NavBar/>,
          children: [
            {
              path: 'homepage',
              element: <HomePage/>,
            },
            {
              path: 'exchanges',
              element: <ExchangesPage/>,
            },
            {
              path: 'coins',
              element: <CoinsPage/>,
            },
            {
              path: 'settings',
              element: <SettingsPage/>,
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