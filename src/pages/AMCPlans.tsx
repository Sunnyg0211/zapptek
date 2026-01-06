import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, Star, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { API_URL, SECRET_KEY } from "@/config";

const plans = [
  { id: "Basic", name: "Basic", price: 2999, visits: 2 },
  { id: "Professional", name: "Professional", price: 5999, visits: 6 },
  { id: "Enterprise", name: "Enterprise", price: 12999, visits: 999 }
];

const AMCPlans = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const subscribe = async (plan:any) => {
    if (!user.user_id) {
      alert("Please login to subscribe");
      navigate("/login");
      return;
    }

    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "amc",
        secret: SECRET_KEY,
        user_id: user.user_id,
        plan: plan.name
      })
    });

    const data = await res.json();

    if (data.success) {
      alert("AMC activated successfully");
      navigate("/dashboard");
    } else {
      alert("Subscription failed");
    }
  };

  return (
    <div className="min-h-screen p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan) => (
        <motion.div key={plan.id} className="border rounded-xl p-6 shadow">
          <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
          <p className="text-xl mb-4">₹{plan.price} / year</p>
          <p className="mb-6">Visits: {plan.visits === 999 ? "Unlimited" : plan.visits}</p>

          <Button className="w-full" onClick={() => subscribe(plan)}>
            Subscribe
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export default AMCPlans;
