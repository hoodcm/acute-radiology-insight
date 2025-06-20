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

  const baseMargin = 16;
  const [bottomOffset, setBottomOffset] = useState(16);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById('footer');
      if (!footer) return;
      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (footerRect.top < viewportHeight) {
        const overlap = viewportHeight - footerRect.top;
        setBottomOffset(baseMargin + overlap);
      } else {
        setBottomOffset(baseMargin);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
    setBottomOffset(baseMargin);
  }, [location.pathname]);

  return (
    <nav
      className="md:hidden fixed inset-x-6 backdrop-blur-[24px] bg-white/30 dark:bg-black/30 shadow-lg z-50 transition-all duration-300 ease rounded-full overflow-hidden"
      style={{
        bottom: `${bottomOffset}px`,
        width: 'calc(100% - 1.5rem * 2)',
        aspectRatio: 860 / 104
      }}
    >
      <div className="grid h-full grid-cols-5 justify-items-center items-center w-full relative">
        {/* Active indicator */}
        {activeIndex >= 0 && (() => {
          const idx = activeIndex;
          return (
            <div
              className="absolute top-1/2 -translate-y-1/2 bg-accent dark:bg-accent-dark rounded-full transition-all duration-300 ease-out"
              style={{
                left: `${(idx + 0.5) * (100 / navLinks.length)}%`,
                width: 'calc((100% / 5) * 0.9)',
                height: 'calc(100% * 0.85)',
                transform: 'translateX(-50%) translateY(-50%)'
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
                'inline-flex flex-col items-center justify-center w-[36px] py-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all duration-200 ease-in-out active:scale-95 relative z-10',
                isActive 
                  ? 'text-black dark:text-white font-semibold' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              )}
            >
              <Icon 
                className={cn(
                  "transition-all duration-200 filter dark:invert",
                  isActive ? "w-6 h-6" : "w-5 h-5"
                )}
              />
              <span 
                className={cn(
                  "text-xs transition-all duration-200",
                  isActive ? "font-semibold" : "font-normal"
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
