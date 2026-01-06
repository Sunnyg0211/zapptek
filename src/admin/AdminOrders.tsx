import { useEffect, useState } from "react";
import { API_URL, SECRET_KEY } from "@/config";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

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
        setOrders(d.orders || []);
        setPayments(d.payments || []);
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders & Payments</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-muted">
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Payment</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => {
            if (i === 0) return null;
            const pay = payments.find(p => p[1] == o[0]);
            return (
              <tr key={i}>
                <td className="border p-2">{o[0]}</td>
                <td className="border p-2">{o[1]}</td>
                <td className="border p-2">₹{o[2]}</td>
                <td className="border p-2">{o[3]}</td>
                <td className="border p-2">
                  {pay ? `Paid (${pay[3]})` : "Pending"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
