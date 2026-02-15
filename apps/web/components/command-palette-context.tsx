"use client";

import {
    createContext,
    useContext,
    useState,
    useCallback,
    type Dispatch,
    type SetStateAction,
} from "react";

type CommandPaletteContextValue = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    openPalette: () => void;
};

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(null);

export function useCommandPalette() {
    const ctx = useContext(CommandPaletteContext);
    if (!ctx) return null;
    return ctx;
}

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const openPalette = useCallback(() => setOpen(true), []);

    return (
        <CommandPaletteContext.Provider value={{ open, setOpen, openPalette }}>
            {children}
        </CommandPaletteContext.Provider>
    );
}
