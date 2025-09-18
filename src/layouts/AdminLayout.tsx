import { MainMenu } from '@/components/custom/MainMenu';
import { Outlet } from 'react-router';

export const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex min-w-full bg-sky-900 justify-center">
        <MainMenu />
      </header>
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};
