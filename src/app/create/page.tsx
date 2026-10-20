"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useHackersDorm } from "@/context/HackersDormContext";
import {
  Rocket,
  PlusCircle,
  Trash2,
  Calendar,
  Trophy,
  Sliders,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export default function CreateHackathonPage() {
  const router = useRouter();
  const { createHackathon, currentUser } = useHackersDorm();

  const [step, setStep] = useState(1);
  const [isPublishing, setIsPublishing] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState(
    "A premier 48-hour global sprint challenging developers to build groundbreaking applications."
  );
  const [bannerUrl, setBannerUrl] = useState(
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80"
  );
  const [organizerName, setOrganizerName] = useState(currentUser.name);
  const [organizerEmail, setOrganizerEmail] = useState(currentUser.email);
  const [format, setFormat] = useState<"online" | "in-person" | "hybrid">("online");
  const [totalPrizePool, setTotalPrizePool] = useState("$25,000");

  const [startDate, setStartDate] = useState("2026-11-15T09:00:00Z");
  const [endDate, setEndDate] = useState("2026-11-17T18:00:00Z");
  const [submissionDeadline, setSubmissionDeadline] = useState("2026-11-17T16:00:00Z");

  const [tracks, setTracks] = useState<string[]>([
    "AI & Autonomous Agents",
    "Developer Infrastructure",
    "Open Innovation",
  ]);
  const [trackInput, setTrackInput] = useState("");

  const [prizes, setPrizes] = useState([
    {
      id: "p1",
      name: "Grand Champion",
      amount: "$15,000",
      description: "Overall top project with highest technical execution and novelty.",
    },
    {
      id: "p2",
      name: "Best Technical Depth",
      amount: "$6,000",
      description: "Exceptional architecture, testing, and backend resilience.",
    },
    {
      id: "p3",
      name: "Community Choice",
      amount: "$4,000",
      description: "Voted top project by the participating hackers.",
    },
  ]);

  const [newPrizeName, setNewPrizeName] = useState("");
  const [newPrizeAmount, setNewPrizeAmount] = useState("");
  const [newPrizeDesc, setNewPrizeDesc] = useState("");

  const [judgingCriteria, setJudgingCriteria] = useState([
    { id: "c1", name: "Innovation & Originality", weight: 30, maxScore: 10, description: "Uniqueness of approach" },
    { id: "c2", name: "Technical Execution", weight: 35, maxScore: 10, description: "Code quality and architecture" },
    { id: "c3", name: "UI / UX Polish", weight: 20, maxScore: 10, description: "Usability and aesthetic flow" },
    { id: "c4", name: "Real-World Viability", weight: 15, maxScore: 10, description: "Market potential and practicality" },
  ]);

  const [requireRepoUrl, setRequireRepoUrl] = useState(true);
  const [requireDemoVideo, setRequireDemoVideo] = useState(true);
  const [minTeamSize, setMinTeamSize] = useState(1);
  const [maxTeamSize, setMaxTeamSize] = useState(4);

  const addTrack = () => {
    if (trackInput.trim() && !tracks.includes(trackInput.trim())) {
      setTracks([...tracks, trackInput.trim()]);
      setTrackInput("");
    }
  };

  const removeTrack = (trackToRemove: string) => {
    setTracks(tracks.filter((t) => t !== trackToRemove));
  };

  const addPrize = () => {
    if (newPrizeName.trim() && newPrizeAmount.trim()) {
      setPrizes([
        ...prizes,
        {
          id: `p-${Date.now()}`,
          name: newPrizeName.trim(),
          amount: newPrizeAmount.trim(),
          description: newPrizeDesc.trim() || "Track Bounty",
        },
      ]);
      setNewPrizeName("");
      setNewPrizeAmount("");
      setNewPrizeDesc("");
    }
  };

  const removePrize = (id: string) => {
    setPrizes(prizes.filter((p) => p.id !== id));
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const newHackathon = createHackathon({
      slug,
      title: title.trim(),
      tagline: tagline.trim(),
      description: description.trim(),
      bannerUrl: bannerUrl.trim(),
      organizerName: organizerName.trim(),
      organizerEmail: organizerEmail.trim(),
      format,
      status: "registering",
      totalPrizePool: totalPrizePool.trim(),
      startDate,
      endDate,
      registrationDeadline: startDate,
      submissionDeadline,
      tracks,
      prizes,
      judgingCriteria,
      schedule: [
        { id: "s1", title: "Registration Opens", timestamp: "Immediate", type: "ceremony" },
        { id: "s2", title: "Hacking Starts", timestamp: startDate, type: "ceremony" },
        { id: "s3", title: "Submission Deadline", timestamp: submissionDeadline, type: "deadline" },
        { id: "s4", title: "Demo Day & Awards", timestamp: endDate, type: "ceremony" },
      ],
      rules: [
        "All code must be written during the competition timeframe.",
        "Open source libraries and APIs are warmly permitted.",
        "Submissions must include repository link and demo video.",
      ],
      faq: [
        {
          question: "Who can participate?",
          answer: "Open to developers, designers, and innovators worldwide.",
        },
      ],
      minTeamSize,
      maxTeamSize,
      requireRepoUrl,
      requireDemoVideo,
    });

    setIsPublishing(false);
    router.push(`/hackathons/${newHackathon.slug}`);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-inner">
            <Rocket className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">Host a Hackathon</h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Configure your event details, prize bounties, custom tracks, and weighted scoring rubric.
            </p>
          </div>
        </div>
      </div>

      {/* Steps Pill */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        {[
          { num: 1, label: "Basics & Logistics" },
          { num: 2, label: "Tracks & Prizes" },
          { num: 3, label: "Rubric & Rules" },
        ].map((s) => (
          <button
            key={s.num}
            onClick={() => setStep(s.num)}
            className={`flex items-center gap-2 text-xs font-bold transition-all ${
              step === s.num ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-black ${
                step === s.num
                  ? "bg-indigo-600 text-white"
                  : "border border-slate-800 bg-slate-900"
              }`}
            >
              {s.num}
            </span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Form Container */}
      <div className="glass-card rounded-2xl border-slate-800 p-6 sm:p-8 space-y-6">
        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in">
            <h3 className="text-lg font-bold text-white">Hackathon Basics & Details</h3>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Hackathon Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Autonomous Agents Global Sprint 2026"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Tagline *
              </label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Short punchy summary for the discovery directory"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Organizer Organization Name *
                </label>
                <input
                  type="text"
                  required
                  value={organizerName}
                  onChange={(e) => setOrganizerName(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Organizer Contact Email *
                </label>
                <input
                  type="email"
                  required
                  value={organizerEmail}
                  onChange={(e) => setOrganizerEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Event Format
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-slate-300 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="online">Online / Virtual Worldwide</option>
                  <option value="in-person">In-Person</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Total Prize Pool Display *
                </label>
                <input
                  type="text"
                  value={totalPrizePool}
                  onChange={(e) => setTotalPrizePool(e.target.value)}
                  placeholder="e.g. $50,000"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Banner Cover Image URL
              </label>
              <input
                type="url"
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Detailed Event Description (Markdown Supported)
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="text-lg font-bold text-white">Tracks & Prize Bounties</h3>

            {/* Tracks */}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                Competition Tracks ({tracks.length})
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {tracks.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300"
                  >
                    {t}
                    <button
                      type="button"
                      onClick={() => removeTrack(t)}
                      className="text-indigo-400 hover:text-white"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={trackInput}
                  onChange={(e) => setTrackInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTrack())}
                  placeholder="New track name (e.g. DeFi & Smart Contracts)..."
                  className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addTrack}
                  className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700"
                >
                  Add Track
                </button>
              </div>
            </div>

            {/* Prizes List */}
            <div className="border-t border-slate-800 pt-4">
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                Prize Tiers & Bounties ({prizes.length})
              </label>
              <div className="space-y-2 mb-4">
                {prizes.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{p.name}</span>
                        <span className="font-mono font-bold text-amber-400">{p.amount}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">{p.description}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removePrize(p.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add prize box */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3.5 space-y-2">
                <span className="block text-[11px] font-bold text-slate-300">Add Prize Tier</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newPrizeName}
                    onChange={(e) => setNewPrizeName(e.target.value)}
                    placeholder="Prize Title (e.g. Best Multimodal App)"
                    className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white placeholder-slate-500"
                  />
                  <input
                    type="text"
                    value={newPrizeAmount}
                    onChange={(e) => setNewPrizeAmount(e.target.value)}
                    placeholder="Bounty Amount (e.g. $5,000)"
                    className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white placeholder-slate-500"
                  />
                </div>
                <input
                  type="text"
                  value={newPrizeDesc}
                  onChange={(e) => setNewPrizeDesc(e.target.value)}
                  placeholder="Short criteria description..."
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white placeholder-slate-500"
                />
                <button
                  type="button"
                  onClick={addPrize}
                  className="rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500"
                >
                  + Add Prize Bounty
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <h3 className="text-lg font-bold text-white">Judging Rubric & Submission Requirements</h3>

            {/* Rubric Criteria */}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                Weighted Rubric Criteria
              </label>
              <div className="space-y-2 mb-4">
                {judgingCriteria.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs"
                  >
                    <div>
                      <span className="font-bold text-white">{c.name}</span>
                      <span className="text-slate-400 ml-2">({c.description})</span>
                    </div>
                    <span className="font-mono font-bold text-amber-400">
                      {c.weight}% Weight
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Submission Requirements Toggles */}
            <div className="border-t border-slate-800 pt-4 space-y-3">
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                Participant Submission Requirements
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={requireRepoUrl}
                  onChange={(e) => setRequireRepoUrl(e.target.checked)}
                  className="accent-indigo-500"
                />
                <span>Mandatory Public GitHub / GitLab repository URL</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={requireDemoVideo}
                  onChange={(e) => setRequireDemoVideo(e.target.checked)}
                  className="accent-indigo-500"
                />
                <span>Mandatory Video Demo (Loom, YouTube, Vimeo)</span>
              </label>
            </div>

            {/* Team Size */}
            <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Min Team Size
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={minTeamSize}
                  onChange={(e) => setMinTeamSize(parseInt(e.target.value))}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Max Team Size
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={maxTeamSize}
                  onChange={(e) => setMaxTeamSize(parseInt(e.target.value))}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Wizard Navigation */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Previous
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              disabled={step === 1 && (!title.trim() || !tagline.trim())}
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 disabled:opacity-40"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isPublishing || !title.trim()}
              onClick={handlePublish}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-primary to-accent px-7 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg hover:scale-105 active:scale-95 disabled:opacity-40"
            >
              <Sparkles className="h-4 w-4" />
              <span>{isPublishing ? "Publishing..." : "Launch & Publish Hackathon"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
