import { Navbar } from "@/components/navbar";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { BlogSection } from "@/components/sections/blog-section";
import { getMediumPosts } from "@/lib/medium-rss";

export default async function BlogPage() {
    const posts = await getMediumPosts(20);

    return (
        <>
            <Navbar />
            <main>
                <Section className="border-b">
                    <Container>
                        <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
                        <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">
                            Essays and notes from Medium — on software, sustainability, and the long
                            game.
                        </p>
                    </Container>
                </Section>
                <BlogSection posts={posts} />
            </main>
        </>
    );
}
