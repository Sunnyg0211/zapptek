import { useEffect, useState } from "react";
import { API_URL, SECRET_KEY } from "@/config";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);

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
      .then(d => setBookings(d.bookings));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Service Bookings</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-muted">
            <th className="p-2 border">Booking ID</th>
            <th className="p-2 border">User ID</th>
            <th className="p-2 border">Device</th>
            <th className="p-2 border">Service</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => i > 0 && (
            <tr key={i}>
              <td className="border p-2">{b[0]}</td>
              <td className="border p-2">{b[1]}</td>
              <td className="border p-2">{b[2]}</td>
              <td className="border p-2">{b[3]}</td>
              <td className="border p-2">{b[4]}</td>
              <td className="border p-2">{b[8]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
