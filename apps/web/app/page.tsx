import { Hero } from "@/components/sections/hero";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { Experience } from "@/components/sections/experience";
import { Navbar } from "@/components/navbar";
import { heroData } from "@/data/hero";
import { entries } from "@/data/entries";
import { experience } from "@/data/experience";

export default function HomePage() {
    return (
        <>
            <Navbar />
            <main>
                <Hero name={heroData.name} headline={heroData.headline} bio={heroData.bio} />
                <ProjectsGrid entries={entries} />
                <Experience items={experience} />
            </main>
        </>
    );
}
