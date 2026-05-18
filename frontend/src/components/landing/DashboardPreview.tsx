import { ChevronDown, TrendingDown, TrendingUp, X } from "lucide-react";
import { Gauge } from "./Gauge";

function Card1() {
  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col">
      <div className="flex items-center justify-between text-[13px]">
        <span className="text-[#ef4d23] font-medium">Clicks</span>
        <span className="text-neutral-500">This Month</span>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span style={{ fontSize: 28, fontWeight: 600 }}>6,896</span>
        <span className="bg-red-50 text-red-600 rounded-full px-2 py-0.5 inline-flex items-center gap-1 text-[11px]">
          <TrendingDown className="w-3 h-3" />
          -3,382 (33%)
        </span>
      </div>
      <span className="text-[11px] text-neutral-500 mt-1">Compared to yesterday</span>
      <div className="text-center text-[12px] text-neutral-700 mt-4">Month Target achieved</div>
      <Gauge value={92} color="#ef4d23" showLabels min="389K" max="425K" />
      <div className="bg-neutral-100 rounded-full p-1 flex mt-3 text-[12px]">
        <span className="flex-1 text-center bg-white rounded-full py-1 shadow-sm">Impressions</span>
        <span className="flex-1 text-center py-1 text-neutral-500">Clicks</span>
      </div>
    </div>
  );
}

function FormRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[12px] text-neutral-700">{label}</label>
      <button className="border border-neutral-200 rounded-lg px-3 py-2 text-[13px] flex items-center justify-between">
        <span>{value}</span>
        <ChevronDown className="w-4 h-4 text-neutral-500" />
      </button>
    </div>
  );
}

function InputRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[12px] text-neutral-700">{label}</label>
      <div className="border border-neutral-200 rounded-lg px-3 py-2 text-[13px] flex items-center gap-1">
        <span className="text-neutral-400">#</span>
        <span>{value}</span>
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col gap-3">
      <FormRow label="Show figures for" value="This month" />
      <FormRow label="Compare period by" value="Month-to-date (MTD)" />
      <InputRow label="Ste targets (This month)" value="10" />
      <InputRow label="Ste targets (This year)" value="100" />
      <div className="flex items-center gap-3 mt-1">
        <button className="bg-[#ef4d23] text-white rounded-lg px-5 py-2 text-[13px]">Save</button>
        <button className="underline text-[13px] text-neutral-700">Cancel</button>
        <X className="w-4 h-4 ml-auto text-neutral-500" />
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col">
      <div className="flex items-center justify-between text-[13px]">
        <span className="text-[#ef4d23] font-medium">Video Starts</span>
        <span className="text-neutral-500">today</span>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span style={{ fontSize: 28, fontWeight: 600 }}>0</span>
        <span className="bg-neutral-100 text-neutral-700 rounded-full px-2 py-0.5 inline-flex items-center gap-1 text-[11px]">
          <TrendingUp className="w-3 h-3" />
          0
        </span>
      </div>
      <span className="text-[11px] text-neutral-500 mt-1">Compared to yesterday</span>
      <div className="mt-4">
        <Gauge value={68} color="#9ca3af" />
      </div>
      <div className="bg-neutral-100 rounded-full p-1 flex mt-3 text-[12px]">
        <span className="flex-1 text-center bg-white rounded-full py-1 shadow-sm">Video Clicks</span>
        <span className="flex-1 text-center py-1 text-neutral-500">Video Starts</span>
      </div>
    </div>
  );
}

export function DashboardPreview() {
  return (
    <div className="px-3 sm:px-4 w-full">
      <div className="bg-[#f5f2ee] rounded-3xl p-4 sm:p-6 w-full max-w-[880px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <Card1 />
          <Card2 />
          <Card3 />
        </div>
      </div>
    </div>
  );
}
