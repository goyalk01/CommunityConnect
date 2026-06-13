"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, MessageSquare, Send, CheckCircle, AlertCircle, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EASE_OUT } from "@/lib/motion";

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
      setStatus("error");
      setMessage("Please fill in all fields.");
      return;
    }

    setStatus("loading");
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${API_URL}/api/contact.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setMessage("Message sent! We'll get back to you within 24 hours. 🙏");
        setForm({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to send message.");
      }
    } catch (err: unknown) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all";
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
        style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-sm font-medium"
            style={{ background: "rgba(79,70,229,0.1)", color: "#4F46E5", border: "1px solid rgba(79,70,229,0.18)" }}
          >
            Get In Touch
          </div>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "var(--color-text)",
              marginBottom: "0.75rem",
            }}
          >
            We'd Love to Hear From You
          </h1>
          <p style={{ color: "rgba(25,40,55,0.6)", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: 480, margin: "0 auto" }}>
            Questions about volunteering, partnerships, or our programs? Reach out and we'll respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: EASE_OUT }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            <div
              className="rounded-3xl p-7"
              style={{ background: "#4F46E5", color: "#fff" }}
            >
              <h2
                className="font-bold mb-2"
                style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem" }}
              >
                NayePankh NGO
              </h2>
              <p className="text-sm mb-6" style={{ opacity: 0.8, lineHeight: 1.65 }}>
                Creating new wings of hope for underprivileged communities across India.
              </p>

              {[
                { icon: MapPin, label: "Address", value: "New Delhi, India" },
                { icon: Mail, label: "Email", value: "hello@nayepankh.org" },
                { icon: Phone, label: "Phone", value: "+91 98765 43210" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-3 mb-4">
                    <div
                      className="flex items-center justify-center rounded-lg flex-shrink-0"
                      style={{ width: 36, height: 36, background: "rgba(255,255,255,0.15)" }}
                    >
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs mb-0.5" style={{ opacity: 0.6 }}>{item.label}</p>
                      <p className="text-sm font-medium">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="rounded-3xl p-6"
              style={{ background: "#fff", border: "1px solid rgba(25,40,55,0.08)", boxShadow: "0 2px 12px rgba(25,40,55,0.05)" }}
            >
              <p className="text-sm font-semibold mb-2" style={{ color: "var(--color-text)" }}>
                🕐 Office Hours
              </p>
              <p className="text-sm" style={{ color: "rgba(25,40,55,0.6)", lineHeight: 1.65 }}>
                Monday – Friday: 9am – 6pm IST<br />
                Saturday: 10am – 2pm IST<br />
                Sunday: Closed
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: EASE_OUT }}
            className="lg:col-span-3 rounded-3xl p-8 sm:p-10"
            style={{
              background: "#fff",
              border: "1px solid rgba(25,40,55,0.1)",
              boxShadow: "0 8px 40px rgba(25,40,55,0.08)",
            }}
          >
            <h2
              className="mb-6"
              style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", color: "var(--color-text)" }}
            >
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                  <User size={14} />
                  Your Name <span style={{ color: "#4F46E5" }}>*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="e.g. Arjun Mehta"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                  style={inputStyle}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                  <Mail size={14} />
                  Email Address <span style={{ color: "#4F46E5" }}>*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="arjun@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                  style={inputStyle}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                  <MessageSquare size={14} />
                  Message <span style={{ color: "#4F46E5" }}>*</span>
                </label>
                <textarea
                  id="contact-message"
                  placeholder="Tell us how we can help you..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  className={inputClass}
                  style={{ ...inputStyle, resize: "none" }}
                  required
                />
              </div>

              <AnimatePresence>
                {status !== "idle" && status !== "loading" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
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

              <motion.button
                id="contact-submit"
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                disabled={status === "loading"}
                className="flex items-center justify-between text-white font-semibold rounded-full"
                style={{
                  background: "#4F46E5",
                  padding: "16px 24px",
                  fontSize: "0.95rem",
                  boxShadow: "0 4px 24px rgba(79,70,229,0.28)",
                  opacity: status === "loading" ? 0.7 : 1,
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                }}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
                <Send size={17} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
