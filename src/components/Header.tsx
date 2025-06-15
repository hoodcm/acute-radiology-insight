import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { DarkModeToggle } from './DarkModeToggle';

const navLinks = [
  { name: 'Cases', href: '#' },
  { name: 'Essays', href: '#' },
  { name: 'Hindsight', href: '#' },
  { name: 'Tools', href: '#' },
  { name: 'About', href: '#' },
];

export function Header() {
  return (
    <header className="py-md border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-serif text-2xl font-bold text-foreground">
          Level One Radiology
        </Link>
        
        <div className="hidden md:flex items-center gap-md">
          <nav className="flex items-center space-x-xl">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <DarkModeToggle />
        </div>

        <div className="md:hidden flex items-center">
          <DarkModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="pt-2xl"
            >
              <nav className="flex flex-col space-y-sm">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block text-lg font-medium text-muted-foreground hover:text-foreground transition-colors px-md py-sm-plus rounded-md hover:bg-muted"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
