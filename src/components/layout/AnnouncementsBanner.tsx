"use client";

import React, { useState } from "react";
import { useHackersDorm } from "@/context/HackersDormContext";
import { Bell, Flame, Calendar, X, ExternalLink } from "lucide-react";

export function AnnouncementsBanner({ hackathonId }: { hackathonId?: string }) {
  const { announcements } = useHackersDorm();
  const [dismissed, setDismissed] = useState<string[]>([]);

  const relevantAnnouncements = announcements.filter(
    (a) => (!hackathonId || a.hackathonId === hackathonId) && !dismissed.includes(a.id)
  );

  if (relevantAnnouncements.length === 0) return null;

  const current = relevantAnnouncements[0];

  const categoryIcons = {
    urgent: <Flame className="h-4 w-4 text-red-400 animate-pulse" />,
    deadline: <Flame className="h-4 w-4 text-amber-400" />,
    workshop: <Calendar className="h-4 w-4 text-indigo-400" />,
    general: <Bell className="h-4 w-4 text-cyan-400" />,
    mentorship: <Bell className="h-4 w-4 text-emerald-400" />,
  };

  return (
    <div className="relative border-b border-indigo-500/20 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-950 px-4 py-2.5 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-800">
            {categoryIcons[current.category as keyof typeof categoryIcons] || (
              <Bell className="h-3.5 w-3.5 text-indigo-400" />
            )}
          </div>
          <span className="font-semibold text-white shrink-0">{current.title}</span>
          <span className="hidden text-slate-300 md:inline truncate">{current.content}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setDismissed((prev) => [...prev, current.id])}
            className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            title="Dismiss announcement"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
