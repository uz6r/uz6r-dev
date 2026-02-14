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
                <h2 className="text-muted-foreground mb-8 text-sm font-medium uppercase tracking-wider">
                    {title}
                </h2>
                <Accordion className="w-full">
                    {items.map((item) => (
                        <AccordionItem key={item.id} value={item.id}>
                            <AccordionTrigger className="py-4 hover:no-underline">
                                <div className="flex flex-col items-start gap-1 text-left">
                                    <span className="font-medium">{item.role}</span>
                                    <span className="text-muted-foreground text-sm">
                                        {item.company} · {item.period}
                                    </span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                                    {item.summary}
                                </p>
                                {item.highlights?.length ? (
                                    <>
                                        <Separator className="mb-3" />
                                        <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                                            {item.highlights.map((h, i) => (
                                                <li key={i}>{h}</li>
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
