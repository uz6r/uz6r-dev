"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@repo/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@repo/ui/drawer";

const COOKIE_NAME = "a2hs";
const MAX_NOT_NOW = 7;
const COOKIE_MAX_AGE_DAYS = 365;
const DESKTOP_BREAKPOINT = "(min-width: 768px)";

function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    const value = match?.[1];
    return value != null ? decodeURIComponent(value) : null;
}

function setCookie(name: string, value: string) {
    if (typeof document === "undefined") return;
    const maxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function isMobileIOS(): boolean {
    if (typeof navigator === "undefined") return false;
    return (
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    );
}

function isMobileAndroid(): boolean {
    if (typeof navigator === "undefined") return false;
    return /Android/.test(navigator.userAgent);
}

function isAlreadyInstalled(): boolean {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(display-mode: standalone)").matches) return true;
    if ("standalone" in navigator && (navigator as { standalone?: boolean }).standalone)
        return true;
    return false;
}

function shouldShowBanner(): boolean {
    if (isAlreadyInstalled()) return false;
    const val = getCookie(COOKIE_NAME);
    if (val === "permanent") return false;
    if (val !== null) {
        const n = parseInt(val, 10);
        if (!Number.isNaN(n) && n >= MAX_NOT_NOW) return false;
    }
    return isMobileIOS() || isMobileAndroid();
}

function useIsDesktop() {
    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
        const m = window.matchMedia(DESKTOP_BREAKPOINT);
        const handler = () => setIsDesktop(m.matches);
        queueMicrotask(() => handler());
        m.addEventListener("change", handler);
        return () => m.removeEventListener("change", handler);
    }, []);
    return isDesktop;
}

function A2HSContent({
    isIOS,
    onNotNow,
    onDoNotShowAgain,
}: {
    isIOS: boolean;
    onNotNow: () => void;
    onDoNotShowAgain: () => void;
}) {
    return (
        <>
            <p className="text-muted-foreground text-sm leading-relaxed">
                {isIOS ? (
                    <>
                        📲 Tap the <strong>Share</strong> button in Safari, then choose{" "}
                        <strong>“Add to Home Screen”</strong> to install. Quick and easy!
                    </>
                ) : (
                    <>
                        📱 Use your browser’s <strong>“Add to Home Screen”</strong> or install
                        prompt to get the app on your device.
                    </>
                )}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-end gap-3">
                <button
                    type="button"
                    onClick={onNotNow}
                    className="text-muted-foreground hover:text-foreground text-sm underline-offset-2 hover:underline"
                >
                    Not now
                </button>
                <button
                    type="button"
                    onClick={onDoNotShowAgain}
                    className="text-muted-foreground hover:text-foreground text-sm underline-offset-2 hover:underline"
                >
                    Do not tell me again
                </button>
            </div>
        </>
    );
}

export function A2HSBanner() {
    const [visible, setVisible] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const isDesktop = useIsDesktop();

    useEffect(() => {
        if (!shouldShowBanner()) return;
        queueMicrotask(() => {
            setIsIOS(isMobileIOS());
            setVisible(true);
        });
    }, []);

    const handleNotNow = () => {
        const val = getCookie(COOKIE_NAME);
        if (val === "permanent") return;
        const next = val ? Math.min(MAX_NOT_NOW, parseInt(val, 10) + 1) : 1;
        setCookie(COOKIE_NAME, String(next));
        setVisible(false);
    };

    const handleDoNotShowAgain = () => {
        setCookie(COOKIE_NAME, "permanent");
        setVisible(false);
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) handleNotNow();
    };

    if (!visible) return null;

    const content = (
        <A2HSContent
            isIOS={isIOS}
            onNotNow={handleNotNow}
            onDoNotShowAgain={handleDoNotShowAgain}
        />
    );

    if (isDesktop) {
        return (
            <Dialog open={visible} onOpenChange={handleOpenChange}>
                <DialogContent className="max-w-sm" showCloseButton>
                    <DialogHeader>
                        <DialogTitle>📱 Add to Home Screen</DialogTitle>
                    </DialogHeader>
                    <div className="px-1">{content}</div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={visible} onOpenChange={handleOpenChange} direction="bottom">
            <DrawerContent className="max-h-[85vh] border-t">
                <div className="mx-auto w-full max-w-lg">
                    <DrawerHeader>
                        <DrawerTitle>📱 Add to Home Screen</DrawerTitle>
                    </DrawerHeader>
                    <div className="px-4 pb-6 pt-0">{content}</div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
