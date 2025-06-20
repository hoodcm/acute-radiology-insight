import { NavLink, useLocation } from 'react-router-dom';
import { LayoutGrid, FileText, History, Wrench, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMemo, useState, useEffect } from 'react';

const navLinks = [
  { name: 'Cases', href: '/cases', icon: LayoutGrid },
  { name: 'Essays', href: '/essays', icon: FileText },
  { name: 'Hindsight', href: '/hindsight', icon: History },
  { name: 'Tools', href: '/tools', icon: Wrench },
  { name: 'About', href: '/about', icon: Info },
];

export function BottomNav() {
  const location = useLocation();
  const activeIndex = useMemo(() => {
    return navLinks.findIndex(link => link.href === location.pathname);
  }, [location.pathname]);

  // Removed scroll-based bottomOffset state and effect

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [location.pathname]);

  return (
    <nav
      className="bottom-nav md:hidden fixed left-4 right-4 h-14 max-w-[600px] mx-auto px-2 backdrop-blur-[60px] backdrop-saturate-150 bg-[rgba(255,255,255,0.04)] dark:bg-white/20 shadow-lg z-50 ease rounded-full overflow-hidden transition-none"
      style={{
        bottom: `calc(env(safe-area-inset-bottom) + 1.5rem)`
      }}
    >
      <div className="grid h-full grid-cols-5 justify-items-center items-center w-full relative">
        {/* Active indicator */}
        {activeIndex >= 0 && (() => {
          const idx = activeIndex;
          return (
            <div
              className="absolute inset-y-1 bg-accent dark:bg-accent-dark rounded-full transition-all duration-300 ease-out"
              style={{
                left: `${(idx + 0.5) * (100 / navLinks.length)}%`,
                width: 'calc(100% / 5)',
                transform: 'translateX(-50%)',
              }}
            />
          );
        })()}
        
        {navLinks.map((link, index) => {
          const Icon = link.icon;
          const isActive = activeIndex === index;
          
          return (
            <NavLink
              key={link.name}
              to={link.href}
              aria-label={link.name}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full space-y-1 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all duration-200 ease-in-out active:scale-95 relative z-10',
                isActive 
                  ? 'text-black dark:text-white font-semibold' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              )}
            >
              <Icon 
                className={cn(
                  "transition-all duration-200 text-current",
                  isActive ? "w-5 h-5 opacity-100" : "w-5 h-5 opacity-80"
                )}
              />
              <span 
                className={cn(
                  "text-xs transition-all duration-200",
                  isActive ? "font-semibold opacity-100" : "font-normal opacity-80"
                )}
              >
                {link.name}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
