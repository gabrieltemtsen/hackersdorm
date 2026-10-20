"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useHackersDorm } from "@/context/HackersDormContext";
import {
  Code2,
  Trophy,
  Sparkles,
  PlusCircle,
  Mail,
  User,
  Shield,
  Layers,
  Menu,
  X,
  Compass,
} from "lucide-react";
import { EmailLogsModal } from "../organizer/EmailLogsModal";
import { UserProfileModal } from "../profile/UserProfileModal";

export function Navbar() {
  const pathname = usePathname();
  const { userRole, setUserRole, currentUser, emailLogs } = useHackersDorm();
  const [showEmailLogs, setShowEmailLogs] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Explore", href: "/hackathons", icon: Compass },
    { name: "Host Event", href: "/create", icon: PlusCircle },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-dark-950/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-primary to-accent shadow-md transition-transform group-hover:scale-105">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white">
                  Hackers<span className="text-indigo-400">Dorm</span>
                </span>
                <span className="hidden text-[10px] uppercase font-bold tracking-widest text-slate-400 sm:block">
                  Global Hackathon Platform
                </span>
              </div>
            </Link>

            {/* Nav links */}
            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-slate-800 text-indigo-400"
                        : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Controls: Role Switcher & Email Logs & User Profile */}
          <div className="flex items-center gap-3">
            {/* Live Role Persona Switcher */}
            <div className="flex items-center rounded-lg border border-slate-700/60 bg-slate-900/90 p-1 shadow-inner">
              <span className="hidden px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 lg:inline-block">
                Role:
              </span>
              <div className="flex items-center gap-1">
                {(
                  [
                    { id: "participant", label: "Participant", icon: "👨‍💻" },
                    { id: "organizer", label: "Organizer", icon: "👑" },
                    { id: "judge", label: "Judge", icon: "⚖️" },
                  ] as const
                ).map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setUserRole(role.id as any)}
                    className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-all ${
                      userRole === role.id
                        ? role.id === "participant"
                          ? "bg-indigo-600 text-white shadow-sm"
                          : role.id === "organizer"
                          ? "bg-purple-600 text-white shadow-sm"
                          : "bg-amber-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span className="mr-1">{role.icon}</span>
                    <span className="hidden sm:inline">{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Email Notifications Outbox Trigger */}
            <button
              onClick={() => setShowEmailLogs(true)}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 transition-colors hover:border-slate-700 hover:text-white"
              title="System Outbox & Email Logs"
            >
              <Mail className="h-4 w-4" />
              {emailLogs.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-500 px-1 text-[10px] font-bold text-white">
                  {emailLogs.length}
                </span>
              )}
            </button>

            {/* User Profile Button */}
            <button
              onClick={() => setShowProfileModal(true)}
              className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 transition-colors hover:border-slate-700 hover:bg-slate-800 text-left"
            >
              <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 p-[1px]">
                <img
                  src={currentUser.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
                  alt={currentUser.name}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-semibold text-slate-200 leading-none">{currentUser.name}</div>
                <div className="text-[10px] text-slate-400 capitalize mt-0.5">{userRole}</div>
              </div>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-b border-slate-800 bg-slate-950 px-4 py-3 md:hidden space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-white"
              >
                <link.icon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Outbox Modal */}
      {showEmailLogs && <EmailLogsModal onClose={() => setShowEmailLogs(false)} />}

      {/* User Profile Modal */}
      {showProfileModal && <UserProfileModal onClose={() => setShowProfileModal(false)} />}
    </>
  );
}
