"use server";

import { Resend } from "resend";
import { redirect } from "next/navigation";

// Contact form intentionally lightweight.
// Designed to migrate later to backend or graphql without UI changes.
// Resend: first-class Next.js/Vercel support, keeps recipient email server-side.

const resend = new Resend(process.env.RESEND_API_KEY);

export type SubmitState = { ok: true } | { ok: false; error: string };

export async function submitContactForm(
    prevState: SubmitState | null,
    formData: FormData
): Promise<SubmitState> {
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    if (!name || !email || !message) {
        return { ok: false, error: "Name, email, and message are required." };
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM;
    const to = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !from || !to) {
        return {
            ok: false,
            error: "Contact form is not configured. Missing RESEND_API_KEY, RESEND_FROM, or CONTACT_TO_EMAIL.",
        };
    }

    const { data, error } = await resend.emails.send({
        from,
        to,
        replyTo: email,
        subject: `Portfolio contact from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
        return { ok: false, error: error.message };
    }

    if (!data?.id) {
        return { ok: false, error: "Failed to send." };
    }

    redirect("/contact?sent=1");
}
