
import { Link } from 'react-router-dom';
import { DarkModeToggle } from './DarkModeToggle';
import { SearchInput } from './SearchInput';

const navLinks = [
  { name: 'Cases', href: '/cases' },
  { name: 'Essays', href: '/essays' },
  { name: 'Hindsight', href: '/hindsight' },
  { name: 'Tools', href: '/tools' },
  { name: 'About', href: '/about' },
];

export function Header() {
  return (
    <header className="pt-[env(safe-area-inset-top)] py-1 sm:py-1.5 lg:py-2 border-b-2 border-black dark:border-gray-700 sticky top-0 z-40 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-md backdrop-saturate-150 supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-zinc-900/60">
      <div 
        className="absolute inset-0 bg-white/90 dark:bg-zinc-900/80 -z-10"
        style={{
          top: 'calc(-1 * env(safe-area-inset-top, 0px))',
        }}
      />
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-jersey font-bold text-foreground leading-none pr-4">
          <span className="block md:hidden text-2xl sm:text-3xl">Level One Radiology</span>
          <span className="hidden md:block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">Level One</span>
          <span className="hidden md:block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl md:-mt-0.5">Radiology</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          <nav className="flex items-center h-5 space-x-3 lg:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="relative group text-xl lg:text-2xl leading-none font-jersey25 text-muted-foreground hover:text-foreground transition-colors duration-75 ease-in-out"
              >
                <span className="opacity-0 group-hover:opacity-100 mr-1 text-foreground">[</span>
                {link.name}
                <span className="opacity-0 group-hover:opacity-100 ml-1 text-foreground">]</span>
              </Link>
            ))}
          </nav>
          <SearchInput />
          <DarkModeToggle />
        </div>

        <div className="md:hidden flex items-center gap-x-2">
          <SearchInput />
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
