import { Link, useLocation } from 'react-router';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../ui/navigation-menu';
import { cn } from '@/lib/utils';

export const MainMenu = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <NavigationMenu className="max-w-7xl py-5 justify-start">
      <NavigationMenuList>
        {/**Search */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              isActive('/admin/patients')
                ? 'bg-sky-100 text-sky-900'
                : 'bg-sky-800 text-white',
              'hover:bg-sky-200 focus:bg-sky-200  p-2'
            )}
          >
            <Link to="/admin/patients">Patients</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
