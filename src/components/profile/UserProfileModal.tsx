"use client";

import React, { useState } from "react";
import { useHackersDorm } from "@/context/HackersDormContext";
import {
  X,
  User,
  Mail,
  Github,
  Globe,
  Award,
  Code2,
  Check,
  Save,
  Trophy,
  Layers,
  Sparkles,
} from "lucide-react";

export function UserProfileModal({ onClose }: { onClose: () => void }) {
  const { currentUser, setCurrentUser, submissions, hackathons } = useHackersDorm();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [bio, setBio] = useState(currentUser.bio || "Fullstack hacker and AI systems builder");
  const [githubUrl, setGithubUrl] = useState(currentUser.githubUrl || "https://github.com");
  const [skills, setSkills] = useState<string[]>(
    currentUser.skills || ["Next.js", "TypeScript", "Python", "Convex", "Tailwind CSS"]
  );
  const [skillInput, setSkillInput] = useState("");
  const [activeTab, setActiveTab] = useState<"profile" | "submissions" | "hackathons">("profile");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // User's submissions
  const userSubmissions = submissions.filter((s) => s.userId === currentUser.id);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({
      ...currentUser,
      name,
      email,
      bio,
      githubUrl,
      skills,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="relative flex max-h-[85vh] w-full max-w-2xl flex-col rounded-2xl border border-dark-800 bg-dark-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-dark-800 bg-dark-950 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary to-amber-600 p-[1.5px]">
              <img
                src={currentUser.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
                alt={currentUser.name}
                className="h-full w-full rounded-xl object-cover"
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">{name}</h3>
              <p className="text-xs text-dark-300">{email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-dark-400 hover:bg-dark-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-dark-800 bg-dark-950/60 px-6 pt-2">
          {[
            { id: "profile", label: "Profile Settings", icon: User },
            { id: "submissions", label: `My Projects (${userSubmissions.length})`, icon: Code2 },
            { id: "hackathons", label: "Registered Events", icon: Trophy },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 border-b-2 px-3 py-2.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-dark-400 hover:text-dark-200"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "profile" && (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-dark-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-dark-800 bg-dark-950 px-3.5 py-2.5 text-xs text-white focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-dark-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-dark-800 bg-dark-950 px-3.5 py-2.5 text-xs text-white focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-dark-300 mb-1">
                  Bio / Headline
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full rounded-xl border border-dark-800 bg-dark-950 p-3 text-xs text-white focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-dark-300 mb-1">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full rounded-xl border border-dark-800 bg-dark-950 px-3.5 py-2.5 text-xs text-white focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-dark-300 mb-1">
                  Technical Skills & Domains
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs text-amber-200 flex items-center gap-1.5"
                    >
                      {s}
                      <button
                        type="button"
                        onClick={() => removeSkill(s)}
                        className="text-primary hover:text-white"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                    placeholder="Add skill (e.g. PyTorch, Rust, Solidity)..."
                    className="flex-1 rounded-xl border border-dark-800 bg-dark-950 px-3 py-1.5 text-xs text-white placeholder-dark-500 focus:border-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="rounded-xl bg-dark-800 border border-dark-700 px-3.5 py-1.5 text-xs font-semibold text-dark-200 hover:text-white transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-dark-800">
                {savedSuccess ? (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <Check className="h-4 w-4" /> Profile changes saved!
                  </span>
                ) : (
                  <div />
                )}

                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2 text-xs font-bold text-dark-950 hover:bg-amber-400 transition-colors shadow-sm"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === "submissions" && (
            <div className="space-y-3">
              {userSubmissions.length === 0 ? (
                <div className="p-8 text-center text-dark-400 text-xs">
                  You haven&apos;t submitted any projects yet.
                </div>
              ) : (
                userSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="rounded-xl border border-dark-800 bg-dark-950/60 p-4"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-white tracking-tight">{sub.title}</h4>
                      <span className="rounded bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary">
                        {sub.track}
                      </span>
                    </div>
                    <p className="text-xs text-dark-300 line-clamp-1 mb-3">{sub.tagline}</p>
                    <div className="flex items-center justify-between text-xs text-dark-400 font-mono">
                      <span>Submitted on {new Date(sub.submittedAt).toLocaleDateString()}</span>
                      {sub.prizeAwarded ? (
                        <span className="text-primary font-bold">🏆 {sub.prizeAwarded}</span>
                      ) : (
                        <span className="text-secondary">Under Review</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "hackathons" && (
            <div className="space-y-3">
              {hackathons.slice(0, 2).map((h) => (
                <div
                  key={h.id}
                  className="flex items-center justify-between rounded-xl border border-dark-800 bg-dark-950/60 p-4"
                >
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-tight">{h.title}</h4>
                    <p className="text-xs text-dark-300">{h.totalPrizePool} Prize Pool &bull; {h.format}</p>
                  </div>
                  <span className="rounded-full bg-secondary/10 border border-secondary/20 px-3 py-1 text-xs font-semibold text-secondary">
                    Confirmed Hacker
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
