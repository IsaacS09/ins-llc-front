// lazy to load pages on demand not by load all website
// import { lazy } from 'react';
// const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'));
// .then((module) => ({default: module.SearchPage}))
import { createBrowserRouter, Navigate } from 'react-router';

import { AdminLayout } from '@/layouts/AdminLayout';

import { PatientList } from '@/patients/components/PatientList';
import { HomePage } from '@/home/pages/HomePage';
import { AddNewPatient } from '@/patients/components/AddNewPatient';
import { PatientsLayout } from '@/layouts/PatientsLayout';

export const appRouter = createBrowserRouter([
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'patients',
        element: <PatientsLayout />,
        children: [
          {
            index: true,
            element: <PatientList />,
          },
          {
            path: 'add-new-patient',
            element: <AddNewPatient />,
          },
        ],
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
