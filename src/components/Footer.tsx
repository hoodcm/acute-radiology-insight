
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer 
      id="footer" 
      className="border-t border-[var(--color-border)] mt-24 py-8 md:py-12"
      role="contentinfo"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-fluid-lg">
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
            className="flex w-full max-w-sm h-12 rounded-lg overflow-hidden border border-border focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2"
            onSubmit={(e) => {
              e.preventDefault();
              // Handle subscription logic here
              const formData = new FormData(e.currentTarget);
              const email = formData.get('email');
              console.log('Subscribe:', email);
            }}
          >
            <label htmlFor="footer-email" className="sr-only">
              Email address for newsletter subscription
            </label>
            <Input
              id="footer-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              aria-label="Email address"
              required
              className="flex-1 border-none rounded-none focus:ring-0 focus-visible:ring-0 placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4"
            />
            <Button
              type="submit"
              variant="default"
              className="bg-accent text-foreground hover:bg-accent-dark focus:ring-2 focus:ring-accent focus:outline-none h-full rounded-none px-6 touch-target"
              aria-label="Subscribe to newsletter"
            >
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2">
            We respect your privacy and will never share your email.
          </p>
        </div>
      </div>
    </footer>
  );
}
