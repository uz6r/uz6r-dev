import type { Project } from "@/types";

export const projects: Project[] = [
    {
        id: "1",
        title: "Project Alpha",
        description: "A system for X. Built with focus on performance and observability.",
        href: "#",
        tags: ["TypeScript", "React", "Node"],
        year: "2024",
    },
    {
        id: "2",
        title: "Project Beta",
        description: "Internal tooling that improved deployment frequency and reduced incidents.",
        tags: ["Go", "Kubernetes"],
        year: "2024",
    },
    {
        id: "3",
        title: "Project Gamma",
        description: "Open-source library for common patterns. Used by several teams.",
        href: "#",
        tags: ["Rust", "WASM"],
        year: "2023",
    },
];
