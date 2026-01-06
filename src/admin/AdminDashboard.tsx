import { useEffect, useState } from "react";
import { API_URL, SECRET_KEY } from "@/config";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    bookings: 0,
    orders: 0,
    amc: 0,
    invoices: 0,
    leads: 0
  });

  useEffect(() => {
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "admin",
        secret: SECRET_KEY,
        role: "admin"
      })
    })
      .then(r => r.json())
      .then(d => {
        setStats({
          users: d.users.length - 1,
          bookings: d.bookings.length - 1,
          orders: d.orders.length - 1,
          amc: d.amc?.length - 1 || 0,
          invoices: d.invoices?.length - 1 || 0,
          leads: d.tickets?.length - 1 || 0
        });
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <Stat title="Customers" value={stats.users} />
        <Stat title="Bookings" value={stats.bookings} />
        <Stat title="Orders" value={stats.orders} />
        <Stat title="AMC" value={stats.amc} />
        <Stat title="Invoices" value={stats.invoices} />
        <Stat title="Leads" value={stats.leads} />
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className="p-6 bg-card rounded-xl shadow">
      <p className="text-muted-foreground">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
}
