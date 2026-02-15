"use client";

import { useActionState } from "react";
import { Input } from "@repo/ui/input";
import { Textarea } from "@repo/ui/textarea";
import { Button } from "@/components/button";
import { Label } from "@repo/ui/label";
import { submitContactForm, type SubmitState } from "@/app/contact/actions";

const initialState: SubmitState = { ok: true };

export function ContactForm() {
    const [state, formAction] = useActionState(submitContactForm, initialState);

    return (
        <form action={formAction} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" type="text" required placeholder="Your name" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Your message"
                    rows={4}
                />
            </div>
            {state && !state.ok && (
                <p className="text-destructive text-sm" role="alert">
                    {state.error}
                </p>
            )}
            <Button type="submit">Send</Button>
        </form>
    );
}
