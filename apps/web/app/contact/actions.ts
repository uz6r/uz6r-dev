"use server";

import { Resend } from "resend";

// Contact form intentionally lightweight.
// Resend errors are passed through with statusCode so the client can show real HTTP handling.

const resend = new Resend(process.env.RESEND_API_KEY);

export type SubmitState = { ok: true } | { ok: false; error: string; statusCode?: number | null };

function err(message: string, statusCode?: number | null): Extract<SubmitState, { ok: false }> {
    return { ok: false, error: message, statusCode: statusCode ?? null };
}

export async function submitContactForm(
    _prevState: SubmitState | null,
    formData: FormData
): Promise<SubmitState> {
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    if (!name || !email || !message) {
        return err("Name, email, and message are required.", 400);
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM;
    const to = process.env.CONTACT_TO_EMAIL;

    if (!to) {
        return err("Contact form is not configured. Missing CONTACT_TO_EMAIL.", 503);
    }

    // temporarily disabled resend submission.
    // using formsubmit.co until a custom domain is configured and verified.
    // try {
    //     const { data, error } = await resend.emails.send({
    //         from,
    //         to,
    //         replyTo: email,
    //         subject: `Portfolio contact from ${name}`,
    //         text: `From: ${name} <${email}>\n\n${message}`,
    //     });
    //
    //     if (error) {
    //         const code =
    //             "statusCode" in error && typeof error.statusCode === "number"
    //                 ? error.statusCode
    //                 : null;
    //         return err(error.message ?? "Failed to send.", code);
    //     }
    //
    //     if (!data?.id) {
    //         return err("Failed to send.", 502);
    //     }
    //
    //     return { ok: true };
    // } catch (e) {
    //     const message = e instanceof Error ? e.message : "Failed to send.";
    //     return err(message, null);
    // }

    try {
        const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ name, email, message }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            return err((data as { message?: string })?.message ?? "Failed to send.", res.status);
        }
        return { ok: true };
    } catch (e) {
        const message = e instanceof Error ? e.message : "Failed to send.";
        return err(message, null);
    }
}
