import { Link } from "react-router-dom";
import { Check, ChevronRight } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    desc: "For individuals trying Captur out.",
    features: ["5 transcripts / month", "Basic summaries", "Action items"],
    cta: "Try for Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19",
    desc: "For busy operators and teams.",
    features: [
      "Unlimited transcripts",
      "Speaker analytics",
      "Custom templates",
      "Priority support",
    ],
    cta: "Try for Free",
    highlight: true,
  },
  {
    name: "Team",
    price: "$49",
    desc: "For teams shipping together.",
    features: ["Everything in Pro", "Shared workspaces", "Integrations", "SSO + admin"],
    cta: "Try for Free",
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="px-3 sm:px-4 mt-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-14 border border-neutral-200">
        <div className="text-center max-w-xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-neutral-100 rounded-full px-3 py-1 text-[12px] text-neutral-700">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef4d23]" /> Pricing
          </span>
          <h2
            className="mt-4 text-neutral-900"
            style={{
              fontSize: "clamp(28px, 5vw, 48px)",
              lineHeight: 1.1,
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            Simple,{" "}
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              transparent
            </span>{" "}
            pricing
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl p-6 border ${t.highlight ? "bg-[#0b0f1a] text-white border-transparent" : "bg-[#f5f2ee] border-neutral-100"}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-medium">{t.name}</h3>
                {t.highlight && (
                  <span className="text-[11px] bg-[#ef4d23] text-white rounded-full px-2 py-0.5">
                    Popular
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span style={{ fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em" }}>
                  {t.price}
                </span>
                <span
                  className={
                    t.highlight ? "text-white/60 text-[13px]" : "text-neutral-500 text-[13px]"
                  }
                >
                  /mo
                </span>
              </div>
              <p
                className={`mt-1 text-[13px] ${t.highlight ? "text-white/70" : "text-neutral-600"}`}
              >
                {t.desc}
              </p>
              <ul className="mt-5 space-y-2">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[13px]">
                    <Check
                      className={`w-4 h-4 ${t.highlight ? "text-[#ef4d23]" : "text-[#ef4d23]"}`}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/upload"
                className={`mt-6 inline-flex items-center gap-2 rounded-full pl-5 pr-2 py-2 text-[13px] w-full justify-center ${t.highlight ? "bg-[#ef4d23] text-white" : "bg-[#0b0f1a] text-white"}`}
              >
                {t.cta}
                <span className="w-6 h-6 rounded-full bg-white/15 inline-flex items-center justify-center">
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
