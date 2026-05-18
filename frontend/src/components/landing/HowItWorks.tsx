const steps = [
  { n: "01", title: "Drop your transcript", desc: "Upload any meeting transcript — Zoom, Meet, Teams, Otter, you name it." },
  { n: "02", title: "Captur reads it", desc: "Our AI parses speakers, topics, sentiment and intent in seconds." },
  { n: "03", title: "Get clear insights", desc: "Receive a summary, action items, decisions and follow-ups instantly." },
];

export function HowItWorks() {
  return (
    <section className="px-3 sm:px-4 mt-4">
      <div className="bg-[#0b0f1a] text-white rounded-2xl sm:rounded-3xl p-8 sm:p-14">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-[12px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef4d23]" /> How it works
          </span>
          <h2
            className="mt-4"
            style={{ fontSize: "clamp(28px, 5vw, 48px)", lineHeight: 1.1, fontWeight: 500, letterSpacing: "-0.02em" }}
          >
            From messy transcript to{" "}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}>
              actionable
            </span>{" "}
            insight
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          {steps.map((s) => (
            <div key={s.n} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <span className="text-[#ef4d23] text-[13px] font-medium">{s.n}</span>
              <h3 className="mt-3 text-[18px] font-medium">{s.title}</h3>
              <p className="mt-2 text-[13px] text-white/70 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
