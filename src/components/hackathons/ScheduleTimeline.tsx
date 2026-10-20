import React from "react";
import { ScheduleItem } from "@/types";
import { Calendar, Video, Clock, Award, Users } from "lucide-react";

export function ScheduleTimeline({ schedule }: { schedule: ScheduleItem[] }) {
  const getIcon = (type: ScheduleItem["type"]) => {
    switch (type) {
      case "workshop":
        return <Video className="h-4 w-4 text-secondary" />;
      case "deadline":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "ceremony":
        return <Award className="h-4 w-4 text-primary" />;
      case "mentorship":
        return <Users className="h-4 w-4 text-emerald-400" />;
    }
  };

  return (
    <div className="relative border-l border-dark-750 ml-4 pl-6 space-y-6">
      {schedule.map((item) => (
        <div key={item.id} className="relative group">
          {/* Timeline node icon */}
          <div className="absolute -left-[35px] top-1 flex h-7 w-7 items-center justify-center rounded-full border border-dark-700 bg-dark-900 shadow-sm transition-transform group-hover:scale-110 group-hover:border-primary/50">
            {getIcon(item.type)}
          </div>

          <div className="rounded-xl border border-dark-750 bg-dark-900/60 p-4 transition-colors hover:border-dark-700">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-xs font-semibold text-primary">
                {item.timestamp}
              </span>
              <span className="rounded bg-dark-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 border border-dark-700">
                {item.type}
              </span>
            </div>
            <h4 className="mt-1.5 text-sm font-bold text-white font-heading">{item.title}</h4>
            {item.description && (
              <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
