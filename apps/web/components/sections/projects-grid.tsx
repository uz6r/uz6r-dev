import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/card";
import { Badge } from "@repo/ui/badge";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { Project } from "@/types";

interface ProjectsGridProps {
    projects: Project[];
    title?: string;
}

export function ProjectsGrid({ projects, title = "Projects" }: ProjectsGridProps) {
    return (
        <Section>
            <Container>
                <h2 className="text-muted-foreground mb-8 text-sm font-medium uppercase tracking-wider">
                    {title}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    {projects.map((project) => (
                        <Card
                            key={project.id}
                            className={
                                project.href ? "transition-colors hover:border-primary/30" : ""
                            }
                        >
                            {project.href ? (
                                <a href={project.href} className="block">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-start justify-between gap-2">
                                            <CardTitle className="text-base">
                                                {project.title}
                                            </CardTitle>
                                            {project.year && (
                                                <span className="text-muted-foreground shrink-0 text-xs">
                                                    {project.year}
                                                </span>
                                            )}
                                        </div>
                                        <CardDescription className="line-clamp-2 text-sm">
                                            {project.description}
                                        </CardDescription>
                                    </CardHeader>
                                    {project.tags?.length ? (
                                        <CardContent className="pt-0">
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.tags.map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant="secondary"
                                                        className="text-xs font-normal"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                    ) : null}
                                </a>
                            ) : (
                                <>
                                    <CardHeader className="pb-2">
                                        <div className="flex items-start justify-between gap-2">
                                            <CardTitle className="text-base">
                                                {project.title}
                                            </CardTitle>
                                            {project.year && (
                                                <span className="text-muted-foreground shrink-0 text-xs">
                                                    {project.year}
                                                </span>
                                            )}
                                        </div>
                                        <CardDescription className="line-clamp-2 text-sm">
                                            {project.description}
                                        </CardDescription>
                                    </CardHeader>
                                    {project.tags?.length ? (
                                        <CardContent className="pt-0">
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.tags.map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant="secondary"
                                                        className="text-xs font-normal"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                    ) : null}
                                </>
                            )}
                        </Card>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
