export interface ExperienceItem {
    id: string;
    company: string;
    role: string;
    period: string;
    summary?: string;
    highlights?: string[];
}

export const experience: ExperienceItem[] = [
    {
        id: "gxbank",
        company: "GXBank",
        role: "Software Engineer, Fullstack",
        period: "Jun 2026 – Present",
        summary:
            "Contracted via MyValiant. GXBank is Malaysia's first and leading digital bank, backed by Grab and Singtel.",
        highlights: [
            "Contributing to the internal operations applications supporting regional banking workflows across ASEAN.",
            "Delivering incremental improvements to operational tooling for the Operations team, supporting day-to-day banking processes.",
        ],
    },
    {
        id: "courtsite",
        company: "Courtsite",
        role: "Software Engineer",
        period: "Apr 2023 – May 2026",
        summary:
            "Courtsite is a leading Progressive Web App in Malaysia that enables users to effortlessly search and book spaces for various sports. As a B2B2C aggregator platform, we foster a community of players and actively promote social games to elevate the overall playing experience.",
        highlights: [
            "Architected and maintained full-stack features utilizing TypeScript-driven Next.js frontend and Python backend infrastructure with GraphQL (Strawberry), SQLAlchemy, and PostgreSQL.",
            'Spearheaded development of the flagship "Book" feature, empowering users to seamlessly discover and reserve venues through intelligent real-time filtering across time slots, locations and sport categories.',
            "Engineered robust third-party payment integrations with KiplePay and SPay Global, implementing sophisticated error handling, retry mechanisms, and comprehensive transaction monitoring for seamless operations.",
            "Developed high-performance backend services in Go for mission-critical booking workflows encompassing checkout processes, dynamic rescheduling and external API integrations, leveraging Temporal for workflow orchestration.",
            "Implemented Cloudflare Turnstile security integration to combat automated booking exploitation, significantly reducing fraudulent bot activity and protecting platform integrity.",
            "Drove platform scalability initiatives supporting explosive user growth from 97,000 to 800,000+ users, delivering strategic backend optimizations and UX enhancements that accelerated performance by over 50%.",
            "Implemented MyLHDN e-Invois API integration to streamline automated generation of tax-compliant invoices for B2B2C operator partnerships.",
            "Led technical mentorship and developer onboarding programs through comprehensive code reviews, system architecture walkthroughs and documentation standardization.",
        ],
    },
    {
        id: "dwebly",
        company: "Dwebly",
        role: "Frontend Developer",
        period: "2022 – 2023",
        highlights: [
            "Vue.js and Nuxt.js headless ecommerce platform.",
            "REST API integrations.",
            "CMS performance refactors.",
        ],
    },
    {
        id: "thc",
        company: "The Hacker Collective",
        role: "Junior Software Developer",
        period: "2021 – 2022",
        highlights: [
            "Shipped UI components and production features.",
            "Code reviews and deployments.",
        ],
    },
];
