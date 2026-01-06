import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { API_URL, SECRET_KEY } from "@/config";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!password || (!email && !phone)) {
      alert("Enter credentials");
      return;
    }

    setLoading(true);

    const loginValue = loginMethod === "email" ? email : phone;

    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "login",
        secret: SECRET_KEY,
        email: loginValue,
        password,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!data.success) {
      alert("Invalid login");
      return;
    }

    // 🔐 Save Secure Session
    localStorage.setItem("zapptek_user", JSON.stringify({
      id: data.user_id,
      name: data.name,
      role: data.role,
      token: Date.now()
    }));

    if (data.role === "customer") {
      navigate("/dashboard");
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060b14] relative overflow-hidden">

      {/* Glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-blue-600/20 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-[2px] rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 shadow-[0_0_60px_rgba(56,189,248,0.4)]"
      >
        <div className="bg-[#0b1220]/95 backdrop-blur-xl rounded-2xl p-8">

          {/* LOGO */}
          <Link to="/" className="flex justify-center mb-10">
            <div className="relative p-5 rounded-2xl bg-[#0b1220] border border-cyan-400/40 shadow-[0_0_40px_rgba(34,211,238,0.6)] hover:scale-105 transition">
              <img
                src="/logo.png"
                alt="ZappTek"
                className="h-16 object-contain drop-shadow-[0_0_20px_rgba(34,211,238,0.9)]"
              />
            </div>
          </Link>

          <h1 className="text-2xl font-bold text-center text-white mb-6">
            Sign In
          </h1>

          <Tabs value={loginMethod} onValueChange={(v) => setLoginMethod(v as "email" | "phone")}>
            <TabsList className="grid grid-cols-2 bg-white/5 border border-white/10">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="phone">Phone</TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <Label className="text-white/80">Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white/5 border-white/10 text-white"/>
            </TabsContent>

            <TabsContent value="phone">
              <Label className="text-white/80">Phone</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-white/5 border-white/10 text-white"/>
            </TabsContent>
          </Tabs>

          <Label className="text-white/80">Password</Label>
          <div className="relative">
            <Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white/5 border-white/10 text-white"/>
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-white/60">
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <Button onClick={handleLogin} disabled={loading} className="w-full mt-6 bg-gradient-to-r from-cyan-400 to-blue-600 font-bold shadow-[0_0_30px_rgba(56,189,248,0.6)]">
            {loading ? "Checking..." : "Login"} <ArrowRight />
          </Button>

          <p className="text-center mt-4 text-white/60">
            No account? <Link to="/register" className="text-cyan-400">Create one</Link>
          </p>

        </div>
      </motion.div>
    </div>
  );
};

export default Login;
