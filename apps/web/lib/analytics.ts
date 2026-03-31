import { track as analyticsTrack } from "@vercel/analytics";

const SESSION_KEY = "uz6r_session";

function getOrCreateSessionId(): string {
    if (typeof window === "undefined") return "";
    let sessionId = localStorage.getItem(SESSION_KEY);
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem(SESSION_KEY, sessionId);
    }
    return sessionId;
}

export function track(event: string, properties?: Record<string, unknown>) {
    if (typeof window !== "undefined") {
        analyticsTrack(event, {
            ...properties,
            sessionId: getOrCreateSessionId(),
        });
    }
}
