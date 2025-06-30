
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from './BottomNav';

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-bg">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-0 focus:left-0 bg-surface-bg text-text-primary p-4 rounded-br-lg">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
