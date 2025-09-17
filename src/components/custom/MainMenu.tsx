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
    <NavigationMenu className="py-5">
      <NavigationMenuList>
        {/**Home */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              isActive('/admin') && 'bg-slate-200',
              'rounded-md p-2'
            )}
          >
            <Link to="/admin">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/**Search */}
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              isActive('/admin/patients') && 'bg-slate-200',
              'rounded-md p-2'
            )}
          >
            <Link to="/admin/patients">Patients</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
