"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/card";
import { Badge } from "@repo/ui/badge";
import { ResponsiveOverlay } from "@/components/ui/responsive-overlay";
import type { Entry } from "@/types/entry";
import type { ProjectMetadata } from "@/types/entry";

function asProjectMetadata(metadata?: Record<string, unknown>): ProjectMetadata | undefined {
    if (!metadata || typeof metadata !== "object") return undefined;
    const stack = metadata.stack;
    if (!Array.isArray(stack) || !stack.every((s) => typeof s === "string")) return undefined;
    return { stack: stack as string[] };
}

interface ProjectCardDrawerProps {
    entry: Entry;
}

export function ProjectCardDrawer({ entry }: ProjectCardDrawerProps) {
    const meta = asProjectMetadata(entry.metadata);
    const stack = meta?.stack ?? [];
    const href = entry.url ?? undefined;

    return (
        <ResponsiveOverlay
            trigger={
                <Card className="cursor-pointer border transition-colors text-left hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-base">{entry.title}</CardTitle>
                            {entry.published && (
                                <span className="text-muted-foreground shrink-0 text-xs">
                                    {entry.published}
                                </span>
                            )}
                        </div>
                        {entry.description && (
                            <CardDescription className="line-clamp-2 text-sm">
                                {entry.description}
                            </CardDescription>
                        )}
                    </CardHeader>
                    {stack.length > 0 && (
                        <CardContent className="pt-0">
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
            title={entry.title}
        >
            <div className="px-1">
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
