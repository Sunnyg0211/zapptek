import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_URL, SECRET_KEY } from "@/config";

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!firstName || !email || !phone || !password) {
      alert("Please fill all fields");
      return;
    }

    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "register",
        secret: SECRET_KEY,
        name: firstName + " " + lastName,
        email,
        phone,
        password
      })
    });

    const data = await res.json();

    if (data.success) {
      alert("Account created successfully");
      navigate("/login");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div className="w-full max-w-md p-8 rounded-xl shadow-xl bg-background">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <Zap />
          <span className="text-xl font-bold">ZappTek</span>
        </Link>

        <h1 className="text-2xl font-bold mb-6">Create Account</h1>

        <div className="grid grid-cols-2 gap-4">
          <Input placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} />
          <Input placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} />
        </div>

        <Input className="mt-4" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input className="mt-4" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
        <Input className="mt-4" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

        <Button className="w-full mt-6" onClick={handleRegister}>
          Create Account <ArrowRight className="ml-2" />
        </Button>

        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-primary">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
