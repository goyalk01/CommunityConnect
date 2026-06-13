"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Briefcase, Clock, Target, CheckCircle, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FADE_UP_SPRING, FADE_IN } from "@/lib/animations";

const SKILLS = [
  "Teaching", "Coding", "Design", "Healthcare", "Legal",
  "Marketing", "Photography", "Cooking", "Carpentry", "Counseling",
  "Translation", "Fundraising", "Data Analysis", "Event Planning",
];

const AVAILABILITY = ["Weekday Mornings", "Weekday Evenings", "Weekends", "Full-time"];

const AREAS = [
  "Education", "Environment", "Community Support",
  "Healthcare", "Women Empowerment", "Youth Development",
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  availability: string[];
  area_of_interest: string;
}

const initialForm: FormData = {
  name: "", email: "", phone: "", skills: [], availability: [], area_of_interest: "",
};

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const toggleArrayItem = (key: "skills" | "availability", item: string) => {
    setForm(prev => ({
      ...prev,
      [key]: prev[key].includes(item) ? prev[key].filter(i => i !== item) : [...prev[key], item]
    }));
  };

  const nextStep = () => {
    if (step === 1) {
      if (!form.name || !form.email) {
        setStatus("error"); setMessage("Name and email are required to continue.");
        return;
      }
    }
    setStatus("idle");
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.area_of_interest) {
      setStatus("error"); setMessage("Please select an area of interest.");
      return;
    }
    setStatus("loading");
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${API_URL}/api/register.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          skills: form.skills.join(","),
          availability: form.availability.join(","),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        throw new Error(data.message || "Registration failed.");
      }
    } catch (err: unknown) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 w-full max-w-2xl mx-auto px-5 pt-32 pb-24 flex flex-col items-center">
        
        {status === "success" ? (
          <motion.div variants={FADE_UP_SPRING} initial="hidden" animate="visible" className="w-full text-center py-20">
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15, delay: 0.2 }}
              className="w-24 h-24 mx-auto bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-8"
            >
              <CheckCircle size={48} />
            </motion.div>
            <h1 className="font-heading text-4xl text-foreground mb-4">Registration Complete</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Welcome to CommunityConnect. We're excited to have you on board! Check your email for next steps.
            </p>
            <Button onClick={() => { setStatus("idle"); setStep(1); setForm(initialForm); }} variant="outline">
              Register another volunteer
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Header */}
            <motion.div variants={FADE_UP_SPRING} initial="hidden" animate="visible" className="text-center mb-12 w-full">
              <Badge variant="outline" className="mb-6">Volunteer Onboarding</Badge>
              <h1 className="font-heading text-4xl sm:text-5xl tracking-tight text-foreground mb-4">Join Our Mission</h1>
              <p className="text-muted-foreground text-lg">Become part of a community creating real change.</p>
            </motion.div>

            {/* Form Card */}
            <motion.div variants={FADE_UP_SPRING} initial="hidden" animate="visible" className="w-full">
              <Card className="p-8 sm:p-10 bg-surface">
                
                {/* Progress */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary" 
                      initial={false}
                      animate={{ width: step === 1 ? "50%" : "100%" }}
                      transition={{ ease: "easeInOut" }}
                    />
                  </div>
                  <span className="text-xs font-mono font-medium text-muted-foreground">Step {step} of 2</span>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col relative min-h-[400px]">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div 
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-6"
                      >
                        <Input 
                          id="name" label="Full Name *" placeholder="e.g. Priya Sharma" 
                          icon={<User size={16} />} value={form.name} onChange={e => setForm({...form, name: e.target.value})} required 
                        />
                        <Input 
                          id="email" type="email" label="Email Address *" placeholder="priya@example.com" 
                          icon={<Mail size={16} />} value={form.email} onChange={e => setForm({...form, email: e.target.value})} required 
                        />
                        <Input 
                          id="phone" type="tel" label="Phone Number" placeholder="+91 98765 43210" 
                          icon={<Phone size={16} />} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} 
                        />
                        
                        <div className="mt-6 flex justify-end">
                          <Button type="button" onClick={nextStep} rightIcon={<ArrowRight size={16} />}>Continue</Button>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div 
                        key="step2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-8"
                      >
                        <div className="flex flex-col gap-3">
                          <label className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Briefcase size={16} className="text-muted-foreground"/> Skills
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {SKILLS.map(skill => {
                              const selected = form.skills.includes(skill);
                              return (
                                <button
                                  key={skill} type="button" onClick={() => toggleArrayItem("skills", skill)}
                                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                    selected ? "bg-primary text-primary-foreground border-transparent" : "bg-transparent text-foreground border border-border hover:border-muted-foreground"
                                  }`}
                                >
                                  {skill}
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        <div className="flex flex-col gap-3">
                          <label className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Clock size={16} className="text-muted-foreground"/> Availability
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {AVAILABILITY.map(slot => {
                              const selected = form.availability.includes(slot);
                              return (
                                <button
                                  key={slot} type="button" onClick={() => toggleArrayItem("availability", slot)}
                                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                    selected ? "bg-accent text-primary-foreground border-transparent" : "bg-transparent text-foreground border border-border hover:border-muted-foreground"
                                  }`}
                                >
                                  {slot}
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        <div className="flex flex-col gap-3">
                          <label className="text-sm font-medium text-foreground flex items-center gap-2">
                            <Target size={16} className="text-muted-foreground"/> Area of Interest *
                          </label>
                          <select
                            value={form.area_of_interest} onChange={e => setForm({...form, area_of_interest: e.target.value})}
                            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none" required
                          >
                            <option value="">Select an area...</option>
                            {AREAS.map(area => <option key={area} value={area}>{area}</option>)}
                          </select>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                          <Button type="button" variant="ghost" onClick={() => {setStatus("idle"); setStep(1);}} leftIcon={<ArrowLeft size={16} />}>Back</Button>
                          <Button type="submit" isLoading={status === "loading"}>Complete Setup</Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>

                {/* Error Toast */}
                <AnimatePresence>
                  {status === "error" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="mt-6 flex items-center gap-2 p-3 rounded-lg bg-error/10 text-error text-sm font-medium border border-error/20"
                    >
                      <AlertCircle size={16} /> {message}
                    </motion.div>
                  )}
                </AnimatePresence>

              </Card>
            </motion.div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
