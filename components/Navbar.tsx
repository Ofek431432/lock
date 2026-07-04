"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { KeyholeIcon, MenuIcon, PhoneIcon, XIcon } from "./icons";

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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-ink/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/25"
          : "bg-ink/60 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 sm:h-[4.25rem] items-center justify-between">
          <Link href="/" className="group flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold-light via-gold to-gold-dark text-ink shadow-md shadow-gold/30 group-hover:shadow-gold/50 transition-shadow">
              <KeyholeIcon className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-lg font-extrabold text-cream tracking-tight">{siteConfig.name}</span>
              <span className="hidden sm:block mt-1 text-[0.67rem] font-medium text-muted">
                מנעולן מקצועי בחיפה והסביבה
              </span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href) ? "text-gold font-bold" : "text-cream/75 hover:text-cream"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0.5 inset-x-3 h-0.5 rounded-full bg-gradient-to-l from-gold-light to-gold transition-all duration-300 origin-center ${
                    isActive(link.href) ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                  }`}
                  aria-hidden
                />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <span className="hidden lg:inline-flex items-center gap-2 text-xs font-medium text-cream/60">
              <span className="pulse-dot" aria-hidden />
              זמינים עכשיו
            </span>
            <a
              href={siteConfig.phoneHref}
              className="btn-lux inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-ink"
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
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-cream hover:bg-white/5 transition-colors"
          >
            {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>

        <div
          className={`md:hidden grid transition-all duration-300 ease-out ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-white/10 pb-5 pt-2 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-gold bg-gold/10 font-bold border-s-2 border-gold"
                      : "text-cream/80 hover:text-gold hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-cream/55">
                <span className="pulse-dot" aria-hidden />
                זמינים עכשיו — מענה אנושי ישיר, 24/7
              </div>
              <a
                href={siteConfig.phoneHref}
                className="btn-lux mt-2 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-base font-bold text-ink"
              >
                <PhoneIcon className="h-5 w-5" />
                חייגו עכשיו: {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
