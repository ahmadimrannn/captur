import { CheckCircle2, AlertCircle, Users, Clock } from "lucide-react";

function SummaryCard() {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[#ef4d23] font-semibold text-[14px]">Meeting Summary</span>
        <span className="text-neutral-500 text-[12px]">Q3 Planning</span>
      </div>
      <p className="text-[13px] text-neutral-700 leading-relaxed">
        The team discussed Q3 roadmap priorities, with focus on scaling API performance and
        improving user onboarding. Key decisions made around resource allocation and timeline
        adjustments for the next sprint cycle.
      </p>
      <div className="flex gap-3 mt-5">
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4 text-[#ef4d23]" />
          <span className="text-[12px] text-neutral-600">8 speakers</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-[#ef4d23]" />
          <span className="text-[12px] text-neutral-600">47 minutes</span>
        </div>
      </div>
    </div>
  );
}

function ActionItemsCard() {
  const items = [
    { owner: "Sarah Chen", task: "Finalize API performance metrics", deadline: "May 22" },
    { owner: "Marcus Webb", task: "Setup user analytics dashboard", deadline: "May 25" },
    { owner: "Team", task: "Review security compliance checklist", deadline: "May 24" },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[#ef4d23] font-semibold text-[14px]">Action Items</span>
        <span className="bg-[#ef4d23] text-white text-[11px] rounded-full px-2.5 py-1">
          {items.length}
        </span>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex gap-3 pb-3 border-b border-neutral-100 last:border-b-0 last:pb-0"
          >
            <CheckCircle2 className="w-4 h-4 text-[#ef4d23] shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-[13px] font-medium text-neutral-900">{item.task}</p>
              <div className="flex justify-between mt-1">
                <span className="text-[11px] text-neutral-600">Owner: {item.owner}</span>
                <span className="text-[11px] text-neutral-500">Due: {item.deadline}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DecisionsCard() {
  const decisions = [
    "Move API v2 launch to June 1st",
    "Allocate 40% of dev resources to performance optimization",
    "Implement mandatory security audit before release",
  ];

  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[#ef4d23] font-semibold text-[14px]">Key Decisions</span>
        <span className="bg-blue-50 text-blue-600 text-[11px] rounded-full px-2.5 py-1">
          {decisions.length}
        </span>
      </div>
      <div className="space-y-3">
        {decisions.map((decision, i) => (
          <div
            key={i}
            className="flex gap-3 pb-3 border-b border-neutral-100 last:border-b-0 last:pb-0"
          >
            <AlertCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-[13px] text-neutral-700">{decision}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardPreview() {
  return (
    <div className="px-3 sm:px-4 w-full">
      <div className="bg-[#f5f2ee] rounded-3xl p-4 sm:p-6 w-full max-w-250 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="lg:col-span-1">
            <SummaryCard />
          </div>
          <div className="lg:col-span-1">
            <ActionItemsCard />
          </div>
          <div className="lg:col-span-1">
            <DecisionsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
