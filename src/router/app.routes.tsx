// lazy to load pages on demand not by load all website
// import { lazy } from 'react';
// const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'));
// .then((module) => ({default: module.SearchPage}))
import { createBrowserRouter, Navigate } from 'react-router';

import { AdminLayout } from '@/layouts/AdminLayout';

import { PatientList } from '@/patients/list/PatientList';
import { AddNewPatient } from '@/patients/list/AddNewPatient';
import { PatientsLayout } from '@/layouts/PatientsLayout';
import { PatientTabs } from '@/patients/PatientTabs';
import { Login } from '@/auth/Login';
import { ProtectedRoute } from '@/components/custom/ProtectedRoute';

// export const appRouter = createHashRouter([

export const appRouter = createBrowserRouter([
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'admin',
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="patients" replace />,
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
        element: <Navigate to="/patients" />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" />,
  },
]);
