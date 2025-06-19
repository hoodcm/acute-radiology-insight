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
      // h-20 = 80px nav height, plus 16px margin
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
      className="md:hidden fixed inset-x-4 h-20 bg-[#FDFCF9] border border-black rounded-full shadow-[4px_4px_0_rgba(0,0,0,1)] px-4 z-50"
      style={{ bottom: `${bottomOffset}px` }}
    >
      <div className="grid h-full max-w-lg grid-cols-5 gap-x-4 mx-auto relative">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.href}
              aria-label={link.name}
              className={({ isActive }) =>
                cn(
                  'inline-flex flex-col items-center justify-center w-full py-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-background transition-all duration-150 ease-in-out active:scale-[0.97]',
                  isActive ? 'text-accent' : 'text-black'
                )
              }
            >
              <Icon className="w-8 h-8 mb-0.5 stroke-2" />
              <span className="text-xs">
                <span className="opacity-0 group-hover:opacity-100 mr-1 text-foreground">[</span>
                {link.name}
                <span className="opacity-0 group-hover:opacity-100 ml-1 text-foreground">]</span>
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
