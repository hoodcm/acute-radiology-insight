import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      className="p-2 px-3 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors duration-75 ease-in-out hover:bg-gray-200 focus:bg-gray-300 dark:hover:bg-gray-700 dark:focus:bg-gray-600"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      <span className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className="absolute top-1/2 left-1/2 h-[1.2rem] w-[1.2rem] -translate-x-1/2 -translate-y-1/2 rotate-90 scale-0 transition-all duration-100 text-white dark:text-white dark:rotate-0 dark:scale-100"
        />
        <Moon
          className="absolute top-1/2 left-1/2 h-[1.2rem] w-[1.2rem] -translate-x-1/2 -translate-y-1/2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
      </span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
