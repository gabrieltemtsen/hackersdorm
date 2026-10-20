"use client";

import React, { useState } from "react";
import { Hackathon, Submission, JudgingCriteria } from "@/types";
import { useHackersDorm } from "@/context/HackersDormContext";
import {
  Scale,
  Award,
  Video,
  Github,
  Globe,
  CheckCircle2,
  Sliders,
  Send,
  Star,
  Sparkles,
} from "lucide-react";

export function JudgingDashboard({ hackathon }: { hackathon: Hackathon }) {
  const { submissions, submitJudgeScore, judgeScores, currentUser } = useHackersDorm();

  const hackathonSubmissions = submissions.filter((s) => s.hackathonId === hackathon.id);
  const [selectedSubId, setSelectedSubId] = useState<string>(
    hackathonSubmissions[0]?.id || ""
  );

  const selectedSub = hackathonSubmissions.find((s) => s.id === selectedSubId) || hackathonSubmissions[0];

  // Existing score from this judge
  const existingScore = judgeScores.find(
    (s) => s.judgeId === currentUser.id && s.submissionId === selectedSub?.id
  );

  // Rubric scores state
  const [scores, setScores] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    hackathon.judgingCriteria.forEach((crit) => {
      initial[crit.id] = 8;
    });
    return initial;
  });

  const [feedback, setFeedback] = useState("");
  const [privateNotes, setPrivateNotes] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Calculate weighted score
  const calculateTotalWeighted = () => {
    let total = 0;
    let totalWeight = 0;
    hackathon.judgingCriteria.forEach((crit) => {
      const s = scores[crit.id] || 0;
      total += (s / crit.maxScore) * 10 * (crit.weight / 100);
      totalWeight += crit.weight;
    });
    return totalWeight > 0 ? parseFloat(total.toFixed(1)) : 0;
  };

  const handleScoreChange = (criteriaId: string, value: number) => {
    setScores((prev) => ({ ...prev, [criteriaId]: value }));
    setSavedSuccess(false);
  };

  const handleSaveScore = () => {
    if (!selectedSub) return;
    const weighted = calculateTotalWeighted();
    submitJudgeScore({
      hackathonId: hackathon.id,
      submissionId: selectedSub.id,
      judgeId: currentUser.id,
      judgeName: currentUser.name,
      scores,
      totalWeightedScore: weighted,
      feedback: feedback.trim() || undefined,
      privateNotes: privateNotes.trim() || undefined,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (hackathonSubmissions.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400">
        <Scale className="mx-auto h-12 w-12 text-slate-600 mb-3" />
        <h3 className="text-base font-bold text-white">No Submissions to Evaluate Yet</h3>
        <p className="text-xs text-slate-500 mt-1">
          When participants submit their projects, they will appear here for rubric evaluation.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Submissions Queue */}
      <div className="lg:col-span-4 space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-dark-400">
            Judging Queue ({hackathonSubmissions.length})
          </span>
          <span className="text-[11px] font-semibold text-primary">
            Official Rubric
          </span>
        </div>

        <div className="space-y-2">
          {hackathonSubmissions.map((sub) => {
            const isSelected = selectedSub?.id === sub.id;
            const scored = judgeScores.some(
              (s) => s.judgeId === currentUser.id && s.submissionId === sub.id
            );

            return (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubId(sub.id);
                  setSavedSuccess(false);
                }}
                className={`w-full text-left rounded-xl p-3.5 border transition-all ${
                  isSelected
                    ? "border-primary/60 bg-primary/10 text-white shadow-md"
                    : "border-dark-750 bg-dark-900/60 text-dark-300 hover:border-dark-700 hover:bg-dark-900"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-xs truncate text-white">{sub.title}</span>
                  {scored && (
                    <span className="flex items-center gap-1 rounded bg-secondary/20 px-1.5 py-0.5 text-[10px] font-bold text-secondary shrink-0">
                      <CheckCircle2 className="h-3 w-3" /> Scored
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-dark-300 line-clamp-1 mb-2">
                  {sub.tagline}
                </div>
                <div className="flex items-center justify-between text-[10px] text-dark-400">
                  <span className="text-primary font-medium">{sub.track}</span>
                  {sub.averageScore && (
                    <span className="text-primary font-bold font-mono">
                      Avg: {sub.averageScore} / 10
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Scoring Form & Project Brief */}
      <div className="lg:col-span-8 space-y-6">
        {selectedSub && (
          <div className="glass-card rounded-2xl border-dark-800/80 p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-sm">
            {/* Project Header */}
            <div className="border-b border-dark-800 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="rounded-lg bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {selectedSub.track}
                </span>
                <div className="flex items-center gap-2">
                  {selectedSub.repoUrl && (
                    <a
                      href={selectedSub.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-slate-300 hover:text-white"
                    >
                      <Github className="h-3.5 w-3.5" /> Repo
                    </a>
                  )}
                  {selectedSub.demoVideoUrl && (
                    <a
                      href={selectedSub.demoVideoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-950/20 px-2.5 py-1 text-xs text-cyan-400"
                    >
                      <Video className="h-3.5 w-3.5" /> Demo Video
                    </a>
                  )}
                  {selectedSub.liveDemoUrl && (
                    <a
                      href={selectedSub.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-950/20 px-2.5 py-1 text-xs text-emerald-400"
                    >
                      <Globe className="h-3.5 w-3.5" /> Live URL
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-2xl font-black text-white">{selectedSub.title}</h3>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                {selectedSub.tagline}
              </p>
            </div>

            {/* Rubric Criteria Sliders */}
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <Sliders className="h-4 w-4" /> Weighted Rubric Evaluation
                </span>
                <div className="rounded-xl border border-primary/40 bg-primary/10 px-3 py-1 text-primary text-xs font-bold font-tabular">
                  Calculated Score: {calculateTotalWeighted()} / 10
                </div>
              </div>

              <div className="space-y-4 rounded-xl border border-dark-750 bg-dark-950/60 p-5">
                {hackathon.judgingCriteria.map((crit) => {
                  const currentVal = scores[crit.id] ?? 8;
                  return (
                    <div key={crit.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-200">
                          {crit.name}{" "}
                          <span className="text-slate-500 font-normal">({crit.weight}%)</span>
                        </span>
                        <span className="font-mono font-bold text-primary font-tabular">
                          {currentVal} / {crit.maxScore}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{crit.description}</p>
                      <input
                        type="range"
                        min="1"
                        max={crit.maxScore}
                        step="1"
                        value={currentVal}
                        onChange={(e) => handleScoreChange(crit.id, parseInt(e.target.value))}
                        className="w-full accent-primary cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Feedback & Private Notes */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Constructive Feedback (Visible to Hackers)
                </label>
                <textarea
                  rows={3}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="What was great? Where could the architecture or demo be improved?"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Private Deliberation Notes (Judges & Organizers Only)
                </label>
                <input
                  type="text"
                  value={privateNotes}
                  onChange={(e) => setPrivateNotes(e.target.value)}
                  placeholder="Candidate for Grand Champion / Best Agent track..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Save Score Action */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-4">
              {savedSuccess ? (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" /> Score recorded and synced to Leaderboard!
                </span>
              ) : (
                <div />
              )}

              <button
                onClick={handleSaveScore}
                className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-dark-950 transition-all hover:bg-amber-400 active:scale-95 shadow-md"
              >
                <Star className="h-4 w-4 fill-dark-950" />
                <span>Save Rubric Score</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
