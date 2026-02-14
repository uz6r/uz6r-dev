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
        id: "courtsite",
        company: "Courtsite",
        role: "Software Engineer, Full Stack",
        period: "2022 – Present",
        highlights: [
            "Booking system features for real-time venue discovery.",
            "Scaled platform from ~97k to 700k+ users.",
            "Stack: Next.js, TypeScript, Python, GraphQL (Strawberry), SQLAlchemy, PostgreSQL.",
            "Payment integrations: KiplePay, SPay Global.",
            "Temporal workflows in Go for checkout, refunds, rescheduling.",
            "Cloudflare Turnstile, MyLHDN e-Invoice API.",
            "Raspberry Pi IoT lighting automation.",
            "Logging, monitoring, mentoring junior engineers.",
        ],
    },
    {
        id: "dwebly",
        company: "Dwebly",
        role: "Frontend Developer",
        period: "2021 – 2022",
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
        period: "2020 – 2021",
        highlights: [
            "Shipped UI components and production features.",
            "Code reviews and deployments.",
        ],
    },
];
