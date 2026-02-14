"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/card";
import { Badge } from "@repo/ui/badge";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@repo/ui/drawer";
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
    const [open, setOpen] = useState(false);
    const meta = asProjectMetadata(entry.metadata);
    const stack = meta?.stack ?? [];
    const href = entry.url ?? undefined;

    return (
        <Drawer open={open} onOpenChange={setOpen} direction="bottom">
            <Card
                role="button"
                tabIndex={0}
                className="cursor-pointer transition-all duration-200 hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => setOpen(true)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpen(true);
                    }
                }}
            >
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
            <DrawerContent>
                <div className="mx-auto w-full max-w-lg">
                    <DrawerHeader>
                        <DrawerTitle>{entry.title}</DrawerTitle>
                        {entry.published && (
                            <DrawerDescription>{entry.published}</DrawerDescription>
                        )}
                    </DrawerHeader>
                    <div className="px-4 pb-4">
                        {entry.description && (
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                {entry.description}
                            </p>
                        )}
                        {stack.length > 0 && (
                            <div className="mb-4 flex flex-wrap gap-1.5">
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
                        )}
                    </div>
                    <DrawerFooter className="flex-row gap-2 pt-0">
                        {href && (
                            <a
                                href={href}
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium underline-offset-2 hover:underline"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                View project →
                            </a>
                        )}
                        <DrawerClose className="mt-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent">
                            Close
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
