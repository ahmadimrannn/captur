import { Sparkles, FileText, ListChecks, Users, Clock, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-powered summaries",
    desc: "Distill hours of conversation into a crisp recap in seconds.",
  },
  {
    icon: ListChecks,
    title: "Action item extraction",
    desc: "Automatically surface action items, decisions, owners, and deadlines.",
  },
  {
    icon: Users,
    title: "Speaker insights",
    desc: "See who talked, what mattered, and what to follow up on.",
  },
  {
    icon: FileText,
    title: "Any transcript format",
    desc: "TXT, PDF — drop it in and we'll parse it.",
  },
  {
    icon: Clock,
    title: "Save 5+ hours / week",
    desc: "Skip rewatching recordings. Get the gist instantly.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    desc: "Your transcripts stay yours. Encrypted end-to-end.",
  },
];

export function Features() {
  return (
    <section id="features" className="px-3 sm:px-4 mt-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-14 border border-neutral-200">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-neutral-100 rounded-full px-3 py-1 text-[12px] text-neutral-700">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef4d23]" /> Features
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
            Everything you need to{" "}
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              decode
            </span>{" "}
            your meetings
          </h2>
          <p className="mt-3 text-neutral-600 text-[14px] sm:text-[15px]">
            Captur reads, structures and explains your transcripts — so your team moves faster.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {features.map((f) => (
            <div key={f.title} className="bg-[#f5f2ee] rounded-2xl p-6 border border-neutral-100">
              <div className="w-10 h-10 rounded-xl bg-white inline-flex items-center justify-center border border-neutral-200">
                <f.icon className="w-5 h-5 text-[#ef4d23]" />
              </div>
              <h3 className="mt-4 text-[16px] font-medium text-neutral-900">{f.title}</h3>
              <p className="mt-1 text-[13px] text-neutral-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
