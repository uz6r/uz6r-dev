"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@repo/ui/input";
import { Textarea } from "@repo/ui/textarea";
import { Button } from "@repo/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/form";
import { useToast } from "@repo/ui/toast";
import { contactFormSchema, type ContactFormValues } from "@/app/contact/schema";
import { cn } from "@repo/ui/utils";
import { submitContactForm } from "@/app/contact/actions";

export const ContactForm = () => {
    const [loading, setLoading] = useState(false);
    const { add } = useToast();

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: { name: "", email: "", message: "" },
        mode: "onChange",
    });

    const canSubmit = form.formState.isValid;

    async function onSubmit(data: ContactFormValues) {
        if (loading) return;
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("message", data.message);

            const result = await submitContactForm(null, formData);

            if (!result.ok) {
                add({ title: result.error, type: "error" });
                return;
            }

            add({ title: "Message sent successfully.", type: "primary" });
            form.reset();
        } catch (e) {
            const message = e instanceof Error ? e.message : "Failed to send message.";
            add({ title: message, type: "error" });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your name" autoComplete="name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Your message" rows={4} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <span className={cn("mt-4 block", (!canSubmit || loading) && "cursor-not-allowed")}>
                    <Button
                        type="submit"
                        variant={!canSubmit || loading ? "disabled" : "default"}
                        disabled={!canSubmit || loading}
                        aria-busy={loading}
                    >
                        {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : "Send"}
                    </Button>
                </span>
            </form>
        </Form>
    );
};
