
import { NavLink } from 'react-router-dom';
import { LayoutGrid, FileText, History, Wrench, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Cases', href: '/cases', icon: LayoutGrid },
  { name: 'Essays', href: '/essays', icon: FileText },
  { name: 'Hindsight', href: '/hindsight', icon: History },
  { name: 'Tools', href: '/tools', icon: Wrench },
  { name: 'About', href: '/about', icon: Info },
];

export function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border z-50">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                cn(
                  'inline-flex flex-col items-center justify-center px-5 hover:bg-muted font-medium group transition-colors',
                  isActive
                    ? 'text-accent'
                    : 'text-muted-foreground'
                )
              }
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{link.name}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
