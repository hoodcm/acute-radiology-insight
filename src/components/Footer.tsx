import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-border)] mt-24 py-8 md:py-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left column */}
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Level One Radiology. All rights reserved.
        </p>

        {/* Right column: subscription block */}
        <div className="w-full max-w-sm">
          <p className="mb-2 text-sm text-muted-foreground">
            Subscribe for concise radiology insights, no spam.
          </p>
          <form
            aria-label="Subscribe to newsletter"
            className="flex w-full max-w-sm h-12 rounded-lg overflow-hidden border border-border"
          >
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <Input
              id="footer-email"
              type="email"
              placeholder="you@example.com"
              aria-label="Email address"
              className="flex-1 border-none rounded-none focus:ring-0 placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4"
            />
            <Button
              type="submit"
              variant="default"
              className="bg-accent text-foreground hover:bg-accent-dark focus:ring-2 focus:ring-accent focus:outline-none h-full rounded-none px-6"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </footer>
  );
}
