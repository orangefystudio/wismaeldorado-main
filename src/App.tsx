import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import usePageTitle from "./hooks/use-page-title";
import Index from "./pages/Index";
import Rooms from "./pages/Rooms";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";
import AdminDashboard from "./components/admin/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Component that uses the hook inside Router context
const AppContent = () => {
  usePageTitle();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminAuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AdminAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
