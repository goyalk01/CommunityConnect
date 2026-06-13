"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "Register", href: "/register" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="relative z-10"
        style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}
      >
        <div className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
          {/* Left: Logo + Brand */}
          <Link href="/" className="flex items-center gap-2.5 select-none">
            <Logo size={32} />
            <span
              className="font-semibold hidden sm:block"
              style={{ fontSize: "0.95rem", color: "var(--color-text)", letterSpacing: "-0.01em" }}
            >
              VolunteerHub AI
            </span>
          </Link>

          {/* Center: Nav Links (desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: "var(--color-text)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: CTA Buttons (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/register"
              className="text-sm font-semibold text-white rounded-full transition-all hover:shadow-lg active:scale-95"
              style={{
                background: "#4F46E5",
                padding: "10px 20px",
              }}
            >
              Join as Volunteer
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold rounded-full transition-all hover:bg-gray-200 active:scale-95"
              style={{
                background: "#F2F2EE",
                color: "var(--color-text)",
                padding: "10px 20px",
              }}
            >
              Contact Us
            </Link>
          </div>

          {/* Hamburger (mobile) */}
          <button
            id="navbar-mobile-menu-btn"
            className="md:hidden flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-black/10"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={24} color="#192837" />
          </button>
        </div>
      </nav>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
