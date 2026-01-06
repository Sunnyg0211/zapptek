import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, SECRET_KEY } from "@/config";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [bookings, setBookings] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [amc, setAmc] = useState<any[]>([]);

  useEffect(() => {
    if (!user.user_id) {
      navigate("/login");
      return;
    }

    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "admin",
        secret: SECRET_KEY,
        role: "customer"
      })
    })
      .then(r => r.json())
      .then(d => {
        setBookings(d.bookings?.filter((b:any)=>b[1]==user.user_id) || []);
        setOrders(d.orders?.filter((o:any)=>o[1]==user.user_id) || []);
        setAmc(d.amc?.filter((a:any)=>a[1]==user.user_id) || []);
      });
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user.name}</h1>

      <h2 className="text-xl font-semibold mt-6">Your Bookings</h2>
      {bookings.map((b,i)=>(
        <div key={i} className="border p-3 mt-2">
          {b[3]} – {b[4]} – {b[8]}
        </div>
      ))}

      <h2 className="text-xl font-semibold mt-6">Your Orders</h2>
      {orders.map((o,i)=>(
        <div key={i} className="border p-3 mt-2">
          ₹{o[2]} – {o[3]}
        </div>
      ))}

      <h2 className="text-xl font-semibold mt-6">Your AMC</h2>
      {amc.map((a,i)=>(
        <div key={i} className="border p-3 mt-2">
          {a[2]} – Visits left: {a[5]}
        </div>
      ))}

      <Button className="mt-8" onClick={()=>{
        localStorage.clear();
        navigate("/login");
      }}>Logout</Button>
    </div>
  );
};

export default Dashboard;
