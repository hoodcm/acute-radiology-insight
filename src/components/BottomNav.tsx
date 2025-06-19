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
      className="md:hidden fixed inset-x-4 h-20 bg-white dark:bg-gray-900 border-2 border-black dark:border-white rounded-full shadow-[4px_4px_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_rgba(255,255,255,1)] px-4 z-50 backdrop-blur-sm"
      style={{ bottom: `${bottomOffset}px` }}
    >
      <div className="grid h-full max-w-lg grid-cols-5 gap-x-2 mx-auto relative">
        {/* Active indicator */}
        {activeIndex >= 0 && (
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-accent rounded-full transition-all duration-300 ease-out"
            style={{ 
              left: `${20 + (activeIndex * (100 / navLinks.length))}%`,
              transform: 'translateX(-50%) translateY(-50%)'
            }}
          />
        )}
        
        {navLinks.map((link, index) => {
          const Icon = link.icon;
          const isActive = activeIndex === index;
          
          return (
            <NavLink
              key={link.name}
              to={link.href}
              aria-label={link.name}
              className={cn(
                'inline-flex flex-col items-center justify-center w-full py-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-all duration-200 ease-in-out active:scale-95 relative z-10',
                isActive 
                  ? 'text-black font-semibold' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              )}
            >
              <Icon 
                className={cn(
                  "mb-0.5 stroke-2 transition-all duration-200",
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
