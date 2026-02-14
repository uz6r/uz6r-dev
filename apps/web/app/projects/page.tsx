import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { Navbar } from "@/components/navbar";
import { entries } from "@/data/entries";

export default function ProjectsPage() {
    return (
        <>
            <Navbar />
            <main>
                <Section className="border-b">
                    <Container>
                        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Selected work and side projects.
                        </p>
                    </Container>
                </Section>
                <ProjectsGrid entries={entries} />
            </main>
        </>
    );
}
