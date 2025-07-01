
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { CheckCircle, Mail, Loader2 } from 'lucide-react';
import { useKeyboardAware } from '@/hooks/useKeyboardAware';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');
  const { isKeyboardVisible } = useKeyboardAware();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      setEmail('');
      console.log('Subscribe:', email);
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <footer 
      id="footer" 
      className={`border-t border-border mt-16 sm:mt-20 lg:mt-24 py-8 md:py-12 mb-20 md:mb-0 ${
        isKeyboardVisible ? 'keyboard-aware-bottom' : 'safe-area-inset-bottom'
      }`}
      role="contentinfo"
    >
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:items-center space-y-8 md:space-y-0 px-4 sm:px-6 lg:px-8">
        {/* Left column */}
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Level One Radiology. All rights reserved.
        </p>

        {/* Right column: enhanced subscription block */}
        <div className="w-full max-w-sm">
          {isSubscribed ? (
            <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                Successfully subscribed! Check your email.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-4 h-4 text-accent" />
                <p className="text-sm font-medium text-foreground">
                  Get radiology insights
                </p>
              </div>
              <p className="mb-3 text-xs text-muted-foreground">
                Weekly case studies and educational content, no spam.
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex w-full max-w-sm h-12 rounded-lg overflow-hidden border-2 border-black dark:border-white focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-1 transition-shadow"
              >
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="flex-1 border-none rounded-none focus:ring-0 focus-visible:ring-0 bg-white dark:bg-gray-900 px-4 text-sm"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className="bg-accent hover:bg-accent/90 text-black font-semibold h-full rounded-none px-6 border-l-2 border-black dark:border-white disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              </form>
              {error && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-2">{error}</p>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
