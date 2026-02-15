"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@repo/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from "@repo/ui/drawer";

// ResponsiveOverlay abstracts dialog vs drawer so UI logic
// does not need to care about viewport differences.
// Later this can remain unchanged when backend data becomes dynamic.

// Desktop uses Dialog for precision interactions.
// Mobile uses Drawer for better reachability and vertical flow.

const DESKTOP_BREAKPOINT = "(min-width: 768px)";

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

interface ResponsiveOverlayProps {
    trigger: React.ReactNode;
    title: string;
    children: React.ReactNode;
}

export function ResponsiveOverlay({ trigger, title, children }: ResponsiveOverlayProps) {
    const [open, setOpen] = useState(false);
    const isDesktop = useIsDesktop();

    const triggerWrapper = (
        <div
            role="button"
            tabIndex={0}
            className="contents"
            onClick={() => setOpen(true)}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpen(true);
                }
            }}
        >
            {trigger}
        </div>
    );

    if (isDesktop) {
        return (
            <>
                {triggerWrapper}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{title}</DialogTitle>
                        </DialogHeader>
                        <div className="min-w-0">{children}</div>
                    </DialogContent>
                </Dialog>
            </>
        );
    }

    return (
        <>
            {triggerWrapper}
            <Drawer open={open} onOpenChange={setOpen} direction="bottom">
                <DrawerContent>
                    <div className="mx-auto w-full max-w-lg p-8">
                        <DrawerHeader className="p-0">
                            <DrawerTitle>{title}</DrawerTitle>
                        </DrawerHeader>
                        <div className="min-w-0 pt-4">{children}</div>
                        <div className="flex justify-end pt-6">
                            <DrawerClose className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent">
                                Close
                            </DrawerClose>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
}
