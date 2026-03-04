"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/card";
import { Badge } from "@repo/ui/badge";
import { ResponsiveOverlay } from "@/components/ui/responsive-overlay";
import type { Entry } from "@/types/entry";
import type { ProjectMetadata } from "@/types/entry";

function asProjectMetadata(metadata?: Record<string, unknown>): ProjectMetadata | undefined {
    if (!metadata || typeof metadata !== "object") return undefined;
    const stack = metadata.stack;
    if (stack && (!Array.isArray(stack) || !stack.every((s) => typeof s === "string")))
        return undefined;
    return { stack: stack as string[], state: metadata.state as ProjectMetadata["state"] };
}

function getStateVariant(state?: string) {
    switch (state) {
        case "PUBLISHED":
            return "success";
        case "EXPERIMENTAL":
        case "WIP":
        case "PROPOSED":
            return "warning";
        case "READONLY":
        case "ARCHIVED":
        default:
            return "secondary";
    }
}

interface ProjectCardDrawerProps {
    entry: Entry;
}

export function ProjectCardDrawer({ entry }: ProjectCardDrawerProps) {
    const meta = asProjectMetadata(entry.metadata);
    const stack = meta?.stack ?? [];
    const href = entry.url ?? undefined;

    const TitleWithBadge = (
        <div className="flex items-center gap-2">
            <span>{entry.title}</span>
            {meta?.state && (
                <Badge
                    variant={getStateVariant(meta.state)}
                    className="text-[10px] h-5 px-1.5 font-medium uppercase tracking-wider"
                >
                    {meta.state.replace("_", " ")}
                </Badge>
            )}
        </div>
    );

    return (
        <ResponsiveOverlay
            trigger={
                <Card className="cursor-pointer border transition-colors text-left hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring h-full flex flex-col">
                    <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-base">{TitleWithBadge}</CardTitle>
                            {entry.published && (
                                <span className="text-muted-foreground shrink-0 text-xs mt-1">
                                    {entry.published}
                                </span>
                            )}
                        </div>
                        {entry.description && (
                            <CardDescription className="line-clamp-2 text-sm mt-1">
                                {entry.description}
                            </CardDescription>
                        )}
                    </CardHeader>
                    {stack.length > 0 && (
                        <CardContent className="pt-0 mt-auto">
                            <div className="flex flex-wrap gap-1.5">
                                {stack.map((tech) => (
                                    <Badge
                                        key={tech}
                                        variant="secondary"
                                        className="text-xs font-normal"
                                    >
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    )}
                </Card>
            }
            title={TitleWithBadge}
        >
            <div>
                {entry.published && (
                    <p className="text-muted-foreground mb-3 text-xs">{entry.published}</p>
                )}
                {entry.description && (
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        {entry.description}
                    </p>
                )}
                {stack.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-1.5">
                        {stack.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs font-normal">
                                {tech}
                            </Badge>
                        ))}
                    </div>
                )}
                {href && (
                    <a
                        href={href}
                        className="inline-flex items-center text-sm font-medium underline-offset-2 hover:underline"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        View project →
                    </a>
                )}
            </div>
        </ResponsiveOverlay>
    );
}
