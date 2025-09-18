// lazy to load pages on demand not by load all website
// import { lazy } from 'react';
// const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'));
// .then((module) => ({default: module.SearchPage}))
import { createHashRouter, Navigate } from 'react-router';

import { AdminLayout } from '@/layouts/AdminLayout';

import { PatientList } from '@/patients/list/PatientList';
import { HomePage } from '@/home/pages/HomePage';
import { AddNewPatient } from '@/patients/list/AddNewPatient';
import { PatientsLayout } from '@/layouts/PatientsLayout';
import { PatientTabs } from '@/patients/PatientTabs';

// export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter([
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
          {
            path: 'patient/:patientId',
            element: <PatientTabs />,
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
