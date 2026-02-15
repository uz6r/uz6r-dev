// validation kept minimal intentionally.
// prevents dependency bloat and keeps client logic simple.

/** Simple, safe email regex (not overly strict). */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
    return EMAIL_REGEX.test(email.trim());
}

export function isNonEmpty(value: string): boolean {
    return value.trim().length > 0;
}
