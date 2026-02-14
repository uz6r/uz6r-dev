import { Hero } from "@/components/sections/hero";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { Experience } from "@/components/sections/experience";
import { EntriesList } from "@/components/sections/entries-list";
import { ThemeToggle } from "@/components/theme-toggle";
import { heroData } from "@/data/hero";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { entries } from "@/data/entries";

export default function HomePage() {
    return (
        <>
            <header className="border-b">
                <div className="mx-auto flex max-w-3xl items-center justify-end px-4 py-3 sm:px-6">
                    <ThemeToggle />
                </div>
            </header>
            <main>
                <Hero name={heroData.name} headline={heroData.headline} bio={heroData.bio} />
                <ProjectsGrid projects={projects} />
                <Experience items={experience} />
                <EntriesList entries={entries} />
            </main>
        </>
    );
}
