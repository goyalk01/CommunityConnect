"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import { EASE_OUT } from "@/lib/motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "Register", href: "/register" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Contact", href: "/contact" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(25,40,55,0.35)", backdropFilter: "blur(4px)" }}
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.45,
              ease: EASE_OUT,
            }}
            className="fixed top-0 right-0 z-50 flex flex-col h-dvh"
            style={{
              width: "min(88vw, 360px)",
              background: "#CFC8C5",
              boxShadow: "-12px 0 48px rgba(25,40,55,0.18)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5">
              <Logo size={28} />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                aria-label="Close menu"
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 40,
                  height: 40,
                  background: "rgba(25,40,55,0.1)",
                }}
              >
                <X size={20} color="#192837" />
              </motion.button>
            </div>

            {/* Divider */}
            <div
              className="mx-6"
              style={{ height: 1, background: "rgba(25,40,55,0.12)" }}
            />

            {/* Nav Links */}
            <nav className="flex flex-col gap-1 px-4 mt-4 flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.18 + i * 0.07, duration: 0.4, ease: EASE_OUT }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center px-4 py-3 rounded-xl font-medium transition-colors hover:bg-black/10"
                    style={{ fontSize: "1.1rem", color: "var(--color-text)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 px-6 pb-8 pt-4">
              <Link
                href="/register"
                onClick={onClose}
                className="flex items-center justify-center text-white font-semibold rounded-full transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: "#4F46E5",
                  fontSize: "0.95rem",
                  padding: "14px 0",
                }}
              >
                Join as Volunteer
              </Link>
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center justify-center font-semibold rounded-full transition-all hover:bg-gray-200 active:scale-95"
                style={{
                  background: "#F2F2EE",
                  color: "var(--color-text)",
                  fontSize: "0.95rem",
                  padding: "14px 0",
                }}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
