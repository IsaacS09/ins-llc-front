// lazy to load pages on demand not by load all website
// import { lazy } from 'react';
// const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'));
// .then((module) => ({default: module.SearchPage}))
import { createBrowserRouter, Navigate } from 'react-router';

import { AdminLayout } from '@/layouts/AdminLayout';

import { PatientsPage } from '@/patients/pages/PatientsPage';
import { HomePage } from '@/home/pages/HomePage';

export const appRouter = createBrowserRouter([
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'patients',
        element: <PatientsPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/admin" />,
  },
]);
