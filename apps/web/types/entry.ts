export interface Entry {
    id: string;
    type: string;
    title: string;
    slug?: string;
    description?: string;
    url?: string;
    image_urls?: string[];
    created?: string;
    updated?: string;
    published?: string;
    archived?: boolean;
    metadata?: Record<string, unknown>;
}

export interface ProjectMetadata {
    stack?: string[];
}
