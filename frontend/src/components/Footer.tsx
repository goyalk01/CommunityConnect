import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer
      className="relative z-10 mt-auto border-t"
      style={{ borderColor: "rgba(25,40,55,0.1)", background: "#F2F2EE" }}
    >
      <div
        className="px-5 sm:px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        style={{ maxWidth: 1280, margin: "0 auto" }}
      >
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <Logo size={28} />
            <span
              className="font-semibold"
              style={{ color: "var(--color-text)", fontSize: "0.9rem" }}
            >
              VolunteerHub AI
            </span>
          </div>
          <p
            className="text-sm max-w-xs leading-relaxed"
            style={{ color: "rgba(25,40,55,0.6)" }}
          >
            Empowering communities through smart volunteer management.
            Built for community organizations.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "rgba(25,40,55,0.4)" }}>
              Platform
            </p>
            {[
              { label: "Home", href: "/" },
              { label: "Programs", href: "/programs" },
              { label: "Register", href: "/register" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm transition-opacity hover:opacity-70"
                style={{ color: "var(--color-text)" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "rgba(25,40,55,0.4)" }}>
              Support
            </p>
            {[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm transition-opacity hover:opacity-70"
                style={{ color: "var(--color-text)" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        className="px-5 sm:px-8 py-4"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          borderTop: "1px solid rgba(25,40,55,0.08)",
          color: "rgba(25,40,55,0.45)",
          fontSize: "0.8rem",
        }}
      >
        © {new Date().getFullYear()} VolunteerHub AI. All rights reserved.
      </div>
    </footer>
  );
}
