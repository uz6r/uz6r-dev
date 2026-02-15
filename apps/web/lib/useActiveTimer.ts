"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Tracks cumulative active time (tab visible) in seconds.
 * Resets when the tab becomes hidden (visibilitychange → hidden).
 * Use for delayed prompts that should only run after sustained engagement.
 */
export function useActiveTimer(): number {
    const [activeSeconds, setActiveSeconds] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        function tick() {
            if (typeof document === "undefined") return;
            if (document.visibilityState === "visible") {
                setActiveSeconds((s) => s + 1);
            } else {
                setActiveSeconds(0);
            }
        }

        function onVisibilityChange() {
            if (document.visibilityState === "hidden") {
                setActiveSeconds(0);
                if (intervalRef.current !== null) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            } else {
                if (intervalRef.current === null) {
                    intervalRef.current = setInterval(tick, 1000);
                }
            }
        }

        if (document.visibilityState === "visible") {
            intervalRef.current = setInterval(tick, 1000);
        }
        document.addEventListener("visibilitychange", onVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", onVisibilityChange);
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, []);

    return activeSeconds;
}
