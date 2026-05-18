import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Navbar } from "./Navbar";
import { DashboardPreview } from "./DashboardPreview";

export function Hero() {
  return (
    <div id="home" className="relative w-full h-[calc(100vh-24px)] sm:h-[calc(100vh-32px)] overflow-hidden bg-[#d9d9d9] rounded-2xl sm:rounded-3xl">
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=60"
        {...({
          disableRemotePlayback: true,
          "webkit-playsinline": "true",
          "x5-playsinline": "true",
        } as Record<string, unknown>)}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-white/10" />
      <div className="relative z-10 h-full overflow-y-auto">
        <Navbar />
        <div className="flex flex-col items-center px-4 pt-10 sm:pt-16 pb-8 sm:pb-12 text-center">
          <span className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 shadow-sm text-[13px]">
            <span className="w-2 h-2 rounded-full bg-[#ef4d23]" />
            Captur AI
          </span>
          <h1
            className="mt-5 sm:mt-6 max-w-4xl text-neutral-900"
            style={{
              fontSize: "clamp(36px, 8vw, 72px)",
              lineHeight: 1.05,
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            Capture{" "}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}>
              insights
            </span>
            <br />
            from every meeting
          </h1>
          <p
            className="mt-4 sm:mt-6 text-neutral-700 px-2 max-w-xl"
            style={{ fontSize: "clamp(13px, 3.5vw, 16px)" }}
          >
            Turn messy transcripts into clear decisions, action items, and summaries — automatically.
          </p>
          <Link
            to="/upload"
            className="mt-6 sm:mt-8 inline-flex items-center gap-3 bg-[#0b0f1a] text-white rounded-full pl-6 sm:pl-7 pr-2 py-2 sm:py-2.5 text-[14px]"
          >
            Try for Free
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/15 inline-flex items-center justify-center">
              <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
          <div className="mt-10 sm:mt-14 w-full">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </div>
  );
}
