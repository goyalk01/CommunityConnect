"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/Button";

const navLinks = [
  { label: "Programs", href: "/programs" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollY } = useScroll();
  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(var(--background-rgb), 0)", "var(--surface)"] // Will refine with CSS classes
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? "bg-surface/80 backdrop-blur-xl border-border shadow-sm py-3" 
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Left: Logo + Brand */}
          <Link href="/" className="flex items-center gap-3 select-none group">
            <motion.div whileHover={{ rotate: 10, scale: 1.05 }}>
              <Logo size={28} />
            </motion.div>
            <span className="font-semibold text-lg tracking-tight hidden sm:block text-foreground group-hover:opacity-80 transition-opacity">
              CommunityConnect
            </span>
          </Link>

          {/* Center: Nav Links (desktop) */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: CTA Buttons (desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <div className="flex items-center gap-2">
              <Link href="/contact" tabIndex={-1}>
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link href="/register" tabIndex={-1}>
                <Button variant="primary" size="sm">Get Started</Button>
              </Link>
            </div>
          </div>

          {/* Hamburger (mobile) */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              id="navbar-mobile-menu-btn"
              className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-surface-hover text-foreground"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
