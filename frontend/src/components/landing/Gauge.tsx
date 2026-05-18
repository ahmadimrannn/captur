type Props = {
  value: number;
  color?: string;
  showLabels?: boolean;
  min?: string;
  max?: string;
};

export function Gauge({ value, color = "#ef4d23", showLabels = false, min, max }: Props) {
  const total = 40;
  const active = Math.round((value / 100) * total);
  const cx = 100;
  const cy = 100;
  const r = 80;
  const ticks = Array.from({ length: total }, (_, i) => {
    const angle = Math.PI + (i / (total - 1)) * Math.PI;
    const x1 = cx + (r - 10) * Math.cos(angle);
    const y1 = cy + (r - 10) * Math.sin(angle);
    const x2 = cx + r * Math.cos(angle);
    const y2 = cy + r * Math.sin(angle);
    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={i < active ? color : "#d4d4d8"}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    );
  });

  return (
    <div className="w-full flex flex-col items-center">
      <svg viewBox="0 0 200 120" style={{ maxWidth: 260, width: "100%" }}>
        {ticks}
        <text x={100} y={105} textAnchor="middle" fontSize={22} fontWeight={600} fill="#0b0f1a">
          {value}%
        </text>
      </svg>
      {showLabels && (
        <div className="flex justify-between w-full text-[11px] text-neutral-500 -mt-2 px-2">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
}
