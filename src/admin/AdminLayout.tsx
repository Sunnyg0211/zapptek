import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  FileText,
  CreditCard,
  Wrench,
  Settings,
  LogOut
} from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-sidebar-border">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
            ⚡
          </div>
          <span className="font-display text-xl font-bold">ZappTek</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavItem to="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/admin/customers" icon={Users} label="Customers" />
          <NavItem to="/admin/bookings" icon={ClipboardList} label="Bookings" />
          <NavItem to="/admin/amc" icon={Wrench} label="AMC Plans" />
          <NavItem to="/admin/orders" icon={CreditCard} label="Orders & Payments" />
          <NavItem to="/admin/invoices" icon={FileText} label="Invoices" />
          <NavItem to="/admin/leads" icon={Users} label="Leads" />
          <NavItem to="/admin/settings" icon={Settings} label="Settings" />
        </nav>

        <button
          onClick={logout}
          className="p-4 flex items-center gap-3 text-red-400 hover:bg-sidebar-accent transition"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

function NavItem({ to, icon: Icon, label }: any) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "hover:bg-sidebar-accent text-sidebar-foreground"
        }`
      }
    >
      <Icon className="w-5 h-5" />
      {label}
    </NavLink>
  );
}
