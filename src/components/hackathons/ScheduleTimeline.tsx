import React from "react";
import { ScheduleItem } from "@/types";
import { Calendar, Video, Clock, Award, Users } from "lucide-react";

export function ScheduleTimeline({ schedule }: { schedule: ScheduleItem[] }) {
  const getIcon = (type: ScheduleItem["type"]) => {
    switch (type) {
      case "workshop":
        return <Video className="h-4 w-4 text-cyan-400" />;
      case "deadline":
        return <Clock className="h-4 w-4 text-red-400" />;
      case "ceremony":
        return <Award className="h-4 w-4 text-amber-400" />;
      case "mentorship":
        return <Users className="h-4 w-4 text-emerald-400" />;
    }
  };

  return (
    <div className="relative border-l border-slate-800 ml-4 pl-6 space-y-6">
      {schedule.map((item) => (
        <div key={item.id} className="relative group">
          {/* Timeline node icon */}
          <div className="absolute -left-[35px] top-1 flex h-7 w-7 items-center justify-center rounded-full border border-slate-700 bg-slate-900 shadow-sm transition-transform group-hover:scale-110">
            {getIcon(item.type)}
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 transition-colors hover:border-slate-700">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-xs font-semibold text-indigo-400">
                {item.timestamp}
              </span>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                {item.type}
              </span>
            </div>
            <h4 className="mt-1 text-sm font-bold text-white">{item.title}</h4>
            {item.description && (
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
