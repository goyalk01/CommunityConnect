"use client";

import { motion, type Variants } from "framer-motion";
import { BookOpen, Leaf, HandHeart, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EASE_OUT } from "@/lib/motion";

const programs = [
  {
    id: "education",
    icon: BookOpen,
    title: "Education",
    emoji: "🎓",
    color: "#4F46E5",
    bg: "rgba(79,70,229,0.06)",
    border: "rgba(79,70,229,0.18)",
    description:
      "Bridge the education gap by mentoring underprivileged children, running after-school programs, and delivering digital literacy workshops across rural communities.",
    impact: "2,400+ students reached",
    volunteers: "120 volunteers",
    highlights: ["After-school tutoring", "Digital literacy workshops", "Scholarship guidance"],
  },
  {
    id: "environment",
    icon: Leaf,
    title: "Environment",
    emoji: "🌿",
    color: "#059669",
    bg: "rgba(5,150,105,0.06)",
    border: "rgba(5,150,105,0.18)",
    description:
      "Drive sustainable change through tree plantation drives, waste management campaigns, and eco-awareness programs that inspire communities to protect their natural heritage.",
    impact: "5,000+ trees planted",
    volunteers: "85 volunteers",
    highlights: ["Tree plantation drives", "Waste management", "Eco-awareness camps"],
  },
  {
    id: "community",
    icon: HandHeart,
    title: "Community Support",
    emoji: "🤝",
    color: "#DC2626",
    bg: "rgba(220,38,38,0.06)",
    border: "rgba(220,38,38,0.18)",
    description:
      "Strengthen community bonds through health camps, women empowerment initiatives, senior citizen outreach, and disaster relief support when communities need it most.",
    impact: "3,200+ families helped",
    volunteers: "200 volunteers",
    highlights: ["Health camps", "Women empowerment", "Senior citizen outreach"],
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: EASE_OUT },
  }),
};

export default function ProgramsPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--color-bg)" }}>
      <div className="relative z-10">
        <Navbar />
      </div>

      <main className="flex-1 relative z-10" style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "0 20px 80px" }}>
        {/* Page Header */}
        <div className="text-center pt-16 pb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-sm font-medium"
            style={{ background: "rgba(79,70,229,0.1)", color: "#4F46E5", border: "1px solid rgba(79,70,229,0.18)" }}
          >
            Our Programs
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: EASE_OUT }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
              color: "var(--color-text)",
              marginBottom: "1rem",
            }}
          >
            Creating Impact That Lasts
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: EASE_OUT }}
            className="max-w-lg mx-auto text-center leading-relaxed"
            style={{ color: "rgba(25,40,55,0.65)", fontSize: "clamp(0.95rem, 2vw, 1.1rem)" }}
          >
            Three flagship programs designed to address the most pressing needs of our communities.
            Every volunteer hour creates ripples of lasting change.
          </motion.p>
        </div>

        {/* Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((program, i) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
                className="flex flex-col rounded-3xl overflow-hidden cursor-default"
                style={{
                  background: "#fff",
                  border: `1px solid ${program.border}`,
                  boxShadow: "0 4px 24px rgba(25,40,55,0.06)",
                }}
              >
                {/* Card Top */}
                <div className="px-7 pt-8 pb-6" style={{ background: program.bg }}>
                  <div
                    className="flex items-center justify-center rounded-2xl mb-5"
                    style={{
                      width: 56,
                      height: 56,
                      background: `${program.color}18`,
                      border: `1.5px solid ${program.color}30`,
                    }}
                  >
                    <Icon size={26} color={program.color} />
                  </div>
                  <h2
                    className="font-bold mb-1"
                    style={{ fontFamily: "var(--font-heading)", fontSize: "1.45rem", color: "var(--color-text)" }}
                  >
                    {program.emoji} {program.title}
                  </h2>
                  <div className="flex gap-3 flex-wrap mt-2">
                    <span
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{ background: `${program.color}15`, color: program.color }}
                    >
                      {program.impact}
                    </span>
                    <span
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{ background: "rgba(25,40,55,0.06)", color: "rgba(25,40,55,0.6)" }}
                    >
                      {program.volunteers}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-col flex-1 px-7 py-6 gap-5">
                  <p style={{ color: "rgba(25,40,55,0.7)", fontSize: "0.9rem", lineHeight: 1.65 }}>
                    {program.description}
                  </p>

                  <ul className="flex flex-col gap-2">
                    {program.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(25,40,55,0.75)" }}>
                        <span
                          className="flex-shrink-0 rounded-full"
                          style={{ width: 6, height: 6, background: program.color }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-2">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Link
                        href="/register"
                        id={`program-cta-${program.id}`}
                        className="flex items-center gap-2 text-sm font-semibold"
                        style={{ color: program.color }}
                      >
                        Volunteer for this →
                        <ArrowRight size={15} />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6, ease: EASE_OUT }}
          className="text-center mt-16"
        >
          <p className="text-sm mb-5" style={{ color: "rgba(25,40,55,0.55)" }}>
            Ready to make a difference?
          </p>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/register"
              id="programs-register-cta"
              className="inline-flex items-center gap-3 text-white font-semibold rounded-full"
              style={{
                background: "#4F46E5",
                padding: "16px 32px",
                fontSize: "0.95rem",
                boxShadow: "0 4px 24px rgba(79,70,229,0.28)",
              }}
            >
              Register as a Volunteer
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
