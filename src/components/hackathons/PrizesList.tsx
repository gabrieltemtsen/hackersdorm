import React from "react";
import { PrizeTrack } from "@/types";
import { Trophy, Award, Sparkles } from "lucide-react";

export function PrizesList({
  prizes,
  totalPrizePool,
}: {
  prizes: PrizeTrack[];
  totalPrizePool: string;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-amber-600/30 bg-gradient-to-r from-amber-950/25 via-dark-900 to-dark-850 p-6 shadow-lg">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Prize Pool Bounty
          </span>
          <h3 className="text-3xl font-black text-white mt-1 font-heading font-tabular">{totalPrizePool}</h3>
          <p className="text-xs text-slate-400 mt-1">
            Cash awards, cloud infrastructure credits, and direct investor demo day intros.
          </p>
        </div>
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-inner">
          <Trophy className="h-7 w-7" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prizes.map((prize, idx) => (
          <div
            key={prize.id}
            className="glass-card relative flex flex-col justify-between rounded-xl p-5 border-dark-750"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                  <Award className="h-4 w-4" />
                  {idx === 0 ? "Grand Prize" : `Track Award #${idx + 1}`}
                </span>
                <span className="rounded-lg bg-amber-500/10 border border-amber-500/25 px-2.5 py-1 text-sm font-black text-amber-300 font-tabular">
                  {prize.amount}
                </span>
              </div>
              <h4 className="text-base font-bold text-white font-heading">{prize.name}</h4>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                {prize.description}
              </p>
            </div>

            {prize.winnerSubmissionId && (
              <div className="mt-4 flex items-center gap-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 p-2 text-xs font-semibold text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Winner Crowned!</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
