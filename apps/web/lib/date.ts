// date utilities centralise localisation logic.
// keeps components clean and prevents repeated formatting code.

import { format, formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

// lightweight locale detection.
// avoids full i18n setup until backend introduces localisation needs.
function getLocale(): string {
    if (typeof navigator !== "undefined" && navigator.language) {
        return navigator.language;
    }
    return "en-MY";
}

function toDate(value: string | Date): Date {
    return typeof value === "string" ? new Date(value) : value;
}

/** Format as date only, e.g. "27 Jan 2026". Timezone-aware (browser/user environment). */
export function fmtLocalDt(dt: string | Date): string {
    const d = toDate(dt);
    if (Number.isNaN(d.getTime())) return "";
    return format(d, "d MMM yyyy", { locale: enUS });
}

/** Format as date and time, e.g. "27 Jan 2026, 21:30". Timezone-aware (browser/user environment). */
export function fmtLocalDtTm(dt: string | Date): string {
    const d = toDate(dt);
    if (Number.isNaN(d.getTime())) return "";
    return format(d, "d MMM yyyy, HH:mm", { locale: enUS });
}

/** Format as relative time, e.g. "3 days ago". Timezone-aware (browser/user environment). */
export function fmtRelative(dt: string | Date): string {
    const d = toDate(dt);
    if (Number.isNaN(d.getTime())) return "";
    return formatDistanceToNow(d, { addSuffix: true, locale: enUS });
}
