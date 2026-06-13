"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Briefcase, Clock, Target, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EASE_OUT } from "@/lib/motion";

const SKILLS = [
  "Teaching", "Coding", "Design", "Healthcare", "Legal",
  "Marketing", "Photography", "Cooking", "Carpentry", "Counseling",
  "Translation", "Fundraising", "Data Analysis", "Event Planning",
];

const AVAILABILITY = ["Weekday Mornings", "Weekday Evenings", "Weekends", "Full-time"];

const AREAS = [
  "Education",
  "Environment",
  "Community Support",
  "Healthcare",
  "Women Empowerment",
  "Youth Development",
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
  name: "",
  email: "",
  phone: "",
  skills: [],
  availability: [],
  area_of_interest: "",
};

export default function RegisterPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const toggleSkill = (skill: string) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const toggleAvailability = (slot: string) => {
    setForm((prev) => ({
      ...prev,
      availability: prev.availability.includes(slot)
        ? prev.availability.filter((s) => s !== slot)
        : [...prev.availability, slot],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.area_of_interest) {
      setStatus("error");
      setMessage("Please fill in all required fields.");
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
        setMessage("You're registered! Welcome to VolunteerHub. 🎉");
        setForm(initialForm);
      } else {
        throw new Error(data.message || "Registration failed.");
      }
    } catch (err: unknown) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2";
  const inputStyle = {
    background: "rgba(25,40,55,0.05)",
    border: "1.5px solid rgba(25,40,55,0.12)",
    color: "var(--color-text)",
    fontFamily: "var(--font-body)",
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--color-bg)" }}>
      <div className="relative z-10">
        <Navbar />
      </div>

      <main
        className="flex-1 relative z-10 py-16 px-5"
        style={{ maxWidth: 720, margin: "0 auto", width: "100%" }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-sm font-medium"
            style={{ background: "rgba(79,70,229,0.1)", color: "#4F46E5", border: "1px solid rgba(79,70,229,0.18)" }}
          >
            Volunteer Registration
          </div>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "var(--color-text)",
              marginBottom: "0.75rem",
            }}
          >
            Join Our Mission
          </h1>
          <p style={{ color: "rgba(25,40,55,0.6)", fontSize: "0.95rem", lineHeight: 1.6 }}>
            Fill in your details below and become part of a community creating real change.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: EASE_OUT }}
          className="rounded-3xl p-8 sm:p-10"
          style={{
            background: "#fff",
            border: "1px solid rgba(25,40,55,0.1)",
            boxShadow: "0 8px 40px rgba(25,40,55,0.08)",
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-7" noValidate>
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                <User size={15} />
                Full Name <span style={{ color: "#4F46E5" }}>*</span>
              </label>
              <input
                id="reg-name"
                type="text"
                placeholder="e.g. Priya Sharma"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                style={{ ...inputStyle, outlineColor: "#4F46E5" }}
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                <Mail size={15} />
                Email Address <span style={{ color: "#4F46E5" }}>*</span>
              </label>
              <input
                id="reg-email"
                type="email"
                placeholder="priya@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
                style={{ ...inputStyle, outlineColor: "#4F46E5" }}
                required
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                <Phone size={15} />
                Phone Number
              </label>
              <input
                id="reg-phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputClass}
                style={{ ...inputStyle, outlineColor: "#4F46E5" }}
              />
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                <Briefcase size={15} />
                Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => {
                  const selected = form.skills.includes(skill);
                  return (
                    <motion.button
                      key={skill}
                      type="button"
                      id={`skill-${skill.toLowerCase().replace(/\s/g, "-")}`}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => toggleSkill(skill)}
                      className="px-3.5 py-1.5 rounded-full text-sm font-medium transition-all"
                      style={{
                        background: selected ? "#4F46E5" : "rgba(25,40,55,0.06)",
                        color: selected ? "#fff" : "rgba(25,40,55,0.7)",
                        border: selected ? "1.5px solid #4F46E5" : "1.5px solid rgba(25,40,55,0.1)",
                      }}
                    >
                      {skill}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                <Clock size={15} />
                Availability
              </label>
              <div className="flex flex-wrap gap-2">
                {AVAILABILITY.map((slot) => {
                  const selected = form.availability.includes(slot);
                  return (
                    <motion.button
                      key={slot}
                      type="button"
                      id={`avail-${slot.toLowerCase().replace(/\s/g, "-")}`}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => toggleAvailability(slot)}
                      className="px-3.5 py-1.5 rounded-full text-sm font-medium transition-all"
                      style={{
                        background: selected ? "#059669" : "rgba(25,40,55,0.06)",
                        color: selected ? "#fff" : "rgba(25,40,55,0.7)",
                        border: selected ? "1.5px solid #059669" : "1.5px solid rgba(25,40,55,0.1)",
                      }}
                    >
                      {slot}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Area of Interest */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                <Target size={15} />
                Area of Interest <span style={{ color: "#4F46E5" }}>*</span>
              </label>
              <select
                id="reg-area"
                value={form.area_of_interest}
                onChange={(e) => setForm({ ...form, area_of_interest: e.target.value })}
                className={inputClass}
                style={{ ...inputStyle, outlineColor: "#4F46E5" }}
                required
              >
                <option value="">Select an area...</option>
                {AREAS.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            {/* Toast */}
            <AnimatePresence>
              {status !== "idle" && status !== "loading" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-3 px-4 py-3.5 rounded-xl text-sm"
                  style={{
                    background: status === "success" ? "rgba(5,150,105,0.08)" : "rgba(220,38,38,0.08)",
                    border: `1.5px solid ${status === "success" ? "rgba(5,150,105,0.2)" : "rgba(220,38,38,0.2)"}`,
                    color: status === "success" ? "#059669" : "#DC2626",
                  }}
                >
                  {status === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                  {message}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              id="reg-submit"
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              disabled={status === "loading"}
              className="flex items-center justify-between text-white font-semibold rounded-full mt-2"
              style={{
                background: "#4F46E5",
                padding: "16px 24px",
                fontSize: "0.95rem",
                boxShadow: "0 4px 24px rgba(79,70,229,0.28)",
                opacity: status === "loading" ? 0.7 : 1,
                cursor: status === "loading" ? "not-allowed" : "pointer",
              }}
            >
              {status === "loading" ? "Submitting..." : "Complete Registration"}
              <ArrowRight size={18} />
            </motion.button>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
