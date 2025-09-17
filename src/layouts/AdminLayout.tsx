import { MainMenu } from '@/components/custom/MainMenu';
import { Outlet } from 'react-router';

export const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-6">
        <MainMenu />
        <Outlet />
      </div>
    </div>
  );
};
