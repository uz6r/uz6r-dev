"use client";

import { useState, useEffect, useCallback } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@repo/ui/switch";

const THEME_CHANGE_EVENT = "themechange";

function readIsDark(): boolean {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("dark");
}

export function ThemeToggle() {
    const [ready, setReady] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const handler = () => setIsDark(readIsDark());
        window.addEventListener(THEME_CHANGE_EVENT, handler);
        const m = window.matchMedia("(prefers-color-scheme: dark)");
        m.addEventListener("change", handler);
        queueMicrotask(() => {
            setReady(true);
            setIsDark(readIsDark());
        });
        return () => {
            window.removeEventListener(THEME_CHANGE_EVENT, handler);
            m.removeEventListener("change", handler);
        };
    }, []);

    const setTheme = useCallback((dark: boolean) => {
        const el = document.documentElement;
        if (dark) el.classList.add("dark");
        else el.classList.remove("dark");
        localStorage.setItem("theme", dark ? "dark" : "light");
        window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
        setIsDark(dark);
    }, []);

    if (!ready) return null;

    return (
        <div className="flex items-center gap-2">
            <span
                className={`transition-all duration-200 ease-out ${!isDark ? "scale-110 opacity-100" : "scale-95 opacity-40"}`}
                aria-hidden
            >
                <Sun className="size-3.5 text-amber-500" aria-hidden />
            </span>
            <Switch
                checked={isDark}
                onCheckedChange={setTheme}
                className="data-unchecked:bg-amber-400/90 data-unchecked:border-amber-500/60 data-unchecked:hover:bg-amber-400 data-checked:bg-secondary data-checked:border-secondary transition-colors duration-200"
                aria-label="Toggle dark mode"
            />
            <span
                className={`transition-all duration-200 ease-out ${isDark ? "scale-110 opacity-100" : "scale-95 opacity-40"}`}
                aria-hidden
            >
                <Moon className="size-3.5 text-primary" aria-hidden />
            </span>
        </div>
    );
}
