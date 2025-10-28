import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AdminAllFormsPage } from './pages/admin/AdminAllFormsPage.jsx'
import { AdminLoginPage } from './pages/admin/AdminLoginPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { AdminFormPage } from './pages/admin/AdminFormPage.jsx'
import { FormPage } from './pages/FormPage.jsx'

const router = createBrowserRouter([
  {
    path: '/admin/login',
    element: <AdminLoginPage />
  },
  {
    path: '/admin', 
    element: <AdminAllFormsPage />,
  },
  {
    path: '/admin/form/:slug',
    element: <AdminFormPage />
  },
  {
    path: 'form/:slug',
    element: <FormPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
