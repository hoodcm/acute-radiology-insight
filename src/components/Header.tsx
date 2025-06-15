
import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'Cases', href: '#' },
  { name: 'Essays', href: '#' },
  { name: 'Hindsight', href: '#' },
  { name: 'Tools', href: '#' },
  { name: 'About', href: '#' },
];

export function Header() {
  return (
    <header className="py-4 border-b border-[var(--color-border)]">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-serif text-2xl font-bold text-white">
          Level One Radiology
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
