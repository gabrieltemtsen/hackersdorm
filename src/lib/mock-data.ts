import { Hackathon, Submission, Team, JudgeScore, Announcement, EmailLog } from "@/types";

export const INITIAL_HACKATHONS: Hackathon[] = [
  {
    id: "hack-nexus-ai-2026",
    slug: "nexus-ai-global-hackathon",
    title: "NexusAI Global Hackathon 2026",
    tagline: "Build the future of Autonomous AI Agents & Multimodal Apps",
    description: `NexusAI is a premiere 48-hour global virtual hackathon uniting engineers, researchers, and designers to build transformative AI agents, multimodal workflows, and next-generation developer tooling.

Whether you're developing intelligent browser automation, autonomous coding copilots, real-time voice intelligence, or domain-specific reasoning agents — HackersDorm provides the staging ground to showcase your creation to top tier VCs and tech founders.`,
    bannerUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    logoUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=300&q=80",
    organizerName: "Nexus Deep Tech Labs",
    organizerEmail: "hackathons@nexusdeeptech.io",
    organizerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    format: "online",
    status: "hacking",
    totalPrizePool: "$45,000",
    startDate: "2026-10-18T10:00:00Z",
    endDate: "2026-10-22T20:00:00Z",
    registrationDeadline: "2026-10-18T09:00:00Z",
    submissionDeadline: "2026-10-21T18:00:00Z",
    tracks: [
      "Autonomous Agents",
      "Multimodal Workflows",
      "Developer Tools & Infrastructure",
      "AI for Good & Health",
    ],
    prizes: [
      {
        id: "prize-1",
        name: "Grand Champion (Best Overall)",
        amount: "$20,000",
        description: "The most innovative, polished, and technically formidable project built during the hackathon.",
      },
      {
        id: "prize-2",
        name: "Best Autonomous Agent Track",
        amount: "$10,000",
        description: "Awarded to the agent exhibiting exceptional reasoning, tool-use execution, and reliability.",
      },
      {
        id: "prize-3",
        name: "Best Multimodal Experience",
        amount: "$8,000",
        description: "Outstanding integration of vision, voice, audio, or tactile generative outputs.",
      },
      {
        id: "prize-4",
        name: "Community Choice Award",
        amount: "$7,000",
        description: "Voted by the hacker community as the crowd favorite project.",
      },
    ],
    judgingCriteria: [
      {
        id: "crit-1",
        name: "Innovation & Originality",
        description: "How unique and groundbreaking is the approach? Does it break new ground in AI?",
        weight: 30,
        maxScore: 10,
      },
      {
        id: "crit-2",
        name: "Technical Execution",
        description: "Code quality, architectural resilience, backend reliability, and system stability.",
        weight: 30,
        maxScore: 10,
      },
      {
        id: "crit-3",
        name: "UI / UX & Polish",
        description: "How seamless, intuitive, and delightful is the user experience?",
        weight: 20,
        maxScore: 10,
      },
      {
        id: "crit-4",
        name: "Practical Impact & Viability",
        description: "Real-world utility, potential for market adoption, or societal impact.",
        weight: 20,
        maxScore: 10,
      },
    ],
    schedule: [
      {
        id: "sch-1",
        title: "Opening Ceremony & Keynote",
        timestamp: "Oct 18, 10:00 AM UTC",
        type: "ceremony",
        description: "Kickoff speech, rule reminders, and track reveal.",
      },
      {
        id: "sch-2",
        title: "Building Resilient Agents Workshop",
        timestamp: "Oct 18, 02:00 PM UTC",
        type: "workshop",
        description: "Hands-on session with Convex realtime storage and LLM state machines.",
      },
      {
        id: "sch-3",
        title: "Mentor Office Hours & Pitch Practice",
        timestamp: "Oct 19, 04:00 PM UTC",
        type: "mentorship",
        description: "1-on-1 feedback sessions with AI founders and seasoned judges.",
      },
      {
        id: "sch-4",
        title: "Submission Hard Deadline",
        timestamp: "Oct 21, 06:00 PM UTC",
        type: "deadline",
        description: "All GitHub repositories and Loom demo videos must be submitted via HackersDorm.",
      },
      {
        id: "sch-5",
        title: "Live Winner Showcase & Demo Day",
        timestamp: "Oct 22, 07:00 PM UTC",
        type: "ceremony",
        description: "Top finalists demo live, followed by award distributions.",
      },
    ],
    rules: [
      "All code submitted must be created during the official hackathon timeframe.",
      "Open-source libraries and APIs (including Convex, Resend, Gemini) are encouraged.",
      "Teams can have between 1 to 4 members.",
      "Every project must include a working repository and a video demo under 3 minutes.",
      "Plagiarism or submission of pre-existing commercial projects results in immediate disqualification.",
    ],
    faq: [
      {
        question: "Can I participate solo or do I need a team?",
        answer: "Both solo hackers and teams of up to 4 are welcome. Use our built-in Team Finder tab to match with fellow hackers by skill!",
      },
      {
        question: "How do submissions work?",
        answer: "Simply click 'Submit Project' on this page before the deadline. Fill out your project story, repo link, and Loom video. You can edit your submission anytime until the countdown hits zero.",
      },
      {
        question: "Are prizes paid out internationally?",
        answer: "Yes, prize funds are transferred globally via wire or crypto according to winner preference within 7 business days.",
      },
    ],
    minTeamSize: 1,
    maxTeamSize: 4,
    requireRepoUrl: true,
    requireDemoVideo: true,
    participantCount: 284,
    submissionCount: 38,
    featured: true,
  },
  {
    id: "hack-defi-horizon-2026",
    slug: "defi-horizon-summit",
    title: "DeFi Horizon & Web3 Infrastructure Hackathon",
    tagline: "Architect next-generation decentralized finance protocols & cross-chain infrastructure",
    description: "DeFi Horizon brings together decentralized protocols, liquidity engineers, and cryptography pioneers to solve capital efficiency, privacy, and intent-centric trading.",
    bannerUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=80",
    organizerName: "Horizon Consortium",
    organizerEmail: "hosts@defihorizon.eth",
    format: "hybrid",
    location: "Zurich, Switzerland & Global Virtual",
    status: "registering",
    totalPrizePool: "$60,000",
    startDate: "2026-11-05T09:00:00Z",
    endDate: "2026-11-10T18:00:00Z",
    registrationDeadline: "2026-11-04T23:59:00Z",
    submissionDeadline: "2026-11-09T17:00:00Z",
    tracks: ["Intent Solvers", "Cross-Chain Liquidity", "Privacy-Preserving DeFi", "RWA Tokenization"],
    prizes: [
      { id: "p1", name: "Apex Protocol Award", amount: "$30,000", description: "Top sovereign DeFi application." },
      { id: "p2", name: "Best Zero-Knowledge Implementation", amount: "$18,000", description: "Innovative use of ZK proofs." },
      { id: "p3", name: "Security & Auditing Excellence", amount: "$12,000", description: "Bulletproof architecture with full test suites." }
    ],
    judgingCriteria: [
      { id: "c1", name: "Cryptographic Depth", weight: 35, maxScore: 10, description: "Soundness of protocol mathematics." },
      { id: "c2", name: "Capital Efficiency", weight: 35, maxScore: 10, description: "Novelty in liquidity utilization." },
      { id: "c3", name: "Developer Experience", weight: 30, maxScore: 10, description: "SDK & contract cleanliness." },
    ],
    schedule: [
      { id: "s1", title: "Registration Closes", timestamp: "Nov 4, 11:59 PM UTC", type: "deadline" },
      { id: "s2", title: "Keynote & Kickoff", timestamp: "Nov 5, 09:00 AM UTC", type: "ceremony" },
    ],
    rules: ["Smart contracts must be deployed to testnet or local fork.", "Full open-source license required."],
    faq: [{ question: "Do in-person attendees get travel grants?", answer: "Yes, top 20 approved teams receive a travel stipend." }],
    minTeamSize: 1,
    maxTeamSize: 5,
    requireRepoUrl: true,
    requireDemoVideo: true,
    participantCount: 142,
    submissionCount: 0,
    featured: true,
  },
  {
    id: "hack-climate-pulse",
    slug: "climate-pulse-challenge",
    title: "GreenPulse Climate Tech Challenge",
    tagline: "Software and hardware solutions accelerating planetary decarbonization",
    description: "An intensive sprint addressing grid management, carbon offset verification, and sustainable supply chain transparency.",
    bannerUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    organizerName: "EarthForward Foundation",
    organizerEmail: "climate@earthforward.org",
    format: "online",
    status: "judging",
    totalPrizePool: "$35,000",
    startDate: "2026-10-10T12:00:00Z",
    endDate: "2026-10-16T20:00:00Z",
    registrationDeadline: "2026-10-09T23:59:00Z",
    submissionDeadline: "2026-10-15T18:00:00Z",
    tracks: ["Energy Grid Optimization", "IoT Carbon Sensors", "Regenerative Agriculture", "Circular Economy"],
    prizes: [
      { id: "p1", name: "Planet Impact Grand Prize", amount: "$18,000", description: "Highest measurable greenhouse abatement." },
      { id: "p2", name: "Open Hardware Award", amount: "$10,000", description: "Best modular sensor or telemetry unit." },
      { id: "p3", name: "Community Data Commons", amount: "$7,000", description: "Best open dataset and analytical platform." },
    ],
    judgingCriteria: [
      { id: "c1", name: "Ecological Viability", weight: 40, maxScore: 10, description: "Quantifiable planetary benefit." },
      { id: "c2", name: "Scalability", weight: 35, maxScore: 10, description: "Speed of real-world roll-out." },
      { id: "c3", name: "Design & UX", weight: 25, maxScore: 10, description: "Ease of adoption." },
    ],
    schedule: [
      { id: "s1", title: "Submissions Locked", timestamp: "Oct 15, 06:00 PM UTC", type: "deadline" },
      { id: "s2", title: "Judge Deliberation", timestamp: "Oct 16, 02:00 PM UTC", type: "workshop" },
    ],
    rules: ["Empirical data and references must back emission reduction claims."],
    faq: [{ question: "Are non-profits eligible?", answer: "Yes, non-profits and student teams are warmly invited." }],
    minTeamSize: 2,
    maxTeamSize: 4,
    requireRepoUrl: true,
    requireDemoVideo: true,
    participantCount: 198,
    submissionCount: 24,
    featured: false,
  },
];

export const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: "sub-omni-agent",
    hackathonId: "hack-nexus-ai-2026",
    teamId: "team-omni",
    userId: "user-elena",
    title: "OmniCraft: Autonomous Self-Healing Browser Agent",
    tagline: "An autonomous agent that inspects DOM hierarchies, self-repairs broken test flows, and executes headless workflows.",
    description: `### Inspiration
Web automation scripts break constantly when web apps update their class names, Tailwind styles, or DOM layout. We wanted to build an agent that observes user intent, plans visual and semantic paths, and automatically repairs broken web scrapers and workflows in real time.

### What it does
- Dissects rendered browser states via headless Chrome DevTools protocol.
- Generates fallback recovery prompts when DOM elements vanish.
- Uses a persistent real-time event log, allowing multiple developers to collaborate and monitor agent actions live.
- Automated email alerts when critical workflow errors occur.

### How we built it
- Frontend: Next.js 15, Tailwind CSS, Framer Motion for interactive thought graphs.
- Backend & State: Reactive event mutations & real-time document streaming.
- LLM Logic: Function calling with multimodal reasoning models.
- Transactional Emails: Automated team collaboration invites and deployment reports.

### Challenges we ran into
Handling high-frequency screen captures without clogging websocket streams. We overcame this by using perceptual hash delta comparisons in our backend action handlers.`,
    track: "Autonomous Agents",
    builtWith: ["Next.js", "Convex", "Resend", "TypeScript", "Tailwind CSS", "Puppeteer"],
    logoUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=300&q=80",
    demoVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    repoUrl: "https://github.com/hackersdorm/omnicraft-agent",
    liveDemoUrl: "https://omnicraft.preview.dev",
    pitchDeckUrl: "https://pitch.com/p/omnicraft-deck",
    teamMembers: [
      {
        userId: "user-elena",
        name: "Elena Rostova",
        email: "elena@omnicraft.dev",
        role: "AI Architecture & Core Agent Loop",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        isLeader: true,
      },
      {
        userId: "user-marcus",
        name: "Marcus Vance",
        email: "marcus@omnicraft.dev",
        role: "Fullstack Convex & UI",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        isLeader: false,
      },
    ],
    submittedAt: "2026-10-19T08:15:00Z",
    status: "submitted",
    votesCount: 42,
    averageScore: 9.3,
  },
  {
    id: "sub-voice-scribe",
    hackathonId: "hack-nexus-ai-2026",
    teamId: "team-echo",
    userId: "user-sarah",
    title: "EchoLens: Multimodal Real-Time Meeting Summarizer & Action Generator",
    tagline: "Voice-driven multimodal workspace that converts whiteboard sketches and conversation into executable GitHub issues.",
    description: `### Inspiration
Remote teams spend countless hours documenting whiteboard brainstorming sessions and translating verbal agreements into ticketing software. EchoLens bridges the voice, visual drawing, and project ticketing gap instantly.

### What it does
- Listens to audio streams in 40+ languages.
- Analyzes photos or camera feeds of whiteboards and sketches.
- Automatically generates architecture diagrams and writes prioritized GitHub issues.
- Realtime sync across team members via Convex.`,
    track: "Multimodal Workflows",
    builtWith: ["Next.js 15", "Convex", "Resend", "WebRTC", "Gemini Pro Vision", "Canvas API"],
    logoUrl: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=300&q=80",
    demoVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    repoUrl: "https://github.com/hackersdorm/echolens-multimodal",
    liveDemoUrl: "https://echolens.app",
    teamMembers: [
      {
        userId: "user-sarah",
        name: "Sarah Chen",
        email: "sarah@echolens.io",
        role: "Computer Vision & Audio Engineering",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        isLeader: true,
      },
    ],
    submittedAt: "2026-10-19T09:40:00Z",
    status: "submitted",
    votesCount: 29,
    averageScore: 8.8,
  },
  {
    id: "sub-green-grid",
    hackathonId: "hack-climate-pulse",
    userId: "user-david",
    title: "CarbonSync: Decentralized Microgrid Load Balancer",
    tagline: "Dynamically routes neighborhood solar excess into electric battery storage using predictive weather models.",
    description: "CarbonSync aggregates solar rooftop telemetry and battery storage reserves to prevent curtailment and cut fossil fuel peaker plant starts.",
    track: "Energy Grid Optimization",
    builtWith: ["Python", "Rust", "Convex", "Next.js", "Resend", "MQTT"],
    logoUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=300&q=80",
    demoVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    repoUrl: "https://github.com/hackersdorm/carbonsync-grid",
    teamMembers: [
      {
        userId: "user-david",
        name: "David Kim",
        email: "david@carbonsync.green",
        role: "Embedded Systems & Math",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        isLeader: true,
      },
    ],
    submittedAt: "2026-10-15T15:20:00Z",
    status: "winner",
    prizeAwarded: "Planet Impact Grand Prize ($18,000)",
    votesCount: 65,
    averageScore: 9.6,
  },
];

export const INITIAL_TEAMS: Team[] = [
  {
    id: "team-omni",
    hackathonId: "hack-nexus-ai-2026",
    name: "OmniCraft Squad",
    tagline: "Pushing limits of autonomous self-healing agent swarms",
    joinCode: "OMNI99",
    isRecruiting: true,
    lookingForSkills: ["Design / UI/UX", "Python / ML Evaluator"],
    submissionId: "sub-omni-agent",
    members: [
      {
        userId: "user-elena",
        name: "Elena Rostova",
        email: "elena@omnicraft.dev",
        role: "Agent Lead & Architect",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        isLeader: true,
      },
      {
        userId: "user-marcus",
        name: "Marcus Vance",
        email: "marcus@omnicraft.dev",
        role: "Fullstack Developer",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        isLeader: false,
      },
    ],
  },
  {
    id: "team-neural-flow",
    hackathonId: "hack-nexus-ai-2026",
    name: "NeuralFlow Labs",
    tagline: "Building zero-latency streaming voice translation agents",
    joinCode: "NEUR72",
    isRecruiting: true,
    lookingForSkills: ["Frontend (Next.js)", "WebRTC Specialist"],
    members: [
      {
        userId: "user-kai",
        name: "Kai Tanaka",
        email: "kai@neuralflow.dev",
        role: "Audio ML Researcher",
        avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
        isLeader: true,
      },
    ],
  },
  {
    id: "team-defi-sentinel",
    hackathonId: "hack-defi-horizon-2026",
    name: "Sentinel Zero",
    tagline: "Zero-knowledge proofs for trustless cross-chain order matching",
    joinCode: "ZK7741",
    isRecruiting: true,
    lookingForSkills: ["Rust / Circom", "Solidity", "Product Designer"],
    members: [
      {
        userId: "user-alessia",
        name: "Alessia Moretti",
        email: "alessia@sentinelzero.xyz",
        role: "ZK Cryptographer",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
        isLeader: true,
      },
    ],
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    hackathonId: "hack-nexus-ai-2026",
    title: "⚡ Mentorship Office Hours are NOW LIVE in Discord Stage!",
    content: "Our AI mentors from Anthropic, Google, and Convex are now taking 1-on-1 questions in the mentor breakout rooms. Bring your architecture questions!",
    category: "mentorship" as any,
    createdAt: "2026-10-19T10:00:00Z",
    sentBy: "Nexus Organizer Team",
  },
  {
    id: "ann-2",
    hackathonId: "hack-nexus-ai-2026",
    title: "⏰ 24 Hours Left Until Submission Deadline!",
    content: "Remember that your submission must include a public GitHub repo link and a short demo video (<3 mins). Don't wait until the last 5 minutes to submit!",
    category: "deadline",
    createdAt: "2026-10-19T11:00:00Z",
    sentBy: "HackersDorm Bot",
  },
];

export const INITIAL_JUDGE_SCORES: JudgeScore[] = [
  {
    id: "score-1",
    hackathonId: "hack-nexus-ai-2026",
    submissionId: "sub-omni-agent",
    judgeId: "judge-maya",
    judgeName: "Dr. Maya Lin (Partner @ DeepTech Ventures)",
    scores: {
      "crit-1": 10,
      "crit-2": 9,
      "crit-3": 9,
      "crit-4": 9,
    },
    totalWeightedScore: 9.3,
    feedback: "Exceptional system design. The self-healing agent loop using real-time state synchronization is one of the most innovative patterns I have witnessed this year.",
    privateNotes: "Definite contender for Grand Champion or Best Agent track.",
    createdAt: "2026-10-19T10:30:00Z",
  },
  {
    id: "score-2",
    hackathonId: "hack-nexus-ai-2026",
    submissionId: "sub-voice-scribe",
    judgeId: "judge-maya",
    judgeName: "Dr. Maya Lin (Partner @ DeepTech Ventures)",
    scores: {
      "crit-1": 9,
      "crit-2": 8,
      "crit-3": 9,
      "crit-4": 9,
    },
    totalWeightedScore: 8.8,
    feedback: "Fluid UI and the voice-to-issue generator has high commercial viability. Good job on the multimodal integration.",
    createdAt: "2026-10-19T10:45:00Z",
  },
];
