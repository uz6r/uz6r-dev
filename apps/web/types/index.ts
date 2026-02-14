export interface Project {
    id: string;
    title: string;
    description: string;
    href?: string;
    tags?: string[];
    year?: string;
}

export interface Entry {
    id: string;
    title: string;
    date?: string;
    summary?: string;
    href?: string;
    type?: "blog" | "talk" | "writing" | "other";
}
