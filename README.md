# ⚡ HackersDorm — The Operating System for Modern Hackathons

HackersDorm is a high-performance, multipurpose hackathon hosting engine built with **Next.js 15 (App Router)**, **ConvexDB**, **Resend**, and **Tailwind CSS**.

It provides an enterprise-ready suite for organizing global developer competitions, coordinating squad matchmaking, managing frictionless multi-step project submissions, and executing multi-dimensional weighted rubric judging.

---

## 🌟 Key Functional Features

### 1. 🚀 Seamless Multi-Step Submission Flow
- **Guided 4-Step Submission Flow**:
  - **Step 1: Basics**: Project title, tagline, target track bounty selection, logo thumbnail.
  - **Step 2: Story & Tech Stack**: Inspiration narrative, architecture walkthrough, technical hurdles overcome, and interactive tech stack tags.
  - **Step 3: Proof of Work & Media**: Validated repository links (GitHub/GitLab), embedded video walkthroughs (YouTube/Loom), live production application links, and pitch deck.
  - **Step 4: Contributors & Review**: Squad attribution, checklist validation, and draft safeguard.
- **Instant Celebratory Confetti**: Instant canvas confetti explosion on submission success.
- **Automated Timestamped Receipts**: Participants receive instant proof-of-work receipts with project links and submission timestamps.

### 2. ⚡ Real-Time Synchronized Architecture
- Sub-second reactive updates for participant counts, submissions, leaderboards, and announcements without page refreshes.
- Production schemas defined in `convex/schema.ts` (`hackathons`, `submissions`, `teams`, `judgeScores`, `registrations`, `announcements`, `emailLogs`).
- Production-ready Convex queries, mutations, and actions in `convex/`.
- **Zero-Config Instant Reactive Fallback**: The platform operates with a reactive persistence data layer out of the box so you can test all features and workflows immediately, seamlessly connecting to Convex Cloud when `NEXT_PUBLIC_CONVEX_URL` is configured.

### 3. 📧 Transactional Email & Outbox Console
- Native integration with the Resend API (`/api/send-email` and `src/lib/resend.ts`).
- Responsive, dark enterprise HTML email templates for:
  - **Registration Confirmation**: Confirmation receipt, schedule dates, squad formation links.
  - **Submission Receipts**: Complete proof-of-work receipt with timestamp, track, and repo link.
  - **Host Announcements & Broadcasts**: Real-time broadcast alerts dispatched to all participants.
  - **Judge Invitations & Winner Alerts**: Official judging portal access and bounty awards.
- **Notification Outbox & Delivery Console**: Click the mail icon in the navigation bar to inspect all outgoing emails, preview their exact HTML rendering, or test-fire notifications.

### 4. 👥 Teammate Matchmaking & Squad Finder
- Matchmaking board where solo hackers can filter squads by needed skill sets (AI/ML, Smart Contracts, Frontend, UI/UX, PM).
- Create a squad and generate shareable 6-digit join codes (e.g. `OMNI99`).
- 1-click &ldquo;Join Squad&rdquo; with team size limits enforced.

### 5. ⚖️ Weighted Rubric Judging Portal & Leaderboard
- Dedicated private judging interface for assigned judges.
- Multi-criteria weighted sliders (Innovation 30%, Technical Execution 35%, UI/UX 20%, Impact 15%) with instant Olympic average score calculations.
- Constructive hacker feedback and private deliberation notes.
- Real-time Leaderboard with Olympic podium medals (🥇, 🥈, 🥉), score breakdowns, and track filtering.

### 6. 👑 Host Command Center & Lifecycle Management
- Transition hackathon state with 1 click: `Registration Open` → `Hacking Live` → `In Judging` → `Winners Published`.
- Real-time announcements banner published across the platform.
- Export full submission and participant callsets to formatted JSON.
- 1-click prize bounty assignment directly to winning projects.

### 7. 👤 User Profile & Activity Center
- Profile settings to customize name, bio, GitHub profile, and technical skills.
- Direct tracking of your submitted projects and registered hackathons.

### 8. 🎭 Live Role Persona Switcher
- Seamlessly toggle between **Participant (👨‍💻)**, **Organizer (👑)**, and **Judge (⚖️)** via the switcher in the navigation bar to experience and test all perspectives without logging in and out.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack ready, Server Components & Client Actions)
- **Database & Realtime Backend**: Convex DB (`convex/schema.ts`, `convex/hackathons.ts`, etc.)
- **Email Notifications**: Resend (`resend` SDK & `/api/send-email`)
- **Styling**: Tailwind CSS & Cyber Glassmorphism
- **Icons & Motion**: Lucide React & Framer Motion
- **Celebration Effects**: Canvas Confetti
- **Language**: TypeScript 5 (Strict Mode)

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/hackersdorm/hackersdorm.git
cd hackersdorm
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your credentials:
```env
# Optional: Set Convex URL for live cloud database
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Optional: Set Resend API key for live email deliveries (simulated in-app outbox when blank)
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=HackersDorm <notifications@hackersdorm.com>
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view HackersDorm.

### 4. (Optional) Run Live Convex Backend
```bash
npx convex dev
```

---

## 📁 Project Structure

```
hackersdorm/
├── convex/                   # Convex DB backend definitions
│   ├── schema.ts             # Schema for hackathons, submissions, teams, judging, emails
│   ├── hackathons.ts         # Queries & mutations for hackathons
│   ├── submissions.ts        # Queries & mutations for project submissions
│   ├── teams.ts              # Queries & mutations for team matchmaking
│   ├── judging.ts            # Scoring & leaderboard mutations
│   ├── announcements.ts      # Real-time banner broadcasts
│   └── emails.ts             # Email dispatch actions on Convex
├── src/
│   ├── app/                  # Next.js 15 App Router
│   │   ├── page.tsx          # Homepage & active sprints
│   │   ├── hackathons/       # Hackathons discovery & detail routes
│   │   │   ├── page.tsx      # Directory with status filters & search
│   │   │   └── [id]/         # Detail hub with tabs (Overview, Schedule, Prizes, etc.)
│   │   │       ├── submit/   # 4-step guided project submission wizard
│   │   │       └── projects/ # Community project showcase gallery
│   │   ├── create/           # Host a Hackathon wizard
│   │   └── api/send-email/   # Transactional email API route
│   ├── components/           # Reusable modular UI components
│   │   ├── layout/           # Navbar, Footer, AnnouncementsBanner
│   │   ├── hackathons/       # HackathonCard, CountdownTimer, PrizesList, ScheduleTimeline
│   │   ├── submissions/      # SubmissionWizard, SubmissionCard, SubmissionDetailModal
│   │   ├── teams/            # TeamFinder & matchmaking board
│   │   ├── judging/          # JudgingDashboard & LeaderboardTable
│   │   ├── organizer/        # OrganizerDashboard & EmailLogsModal
│   │   └── profile/          # UserProfileModal & activity center
│   ├── context/              # Universal reactive state provider with persistence
│   ├── lib/                  # Email client, HTML templates, mock data, utility helpers
│   └── types/                # Strict TypeScript interfaces
└── package.json
```

---

## 🏆 License
MIT License. Built for hackathon creators and builders worldwide.
