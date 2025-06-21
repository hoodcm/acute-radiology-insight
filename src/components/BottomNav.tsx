// BottomNav.tsx
// Component renders a mobile bottom navigation bar with links to main site sections.

// External dependencies: React hooks, router, icons, and utility functions
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutGrid, FileText, History, Wrench, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMemo, useState, useEffect } from 'react';

// navLinks: array of navigation items with display name, path, and icon component
const navLinks = [
  { name: 'Cases', href: '/cases', icon: LayoutGrid },
  { name: 'Essays', href: '/essays', icon: FileText },
  { name: 'Hindsight', href: '/hindsight', icon: History },
  { name: 'Tools', href: '/tools', icon: Wrench },
  { name: 'About', href: '/about', icon: Info },
];

// BottomNav component definition
export function BottomNav() {
  // Hook: access current route location
  const location = useLocation();
  // Determine index of the active link based on current path
  const activeIndex = useMemo(() => {
    return navLinks.findIndex(link => link.href === location.pathname);
  }, [location.pathname]);

  // Effect: scroll to top whenever the route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [location.pathname]);

  // Render the navigation bar UI
  return (
      // <nav>: fixed bottom nav container, visible on mobile only
    <nav
      className="bottom-nav md:hidden fixed left-4 right-4 h-16 max-w-[600px] mx-auto px-2 backdrop-blur-md backdrop-saturate-150 bg-white/90 dark:bg-zinc-900/80 shadow-[4px_4px_0px_theme(colors.gray.800/30)] dark:shadow-[4px_4px_0px_theme(colors.gray.500/20)] z-50 ease rounded-full overflow-hidden transition-none border-2 border-black"
      style={{
        bottom: `calc(env(safe-area-inset-bottom) + 0.5rem)`
      }}
    >
      {/* Grid container for navigation items */}
      <div className="grid h-full grid-cols-5 justify-items-center items-center w-full relative">
        {/* Active indicator: highlights the currently selected tab */}
        {activeIndex >= 0 && (() => {
          const idx = activeIndex;
          return (
            <div
              className="absolute inset-y-1 bg-accent dark:bg-accent-dark backdrop-blur-sm rounded-full transition-all duration-150 ease-out"
              style={{
                left: `${(idx + 0.5) * (100 / navLinks.length)}%`,
                width: 'calc(100% / 5 + 0.4rem)',
                transform: 'translateX(-50%)',
              }}
            />
          );
        })()}
        
        {/* Render each navigation link with icon and label */}
        {navLinks.map((link, index) => {
          const Icon = link.icon;
          const isActive = activeIndex === index;
          
          // NavLink: clickable link that navigates to link.href
          return (
            <NavLink
              key={link.name}
              to={link.href}
              aria-label={link.name}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full space-y-1 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all duration-100 ease-in-out active:scale-95 relative z-10',
                isActive 
                  ? 'text-black dark:text-white font-weight:600' 
                  : 'text-black dark:text-gray-100 font-weight:300 hover:text-black dark:hover:text-gray-100'
              )}
            >
              {/* Icon component for the navigation item */}
              <Icon 
                className={cn(
                  "transition-all duration-100 text-current",
                  isActive ? "w-6 h-6 opacity-100" : "w-6 h-6 opacity-70"
                )}
              />
              {/* Text label for the navigation item */}
              <span 
                className={cn(
                  "text-xs transition-all duration-100",
                  isActive ? "font-bold opacity-100" : "font-weight:300 opacity-70"
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
