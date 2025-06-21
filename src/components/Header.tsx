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
    <header className="pt-[env(safe-area-inset-top)] py-1 sm:py-1.5 lg:py-2 border-b-2 border-black dark:border-[#222222] sticky top-0 z-40 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-md backdrop-saturate-150">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-jersey font-bold text-foreground leading-none pr-4">
          <span className="block md:hidden text-3xl sm:text-4xl">Level One Radiology</span>
          <span className="hidden md:block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">Level One</span>
          <span className="hidden md:block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl md:-mt-1">Radiology</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          <nav className="flex items-center h-5 space-x-3 lg:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="relative group text-2xl leading-none font-jersey25 text-muted-foreground hover:text-foreground transition-colors duration-75 ease-in-out"
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
