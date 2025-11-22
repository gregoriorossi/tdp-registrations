import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.module.scss';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AdminAllFormsPage } from './pages/admin/AdminAllFormsPage';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { queryClient } from './api/queryClient';
import { FormPage } from './pages/FormPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminFormPage } from './pages/admin/AdminFormPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { QueryClientProvider } from '@tanstack/react-query';


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

const theme = createTheme({
	palette: {
		primary: {
			main: "#ff8f00"
		},
		secondary: {
			main: '#ffcc80'
		}
	}
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<RouterProvider router={router} />
			</ThemeProvider>
		</QueryClientProvider>
	</StrictMode>,
)
