
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-surface-bg">
      <div className="text-center">
        <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-bold text-accent">404</h1>
        <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary mt-4 mb-6">Oops! Page not found</p>
        <Button asChild variant="outline" className="bg-transparent border-border hover:bg-accent hover:text-surface-card">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
