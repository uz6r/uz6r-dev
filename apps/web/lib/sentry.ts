import * as Sentry from "@sentry/nextjs";

export function captureError(error: Error, context?: Record<string, unknown>) {
    if (context) {
        Sentry.setContext("extra", context);
    }
    Sentry.captureException(error);
}

export function captureMessage(message: string, level: Sentry.SeverityLevel = "info") {
    Sentry.captureMessage(message, { level });
}

export function setUser(user: { id: string; email?: string; username?: string }) {
    Sentry.setUser({
        id: user.id,
        email: user.email,
        username: user.username,
    });
}

export function clearUser() {
    Sentry.setUser(null);
}

export function addBreadcrumb(
    category: string,
    message: string,
    level: Sentry.SeverityLevel = "info"
) {
    Sentry.addBreadcrumb({ category, message, level });
}
