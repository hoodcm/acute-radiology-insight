
// BottomNav.tsx
// Component renders a mobile bottom navigation bar with links to main site sections.

// External dependencies: React hooks, router, icons, and utility functions
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutGrid, FileText, History, Wrench, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMemo, useEffect, useState, useRef } from 'react';
import { useKeyboardAware } from '@/hooks/useKeyboardAware';

// navLinks: array of navigation items with display name, path, and icon component
const navLinks = [
  { name: 'Cases', href: '/cases', icon: LayoutGrid },
  { name: 'Essays', href: '/essays', icon: FileText },
  { name: 'Hindsight', href: '/hindsight', icon: History },
  { name: 'Tools', href: '/tools', icon: Wrench },
  { name: 'About', href: '/about', icon: Info },
];

// BottomNav component definition
export function BottomNav({ isPreviewOpen }: { isPreviewOpen: boolean }) {
  // Hook: access current route location
  const location = useLocation();
  const [isShrunk, setIsShrunk] = useState(false);
  const prevScrollY = useRef(window.scrollY);
  const { isKeyboardVisible } = useKeyboardAware();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      // Shrink when scrolling down, expand on scroll up
      setIsShrunk(currentY > prevScrollY.current);
      prevScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine index of the active link based on current path
  const activeIndex = useMemo(() => {
    return navLinks.findIndex(link => link.href === location.pathname);
  }, [location.pathname]);

  // Effect: scroll to top whenever the route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [location.pathname]);

  // Hide navigation when keyboard is visible on mobile
  if (isKeyboardVisible) {
    return null;
  }

  // Render the navigation bar UI
  return (
    // <nav>: fixed bottom nav container, visible on mobile only
    <nav
      className={cn(
        'md:hidden fixed h-16 left-4 right-4 max-w-[600px] mx-auto rounded-full overflow-hidden border-2 border-border bg-clip-padding isolate transition-all duration-150 ease-out transform',
        isPreviewOpen ? 'z-0' : 'z-50',
        isShrunk
          ? 'scale-[0.7] origin-bottom shadow-[4px_4px_0_0_theme(colors.shadow-hard)] dark:shadow-[4px_4px_0_0_theme(colors.shadow-hard)]'
          : 'scale-100 shadow-[4px_4px_0_0_theme(colors.shadow-hard)] dark:shadow-[4px_4px_0_0_theme(colors.shadow-hard)]'
      )}
      style={{ 
        bottom: `calc(var(--safe-area-inset-bottom, 0px) + 0.5rem)` 
      }}
    >
      <div className="h-full w-full px-2 backdrop-blur-md backdrop-saturate-150 bg-surface-card/90 transition-none">
        {/* Grid container for navigation items */}
        <div className="grid h-full grid-cols-5 justify-items-center items-center w-full relative">
        {/* Active indicator: highlights the currently selected tab */}
        {activeIndex >= 0 && (() => {
          const idx = activeIndex;
          return (
            <div
              className="absolute inset-y-1 bg-accent backdrop-blur-sm rounded-full transition-all duration-150 ease-out"
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
                  ? 'text-text-primary font-semibold' 
                  : 'text-text-primary font-normal hover:text-text-primary'
              )}
            >
              {/* Icon component for the navigation item */}
              <Icon 
                className={cn(
                  "transition-all duration-100 text-current",
                  isShrunk ? "w-8 h-8" : "w-7 h-7",
                  isActive ? "opacity-100" : "opacity-70"
                )}
              />
              {/* Text label for the navigation item */}
              <span 
                className={cn(
                  "transition-all duration-100",
                  isShrunk
                    ? "hidden"
                    : "text-xs " + (isActive ? "font-bold opacity-100" : "font-normal opacity-70")
                )}
              >
                {link.name}
              </span>
            </NavLink>
          );
        })}
        </div>
      </div>
    </nav>
  );
}
