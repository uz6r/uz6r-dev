import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Navbar } from "@/components/navbar";
import { ContactForm } from "@/components/contact-form";

export const metadata = {
    title: "Contact",
};

// Contact form intentionally lightweight.
// Designed to migrate later to backend or graphql without UI changes.
// Resend: first-class Next.js/Vercel support, recipient email stays server-side.

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <main>
                <Section>
                    <Container className="space-y-6">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                                Contact
                            </h1>
                            <p className="text-muted-foreground mt-1 text-sm">
                                Send a message and I&apos;ll get back to you.
                            </p>
                        </div>
                        <ContactForm />
                    </Container>
                </Section>
            </main>
        </>
    );
}
