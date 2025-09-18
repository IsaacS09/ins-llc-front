import { Outlet } from 'react-router';

export const PatientsLayout = () => {
  return (
    <div className="min-h-auto bg-white">
      <div className="max-w-7xl mx-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};
