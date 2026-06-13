import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Logo size={28} />
            <span className="font-semibold text-foreground text-sm tracking-tight">
              CommunityConnect
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Empowering communities through smart volunteer management.
            Built for modern community organizations.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-12 md:gap-24">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground mb-2">
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
                className="text-sm text-foreground/80 hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Support
            </p>
            {[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-foreground/80 hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CommunityConnect Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
