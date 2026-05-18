import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { UploadCloud,
  FileText, 
  ChevronRight, 
  ArrowLeft, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";

export const Route = createFileRoute("/upload")({
  component: UploadPage,
  head: () => ({
    meta: [
      { title: "Upload your transcript — Captur" },
      { name: "description", content: "Drag or drop your messy meeting transcript and get important insights." },
    ],
  }),
});

const ACCEPTED_EXT = [".pdf", ".txt"];
const ACCEPTED_MIME = ["application/pdf", "text/plain"];

function isAccepted(f: File) {
  const name = f.name.toLowerCase();
  return ACCEPTED_EXT.some((e) => name.endsWith(e)) || ACCEPTED_MIME.includes(f.type);
}

type Insights = Record<string, unknown> | string | null;

function UploadPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [insights, setInsights] = useState<Insights>(null);

  const onPick = (f: File | null) => {
    if (!f) return;
    if (!isAccepted(f)) {
      setFile(null);
      setStatus("error");
      setMessage("Only .pdf and .txt files are supported.");
      return;
    }
    setFile(f);
    setStatus("idle");
    setMessage(null);
    setInsights(null);
  };

  const upload = async () => {
    if (!file) return;
    setStatus("uploading");
    setMessage(null);
    setInsights(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("http://localhost:8000/process", { method: "POST", body: fd });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const ct = res.headers.get("content-type") ?? "";
      const data: Insights = ct.includes("application/json") ? await res.json() : await res.text();
      setInsights(data);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? `Couldn't reach the insights service: ${err.message}. Make sure your backend is running on http://localhost:8000.`
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <main
      className="min-h-screen w-full bg-[#ededed] p-3 sm:p-4"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <div className="relative w-full min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] overflow-hidden bg-[#d9d9d9] rounded-2xl sm:rounded-3xl">
        <video
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=60"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260424_064411_9e9d7f84-9277-41f4-ab10-59172d89e6be.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-white/40" />

        <div className="relative z-10">
          <Navbar />

          <div className="px-4 sm:px-8 pt-10 sm:pt-16 pb-10">
            <div className="max-w-3xl mx-auto flex items-center justify-between">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[13px] text-neutral-800 bg-white rounded-full px-3 py-1.5 border border-neutral-200 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back home
              </Link>
              <span className="inline-flex items-center gap-2 bg-white rounded-full px-3 py-1.5 shadow-sm text-[13px]">
                <span className="w-2 h-2 rounded-full bg-[#ef4d23]" />
                Captur AI
              </span>
            </div>

            <div className="max-w-3xl mx-auto text-center mt-8 sm:mt-12">
              <h1
                className="text-neutral-900"
                style={{
                  fontSize: "clamp(28px, 5.5vw, 52px)",
                  lineHeight: 1.05,
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                Drag or drop your{" "}
                <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}>
                  messy
                </span>{" "}
                meeting transcript and get important{" "}
                <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}>
                  insights
                </span>{" "}
                from it
              </h1>
              <p className="mt-4 text-neutral-700 text-[14px] sm:text-[15px]">
                Supports <span className="font-medium">.pdf</span> and <span className="font-medium">.txt</span> files.
              </p>
            </div>

            <div className="max-w-3xl mx-auto mt-8 sm:mt-10">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  onPick(e.dataTransfer.files?.[0] ?? null);
                }}
                onClick={() => inputRef.current?.click()}
                className={`cursor-pointer bg-white rounded-3xl border-2 border-dashed transition-colors p-10 sm:p-14 text-center shadow-sm ${
                  dragOver ? "border-[#ef4d23] bg-[#fff5f1]" : "border-neutral-300"
                }`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.txt,application/pdf,text/plain"
                  onChange={(e) => onPick(e.target.files?.[0] ?? null)}
                />
                <div className="w-14 h-14 rounded-2xl bg-[#fff1ec] inline-flex items-center justify-center">
                  <UploadCloud className="w-7 h-7 text-[#ef4d23]" />
                </div>
                <p className="mt-4 text-[16px] text-neutral-900 font-medium">
                  {file ? "File ready to upload" : "Drop your transcript here"}
                </p>
                <p className="mt-1 text-[13px] text-neutral-600">
                  {file ? "Click extract below or pick another file." : "or click to browse — .pdf or .txt only"}
                </p>
                {file && (
                  <div className="mt-5 inline-flex items-center gap-2 bg-[#f5f2ee] rounded-full px-4 py-2 text-[13px] text-neutral-800">
                    <FileText className="w-4 h-4 text-[#ef4d23]" />
                    {file.name}
                    <span className="text-neutral-500">({Math.max(1, Math.round(file.size / 1024))} KB)</span>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  disabled={!file || status === "uploading"}
                  onClick={upload}
                  className="inline-flex items-center gap-3 bg-[#0b0f1a] text-white rounded-full pl-6 pr-2 py-2.5 text-[14px] disabled:opacity-50"
                >
                  {status === "uploading" ? "Extracting insights" : "Extract insights"}
                  <span className="w-7 h-7 rounded-full bg-white/15 inline-flex items-center justify-center">
                    {status === "uploading" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </span>
                </button>
                {file && status !== "uploading" && (
                  <button
                    onClick={() => {
                      setFile(null);
                      setStatus("idle");
                      setMessage(null);
                      setInsights(null);
                    }}
                    className="text-[13px] underline text-neutral-700"
                  >
                    Choose another file
                  </button>
                )}
              </div>

              {status === "error" && message && (
                <div className="mt-5 max-w-xl mx-auto rounded-2xl px-4 py-3 text-[13px] flex items-start gap-2 bg-red-50 text-red-700 border border-red-100">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{message}</span>
                </div>
              )}

              {status === "done" && insights !== null && (
                <div className="mt-8 bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-2 text-[13px] text-[#ef4d23] font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    Insights extracted
                  </div>
                  <h2
                    className="mt-2 text-neutral-900"
                    style={{
                      fontSize: "clamp(22px, 3.5vw, 32px)",
                      lineHeight: 1.15,
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Your meeting,{" "}
                    <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}>
                      decoded
                    </span>
                  </h2>
                  <div className="mt-5 bg-[#f5f2ee] rounded-2xl p-5">
                    <InsightsView data={insights} />
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-[12px] text-neutral-500">
                    <Sparkles className="w-3.5 h-3.5 text-[#ef4d23]" />
                    Generated by Captur AI from your transcript.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function InsightsView({ data }: { data: Insights }) {
  if (typeof data === "string") {
    return <p className="text-[14px] text-neutral-800 whitespace-pre-wrap leading-relaxed">{data}</p>;
  }
  if (data && typeof data === "object") {
    return (
      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <h3 className="text-[12px] uppercase tracking-wide text-neutral-500 font-medium">{key}</h3>
            <div className="mt-1 text-[14px] text-neutral-800">
              {Array.isArray(value) ? (
                <ul className="list-disc pl-5 space-y-1">
                  {value.map((v, i) => (
                    <li key={i}>{typeof v === "string" ? v : JSON.stringify(v)}</li>
                  ))}
                </ul>
              ) : typeof value === "object" && value !== null ? (
                <pre className="text-[12px] bg-white rounded-lg p-3 overflow-auto border border-neutral-200">
                  {JSON.stringify(value, null, 2)}
                </pre>
              ) : (
                <p className="whitespace-pre-wrap leading-relaxed">{String(value)}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
