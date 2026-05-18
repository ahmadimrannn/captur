import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, ShoppingCart, Menu } from "lucide-react";

function Logo() {
  const cx = 16,
    cy = 16,
    r = 10;
  const petals = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return (
      <circle key={i} cx={cx + r * Math.cos(a)} cy={cy + r * Math.sin(a)} r={3.5} fill="#ef4d23" />
    );
  });
  return (
    <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8 shrink-0">
      {petals}
      <circle cx={cx} cy={cy} r={3.5} fill="#ef4d23" />
    </svg>
  );
}

const navItems = [{ label: "Home", dot: true }, { label: "Features" }, { label: "How it works" }];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center pt-4 sm:pt-6 px-3 sm:px-4">
      <div className="bg-white rounded-full shadow-sm border border-neutral-200 pl-2 pr-2 py-2 w-full max-w-190 relative flex items-center">
        <Logo />
        <nav className="hidden md:flex gap-6 ml-5 text-[14px] text-neutral-800">
          {navItems.map((n) => {
            const sectionIds: Record<string, string> = {
              Home: "home",
              Features: "features",
              "How it works": "how-it-works",
              Pricing: "pricing",
            };
            const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              const sectionId = sectionIds[n.label];
              if (sectionId) {
                const element = document.getElementById(sectionId);
                element?.scrollIntoView({ behavior: "smooth" });
              }
            };
            return (
              <a
                key={n.label}
                href={`#${sectionIds[n.label] || ""}`}
                onClick={handleScroll}
                className={`inline-flex items-center gap-1.5`}
              >
                {n.dot && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-black"
                    style={{ width: 6, height: 6 }}
                  />
                )}
                {n.label}
              </a>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <ShoppingCart className="w-5 h-5 text-neutral-800 hidden sm:block" />
          <Link
            to="/upload"
            className="bg-[#ef4d23] text-white rounded-full pl-3 sm:pl-4 pr-1 py-1 text-[13px] sm:text-[14px] inline-flex items-center gap-2"
          >
            <span className="hidden sm:inline">Try for Free</span>
            <span className="sm:hidden">Try Free</span>
            <span className="w-6 h-6 rounded-full bg-white/20 inline-flex items-center justify-center">
              <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
          <button className="md:hidden ml-1" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            <Menu className="w-5 h-5" />
          </button>
        </div>
        {open && (
          <div className="absolute top-full left-2 right-2 mt-2 bg-white rounded-2xl shadow-lg border border-neutral-200 p-3 z-20 md:hidden">
            {navItems.map((n) => {
              const sectionIds: Record<string, string> = {
                Home: "home",
                Features: "features",
                "How it works": "how-it-works",
                Pricing: "pricing",
              };
              const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                const sectionId = sectionIds[n.label];
                if (sectionId) {
                  const element = document.getElementById(sectionId);
                  element?.scrollIntoView({ behavior: "smooth" });
                }
                setOpen(false);
              };
              return (
                <a
                  key={n.label}
                  href={`#${sectionIds[n.label] || ""}`}
                  onClick={handleScroll}
                  className="block py-2 text-[14px] text-neutral-800"
                >
                  {n.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
