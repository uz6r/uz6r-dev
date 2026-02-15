import { Hero } from "@/components/sections/hero";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { Experience } from "@/components/sections/experience";
import { BlogSection } from "@/components/sections/blog-section";
import { Navbar } from "@/components/navbar";
import { heroData } from "@/data/hero";
import { entries } from "@/data/entries";
import { experience } from "@/data/experience";
import { getMediumPosts } from "@/lib/medium-rss";

export default async function HomePage() {
    const latestPosts = await getMediumPosts(2);

    return (
        <>
            <Navbar />
            <main>
                <Hero name={heroData.name} headline={heroData.headline} bio={heroData.bio} />
                <ProjectsGrid entries={entries} />
                <Experience items={experience} />
                <BlogSection
                    posts={latestPosts}
                    showAllLink={{ href: "/blog", label: "View all posts" }}
                />
            </main>
        </>
    );
}
