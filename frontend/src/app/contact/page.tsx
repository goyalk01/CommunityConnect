"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, MessageSquare, Send, CheckCircle, AlertCircle, MapPin, Phone, Building2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FADE_UP_SPRING, STAGGER_CONTAINER } from "@/lib/animations";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error"); setMessage("Please fill in all required fields.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(`/api/contact.php`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        throw new Error(data.message || "Failed to send message.");
      }
    } catch (err: unknown) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-5 pt-32 pb-24">
        {/* Header */}
        <motion.div variants={STAGGER_CONTAINER} initial="hidden" animate="visible" className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div variants={FADE_UP_SPRING}>
            <Badge variant="outline" className="mb-6">Contact Us</Badge>
          </motion.div>
          <motion.h1 variants={FADE_UP_SPRING} className="font-heading text-4xl sm:text-5xl tracking-tight text-foreground mb-4">
            Get in Touch
          </motion.h1>
          <motion.p variants={FADE_UP_SPRING} className="text-muted-foreground text-lg leading-relaxed">
            Questions about volunteering, partnerships, or our platform features? Reach out and we'll respond within 24 hours.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div variants={STAGGER_CONTAINER} initial="hidden" animate="visible" className="lg:col-span-2 flex flex-col gap-6">
            <motion.div variants={FADE_UP_SPRING}>
              <Card className="p-8 bg-foreground text-background shadow-xl relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-40 h-40 bg-background/10 rounded-bl-full pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 bg-primary/20 rounded-full pointer-events-none blur-2xl" />
                
                <div className="relative z-10">
                  <Building2 size={32} className="mb-6 opacity-90" />
                  <h2 className="font-heading text-2xl font-bold mb-3">CommunityConnect HQ</h2>
                  <p className="text-sm opacity-80 mb-8 leading-relaxed">
                    Building the future of community engagement and volunteer management.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      { icon: MapPin, label: "Address", value: "New Delhi, India" },
                      { icon: Mail, label: "Email", value: "hello@communityconnect.local" },
                      { icon: Phone, label: "Phone", value: "+91 98765 43210" },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="flex items-start gap-4">
                          <div className="flex items-center justify-center rounded-xl w-10 h-10 bg-background/10 shrink-0">
                            <Icon size={18} />
                          </div>
                          <div>
                            <p className="text-xs uppercase font-mono tracking-wider opacity-60 mb-1">{item.label}</p>
                            <p className="text-sm font-medium">{item.value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={FADE_UP_SPRING}>
              <Card className="p-8 bg-surface">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-surface-hover border border-border flex items-center justify-center">
                    <span className="text-xl">🕐</span>
                  </div>
                  <h3 className="font-semibold text-lg text-foreground">Office Hours</h3>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex justify-between border-b border-border pb-2"><span>Monday – Friday</span> <span className="font-medium text-foreground">9am – 6pm IST</span></li>
                  <li className="flex justify-between border-b border-border pb-2"><span>Saturday</span> <span className="font-medium text-foreground">10am – 2pm IST</span></li>
                  <li className="flex justify-between pb-1"><span>Sunday</span> <span className="font-medium text-foreground">Closed</span></li>
                </ul>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={STAGGER_CONTAINER} initial="hidden" animate="visible" className="lg:col-span-3">
            <motion.div variants={FADE_UP_SPRING} className="h-full">
              <Card className="p-8 sm:p-12 h-full flex flex-col justify-center">
                {status === "success" ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-10">
                    <motion.div 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                      className="w-20 h-20 rounded-full bg-success/10 text-success flex items-center justify-center mb-6"
                    >
                      <CheckCircle size={40} />
                    </motion.div>
                    <h2 className="font-heading text-3xl mb-3 text-foreground tracking-tight">Message Sent!</h2>
                    <p className="text-muted-foreground text-lg mb-8 max-w-sm">We've received your message and will get back to you within 24 hours.</p>
                    <Button variant="outline" onClick={() => {setStatus("idle"); setForm({name:"", email:"", message:""});}}>
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="font-heading text-2xl mb-8 text-foreground tracking-tight">Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                      <Input 
                        id="name" label="Full Name *" placeholder="e.g. Arjun Mehta" icon={<User size={16}/>} 
                        value={form.name} onChange={e => setForm({...form, name: e.target.value})} required 
                      />
                      <Input 
                        id="email" type="email" label="Email Address *" placeholder="arjun@example.com" icon={<Mail size={16}/>} 
                        value={form.email} onChange={e => setForm({...form, email: e.target.value})} required 
                      />
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-foreground flex items-center justify-between">
                          Message *
                        </label>
                        <div className="relative">
                          <MessageSquare size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
                          <textarea 
                            className="w-full rounded-xl border border-border bg-surface pl-10 pr-4 py-3 text-sm text-foreground shadow-sm transition-all placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Tell us how we can help you..." rows={5} style={{ resize: "none" }}
                            value={form.message} onChange={e => setForm({...form, message: e.target.value})} required 
                          />
                        </div>
                      </div>

                      <AnimatePresence>
                        {status === "error" && (
                          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm bg-error/10 border border-error/20 text-error">
                            <AlertCircle size={16} /> {message}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Button type="submit" className="mt-2" isLoading={status === "loading"} rightIcon={<Send size={16}/>}>
                        Send Message
                      </Button>
                    </form>
                  </>
                )}
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
