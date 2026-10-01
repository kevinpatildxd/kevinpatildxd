/**
 * Single source of truth for everything the portfolio renders about Kevin.
 * Content mirrors the Nudge Systems team page; only individually-owned work
 * appears here - client and combined company projects are deliberately excluded.
 */

export const profile = {
    name: 'Kevin Purushottam Patil',
    shortName: 'Kevin Patil',
    role: 'Co-Founder & CDO, Nudge Systems',
    tagline: 'Full-stack developer & cybersecurity researcher',
    bio: 'Builds end-to-end: React frontends, Node.js and PHP APIs, databases, and smart contracts. Nothing ships half-baked on either side of the stack. If an idea won’t hold up, you’ll hear it before the code does.',
    education: {
        degree: 'B.Tech in Computer Science and Engineering',
        institution: 'Uka Tarsadia University',
        location: 'Surat, Gujarat',
        graduation: 'Expected June 2026',
        gpa: '8.15',
    },
    schooling: {
        degree: 'Science',
        institution: 'Samithi English Medium School',
        date: 'March 2022',
    },
    contact: {
        email: 'kevinpatil6354@gmail.com',
        phone: '+91 6354864920',
        location: 'Surat, Gujarat, India',
        github: 'https://github.com/kevinpatildxd',
        linkedin: 'https://www.linkedin.com/in/kevin-patil-1b8a75291/',
        company: 'https://nudgesystems.in',
        npm: 'https://www.npmjs.com/package/@kevinpatil/devguard',
    },
} as const;

export const publication = {
    title: 'Anti-Phishing Frameworks',
    venue: 'Journal of Cyber Security, Privacy Issues and Challenges',
    details: 'Vol. 5, Issue 1, 2026',
    coAuthor: 'Vishvendu Bhatt',
    href: 'https://matjournals.net/engineering/index.php/JCSPIC/article/view/3146',
    summary:
        'Systematic review of 30 phishing-detection papers (2020–2025) spanning classical ML to LLM-based systems. Empirically validates Random Forest (99.92% accuracy) and XGBoost (99.96%, 1.5M samples/sec) on 235,795 URLs — the largest public phishing dataset. Identifies data leakage in 9 widely-used features and proposes next-generation frameworks using XAI and multi-agent LLMs.',
    highlights: [
        '30 papers reviewed across a five-year window',
        '235,795 URLs — largest public phishing dataset',
        'Data leakage identified in 9 widely-used features',
    ],
} as const;

export interface Project {
    name: string;
    category: string;
    status: 'ongoing' | 'completed' | 'live';
    description: string;
    outcome: string;
    tags: string[];
    highlights: string[];
    link?: string;
}

/**
 * Ordered strongest-first: a published package, then shipped platforms, then
 * the experiments. Client work built at Nudge Systems is intentionally absent.
 */
export const projects: Project[] = [
    {
        name: 'devguard',
        category: 'Developer Tooling',
        status: 'ongoing',
        description:
            'An open-source Node.js CLI that guards JavaScript/TypeScript projects before they ship — validating .env files, auditing dependencies, and analysing React code quality in a single zero-config command. Catches missing env keys, CVEs, unused packages, hook violations, accessibility issues, and RSC boundary errors.',
        outcome: 'Published to npm as @kevinpatil/devguard — currently v3.4.1',
        tags: ['Node.js CLI', 'TypeScript', 'Static Analysis', 'Dependency Auditing'],
        highlights: [
            'env validation, CVE auditing and React static analysis in one command',
            'Zero config — works out of the box',
            'CI integration, JSON output and strict mode',
            'Shipped through 8 releases, from v1.1.0 to v3.4.1',
        ],
        link: 'https://github.com/kevinpatildxd/devguard',
    },
    {
        name: 'Compi',
        category: 'Full-Stack Platform',
        status: 'completed',
        description:
            'Full-stack competition and raffle platform where users browse live competitions, purchase tickets, and win prizes. Public storefront with countdowns and a winners showcase, secure Stripe checkout, and an admin dashboard for managing competitions, tickets and users.',
        outcome: 'Stripe payments, JWT auth and PDF ticket generation shipped',
        tags: ['Next.js 14', 'Express + TypeScript', 'PostgreSQL', 'Stripe', 'Cloudinary'],
        highlights: [
            'Secure Stripe checkout with PDF ticket generation',
            'JWT-authenticated admin dashboard',
            'Live countdowns and winners showcase',
        ],
        // github.com/kevinpatildxd/compi-web returns 404 for anonymous visitors
        // (private or renamed), so no public source link until it is opened up.
    },
    {
        name: 'GV Fitness',
        category: 'Web App',
        status: 'completed',
        description:
            'Gym management web app built for a fitness centre, letting staff manage members, track regular and personal-training memberships, log expenses, handle inquiries, and generate PDF invoices. Real-time dashboard with expiry alerts and WhatsApp quick-contact links, behind role-protected routes.',
        outcome: 'Deployed internal tool covering end-to-end gym operations',
        tags: ['React + Vite', 'PHP REST API', 'MySQL', 'Tailwind v4', 'Shadcn UI'],
        highlights: [
            'Membership tracking, expense logging and PDF invoicing',
            'Real-time dashboard with expiry alerts',
            'Role-protected admin routes',
        ],
    },
    {
        name: 'StackIt',
        category: 'Mobile + API',
        status: 'completed',
        description:
            'Collaborative Q&A forum platform built during a 7-hour hackathon. Users post questions, submit answers, vote in real time, and filter by tags. Flutter mobile frontend backed by a Node.js/Express REST API with PostgreSQL and Socket.io notifications.',
        outcome: 'Production-ready full-stack app delivered in 7 hours',
        tags: ['Flutter', 'Node.js + Express', 'PostgreSQL', 'Socket.io'],
        highlights: [
            'Production-ready full-stack app built in a single 7-hour sprint',
            'Real-time voting and Socket.io notifications',
            'Built for the ODOO hackathon',
        ],
        link: 'https://github.com/kevinpatildxd/ODOO_SIGKILL_BOTS',
    },
    {
        name: 'Blockchain Supply Chain dApp',
        category: 'Web3',
        status: 'completed',
        description:
            'Decentralised full-stack application for supply chain management on Ethereum. Users connect a MetaMask wallet and register products on-chain, with state transitions (Created → Shipped → Delivered) enforced by a Solidity smart contract.',
        outcome: 'Deployed and tested on a local Hardhat Ethereum network',
        tags: ['Solidity', 'React', 'Hardhat', 'Ethers.js', 'MetaMask'],
        highlights: [
            'On-chain state machine enforced by the contract',
            'MetaMask wallet integration',
            'Full Hardhat test coverage',
        ],
        link: 'https://github.com/kevinpatildxd/smart-contract',
    },
    {
        name: 'MotoLink',
        category: 'Mobile App',
        status: 'ongoing',
        description:
            'Mobile app for motorcycle riding groups, combining low-latency group voice communication with real-time GPS tracking on a shared map. Voice chat is tuned for noisy environments and location updates are battery-efficient in the background.',
        outcome: 'Active build with voice and map foundations in place',
        tags: ['Flutter', 'Dart', 'WebRTC', 'GPS'],
        highlights: [
            'Low-latency group voice over WebRTC',
            'Shared live map with real-time rider positions',
            'Battery-efficient background location updates',
        ],
        link: 'https://github.com/kevinpatildxd/moto-link-app',
    },
    {
        name: 'React + CryptoJS Privacy Suite',
        category: 'Web App',
        status: 'live',
        description:
            'A suite of six standalone, privacy-focused web apps built with React 19 and CryptoJS — notes, todos, journaling, expense tracking, contacts, and anonymous feedback. All sensitive data is AES-encrypted client-side before it reaches localStorage, so plaintext never leaves the browser.',
        outcome: '6 encrypted mini-apps released as an open-source reference suite',
        tags: ['React 19', 'CryptoJS AES', 'Vite', 'Privacy-First'],
        highlights: [
            'AES encryption applied client-side before persistence',
            'Plaintext never leaves the browser',
            'Six standalone apps in one open-source suite',
        ],
        link: 'https://github.com/kevinpatildxd/Reactjs-cryptojs-Based-project',
    },
];

export interface Certification {
    title: string;
    issuer: string;
    date: string;
    description: string;
    badge: string;
    /** Forage credential URL - add yours and the "View Credential" button lights up. */
    href?: string;
}

export const certifications: Certification[] = [
    {
        title: 'Cybersecurity Job Simulation',
        issuer: 'Mastercard (via Forage)',
        date: 'October 2025',
        description:
            'Job simulation covering security awareness, threat identification, and implementing security measures in enterprise environments.',
        badge: '🔐',
    },
    {
        title: 'Cyber Job Simulation',
        issuer: 'Deloitte (via Forage)',
        date: 'October 2025',
        description:
            'Hands-on cyber security simulation focused on risk assessment, vulnerability analysis, and security best practices in corporate environments.',
        badge: '🛡️',
    },
];

export const skillCategories = [
    {
        title: 'Frontend',
        icon: '🎨',
        skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Shadcn UI', 'HTML/CSS'],
    },
    {
        title: 'Backend & Data',
        icon: '⚙️',
        skills: ['Node.js', 'Express', 'PHP REST APIs', 'PostgreSQL', 'MySQL', 'Firebase', 'Socket.io'],
    },
    {
        title: 'Mobile & Web3',
        icon: '📱',
        skills: ['Flutter', 'Dart', 'WebRTC', 'Solidity', 'Hardhat', 'Ethers.js'],
    },
    {
        title: 'Tooling & Practice',
        icon: '🔧',
        skills: ['Git', 'Stripe', 'Cloudinary', 'React Query', 'Vite', 'CI static analysis'],
    },
];

/** Headline numbers, derived so Home and About can never disagree again. */
export const stats = [
    { label: 'Projects', value: String(projects.length) },
    { label: 'GPA', value: profile.education.gpa },
    { label: 'Published Paper', value: '1' },
];
