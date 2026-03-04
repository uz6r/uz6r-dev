import type { Entry } from "@/types/entry";

export const entries: Entry[] = [
    {
        id: "lembayung",
        type: "project",
        title: "lembayung",
        description:
            "Async Python engine for polling reservation availability via reverse-engineered APIs. Built to study rate-limiting, Altcha challenges, and automated bot defenses.",
        url: "https://github.com/uz6r/lembayung",
        published: "2026",
        metadata: { stack: ["Python", "AsyncIO"], state: "PUBLISHED" },
    },
    {
        id: "orders-dashboard",
        type: "project",
        title: "orders-dashboard",
        description:
            "A single-page application to view and filter orders with persistent session storage. Includes CRUD API backend.",
        url: "https://github.com/uz6r/orders-dashboard",
        published: "2026",
        metadata: { stack: ["Vue 3", "Vite", "Node.js", "Express", "MySQL"], state: "PUBLISHED" },
    },
    {
        id: "text-rewriter",
        type: "project",
        title: "text-rewriter",
        description:
            'An open-source Python script leveraging NLTK and TextBlob to "humanize" AI-generated text for more natural readability.',
        url: "https://github.com/uz6r/text-rewriter",
        published: "2023",
        metadata: { stack: ["Python", "NLTK", "TextBlob"], state: "READ_ONLY" },
    },
    {
        id: "dotfiles",
        type: "project",
        title: "dotfiles",
        description:
            "My personal dotfiles managed as infra-as-code using GNU stow with an automated bootstrap setup and CI linting workflow.",
        url: "https://github.com/uz6r/dotfiles",
        published: "2025",
        metadata: { stack: ["Shell", "Make", "GNU Stow"], state: "PUBLISHED" },
    },
    {
        id: "nadi",
        type: "project",
        title: "nadi",
        description:
            "NFC-powered portfolio concept. Server-side first, minimal interface, identity-focused. Experimental engineering project for professionals.",
        published: "2026",
        metadata: {
            stack: ["Next.js", "TypeScript", "NFC", "GraphQL (planned)"],
            state: "PROPOSED",
        },
    },
];
