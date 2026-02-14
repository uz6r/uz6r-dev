import { Badge } from "@repo/ui/badge";
import { Separator } from "@repo/ui/separator";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { Entry } from "@/types";

interface EntriesListProps {
    entries: Entry[];
    title?: string;
}

const entryTypeLabel: Record<NonNullable<Entry["type"]>, string> = {
    blog: "Blog",
    talk: "Talk",
    writing: "Writing",
    other: "Other",
};

export function EntriesList({ entries, title = "Writing & talks" }: EntriesListProps) {
    return (
        <Section>
            <Container>
                <h2 className="text-muted-foreground mb-8 text-sm font-medium uppercase tracking-wider">
                    {title}
                </h2>
                <ul className="space-y-0">
                    {entries.map((entry, index) => (
                        <li key={entry.id}>
                            {index > 0 && <Separator className="my-4" />}
                            <article className="py-2">
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                                    <div className="min-w-0">
                                        {entry.href ? (
                                            <a
                                                href={entry.href}
                                                className="font-medium hover:underline"
                                            >
                                                {entry.title}
                                            </a>
                                        ) : (
                                            <span className="font-medium">{entry.title}</span>
                                        )}
                                        {entry.type && (
                                            <Badge
                                                variant="outline"
                                                className="ml-2 text-xs font-normal"
                                            >
                                                {entryTypeLabel[entry.type]}
                                            </Badge>
                                        )}
                                    </div>
                                    {entry.date && (
                                        <span className="text-muted-foreground shrink-0 text-sm">
                                            {entry.date}
                                        </span>
                                    )}
                                </div>
                                {entry.summary && (
                                    <p className="text-muted-foreground mt-1 text-sm">
                                        {entry.summary}
                                    </p>
                                )}
                            </article>
                        </li>
                    ))}
                </ul>
            </Container>
        </Section>
    );
}
