"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
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
  LogIn,
} from "lucide-react";
import { EmailLogsModal } from "../organizer/EmailLogsModal";
import { UserProfileModal } from "../profile/UserProfileModal";

export function Navbar() {
  const pathname = usePathname();
  const { user: clerkUser } = useUser();
  const { userRole, setUserRole, currentUser, emailLogs } = useHackersDorm();
  const [showEmailLogs, setShowEmailLogs] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Explore Hackathons", href: "/hackathons", icon: Compass },
    { name: "Host Event", href: "/create", icon: PlusCircle },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-dark-700/80 bg-dark-950/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link href="/" className="group flex items-center gap-2.5 sm:gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-700 via-primary to-amber-300 shadow-md transition-transform group-hover:scale-105 border border-primary/40 shrink-0">
                <Code2 className="h-5 w-5 text-dark-950 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white font-heading leading-tight">
                  Hackers<span className="text-primary">Dorm</span>
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-dark-300">
                  NRS Innovation Platform
                </span>
              </div>
            </Link>

            {/* Desktop Nav links */}
            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-dark-800 text-primary border border-dark-700 shadow-sm"
                        : "text-dark-200 hover:bg-dark-850 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Controls: Persona Role Switcher & Clerk Auth & Logs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Role Persona Switcher (Desktop) */}
            <div className="hidden sm:flex items-center rounded-xl border border-dark-700 bg-dark-900/90 p-1 shadow-inner">
              <span className="hidden px-2 text-[10px] font-semibold uppercase tracking-wider text-dark-400 xl:inline-block">
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
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                      userRole === role.id
                        ? "bg-primary text-dark-950 font-bold shadow-sm"
                        : "text-dark-400 hover:text-dark-200"
                    }`}
                  >
                    <span className="mr-1">{role.icon}</span>
                    <span>{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Email Notifications Outbox Trigger */}
            <button
              onClick={() => setShowEmailLogs(true)}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-dark-700 bg-dark-900 text-dark-300 transition-colors hover:border-primary/50 hover:text-white shrink-0"
              title="System Outbox & Email Logs"
            >
              <Mail className="h-4 w-4" />
              {emailLogs.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-dark-950">
                  {emailLogs.length}
                </span>
              )}
            </button>

            {/* Clerk Authentication Controls */}
            <Show when="signed-in">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="hidden md:flex items-center gap-2 rounded-xl border border-dark-700 bg-dark-900/80 px-2.5 py-1.5 transition-colors hover:border-primary/50 hover:bg-dark-850 text-left"
                >
                  <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-amber-600 to-primary p-[1px] border border-primary/30 shrink-0">
                    <img
                      src={currentUser.avatarUrl || clerkUser?.imageUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
                      alt={currentUser.name}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white truncate max-w-[110px] leading-none">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] text-primary capitalize mt-0.5 font-medium leading-none">
                      {userRole}
                    </div>
                  </div>
                </button>
                <div className="flex items-center p-0.5 rounded-full border border-dark-700 bg-dark-900">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "h-7 w-7",
                      },
                    }}
                  />
                </div>
              </div>
            </Show>

            <Show when="signed-out">
              <div className="flex items-center gap-2">
                <SignInButton mode="modal">
                  <button className="flex items-center gap-1.5 rounded-xl border border-dark-700 bg-dark-900 px-3.5 py-2 text-xs font-semibold text-dark-200 hover:border-primary/40 hover:text-white transition-all">
                    <LogIn className="h-3.5 w-3.5 text-primary" />
                    <span>Sign In</span>
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="hidden sm:flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-bold text-dark-950 hover:bg-amber-400 transition-all shadow-md">
                    <span>Register</span>
                  </button>
                </SignUpButton>
              </div>
            </Show>

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-dark-700 bg-dark-900 p-2 text-dark-300 hover:bg-dark-800 hover:text-white md:hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown & Persona Menu */}
        {mobileMenuOpen && (
          <div className="border-b border-dark-700 bg-dark-950/98 px-4 py-4 md:hidden space-y-4 animate-in slide-in-from-top-2 duration-200">
            {/* Nav links */}
            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-dark-800 text-primary border border-dark-700"
                        : "text-dark-200 hover:bg-dark-900 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Role Switcher */}
            <div className="rounded-xl border border-dark-800 bg-dark-900/60 p-3">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-dark-400 mb-2">
                Active View Persona:
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {(
                  [
                    { id: "participant", label: "Hacker", icon: "👨‍💻" },
                    { id: "organizer", label: "Host", icon: "👑" },
                    { id: "judge", label: "Judge", icon: "⚖️" },
                  ] as const
                ).map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      setUserRole(role.id as any);
                    }}
                    className={`rounded-lg py-1.5 text-xs font-semibold text-center transition-all ${
                      userRole === role.id
                        ? "bg-primary text-dark-950 font-bold shadow-sm"
                        : "bg-dark-950 text-dark-400 hover:text-white border border-dark-800"
                    }`}
                  >
                    <span className="mr-1">{role.icon}</span>
                    <span>{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Profile or Sign-in button */}
            <div className="pt-2 border-t border-dark-800 flex items-center justify-between">
              <Show when="signed-in">
                <button
                  onClick={() => {
                    setShowProfileModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2.5 py-1 text-left"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-600 to-primary p-[1px] border border-primary/30 shrink-0">
                    <img
                      src={currentUser.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
                      alt={currentUser.name}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{currentUser.name}</div>
                    <div className="text-[10px] text-dark-400">View Staff Profile</div>
                  </div>
                </button>
              </Show>

              <Show when="signed-out">
                <div className="flex items-center gap-2 w-full">
                  <SignInButton mode="modal">
                    <button className="flex-1 rounded-xl border border-dark-700 bg-dark-900 py-2.5 text-center text-xs font-semibold text-white">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="flex-1 rounded-xl bg-primary py-2.5 text-center text-xs font-bold text-dark-950">
                      Register Staff Account
                    </button>
                  </SignUpButton>
                </div>
              </Show>
            </div>
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
