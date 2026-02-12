"use client";

import { useSyncExternalStore } from "react";
import { Button } from "@repo/ui/button";

function useMounted() {
    return useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );
}

export function ThemeToggle() {
    const mounted = useMounted();

    const toggle = () => {
        const el = document.documentElement;
        const dark = el.classList.toggle("dark");
        localStorage.setItem("theme", dark ? "dark" : "light");
    };

    if (!mounted) return null;

    return (
        <Button variant="ghost" size="sm" onClick={toggle}>
            Toggle theme
        </Button>
    );
}
