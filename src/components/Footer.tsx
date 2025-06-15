
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-border)] mt-24 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm text-gray-400">
          &copy; {currentYear} Level One Radiology. All rights reserved.
        </p>
        <form className="flex w-full max-w-sm items-center space-x-2">
          <Input type="email" placeholder="Get cases and essays delivered." className="bg-[#1a1a1a] border-[var(--color-border)] placeholder:text-gray-500"/>
          <Button type="submit" variant="outline" className="bg-transparent border-[var(--color-border)] hover:bg-[var(--color-accent)] hover:text-black">
            Subscribe
          </Button>
        </form>
      </div>
    </footer>
  );
}
