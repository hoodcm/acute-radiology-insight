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
    <header className="py-1 sm:py-2 lg:py-4 border-b-4 border-black dark:border-[#222222] sticky top-0 z-40 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-jersey text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
          Level One Radiology
        </Link>
        
        <div className="hidden md:flex items-start gap-4 sm:gap-6 lg:gap-8">
          <nav className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="relative group text-base md:text-lg lg:text-xl tracking-wide font-jersey25 text-muted-foreground hover:text-foreground transition-colors duration-75 ease-in-out"
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

        <div className="md:hidden flex items-start gap-x-2">
          <SearchInput />
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
