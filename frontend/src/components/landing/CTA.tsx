import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function CTA() {
  return (
    <section className="px-3 sm:px-4 mt-4">
      <div className="bg-[#ef4d23] text-white rounded-2xl sm:rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden">
        <h2
          style={{
            fontSize: "clamp(28px, 5vw, 48px)",
            lineHeight: 1.1,
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
          className="max-w-2xl mx-auto"
        >
          Stop rewatching meetings.{" "}
          <span
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Start capturing
          </span>{" "}
          insights.
        </h2>
        <p className="mt-4 text-white/85 max-w-lg mx-auto text-[14px] sm:text-[15px]">
          Drop a transcript into Captur and get a clean, structured insight report in seconds.
        </p>
        <Link
          to="/upload"
          className="mt-8 inline-flex items-center gap-3 bg-[#0b0f1a] text-white rounded-full pl-6 sm:pl-7 pr-2 py-2 sm:py-2.5 text-[14px]"
        >
          Try for Free
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/15 inline-flex items-center justify-center">
            <ChevronRight className="w-4 h-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-3 sm:px-4 mt-4 mb-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-neutral-600">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ef4d23]" />
          <span className="text-neutral-900 font-medium">Captur</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex gap-5">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}
