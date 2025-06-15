
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[var(--color-accent)]">404</h1>
        <p className="text-2xl font-bold text-white mt-4 mb-6">Oops! Page not found</p>
        <Button asChild variant="outline" className="bg-transparent border-[var(--color-border)] hover:bg-[var(--color-accent)] hover:text-black">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

