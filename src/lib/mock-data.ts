import { Hackathon, Submission, Team, JudgeScore, Announcement, EmailLog } from "@/types";

export const INITIAL_HACKATHONS: Hackathon[] = [
  {
    id: "hack-nrs-innovation-2026",
    slug: "nrs-internal-hackathon-2026",
    title: "NRS Internal Staff Hackathon & Innovation Challenge 2026",
    tagline: "Driving Grassroots Fiscal Innovation, Process Automation & Public Trust Across Technical and Non-Technical Tracks",
    description: `Following the historic transition to the Nigeria Revenue Service (NRS) and the implementation of the consolidated tax framework, our greatest asset in driving seamless revenue administration is the institutional knowledge and creativity of our staff.

The NRS Internal Staff Hackathon & Innovation Challenge 2026 brings together multidisciplinary staff across departments (IT, Tax Operations, Communications, Compliance, HR, and Legal) to collaboratively identify operational bottlenecks, build working digital prototypes, design high-impact taxpayer communication campaigns, and pitch scalable process improvements.

### Leveled Playing Field (Technical vs. Non-Technical)
Unlike traditional coding-only competitions, this initiative is intentionally designed as a level playing field featuring both Technical and Non-Technical Tracks with equal prestige and separate prize pools:

- **DIVISION A: TECHNICAL TRACKS** (Builders, Developers, Data & IT Staff)
  - **Track T1: Smart Revenue, AI & Data Analytics**: Predictive analytics for tax compliance, automated anomaly/fraud detection, informal sector data capture models, and unified taxpayer ledger visualizations.
  - **Track T2: Internal Process Automation & Staff Productivity**: Internal micro-tools, workflow automation, AI chatbots for internal HR/policy queries, document digitization, and inter-departmental ticketing tools.

- **DIVISION B: NON-TECHNICAL TRACKS** (Communications, Operations, Policy & Admin Staff)
  - **Track NT1: Social Media Innovation, Digital PR & Taxpayer Education ("Tax Made Simple")**: Reimagining how the NRS communicates with Nigerians—especially SMEs, Gen-Z/young professionals, and the informal sector through viral TikTok/Reels/X explainer series, Pidgin and local language micro-content, and rapid misinformation response.
  - **Track NT2: Operational Excellence & Taxpayer Experience (Service Design)**: Re-engineering non-code operational workflows—such as redesigning the physical/digital taxpayer onboarding journey, reducing turnaround time for inquiries (e.g. TCC issuance), and improving collaboration with State Internal Revenue Services (SIRS).

### Post-Hackathon Sustainability (The "Incubation" Promise)
The top winning solutions from both the Technical and Non-Technical tracks will be inducted into a Q1 2027 NRS Innovation Pilot with executive sponsorship.`,
    bannerUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80",
    logoUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80",
    organizerName: "Nigeria Revenue Service (NRS)",
    organizerEmail: "innovation@nrs.gov.ng",
    organizerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    format: "hybrid",
    location: "NRS Auditorium / Event Hall, Abuja & Virtual Hybrid",
    status: "registering",
    totalPrizePool: "₦6,500,000",
    startDate: "2026-12-14T09:00:00Z",
    endDate: "2026-12-18T17:00:00Z",
    registrationDeadline: "2026-12-14T09:00:00Z",
    submissionDeadline: "2026-12-17T12:00:00Z",
    tracks: [
      "Track T1: Smart Revenue, AI & Data Analytics (Technical)",
      "Track T2: Internal Process Automation & Staff Productivity (Technical)",
      "Track NT1: Social Media, Digital PR & Taxpayer Education (\"Tax Made Simple\")",
      "Track NT2: Operational Excellence & Taxpayer Experience (Service Design)",
    ],
    prizes: [
      {
        id: "prize-t1",
        name: "Grand Champion — Technical Track (1st Place)",
        amount: "₦1,500,000",
        description: "Top working technical prototype with highest architectural depth, security, and measurable revenue impact + Trophy & Q1 2027 Incubation.",
      },
      {
        id: "prize-t2",
        name: "1st Runner-Up — Technical Track (2nd Place)",
        amount: "₦1,000,000",
        description: "Exceptional technical execution, automation capability, and code scalability.",
      },
      {
        id: "prize-t3",
        name: "2nd Runner-Up — Technical Track (3rd Place)",
        amount: "₦500,000",
        description: "Outstanding internal productivity or analytics tool with high deployment viability.",
      },
      {
        id: "prize-nt1",
        name: "Grand Champion — Non-Technical Track (1st Place)",
        amount: "₦1,500,000",
        description: "Most innovative, viral communication campaign or service design roadmap ('Tax Made Simple') + Trophy & Q1 2027 Campaign Champion.",
      },
      {
        id: "prize-nt2",
        name: "1st Runner-Up — Non-Technical Track (2nd Place)",
        amount: "₦1,000,000",
        description: "Deep research, compelling creative assets/videos, and seamless operational workflow redesign.",
      },
      {
        id: "prize-nt3",
        name: "2nd Runner-Up — Non-Technical Track (3rd Place)",
        amount: "₦500,000",
        description: "Practical grassroots taxpayer engagement strategy or inter-departmental collaboration model.",
      },
    ],
    judgingCriteria: [
      {
        id: "crit-1",
        name: "Alignment & Impact on NRS Mandate",
        description: "How directly does this solve a real NRS operational, revenue, or taxpayer perception problem?",
        weight: 30,
        maxScore: 10,
      },
      {
        id: "crit-2",
        name: "Innovation & Creativity",
        description: "How fresh, modern, and engaging is the technical tool or social media/process strategy?",
        weight: 25,
        maxScore: 10,
      },
      {
        id: "crit-3",
        name: "Execution & Prototype Quality",
        description: "Technical: Working MVP, code quality, data security. Non-Technical: Quality of sample media assets, video scripts, workflow clarity.",
        weight: 25,
        maxScore: 10,
      },
      {
        id: "crit-4",
        name: "Feasibility & Presentation",
        description: "Can the Service realistically adopt this in Q1 2027? How compelling and clear was the 5-minute finale pitch?",
        weight: 20,
        maxScore: 10,
      },
    ],
    schedule: [
      {
        id: "sch-1",
        title: "Registration Locks & Hybrid Opening Ceremony",
        timestamp: "Mon, Dec 14 • 09:00 AM WAT",
        type: "ceremony",
        description: "Portal locks prompt at 09:00 AM. Opening Ceremony, Executive Chairman Keynote & unveiling of problem statements.",
      },
      {
        id: "sch-2",
        title: "Milestone 1 Due: Problem Statement & Team Charter",
        timestamp: "Mon, Dec 14 • 04:00 PM WAT",
        type: "deadline",
        description: "Teams upload problem definition, target division, and cross-departmental member charter on the Web App.",
      },
      {
        id: "sch-3",
        title: "Mentor Office Hours (Senior Directors & IT Leads)",
        timestamp: "Tue, Dec 15 • 02:00 PM WAT",
        type: "mentorship",
        description: "Virtual and in-person guidance sessions across Tax Operations, IT, and Corporate Communications.",
      },
      {
        id: "sch-4",
        title: "Milestone 2 Due: Wireframes & Campaign Concept Note",
        timestamp: "Tue, Dec 15 • 05:00 PM WAT",
        type: "deadline",
        description: "Submission of technical wireframes/architecture diagrams or non-technical campaign storyboards.",
      },
      {
        id: "sch-5",
        title: "Pitch Coaching Workshop",
        timestamp: "Wed, Dec 16 • 03:00 PM WAT",
        type: "workshop",
        description: "Hands-on session: 'How to Pitch to Executive Management in 5 Minutes'.",
      },
      {
        id: "sch-6",
        title: "Final Submission Deadline on Hackathon Web App",
        timestamp: "Thu, Dec 17 • 12:00 PM WAT",
        type: "deadline",
        description: "Portal locks for all submissions: code/demo video for Technical; campaign assets & slide decks for Non-Technical.",
      },
      {
        id: "sch-7",
        title: "Announcement of Top 10 Grand Finale Finalists",
        timestamp: "Thu, Dec 17 • 06:00 PM WAT",
        type: "ceremony",
        description: "Shortlisted teams (Top 5 Technical & Top 5 Non-Technical) announced on the Web App.",
      },
      {
        id: "sch-8",
        title: "In-Person Grand Finale, Exhibition Fair & Pitches",
        timestamp: "Fri, Dec 18 • 09:00 AM WAT",
        type: "ceremony",
        description: "NRS Auditorium, Abuja. Innovation Gallery Walk (10:00 AM), Live Finale Pitches (11:30 AM), and Awards Presentation by Executive Chairman (02:15 PM).",
      },
    ],
    rules: [
      "Open strictly to all confirmed staff of the Nigeria Revenue Service (NRS) across all departments.",
      "Squads must consist of 3 to 5 members. Cross-departmental collaboration (e.g. IT + Tax Operations + Comms) is strongly encouraged.",
      "Technical Tracks require functional prototypes or scripts; Non-Technical Tracks require creative assets (sample videos, social graphics, service blueprints).",
      "Registration officially locks at 9:00 AM on Monday, December 14 as the opening ceremony commences.",
      "All submissions must be uploaded through this dedicated Hackathon Web App before Thursday, December 17 at 12:00 PM.",
      "Top winning solutions will be inducted into the Q1 2027 NRS Innovation Pilot with executive backing.",
    ],
    faq: [
      {
        question: "Can non-IT staff participate and win?",
        answer: "Yes, absolutely! The hackathon is intentionally split into separate Technical and Non-Technical divisions. Non-technical staff in Communications, Operations, HR, Legal, and Tax Compliance have their own dedicated prize pool (₦3.5M total) and compete on strategy, communication campaigns, and process design.",
      },
      {
        question: "How do teams work?",
        answer: "Teams must have between 3 and 5 members. You can form a team with colleagues in your department or use our built-in Team Finder tab to match with teammates across different departments (e.g. an IT developer partnering with a tax auditor and a communications officer).",
      },
      {
        question: "Will the hackathon disrupt daily official duties?",
        answer: "No. The event is structured as a hybrid sprint Monday through Thursday with asynchronous milestones and flexible afternoon mentorship hours, culminating in the festive In-Person Grand Finale at the NRS Auditorium on Friday, December 18.",
      },
      {
        question: "What happens to our solutions after December 18?",
        answer: "Under the 'Incubation Promise', winning prototypes and strategies will be handed over to the Digital Transformation and Corporate Communications directorates for pilot deployment in Q1 2027, with the team members invited as project champions.",
      },
    ],
    minTeamSize: 3,
    maxTeamSize: 5,
    requireRepoUrl: false,
    requireDemoVideo: true,
    participantCount: 312,
    submissionCount: 4,
    featured: true,
  },
];

export const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: "sub-tax-anomaly-ai",
    hackathonId: "hack-nrs-innovation-2026",
    teamId: "team-tax-anomaly",
    userId: "user-aminu",
    title: "TaxAnomaly AI: Predictive Compliance & Anomaly Detector",
    tagline: "Machine learning model identifying corporate tax filing anomalies and informal sector revenue leakages in real time.",
    description: `### Operational Background & Mandate
With the consolidated tax framework and the transition to the Nigeria Revenue Service, tax auditors face millions of annual returns. TaxAnomaly AI analyzes historical withholding tax, VAT remittances, and customs import datasets to detect statistical outliers before audits commence.

### Key Capabilities
- **Automated Anomaly Scoring**: Flags suspicious VAT claiming patterns and under-declared corporate gross margins.
- **Informal Sector Data Stitching**: Connects state business premise registries and bank transaction hashes to suggest uncollected levies.
- **Audit Case Prioritization**: Generates ready-to-inspect audit dossiers for field inspection teams.

### Technical Implementation
- Built with Python (Scikit-Learn, XGBoost), Convex real-time persistence, and Next.js 15 dashboard.
- Zero external data leakage: designed for on-premise NRS sovereign cloud deployment.`,
    track: "Track T1: Smart Revenue, AI & Data Analytics (Technical)",
    builtWith: ["Python", "XGBoost", "Next.js", "Convex", "TypeScript", "Tailwind CSS"],
    logoUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80",
    demoVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    repoUrl: "https://github.com/nrs-innovation/tax-anomaly-ai",
    liveDemoUrl: "https://taxanomaly.nrs.gov.ng",
    pitchDeckUrl: "https://pitch.com/p/nrs-tax-anomaly-deck",
    teamMembers: [
      {
        userId: "user-aminu",
        name: "Aminu Bello (IT Directorate)",
        email: "a.bello@nrs.gov.ng",
        role: "Lead ML Engineer & Data Architect",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        isLeader: true,
      },
      {
        userId: "user-chidinma",
        name: "Chidinma Okafor (Tax Operations)",
        email: "c.okafor@nrs.gov.ng",
        role: "Tax Audit Specialist",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
        isLeader: false,
      },
      {
        userId: "user-tunde",
        name: "Tunde Bakare (IT Infrastructure)",
        email: "t.bakare@nrs.gov.ng",
        role: "Backend & Security",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        isLeader: false,
      },
    ],
    submittedAt: "2026-12-16T14:20:00Z",
    status: "submitted",
    votesCount: 88,
    averageScore: 9.4,
  },
  {
    id: "sub-tax-made-simple",
    hackathonId: "hack-nrs-innovation-2026",
    teamId: "team-tax-simple",
    userId: "user-zainab",
    title: "Tax Made Simple: Viral Pidgin & English Explainer Campaign",
    tagline: "Gamified micro-content and TikTok/Reels explainer series breaking down consolidated tax reforms for Nigerian SMEs and youth.",
    description: `### Strategic Objective
Public perception often associates tax administration solely with 'enforcement'. This campaign re-engineers the taxpayer relationship into a 'community partnership', demystifying the Nigeria Tax Act in conversational English, Nigerian Pidgin, Yoruba, Hausa, and Igbo.

### Campaign Deliverables
1. **60-Second Video Series**: High-energy TikTok and Reels shorts explaining:
   - "Where Your Tax Money Dey Go" (Linking road infrastructure & hospitals to tax revenue).
   - "How Small Business Dey Benefit from Tax ID Registration".
2. **Interactive Tax WhatsApp Bot Mockup**: Instant calculator allowing informal traders to check their exact simplified threshold.
3. **Misinformation Rapid-Response Toolkit**: Pre-approved digital cards addressing viral tax myths within 15 minutes of trending.`,
    track: "Track NT1: Social Media, Digital PR & Taxpayer Education (\"Tax Made Simple\")",
    builtWith: ["Canva", "CapCut", "Figma", "WhatsApp API Concept", "Social Listening Toolkit"],
    logoUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=300&q=80",
    demoVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    pitchDeckUrl: "https://pitch.com/p/tax-made-simple-deck",
    teamMembers: [
      {
        userId: "user-zainab",
        name: "Zainab Ahmed (Corporate Communications)",
        email: "z.ahmed@nrs.gov.ng",
        role: "Creative Director & Scriptwriter",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        isLeader: true,
      },
      {
        userId: "user-emeka",
        name: "Emeka Nwosu (Taxpayer Services)",
        email: "e.nwosu@nrs.gov.ng",
        role: "Tax Policy Strategist",
        avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
        isLeader: false,
      },
      {
        userId: "user-aisha",
        name: "Aisha Mohammed (Media & PR)",
        email: "a.mohammed@nrs.gov.ng",
        role: "Digital Campaign Manager",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        isLeader: false,
      },
    ],
    submittedAt: "2026-12-16T16:45:00Z",
    status: "submitted",
    votesCount: 94,
    averageScore: 9.6,
  },
  {
    id: "sub-fast-tcc",
    hackathonId: "hack-nrs-innovation-2026",
    teamId: "team-fast-tcc",
    userId: "user-kayode",
    title: "FastTCC: Automated Tax Clearance Certificate Engine",
    tagline: "Internal micro-tool verifying cross-departmental clearances to reduce TCC issuance time from 14 days to under 2 hours.",
    description: `### The Problem
Tax Clearance Certificates (TCC) are a primary benchmark of taxpayer satisfaction. Currently, applications require manual verification across Audit, Legal, and Arrears units.

### The Innovation
FastTCC connects the internal database to query debt status, open audit flags, and pending litigation automatically:
- Clean accounts receive instant cryptographic TCC generation with verifiable QR codes.
- Accounts with exceptions are automatically routed to the exact officer with pre-filled resolution notes.`,
    track: "Track T2: Internal Process Automation & Staff Productivity (Technical)",
    builtWith: ["Next.js", "Convex", "TypeScript", "FastAPI", "PostgreSQL", "Tailwind CSS"],
    logoUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=300&q=80",
    demoVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    repoUrl: "https://github.com/nrs-innovation/fast-tcc",
    liveDemoUrl: "https://fasttcc.nrs.gov.ng",
    teamMembers: [
      {
        userId: "user-kayode",
        name: "Kayode Adeleke (IT Operations)",
        email: "k.adeleke@nrs.gov.ng",
        role: "Fullstack Developer",
        avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
        isLeader: true,
      },
      {
        userId: "user-fatima",
        name: "Fatima Garba (Compliance & Enforcement)",
        email: "f.garba@nrs.gov.ng",
        role: "Compliance Officer",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
        isLeader: false,
      },
      {
        userId: "user-ifeanyi",
        name: "Ifeanyi Eze (Legal Directorate)",
        email: "i.eze@nrs.gov.ng",
        role: "Legal Advisor",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        isLeader: false,
      },
    ],
    submittedAt: "2026-12-16T18:10:00Z",
    status: "submitted",
    votesCount: 76,
    averageScore: 9.1,
  },
  {
    id: "sub-seamless-tax",
    hackathonId: "hack-nrs-innovation-2026",
    teamId: "team-seamless",
    userId: "user-ngozi",
    title: "SeamlessTax: Unified State & Federal Taxpayer Journey Blueprint",
    tagline: "Service design blueprint harmonizing NRS and State IRS onboarding to eliminate duplicate audits and foster cooperative compliance.",
    description: `### Overview
Taxpayers operating across multiple states frequently experience duplicate audits and overlapping documentation demands. SeamlessTax provides a harmonized service blueprint bridging federal NRS and State Internal Revenue Services (SIRS).

### Core Components
- **Unified Onboarding Checklist**: Single standard documentation packet valid across all 36 states and the FCT.
- **Joint Audit Protocol**: Step-by-step workflow for shared inter-agency tax examination sessions.
- **Taxpayer Experience Scorecard**: Real-time feedback terminals deployed at regional revenue service centres.`,
    track: "Track NT2: Operational Excellence & Taxpayer Experience (Service Design)",
    builtWith: ["Figma", "Miro", "Service Design Blueprints", "Journey Maps"],
    logoUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=300&q=80",
    demoVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    pitchDeckUrl: "https://pitch.com/p/seamless-tax-deck",
    teamMembers: [
      {
        userId: "user-ngozi",
        name: "Ngozi Obi (Strategic Planning Directorate)",
        email: "n.obi@nrs.gov.ng",
        role: "Service Designer & Policy Lead",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        isLeader: true,
      },
      {
        userId: "user-musa",
        name: "Musa Danjuma (Inter-Governmental Relations)",
        email: "m.danjuma@nrs.gov.ng",
        role: "SIRS Liaison",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        isLeader: false,
      },
      {
        userId: "user-bolanle",
        name: "Bolanle Cole (Human Resources)",
        email: "b.cole@nrs.gov.ng",
        role: "Staff Training & Operations",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
        isLeader: false,
      },
    ],
    submittedAt: "2026-12-16T19:30:00Z",
    status: "submitted",
    votesCount: 71,
    averageScore: 9.0,
  },
];

export const INITIAL_TEAMS: Team[] = [
  {
    id: "team-tax-anomaly",
    hackathonId: "hack-nrs-innovation-2026",
    name: "Revenue Intelligence Squad",
    tagline: "Leveraging predictive algorithms for uncaptured informal sector revenue",
    joinCode: "NRS01A",
    isRecruiting: false,
    lookingForSkills: ["Data Engineering", "Tax Law Specialist"],
    submissionId: "sub-tax-anomaly-ai",
    members: [
      {
        userId: "user-aminu",
        name: "Aminu Bello (IT)",
        email: "a.bello@nrs.gov.ng",
        role: "Lead ML Engineer",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        isLeader: true,
      },
      {
        userId: "user-chidinma",
        name: "Chidinma Okafor (Tax Ops)",
        email: "c.okafor@nrs.gov.ng",
        role: "Tax Audit Specialist",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
        isLeader: false,
      },
      {
        userId: "user-tunde",
        name: "Tunde Bakare (IT Infra)",
        email: "t.bakare@nrs.gov.ng",
        role: "Backend Architect",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        isLeader: false,
      },
    ],
  },
  {
    id: "team-tax-simple",
    hackathonId: "hack-nrs-innovation-2026",
    name: "Tax Made Simple Creators",
    tagline: "Reimagining citizen fiscal communication with viral digital content",
    joinCode: "NRS02B",
    isRecruiting: false,
    lookingForSkills: ["Video Editing", "Pidgin & Local Language Copywriting"],
    submissionId: "sub-tax-made-simple",
    members: [
      {
        userId: "user-zainab",
        name: "Zainab Ahmed (Comms)",
        email: "z.ahmed@nrs.gov.ng",
        role: "Creative Director",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        isLeader: true,
      },
      {
        userId: "user-emeka",
        name: "Emeka Nwosu (Services)",
        email: "e.nwosu@nrs.gov.ng",
        role: "Tax Policy Strategist",
        avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
        isLeader: false,
      },
      {
        userId: "user-aisha",
        name: "Aisha Mohammed (Media)",
        email: "a.mohammed@nrs.gov.ng",
        role: "Digital Campaign Manager",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        isLeader: false,
      },
    ],
  },
  {
    id: "team-fast-tcc",
    hackathonId: "hack-nrs-innovation-2026",
    name: "FastTCC Automation Unit",
    tagline: "Re-engineering internal clearance workflows to under 2 hours",
    joinCode: "NRS03C",
    isRecruiting: true,
    lookingForSkills: ["UI/UX Designer", "Legal Compliance Officer"],
    submissionId: "sub-fast-tcc",
    members: [
      {
        userId: "user-kayode",
        name: "Kayode Adeleke (IT Ops)",
        email: "k.adeleke@nrs.gov.ng",
        role: "Fullstack Developer",
        avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
        isLeader: true,
      },
      {
        userId: "user-fatima",
        name: "Fatima Garba (Enforcement)",
        email: "f.garba@nrs.gov.ng",
        role: "Compliance Officer",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
        isLeader: false,
      },
    ],
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-nrs-1",
    hackathonId: "hack-nrs-innovation-2026",
    title: "🏛️ Welcome to the NRS Internal Staff Hackathon 2026 Portal!",
    content: "Staff across all directorates (IT, Tax Operations, Communications, Legal, Compliance, HR) are invited to register teams of 3 to 5 members before the registration lock at 09:00 AM on Monday, December 14.",
    category: "general" as any,
    createdAt: "2026-10-19T09:00:00Z",
    sentBy: "NRS Organizing Committee",
  },
  {
    id: "ann-nrs-2",
    hackathonId: "hack-nrs-innovation-2026",
    title: "🔒 Registration Portal Locks Promptly: Mon, Dec 14 @ 09:00 AM WAT",
    content: "Registration officially closes the moment the Opening Ceremony begins at 09:00 AM prompt on Monday, Dec 14. Ensure all team members are enrolled in the system beforehand.",
    category: "deadline",
    createdAt: "2026-10-19T10:00:00Z",
    sentBy: "Executive Chairman's Office",
  },
  {
    id: "ann-nrs-3",
    hackathonId: "hack-nrs-innovation-2026",
    title: "🏆 ₦6,500,000 Cash Prize Pool Across Technical & Non-Technical Tracks",
    content: "Separate equal prize pools are established for Technical and Non-Technical divisions (₦1.5M for 1st, ₦1.0M for 2nd, ₦500k for 3rd) plus plaques and Q1 2027 Incubation Pilot induction.",
    category: "general",
    createdAt: "2026-10-19T11:00:00Z",
    sentBy: "Awards Committee",
  },
];

export const INITIAL_JUDGE_SCORES: JudgeScore[] = [
  {
    id: "score-1",
    hackathonId: "hack-nrs-innovation-2026",
    submissionId: "sub-tax-made-simple",
    judgeId: "judge-nrs-exec",
    judgeName: "NRS Assessment Panel (Director of Tax Operations)",
    scores: {
      "crit-1": 10,
      "crit-2": 10,
      "crit-3": 9,
      "crit-4": 10,
    },
    totalWeightedScore: 9.6,
    feedback: "Masterclass in modern public sector communications. The Pidgin explainer video series and WhatsApp calculation concept make tax compliance accessible to market traders and youth.",
    privateNotes: "Highest scoring project in Division B. Recommend immediate Q1 2027 pilot adoption.",
    createdAt: "2026-12-17T15:30:00Z",
  },
  {
    id: "score-2",
    hackathonId: "hack-nrs-innovation-2026",
    submissionId: "sub-tax-anomaly-ai",
    judgeId: "judge-nrs-exec",
    judgeName: "NRS Assessment Panel (Director of Tax Operations)",
    scores: {
      "crit-1": 10,
      "crit-2": 9,
      "crit-3": 9,
      "crit-4": 9,
    },
    totalWeightedScore: 9.4,
    feedback: "High impact technical prototype. The anomaly scoring algorithm demonstrates clear mathematical rigor without compromising data privacy.",
    privateNotes: "Frontrunner for Technical Track 1st Place.",
    createdAt: "2026-12-17T16:00:00Z",
  },
];
