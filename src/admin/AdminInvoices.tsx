import { useEffect, useState } from "react";
import { API_URL, SECRET_KEY } from "@/config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminInvoices() {
  const [invoices, setInvoices] = useState<any[]>([]);
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
      .then(d => setInvoices(d.invoices || []));
  }, []);

  const filtered = invoices.filter((i, idx) =>
    idx > 0 &&
    (String(i[0]).includes(search) ||
      String(i[1]).includes(search) ||
      String(i[3]).includes(search))
  );

  const openPDF = (id: string, type: string) => {
    window.open(
      API_URL + "?action=getinvoicepdf&id=" + id + "&type=" + type,
      "_blank"
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>

      <Input
        placeholder="Search by Invoice ID, User ID, Order ID, Txn ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />

      <table className="w-full border">
        <thead>
          <tr className="bg-muted">
            <th className="p-2 border">Invoice ID</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Ref ID</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">PDF</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((i, index) => (
            <tr key={index}>
              <td className="border p-2">{i[0]}</td>
              <td className="border p-2">{i[1]}</td>
              <td className="border p-2">{i[2]}</td>
              <td className="border p-2">{i[3]}</td>
              <td className="border p-2">₹{i[4]}</td>
              <td className="border p-2 flex gap-2">
                <Button size="sm" onClick={() => openPDF(i[0], "gst")}>
                  GST
                </Button>
                <Button size="sm" variant="outline" onClick={() => openPDF(i[0], "nongst")}>
                  Non-GST
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
