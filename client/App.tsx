import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import OurVision from "./pages/OurVision";
import BookService from "./pages/BookService";
import BoardOfDirectors from "./pages/BoardOfDirectors";
import HowWeWork from "./pages/HowWeWork";
import TermsConditions from "./pages/TermsConditions";
import SecurityMeasures from "./pages/SecurityMeasures";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/our-vision" element={<OurVision />} />
          <Route path="/book-service" element={<BookService />} />
          <Route path="/board-of-directors" element={<BoardOfDirectors />} />
          <Route path="/how-we-work" element={<HowWeWork />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
