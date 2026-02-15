"use client";

import { useEffect, useState } from "react";

// Rotating roles highlight multidisciplinary identity.
// Typewriter + cursor for a clear, readable effect while staying minimal.

const ROLES = [
    "full stack developer",
    "software engineer",
    "backend engineer",
    "marathoner",
    "distance runner",
    "hybrid athlete",
    "cinephile",
];

const TYPE_DELAY_MS = 90;
const DELETE_DELAY_MS = 55;
const PAUSE_AFTER_TYPING_MS = 2200;
const FIRST_ROLE = ROLES[0] ?? "";

type Phase = "typing" | "pausing" | "deleting";

export function RotatingRoles({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);
    const [roleIndex, setRoleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(FIRST_ROLE.length);
    const [phase, setPhase] = useState<Phase>("pausing");
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        queueMicrotask(() => setMounted(true));
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        queueMicrotask(() => setPrefersReducedMotion(mq.matches));
        const listener = () => setPrefersReducedMotion(mq.matches);
        mq.addEventListener("change", listener);
        return () => mq.removeEventListener("change", listener);
    }, [mounted]);

    const role = ROLES[roleIndex] ?? FIRST_ROLE;

    // Typewriter: type → pause → delete → next role
    useEffect(() => {
        if (!mounted || prefersReducedMotion) return;

        if (phase === "typing") {
            if (charIndex < role.length) {
                const id = setTimeout(() => setCharIndex((c) => c + 1), TYPE_DELAY_MS);
                return () => clearTimeout(id);
            }
            queueMicrotask(() => setPhase("pausing"));
            return;
        }

        if (phase === "pausing") {
            const id = setTimeout(() => setPhase("deleting"), PAUSE_AFTER_TYPING_MS);
            return () => clearTimeout(id);
        }

        if (phase === "deleting") {
            if (charIndex > 0) {
                const id = setTimeout(() => setCharIndex((c) => c - 1), DELETE_DELAY_MS);
                return () => clearTimeout(id);
            }
            queueMicrotask(() => {
                setRoleIndex((i) => (i + 1) % ROLES.length);
                setPhase("typing");
            });
            return;
        }
    }, [mounted, prefersReducedMotion, roleIndex, role.length, charIndex, phase]);

    // Server and first client render: same static text so hydration matches.
    const displayText = mounted && !prefersReducedMotion ? role.slice(0, charIndex) : FIRST_ROLE;
    const showCursor =
        mounted &&
        !prefersReducedMotion &&
        (phase === "typing" || phase === "pausing" || (phase === "deleting" && charIndex > 0));

    // Cursor always in DOM with same structure to avoid hydration mismatch.
    // Visibility toggled via class so server and client initial markup are identical.
    const cursorVisibleClass = showCursor
        ? "w-0.5 animate-cursor-blink opacity-100"
        : "w-0 overflow-hidden opacity-0";

    return (
        <span className={className ?? undefined} aria-live="polite">
            {displayText}
            <span
                className={`inline-block h-[1em] shrink-0 align-middle bg-current ${cursorVisibleClass}`}
                style={{ marginLeft: "2px" }}
                aria-hidden
            />
        </span>
    );
}
