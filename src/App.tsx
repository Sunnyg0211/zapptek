import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";

import Index from "./pages/Index";
import Services from "./pages/Services";
import AMCPlans from "./pages/AMCPlans";
import Products from "./pages/Products";
import BookService from "./pages/BookService";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

// Admin
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminCustomers from "./admin/AdminCustomers";
import AdminBookings from "./admin/AdminBookings";
import AdminAMC from "./admin/AdminAMC";
import AdminOrders from "./admin/AdminOrders";
import AdminInvoices from "./admin/AdminInvoices";
import AdminLeads from "./admin/AdminLeads";
import AdminSettings from "./admin/AdminSettings";

const queryClient = new QueryClient();

/* =========================
   🔐 AUTH PROTECTION LAYER
========================= */

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin" && user.role !== "staff")
    return <Navigate to="/login" replace />;

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>

          {/* =====================
              🌍 PUBLIC ROUTES
          ===================== */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/amc-plans" element={<AMCPlans />} />
            <Route path="/products" element={<Products />} />
            <Route path="/book-service" element={<BookService />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* =====================
              🔐 AUTH ROUTES
          ===================== */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* =====================
              👤 CUSTOMER DASHBOARD
          ===================== */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />

          {/* =====================
              🛡 ADMIN PANEL
          ===================== */}
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="amc" element={<AdminAMC />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="invoices" element={<AdminInvoices />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* =====================
              ❌ NOT FOUND
          ===================== */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
