import { RouterProvider } from 'react-router';
import { appRouter } from './router/app.routes';

export const IntegratedNursingSolutionsApp = () => {
  return <RouterProvider router={appRouter} />;
};
