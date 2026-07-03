"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { MenuIcon, PhoneIcon, XIcon } from "./icons";

const navLinks = [
  { href: "/", label: "בית" },
  { href: "/services", label: "שירותים" },
  { href: "/areas", label: "אזורי שירות" },
  { href: "/articles", label: "מאמרים" },
  { href: "/about", label: "אודות" },
  { href: "/contact", label: "צור קשר" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 bg-ink/95 backdrop-blur border-b border-white/10 shadow-lg shadow-black/10">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-baseline gap-2 shrink-0" onClick={() => setOpen(false)}>
            <span className="text-xl font-extrabold text-cream">{siteConfig.name}</span>
            <span className="hidden sm:inline text-xs text-muted">מנעולן מקצועי בחיפה והסביבה</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-gold bg-white/8 font-bold"
                    : "text-cream/80 hover:text-gold hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-ink shadow-md shadow-gold/30 hover:bg-gold-dark transition-colors"
            >
              <PhoneIcon className="h-4 w-4" />
              {siteConfig.phoneDisplay}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="פתח תפריט ניווט"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-cream hover:bg-white/5"
          >
            {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-white/10 pb-4 pt-2">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-gold bg-white/8 font-bold"
                      : "text-cream/80 hover:text-gold hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={siteConfig.phoneHref}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-base font-bold text-ink shadow-md shadow-gold/30 hover:bg-gold-dark transition-colors"
              >
                <PhoneIcon className="h-5 w-5" />
                חייגו עכשיו: {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
