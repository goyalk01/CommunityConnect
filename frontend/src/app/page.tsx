"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRightCircle, Heart, Users, Sparkles } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EASE_OUT } from "@/lib/motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: EASE_OUT,
    },
  }),
};

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 z-0 w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_131516_eca35265-ea66-4fbd-8d52-22aae6e1a503.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay for readability */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: "rgba(242,242,238,0.6)", backdropFilter: "blur(1px)" }}
      />

      {/* Navbar */}
      <div className="relative z-10 w-full">
        <Navbar />
      </div>

      {/* Hero Content */}
      <main
        className="relative z-10 flex-1 flex flex-col items-center justify-center"
        style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(40px,8vw,72px) 20px 48px" }}
      >
        <div className="flex flex-col items-center text-center" style={{ maxWidth: 660 }}>
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium"
            style={{ background: "rgba(79,70,229,0.12)", color: "#4F46E5", border: "1px solid rgba(79,70,229,0.2)" }}
          >
            <Sparkles size={14} />
            AI-Powered Volunteer Management
          </motion.div>

          {/* Heading */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.8rem, 5.5vw, 3.4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "var(--color-text)",
              textAlign: "center",
              marginBottom: "1.25rem",
            }}
          >
            <span className="whitespace-nowrap">
              Empower{" "}
              <Heart
                size={28}
                style={{ display: "inline", verticalAlign: "middle", position: "relative", top: -2, margin: "0 4px", color: "#4F46E5" }}
              />{" "}
              Your
            </span>
            <br />
            <span>
              Community{" "}
              <Users
                size={28}
                style={{ display: "inline", verticalAlign: "middle", position: "relative", top: -2, margin: "0 4px", color: "#4F46E5" }}
              />{" "}
              Today
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
              color: "var(--color-text)",
              opacity: 0.8,
              maxWidth: 560,
              lineHeight: 1.65,
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            Zero friction, maximum impact. Connect passionate volunteers with causes that matter —
            manage programs, track engagement, and drive real community change.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/register"
                id="hero-cta-register"
                className="flex items-center gap-8 text-white font-semibold"
                style={{
                  borderRadius: 50,
                  background: "#4F46E5",
                  fontSize: "clamp(0.9rem, 2vw, 1rem)",
                  padding: "17px 24px",
                  minWidth: 210,
                  boxShadow: "0 4px 24px rgba(79,70,229,0.28)",
                  justifyContent: "space-between",
                }}
              >
                Join as Volunteer
                <ArrowRightCircle size={20} />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/programs"
                id="hero-cta-programs"
                className="flex items-center gap-3 font-semibold"
                style={{
                  borderRadius: 50,
                  background: "rgba(25,40,55,0.08)",
                  color: "var(--color-text)",
                  fontSize: "clamp(0.9rem, 2vw, 1rem)",
                  padding: "17px 28px",
                  border: "1px solid rgba(25,40,55,0.15)",
                }}
              >
                Explore Programs
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-6 mt-12"
          >
            {[
              { value: "500+", label: "Active Volunteers" },
              { value: "3", label: "Core Programs" },
              { value: "10K+", label: "Lives Impacted" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center px-6 py-4 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(25,40,55,0.1)", backdropFilter: "blur(8px)" }}
              >
                <span
                  style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", color: "#4F46E5" }}
                >
                  {stat.value}
                </span>
                <span style={{ fontSize: "0.8rem", color: "rgba(25,40,55,0.6)", marginTop: 2 }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Footer sits below hero */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
