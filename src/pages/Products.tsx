import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { API_URL, SECRET_KEY } from "@/config";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image_url: string;
  description: string;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "products",
        secret: SECRET_KEY
      })
    })
      .then(r => r.json())
      .then(d => setProducts(d.products.slice(1))); // remove header row
  }, []);

  const buy = async (p: Product) => {
    if (!user.user_id) {
      alert("Please login first");
      return;
    }

    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "order",
        secret: SECRET_KEY,
        user_id: user.user_id,
        total: p.price
      })
    });

    alert("Order placed! Admin will contact you.");
  };

  return (
    <div className="p-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(p => (
        <motion.div key={p.id} className="border rounded-xl p-4 shadow">
          <img src={p.image_url} className="w-full h-48 object-cover rounded" />
          <h3 className="font-bold mt-2">{p.name}</h3>
          <p>{p.description}</p>
          <p className="text-xl font-bold">₹{p.price}</p>
          <Button className="w-full mt-4" onClick={() => buy(p)}>
            <ShoppingCart className="mr-2" /> Buy
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export default Products;
