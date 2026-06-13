"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Menu, X, ArrowRightCircle, Zap, LockKeyhole, Fingerprint } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const navLinks = ["Vault", "Plans", "Install", "News", "Help"];

function Logo() {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 256 256"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="text-foreground"
    >
      <path d="M 64 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 L 128 64 L 128 64.5 L 161 32 L 192 0 L 256 0 L 256 64 L 192 128 L 128 128 L 128 192 L 96 223 L 63.5 256 L 0 256 L 0 192 Z M 256 192 L 224 223 L 191.5 256 L 128 256 L 128 192 L 192 128 L 256 128 Z" />
    </svg>
  );
}

export default function PasswordManagerPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, systemTheme } = useTheme();
  
  // For dark mode adaptation, we'll map the prompt's hardcoded colors to CSS vars where possible,
  // or use explicit hex values if needed to perfectly match the prompt.
  // Prompt requested #7342E2 for accent, #F2F2EE for login bg, #192837 for text.
  // We'll use CSS variables to support Dark Mode.
  
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Background Video */}
      <video
        className="absolute inset-0 z-0 w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_131516_eca35265-ea66-4fbd-8d52-22aae6e1a503.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 z-0 bg-background/60 backdrop-blur-[1px]" />

      {/* Navbar */}
      <header className="relative z-10 w-full" style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5">
          {/* Left: Logo */}
          <Link href="/password-manager" className="flex items-center">
            <Logo />
          </Link>

          {/* Center: Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link}
                href="#"
                className="text-sm font-medium transition-opacity hover:opacity-70 text-foreground"
              >
                {link}
              </Link>
            ))}
          </nav>

          {/* Right: CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#"
                className="text-sm font-semibold px-5 py-2.5 rounded-full text-white shadow-sm hover:shadow-md transition-shadow"
                style={{ background: "#7342E2" }}
              >
                Start For Free
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#"
                className="text-sm font-semibold px-5 py-2.5 rounded-full border border-border text-foreground transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                style={{ background: "var(--surface)" }}
              >
                Sign In
              </Link>
            </motion.div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded-lg text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Sheet */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />

            {/* Sheet */}
            <motion.div
              key="sheet"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%", transition: { duration: 0.35, ease: [0.55, 0, 1, 0.45] } }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="fixed top-0 right-0 z-50 flex flex-col h-dvh shadow-2xl bg-surface"
              style={{ width: "min(88vw, 360px)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5">
                <Logo />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10"
                  style={{ width: 40, height: 40 }}
                >
                  <X size={20} className="text-foreground" />
                </motion.button>
              </div>

              {/* Divider */}
              <div className="mx-6 h-px bg-border" />

              {/* Nav Links */}
              <nav className="flex flex-col gap-1 px-4 mt-4 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href="#"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center px-4 py-3 rounded-xl font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5 text-foreground"
                      style={{ fontSize: "1.1rem" }}
                    >
                      {link}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 px-6 pb-8 pt-4">
                <Link
                  href="#"
                  className="flex items-center justify-center w-full py-3.5 rounded-full text-white font-semibold transition-transform active:scale-95"
                  style={{ background: "#7342E2", fontSize: "0.95rem" }}
                >
                  Start For Free
                </Link>
                <Link
                  href="#"
                  className="flex items-center justify-center w-full py-3.5 rounded-full border border-border text-foreground font-semibold transition-transform active:scale-95 hover:bg-black/5 dark:hover:bg-white/5"
                  style={{ background: "var(--surface)", fontSize: "0.95rem" }}
                >
                  Sign In
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full" style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(40px, 8vw, 72px) 20px 48px" }}>
        <div className="w-full flex flex-col items-center" style={{ maxWidth: 660 }}>
          
          {/* Heading */}
          <motion.h1
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-heading text-center text-foreground"
            style={{
              fontSize: "clamp(1.65rem, 5vw, 3rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
            }}
          >
            <span className="whitespace-nowrap">
              Lock
              <Zap size={24} className="text-foreground inline align-middle relative -top-[2px] mx-1" />
              Down Your
              <LockKeyhole size={24} className="text-foreground inline align-middle relative -top-[2px] mx-1" />
              Passwords
            </span>
            <br />
            <span>
              with Ironclad Security
              <Fingerprint size={24} className="text-foreground inline align-middle relative -top-[2px] ml-1.5" />
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center text-foreground/80 font-body"
            style={{
              fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
              maxWidth: 560,
              lineHeight: 1.65,
              marginTop: "1.25rem",
              marginBottom: "2rem"
            }}
          >
            Zero stress, total control. Unbreakable storage, one-tap access, and pro-grade tools for your non-stop world.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.04, filter: "brightness(1.1)" }}
            whileTap={{ scale: 0.96 }}
          >
            <Link
              href="#"
              className="flex items-center justify-between text-white font-semibold transition-shadow"
              style={{
                borderRadius: 50,
                background: "#7342E2",
                fontSize: "clamp(0.9rem, 2vw, 1rem)",
                padding: "17px 24px",
                minWidth: 210,
                boxShadow: "0 4px 24px rgba(115,66,226,0.28)",
                gap: "32px"
              }}
            >
              Get It Free
              <ArrowRightCircle size={20} />
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
