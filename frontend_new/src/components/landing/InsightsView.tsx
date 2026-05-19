type InsightsObject = { pdf_filename?: string; [key: string]: unknown };
type Insights = InsightsObject | string | null;

export default function InsightsView({ data }: { data: Insights }) {
  if (typeof data === "string") {
    return (
      <p className="text-[14px] text-neutral-800 whitespace-pre-wrap leading-relaxed">{data}</p>
    );
  }
  if (data && typeof data === "object") {
    return (
      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <h3 className="text-[12px] uppercase tracking-wide text-neutral-500 font-medium">
              {key}
            </h3>
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