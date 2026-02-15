import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { MediumPost } from "@/lib/medium-rss";

interface BlogSectionProps {
    posts: MediumPost[];
    title?: string;
    /** When set, show a link with arrow to the full blog page (e.g. home shows 2, then "View all posts"). */
    showAllLink?: { href: string; label: string };
}

export function BlogSection({ posts, title = "Blog", showAllLink }: BlogSectionProps) {
    if (posts.length === 0) return null;

    return (
        <Section id="blog">
            <Container>
                <h2
                    className="animate-fade-in-up text-muted-foreground mb-8 text-sm font-medium uppercase tracking-wider opacity-0"
                    style={{ animationDelay: "100ms" }}
                >
                    {title}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    {posts.map((post, i) => (
                        <a
                            key={post.link}
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="animate-fade-in-up block text-left opacity-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            style={{ animationDelay: `${200 + i * 80}ms` }}
                        >
                            <Card
                                className={`relative h-full overflow-hidden border transition-colors hover:border-primary/30 ${post.imageUrl ? "pt-0" : ""}`}
                            >
                                <span className="text-muted-foreground absolute top-3 right-3 z-10 rounded-md border border-border bg-card p-1.5 transition-colors hover:bg-accent hover:text-foreground">
                                    <ExternalLink className="size-4" aria-hidden />
                                </span>
                                {post.imageUrl && (
                                    <div className="aspect-video w-full overflow-hidden bg-muted">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={post.imageUrl}
                                            alt=""
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                )}
                                <CardHeader className="pb-1 pr-10">
                                    <CardTitle className="text-base leading-snug">
                                        {post.title}
                                    </CardTitle>
                                    {post.pubDate && (
                                        <span className="text-muted-foreground mt-1 block text-xs">
                                            {post.pubDate}
                                        </span>
                                    )}
                                </CardHeader>
                                <CardContent className="pt-0">
                                    {post.snippet ? (
                                        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                                            {post.snippet}
                                        </p>
                                    ) : null}
                                    <span className="text-muted-foreground mt-2 inline-block text-xs">
                                        Read on Medium →
                                    </span>
                                </CardContent>
                            </Card>
                        </a>
                    ))}
                </div>
                {showAllLink && (
                    <div className="mt-6">
                        <Link
                            href={showAllLink.href}
                            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors"
                        >
                            {showAllLink.label}
                            <ArrowRight className="size-4" aria-hidden />
                        </Link>
                    </div>
                )}
            </Container>
        </Section>
    );
}
