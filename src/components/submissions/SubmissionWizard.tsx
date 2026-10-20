"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Hackathon, TeamMember } from "@/types";
import { useHackersDorm } from "@/context/HackersDormContext";
import confetti from "canvas-confetti";
import {
  Rocket,
  Code2,
  Video,
  Github,
  Globe,
  FileText,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Send,
} from "lucide-react";

interface SubmissionWizardProps {
  hackathon: Hackathon;
}

const COMMON_TAGS = [
  "Next.js",
  "Convex",
  "Resend",
  "TypeScript",
  "Tailwind CSS",
  "Python",
  "Gemini API",
  "PyTorch",
  "Docker",
  "Solidity",
  "Rust",
  "WebRTC",
];

export function SubmissionWizard({ hackathon }: SubmissionWizardProps) {
  const router = useRouter();
  const { currentUser, submitProject } = useHackersDorm();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [track, setTrack] = useState(hackathon.tracks[0] || "General");
  const [logoUrl, setLogoUrl] = useState("");
  const [description, setDescription] = useState(
    `### Inspiration\nWhat inspired you to build this?\n\n### What it does\nCore features and walkthrough.\n\n### How we built it\nArchitecture, Convex schemas, frontend setup.\n\n### Challenges we ran into\nTechnical roadblocks overcome.`
  );
  const [builtWith, setBuiltWith] = useState<string[]>(["Next.js", "Convex", "Resend", "TypeScript"]);
  const [newTagInput, setNewTagInput] = useState("");

  const [repoUrl, setRepoUrl] = useState("");
  const [liveDemoUrl, setLiveDemoUrl] = useState("");
  const [demoVideoUrl, setDemoVideoUrl] = useState("");
  const [pitchDeckUrl, setPitchDeckUrl] = useState("");

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      userId: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      role: "Lead Creator",
      avatarUrl: currentUser.avatarUrl,
      isLeader: true,
    },
  ]);

  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("Developer");

  // Tag helper
  const toggleTag = (tag: string) => {
    if (builtWith.includes(tag)) {
      setBuiltWith(builtWith.filter((t) => t !== tag));
    } else {
      setBuiltWith([...builtWith, tag]);
    }
  };

  const addCustomTag = () => {
    if (newTagInput.trim() && !builtWith.includes(newTagInput.trim())) {
      setBuiltWith([...builtWith, newTagInput.trim()]);
      setNewTagInput("");
    }
  };

  // Team helper
  const addTeamMember = () => {
    if (newMemberName.trim() && newMemberEmail.trim()) {
      setTeamMembers([
        ...teamMembers,
        {
          userId: `user-${Date.now()}`,
          name: newMemberName.trim(),
          email: newMemberEmail.trim(),
          role: newMemberRole,
          isLeader: false,
        },
      ]);
      setNewMemberName("");
      setNewMemberEmail("");
    }
  };

  const removeTeamMember = (email: string) => {
    if (teamMembers.length <= 1) return; // Keep leader
    setTeamMembers(teamMembers.filter((m) => m.email !== email));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitProject({
        hackathonId: hackathon.id,
        userId: currentUser.id,
        title,
        tagline,
        description,
        track,
        builtWith,
        logoUrl: logoUrl.trim() || undefined,
        repoUrl: repoUrl.trim() || undefined,
        liveDemoUrl: liveDemoUrl.trim() || undefined,
        demoVideoUrl: demoVideoUrl.trim() || undefined,
        pitchDeckUrl: pitchDeckUrl.trim() || undefined,
        teamMembers,
        status: "submitted",
      });

      // Confetti burst
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });

      setIsSubmitted(true);
    } catch (e) {
      console.error("Submission failed:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 via-slate-900 to-dark-950 p-8 text-center shadow-2xl backdrop-blur-md">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
          Submission Recorded &bull; Ready for Judging
        </span>
        <h2 className="mt-3 text-3xl font-black text-white">Congratulations!</h2>
        <p className="mt-2 text-sm text-slate-300">
          Your project <span className="font-semibold text-white">&ldquo;{title}&rdquo;</span> has been successfully submitted to{" "}
          <span className="text-primary font-bold">{hackathon.title}</span>!
        </p>

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-left text-xs space-y-2">
          <div className="flex justify-between text-slate-400">
            <span>Track:</span>
            <span className="font-semibold text-slate-200">{track}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Submitted By:</span>
            <span className="font-semibold text-slate-200">{currentUser.name}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Receipt Confirmation:</span>
            <span className="font-semibold text-emerald-400">Delivered to {currentUser.email}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.push(`/hackathons/${hackathon.slug}/projects`)}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-dark-950 transition-colors hover:bg-amber-400"
          >
            <Sparkles className="h-4 w-4" />
            <span>View in Project Gallery</span>
          </button>
          <button
            onClick={() => router.push(`/hackathons/${hackathon.slug}`)}
            className="flex items-center justify-center gap-2 rounded-xl border border-dark-750 bg-dark-900 px-6 py-3 text-sm font-semibold text-slate-300 transition-colors hover:text-white"
          >
            Back to Hackathon Overview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress Steps Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: "Basics" },
            { num: 2, label: "Story & Tech" },
            { num: 3, label: "Links & Video" },
            { num: 4, label: "Review & Submit" },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold transition-all ${
                  currentStep === s.num
                    ? "bg-primary text-dark-950 shadow-md shadow-primary/30"
                    : currentStep > s.num
                    ? "bg-emerald-950/40 text-emerald-300 border border-emerald-500/40"
                    : "border border-dark-750 bg-dark-900 text-slate-500"
                }`}
              >
                {currentStep > s.num ? <CheckCircle2 className="h-4 w-4" /> : s.num}
              </div>
              <span
                className={`hidden text-xs font-medium sm:inline ${
                  currentStep === s.num ? "text-primary font-bold" : "text-slate-400"
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 h-1 w-full rounded-full bg-dark-800">
          <div
            className="h-1 rounded-full bg-primary transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Form Box */}
      <div className="glass-card rounded-2xl border-dark-750 p-6 sm:p-8">
        {/* Step 1: Basics */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h3 className="text-xl font-bold text-white">Project Identity</h3>
              <p className="text-xs text-slate-400 mt-1">
                Give your hackathon project a striking name, tagline, and select your target track.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                Project Name *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. OmniFlow Agent"
                className="w-full rounded-xl border border-dark-800 bg-dark-950 px-4 py-3 text-sm text-white placeholder-dark-500 focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-dark-300 mb-1.5">
                Tagline / Elevator Pitch *
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="One sentence explaining what your project accomplishes"
                className="w-full rounded-xl border border-dark-800 bg-dark-950 px-4 py-3 text-sm text-white placeholder-dark-500 focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-dark-300 mb-1.5">
                Target Prize Track *
              </label>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="w-full rounded-xl border border-dark-800 bg-dark-950 px-4 py-3 text-sm text-dark-200 focus:border-primary focus:outline-none"
              >
                {hackathon.tracks.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-dark-300 mb-1.5">
                Project Logo / Thumbnail URL (Optional)
              </label>
              <input
                type="url"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="https://example.com/logo.png"
                className="w-full rounded-xl border border-dark-800 bg-dark-950 px-4 py-3 text-sm text-white placeholder-dark-500 focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Step 2: Story & Tech Stack */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h3 className="text-xl font-bold text-white">Project Story & Architecture</h3>
              <p className="text-xs text-slate-400 mt-1">
                Share the motivation, technical stack, challenges, and solutions that the judges will review.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                Built With (Tech Stack)
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {COMMON_TAGS.map((tag) => {
                  const isSelected = builtWith.includes(tag);
                  return (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-primary text-dark-950 font-bold"
                          : "border border-dark-750 bg-dark-900 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {isSelected ? "✓ " : "+ "}
                      {tag}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomTag())}
                  placeholder="Add custom library / framework..."
                  className="flex-1 rounded-xl border border-dark-800 bg-dark-950 px-3 py-2 text-xs text-white placeholder-dark-500 focus:border-primary focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addCustomTag}
                  className="rounded-xl border border-dark-700 bg-dark-800 px-3 py-2 text-xs font-semibold text-dark-200 hover:bg-dark-700 hover:text-white transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-dark-300 mb-1.5">
                Project Narrative & Description (Markdown Supported) *
              </label>
              <textarea
                rows={9}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-dark-800 bg-dark-950 p-4 font-mono text-xs text-white placeholder-dark-500 focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Step 3: Links & Media */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Media, Demos & Code</h3>
              <p className="text-xs text-dark-300 mt-1">
                Provide proof of work for the judging panel. Video walkthroughs and code repositories are essential.
              </p>
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase text-dark-300 mb-1.5">
                <Github className="h-4 w-4 text-dark-400" />
                GitHub / GitLab Repository URL {hackathon.requireRepoUrl && <span className="text-primary">*</span>}
              </label>
              <input
                type="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/your-username/your-project"
                className="w-full rounded-xl border border-dark-800 bg-dark-950 px-4 py-3 text-sm text-white placeholder-dark-500 focus:border-primary focus:outline-none font-mono text-xs"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase text-dark-300 mb-1.5">
                <Video className="h-4 w-4 text-primary" />
                Demo Video Link (Loom, YouTube, Vimeo) {hackathon.requireDemoVideo && <span className="text-primary">*</span>}
              </label>
              <input
                type="url"
                value={demoVideoUrl}
                onChange={(e) => setDemoVideoUrl(e.target.value)}
                placeholder="https://www.loom.com/share/..."
                className="w-full rounded-xl border border-dark-800 bg-dark-950 px-4 py-3 text-sm text-white placeholder-dark-500 focus:border-primary focus:outline-none font-mono text-xs"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase text-dark-300 mb-1.5">
                <Globe className="h-4 w-4 text-secondary" />
                Live Demo / Deployment URL
              </label>
              <input
                type="url"
                value={liveDemoUrl}
                onChange={(e) => setLiveDemoUrl(e.target.value)}
                placeholder="https://myproject.vercel.app"
                className="w-full rounded-xl border border-dark-800 bg-dark-950 px-4 py-3 text-sm text-white placeholder-dark-500 focus:border-primary focus:outline-none font-mono text-xs"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase text-dark-300 mb-1.5">
                <FileText className="h-4 w-4 text-amber-400" />
                Pitch Deck URL (Figma, Pitch, Google Slides)
              </label>
              <input
                type="url"
                value={pitchDeckUrl}
                onChange={(e) => setPitchDeckUrl(e.target.value)}
                placeholder="https://pitch.com/..."
                className="w-full rounded-xl border border-dark-800 bg-dark-950 px-4 py-3 text-sm text-white placeholder-dark-500 focus:border-primary focus:outline-none font-mono text-xs"
              />
            </div>
          </div>
        )}

        {/* Step 4: Review & Contributors */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Contributors & Readiness Checklist</h3>
              <p className="text-xs text-dark-300 mt-1">
                Confirm your squad members and verify submission requirements before submitting.
              </p>
            </div>

            {/* Team Members List */}
            <div className="rounded-xl border border-dark-800 bg-dark-950/60 p-4">
              <span className="block text-xs font-semibold uppercase text-dark-300 mb-2">
                Credited Squad Members ({teamMembers.length})
              </span>
              <div className="space-y-2 mb-4">
                {teamMembers.map((m) => (
                  <div
                    key={m.email}
                    className="flex items-center justify-between rounded-lg border border-dark-800 bg-dark-900/60 p-2.5 text-xs"
                  >
                    <div>
                      <span className="font-semibold text-white">{m.name}</span>
                      <span className="text-dark-300 ml-2">({m.role})</span>
                      <span className="text-dark-400 ml-2">&bull; {m.email}</span>
                    </div>
                    {m.isLeader ? (
                      <span className="rounded bg-primary/20 border border-primary/30 px-2 py-0.5 text-[10px] font-bold text-primary">
                        Lead Submitter
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => removeTeamMember(m.email)}
                        className="text-rose-400 hover:text-rose-300"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add member inline */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
                <input
                  type="text"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Teammate name"
                  className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
                <input
                  type="email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  placeholder="teammate@example.com"
                  className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addTeamMember}
                  className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                >
                  + Add Member
                </button>
              </div>
            </div>

            {/* Checklist items */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-xs">
                {title ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                )}
                <span className={title ? "text-slate-200" : "text-amber-400 font-semibold"}>
                  {title ? `Project Title: "${title}"` : "Missing Project Title (Required)"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                {repoUrl ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : hackathon.requireRepoUrl ? (
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-slate-500" />
                )}
                <span className={repoUrl ? "text-slate-200" : "text-slate-400"}>
                  {repoUrl ? `Repository linked: ${repoUrl}` : "GitHub repository link"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                {demoVideoUrl ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : hackathon.requireDemoVideo ? (
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-slate-500" />
                )}
                <span className={demoVideoUrl ? "text-slate-200" : "text-slate-400"}>
                  {demoVideoUrl ? `Video walkthrough: ${demoVideoUrl}` : "Demo video link"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Step Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-800 pt-6">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous Step
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              disabled={currentStep === 1 && (!title.trim() || !tagline.trim())}
              onClick={() => setCurrentStep(currentStep + 1)}
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-dark-950 transition-colors hover:bg-amber-400 disabled:opacity-40"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting || !title.trim()}
              onClick={handleSubmit}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary via-amber-500 to-amber-400 px-7 py-3 text-xs font-black uppercase tracking-wider text-dark-950 shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40"
            >
              {isSubmitting ? (
                <span>Recording Submission...</span>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Submit Project Now</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
