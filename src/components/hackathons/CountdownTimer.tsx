"use client";

import React, { useState, useEffect } from "react";
import { getTimeRemaining } from "@/lib/utils";
import { Clock, AlertCircle } from "lucide-react";

interface CountdownTimerProps {
  targetDate: string;
  label?: string;
  subtitle?: string;
}

export function CountdownTimer({
  targetDate,
  label = "Submission Deadline Countdown",
  subtitle,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  if (timeLeft.isExpired) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-amber-900/40 bg-amber-950/20 px-4 py-3 text-amber-400">
        <AlertCircle className="h-5 w-5" />
        <span className="text-sm font-semibold">Submissions have closed for this event.</span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-dark-700 bg-gradient-to-b from-dark-850 via-dark-900 to-dark-950 p-5 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <Clock className="h-4 w-4 animate-spin-slow" />
          <span>{label}</span>
        </div>
        {subtitle && <span className="text-xs text-slate-400 font-mono">{subtitle}</span>}
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center rounded-xl border border-dark-700 bg-dark-900 py-3 shadow-inner"
          >
            <span className="font-mono text-2xl sm:text-3xl font-black tracking-tight text-white font-tabular">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-slate-400 mt-0.5">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
