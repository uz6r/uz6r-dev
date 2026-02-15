import Parser from "rss-parser";
import { fmtLocalDt } from "@/lib/date";

const MEDIUM_FEED_URL = "https://medium.com/feed/@uz6r";

export interface MediumPost {
    title: string;
    link: string;
    pubDate: string;
    snippet: string;
    imageUrl?: string;
}

const parser = new Parser({
    customFields: {
        item: [["content:encoded", "contentEncoded"]],
    },
});

function stripHtml(html: string, maxLength: number): string {
    const text = html
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "…";
}

function firstImageUrl(html: string): string | undefined {
    const matches = html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi);
    for (const m of matches) {
        const url = m[1];
        if (url && !url.includes("medium.com/_/stat") && !url.includes("stat?")) return url;
    }
    return undefined;
}

/**
 * Fetches and parses the Medium RSS feed. Use in server components only.
 * Cached and revalidated every 15 minutes.
 */
export async function getMediumPosts(limit = 10): Promise<MediumPost[]> {
    try {
        const res = await fetch(MEDIUM_FEED_URL, {
            next: { revalidate: 900 },
            headers: { Accept: "application/rss+xml, application/xml, text/xml" },
        });
        if (!res.ok) return [];
        const xml = await res.text();
        const feed = await parser.parseString(xml);
        const items = (feed.items ?? []).slice(0, limit);
        return items.map((item) => {
            const rawContent =
                (item as { contentEncoded?: string }).contentEncoded ?? item.content ?? "";
            const snippetSource = rawContent || (item.contentSnippet ?? "");
            return {
                title: item.title ?? "",
                link: item.link ?? "",
                pubDate: fmtLocalDt(item.pubDate ?? item.isoDate ?? ""),
                snippet: stripHtml(snippetSource, 160),
                imageUrl: firstImageUrl(rawContent),
            };
        });
    } catch {
        return [];
    }
}
