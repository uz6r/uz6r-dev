"use client";

import { Search } from "lucide-react";
import { useCommandPalette } from "@/components/command-palette-context";

export function CommandPaletteTrigger() {
    const ctx = useCommandPalette();
    if (!ctx) return null;

    return (
        <button
            type="button"
            onClick={ctx.openPalette}
            className="text-muted-foreground hover:text-foreground flex w-full max-w-[200px] items-center gap-2 rounded-md border border-input bg-transparent px-3 py-1.5 text-left text-sm transition-colors sm:max-w-[240px]"
            aria-label="Open command palette (⌘K)"
        >
            <span className="shrink-0 opacity-60" aria-hidden>
                <Search className="size-3.5" aria-hidden />
            </span>
            <span className="truncate">Search pages…</span>
            <kbd className="text-muted-foreground ml-auto hidden shrink-0 text-[10px] sm:inline">
                ⌘K
            </kbd>
        </button>
    );
}
