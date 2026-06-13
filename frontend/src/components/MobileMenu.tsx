"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import { Button } from "./ui/Button";

const navLinks = [
  { label: "Programs", href: "/programs" },
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
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed top-0 right-0 z-50 flex flex-col h-dvh shadow-2xl bg-surface border-l border-border"
            style={{ width: "min(88vw, 360px)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5">
              <Link href="/" onClick={onClose} className="flex items-center gap-3">
                <Logo size={28} />
              </Link>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                aria-label="Close menu"
                className="flex items-center justify-center rounded-full bg-surface-hover w-10 h-10 transition-colors"
              >
                <X size={20} className="text-foreground" />
              </motion.button>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-border" />

            {/* Nav Links */}
            <nav className="flex flex-col gap-2 px-4 mt-6 flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center px-4 py-3 rounded-xl font-medium transition-colors hover:bg-surface-hover text-foreground text-lg"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 px-6 pb-8 pt-4">
              <Link href="/contact" onClick={onClose} className="w-full">
                <Button variant="outline" className="w-full">Log in</Button>
              </Link>
              <Link href="/register" onClick={onClose} className="w-full">
                <Button variant="primary" className="w-full">Get Started</Button>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
