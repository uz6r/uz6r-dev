import type { Entry } from "@/types/entry";

export const entries: Entry[] = [
    {
        id: "tracepace",
        type: "project",
        title: "tracepace",
        description:
            "High-performance race data visualizer that transforms fitness activity files (.fit and .gpx) into minimalist, gallery-quality race posters.",
        url: "https://github.com/uz6r/tracepace",
        published: "2026",
        metadata: {
            stack: ["Next.js", "TypeScript", "Go", "Mapbox"],
            state: "MAINTENANCE",
        },
    },
    {
        id: "lembayung",
        type: "project",
        title: "lembayung",
        description:
            "Async Python engine for polling reservation availability via reverse-engineered APIs. Built to study rate-limiting, Altcha challenges, and automated bot defenses.",
        url: "https://github.com/uz6r/lembayung",
        published: "2026",
        metadata: { stack: ["Python", "AsyncIO"], state: "EXPERIMENTAL" },
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
