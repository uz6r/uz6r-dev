import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@repo/ui/accordion";
import { Separator } from "@repo/ui/separator";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { ExperienceItem } from "@/data/experience";

interface ExperienceProps {
    items: ExperienceItem[];
    title?: string;
}

export function Experience({ items, title = "Experience" }: ExperienceProps) {
    return (
        <Section>
            <Container>
                <h2
                    className="animate-fade-in-up text-muted-foreground mb-8 text-sm font-medium uppercase tracking-wider opacity-0"
                    style={{ animationDelay: "100ms" }}
                >
                    {title}
                </h2>
                <Accordion className="w-full">
                    {items.map((item, i) => (
                        <AccordionItem
                            key={item.id}
                            value={item.id}
                            className="animate-fade-in-up opacity-0"
                            style={{ animationDelay: `${180 + i * 70}ms` }}
                        >
                            <AccordionTrigger className="py-4 hover:no-underline">
                                <div className="flex flex-col items-start gap-1 text-left">
                                    <span className="font-medium">{item.role}</span>
                                    <span className="text-muted-foreground text-sm">
                                        {item.company} · {item.period}
                                    </span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                {item.summary ? (
                                    <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                                        {item.summary}
                                    </p>
                                ) : null}
                                {item.highlights?.length ? (
                                    <>
                                        {item.summary ? <Separator className="mb-3" /> : null}
                                        <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                                            {item.highlights.map((h, idx) => (
                                                <li key={idx}>{h}</li>
                                            ))}
                                        </ul>
                                    </>
                                ) : null}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Container>
        </Section>
    );
}
