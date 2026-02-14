import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProjectCardDrawer } from "@/components/sections/project-card-drawer";
import type { Entry } from "@/types/entry";

const PROJECT_TYPE = "project";

interface ProjectsGridProps {
    entries: Entry[];
    title?: string;
}

export function ProjectsGrid({ entries, title = "Projects" }: ProjectsGridProps) {
    const projects = entries.filter((e) => e.type === PROJECT_TYPE);

    return (
        <Section>
            <Container>
                <h2
                    className="animate-fade-in-up text-muted-foreground mb-8 text-sm font-medium uppercase tracking-wider opacity-0"
                    style={{ animationDelay: "100ms" }}
                >
                    {title}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    {projects.map((entry, i) => (
                        <div
                            key={entry.id}
                            className="animate-fade-in-up opacity-0"
                            style={{ animationDelay: `${200 + i * 80}ms` }}
                        >
                            <ProjectCardDrawer entry={entry} />
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
