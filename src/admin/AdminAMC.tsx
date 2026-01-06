import { useEffect, useState } from "react";
import { API_URL, SECRET_KEY } from "@/config";

export default function AdminAMC() {
  const [amc, setAMC] = useState<any[]>([]);

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
      .then(d => setAMC(d.amc || []));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">AMC Subscriptions</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-muted">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">User ID</th>
            <th className="p-2 border">Plan</th>
            <th className="p-2 border">Start Date</th>
            <th className="p-2 border">Visits Left</th>
          </tr>
        </thead>
        <tbody>
          {amc.map((a, i) => i > 0 && (
            <tr key={i}>
              <td className="border p-2">{a[0]}</td>
              <td className="border p-2">{a[1]}</td>
              <td className="border p-2">{a[2]}</td>
              <td className="border p-2">{String(a[3]).slice(0,10)}</td>
              <td className="border p-2">{a[5]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
