import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Upload, Check, ArrowRight, Monitor, Laptop, Printer, Camera, Wifi, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { API_URL, SECRET_KEY } from "@/config";

const deviceTypes = [
  { id: "desktop", label: "Desktop" },
  { id: "laptop", label: "Laptop" },
  { id: "printer", label: "Printer" },
  { id: "cctv", label: "CCTV" },
  { id: "network", label: "Network" },
  { id: "storage", label: "Storage" },
];

const serviceTypes = [
  { id: "onsite", label: "On-site Visit" },
  { id: "remote", label: "Remote Support" },
  { id: "pickup", label: "Pickup & Delivery" },
];

const BookService = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [step, setStep] = useState(1);
  const [device, setDevice] = useState("");
  const [service, setService] = useState("");
  const [problem, setProblem] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  const submitBooking = async () => {
    if (!user.user_id) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "book",
        secret: SECRET_KEY,
        user_id: user.user_id,
        device,
        service,
        date: date + " " + time,
        location,
        problem
      })
    });

    const data = await res.json();

    if (data.success) {
      alert("Booking created successfully");
      navigate("/dashboard");
    } else {
      alert("Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="py-16">
        <div className="max-w-3xl mx-auto">

          {step === 1 && (
            <div>
              <h2>Select Device & Service</h2>

              <div className="grid grid-cols-3 gap-3">
                {deviceTypes.map(d => (
                  <Button key={d.id} variant={device === d.id ? "gradient" : "outline"} onClick={() => setDevice(d.id)}>
                    {d.label}
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">
                {serviceTypes.map(s => (
                  <Button key={s.id} variant={service === s.id ? "gradient" : "outline"} onClick={() => setService(s.id)}>
                    {s.label}
                  </Button>
                ))}
              </div>

              <Button className="w-full mt-6" onClick={() => setStep(2)}>Continue</Button>
            </div>
          )}

          {step === 2 && (
            <div>
              <Textarea placeholder="Describe issue" value={problem} onChange={e => setProblem(e.target.value)} />
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-4"/>
              <Input type="time" value={time} onChange={e => setTime(e.target.value)} className="mt-2"/>
              <Textarea placeholder="Service Address" value={location} onChange={e => setLocation(e.target.value)} className="mt-2"/>
              <Button className="w-full mt-6" onClick={() => setStep(3)}>Continue</Button>
            </div>
          )}

          {step === 3 && (
            <div>
              <p>Device: {device}</p>
              <p>Service: {service}</p>
              <Button className="w-full mt-6" onClick={submitBooking}>Submit Booking</Button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default BookService;
