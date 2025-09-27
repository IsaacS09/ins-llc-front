// lazy to load pages on demand not by load all website
// import { lazy } from 'react';
// const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'));
// .then((module) => ({default: module.SearchPage}))
import { createBrowserRouter, Navigate } from 'react-router';

import { AdminLayout } from '@/modules/admin/layout/AdminLayout';

import { PatientList } from '@/modules/patients/list/PatientList';
import { AddNewPatient } from '@/modules/patients/list/AddNewPatient';
import { PatientsLayout } from '@/modules/patients/layout/PatientsLayout';
import { PatientTabs } from '@/modules/patients/PatientTabs';
import { Login } from '@/modules/auth/Login';
import { ProtectedRoute } from '@/components/custom/ProtectedRoute';
import { HomePage } from './modules/home/HomePage';

// export const appRouter = createHashRouter([
export const appRouter = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="home" replace />,
      },
      {
        path: 'home',
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
        element: <Navigate to="/patients" />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" />,
  },
]);
