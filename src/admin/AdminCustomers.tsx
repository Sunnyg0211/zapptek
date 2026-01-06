import { useEffect, useState } from "react";
import { API_URL, SECRET_KEY } from "@/config";
import { Input } from "@/components/ui/input";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState("");

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
      .then(d => setCustomers(d.users));
  }, []);

  const filtered = customers.filter((c, i) =>
    i > 0 &&
    (c[1]?.toLowerCase().includes(search.toLowerCase()) ||
      c[2]?.toLowerCase().includes(search.toLowerCase()) ||
      c[3]?.includes(search))
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Customers</h1>

      <Input
        placeholder="Search by name, email or phone"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />

      <table className="w-full border">
        <thead>
          <tr className="bg-muted">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Joined</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c, i) => (
            <tr key={i}>
              <td className="border p-2">{c[0]}</td>
              <td className="border p-2">{c[1]}</td>
              <td className="border p-2">{c[2]}</td>
              <td className="border p-2">{c[3]}</td>
              <td className="border p-2">{String(c[6]).slice(0,10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
