export interface ExperienceItem {
    id: string;
    company: string;
    role: string;
    period: string;
    summary: string;
    highlights?: string[];
}

export const experience: ExperienceItem[] = [
    {
        id: "1",
        company: "Company A",
        role: "Senior Software Engineer",
        period: "2022 – Present",
        summary:
            "Led initiatives across the platform team. Shipped improvements to reliability and developer experience.",
        highlights: [
            "Reduced p99 latency by 40% for core APIs",
            "Introduced structured logging and tracing",
            "Mentored 2 engineers",
        ],
    },
    {
        id: "2",
        company: "Company B",
        role: "Software Engineer",
        period: "2019 – 2022",
        summary: "Full-stack development on customer-facing and internal products.",
        highlights: [
            "Built and maintained critical checkout flow",
            "Migrated legacy services to new stack",
        ],
    },
];
