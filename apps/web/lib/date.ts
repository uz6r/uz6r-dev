// date utilities centralise localisation logic.
// keeps components clean and prevents repeated formatting code.

import { format, formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

// lightweight locale detection.
// avoids full i18n setup until backend introduces localisation needs.
const getLocale = (): string => {
    if (typeof navigator !== "undefined" && navigator.language) {
        return navigator.language;
    }
    return "en-MY";
};

const toDate = (value: string | Date): Date => {
    return typeof value === "string" ? new Date(value) : value;
};

export const fmtLocalDt = (dt: string | Date): string => {
    const d = toDate(dt);
    if (Number.isNaN(d.getTime())) return "";
    return format(d, "d MMM yyyy", { locale: enUS });
};

export const fmtLocalDtTm = (dt: string | Date): string => {
    const d = toDate(dt);
    if (Number.isNaN(d.getTime())) return "";
    return format(d, "d MMM yyyy, HH:mm", { locale: enUS });
};

export const fmtRelative = (dt: string | Date): string => {
    const d = toDate(dt);
    if (Number.isNaN(d.getTime())) return "";
    return formatDistanceToNow(d, { addSuffix: true, locale: enUS });
};
