
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { MainLayout } from "./components/MainLayout";
import PostPage from "./pages/PostPage";
import { ThemeProvider } from "./components/ThemeProvider";
import SpacingGuide from "./pages/SpacingGuide";
import Cases from "./pages/Cases";
import Essays from "./pages/Essays";
import Hindsight from "./pages/Hindsight";
import Tools from "./pages/Tools";
import About from "./pages/About";
import Search from "./pages/Search";
import AuthorPage from "./pages/AuthorPage";
import DicomViewer from "./pages/DicomViewer";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/search" element={<Search />} />
                <Route path="/cases" element={<Cases />} />
                <Route path="/essays" element={<Essays />} />
                <Route path="/hindsight" element={<Hindsight />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/about" element={<About />} />
                <Route path="/posts/:slug" element={<PostPage />} />
                <Route path="/authors/:slug" element={<AuthorPage />} />
                <Route path="/spacing-guide" element={<SpacingGuide />} />
              </Route>
              <Route path="/viewer/:caseId" element={<DicomViewer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
