import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { API_URL, SECRET_KEY } from "@/config";

const Contact = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [subject,setSubject]=useState("");
  const [message,setMessage]=useState("");

  const submit = async ()=>{
    if(!name||!email||!message){
      alert("Fill all required fields");
      return;
    }

    const res = await fetch(API_URL,{
      method:"POST",
      body:JSON.stringify({
        action:"ticket",
        secret:SECRET_KEY,
        name,
        email,
        message:subject+" - "+message
      })
    });

    const data = await res.json();
    if(data.success){
      alert("Message sent. Our team will contact you.");
      setName(""); setEmail(""); setPhone(""); setSubject(""); setMessage("");
    } else {
      alert("Failed to send message");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-12">
      <motion.div className="max-w-xl w-full bg-card p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6">Contact ZappTek</h2>

        <Input placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} className="mb-3"/>
        <Input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="mb-3"/>
        <Input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} className="mb-3"/>
        <Input placeholder="Subject" value={subject} onChange={e=>setSubject(e.target.value)} className="mb-3"/>
        <Textarea placeholder="Your message" value={message} onChange={e=>setMessage(e.target.value)} className="mb-4"/>

        <Button className="w-full" onClick={submit}>
          <Send className="mr-2"/> Send Message
        </Button>
      </motion.div>
    </div>
  );
};

export default Contact;
