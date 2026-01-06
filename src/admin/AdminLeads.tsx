import { useEffect, useState } from "react";
import { API_URL, SECRET_KEY } from "@/config";

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);

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
      .then(d => setLeads(d.tickets || []));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Leads & Support Tickets</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-muted">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Message</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((l, i) => i > 0 && (
            <tr key={i}>
              <td className="border p-2">{l[0]}</td>
              <td className="border p-2">{l[1]}</td>
              <td className="border p-2">{l[2]}</td>
              <td className="border p-2">{l[3]}</td>
              <td className="border p-2">{l[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
