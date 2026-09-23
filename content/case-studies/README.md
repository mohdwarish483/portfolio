# Case studies — content pack

Draft MDX for the portfolio rebuild (Phase 2 content). Source of truth for narrative: experience + Featured Engineering on `origin/main` (`mohdwarish483/portfolio`), framed per [portfolio-upgrade-plan.md](../portfolio-upgrade-plan.md).

**Do not commit these into the git repo from this agent.** Copy into the Next.js app when scaffolding (`/content/case-studies` recommended).

## Files

| File | Slug | Flagship | Status |
|------|------|----------|--------|
| `voice-ai-framework.mdx` | `voice-ai-framework` | Quanteon — latency / STT–LLM–TTS | `proprietary` |
| `multi-agent-pm.mdx` | `multi-agent-pm` | Open multi-agent orchestration | `public` |
| `industrial-ai-systems.mdx` | `industrial-ai-systems` | Eizen — anomaly + LangGraph + YOLO QA | `proprietary-summary` |

## Frontmatter schema

Every case study starts with YAML frontmatter. Required fields for the Work index and `/work/[slug]` routes:

```ts
type CaseStudyFrontmatter = {
  slug: string;                 // URL segment; must match filename stem
  title: string;
  subtitle: string;             // one-line systems claim
  outcomeMetric: string;        // hero metric under title
  role: string;
  org: string;
  orgUrl: string | null;
  dateStart: string;            // YYYY or YYYY-MM
  dateEnd: string;              // YYYY-MM | "present"
  featured: boolean;            // show on Selected work
  order: number;                // ascending sort on index
  status: "public" | "proprietary" | "proprietary-summary";
  stack: string[];              // chips; keep ≤8
  links: {
    live: string | null;
    repo: string | null;
    demo: string | null;        // video/audio URL when available
  };
  coverImage: string | null;    // path under public/
  nda: {
    blocked: string[];
    sanitizedProof: string[];   // artifacts to commission before ship
  };
  seoDescription: string;
};
```

Body MDX sections (stable headings for templates):

1. Opening outcome paragraph  
2. `## Problem`  
3. `## Approach`  
4. `## System` (ASCII/SVG diagram)  
5. `## What I built`  
6. `## Results` (table)  
7. `## Demo & proof` / NDA gaps  
8. `## Engineering notes`  
9. `## Links`

## How the Next.js app should import them

### Recommended layout

```text
content/case-studies/
  voice-ai-framework.mdx
  multi-agent-pm.mdx
  industrial-ai-systems.mdx
```

Copy from this store directory into the app repo (or symlink during local content work). Keep images in `public/images/` with the paths already referenced in frontmatter.

### Dependencies

- `@next/mdx` **or** `next-mdx-remote` / `contentlayer2` / `velite` — any MDX loader is fine; prefer one that exposes typed frontmatter.
- Optional: `gray-matter` + `next-mdx-remote/rsc` if you want filesystem reads without a full Contentlayer setup.

### Example: App Router + `next-mdx-remote/rsc`

```ts
// lib/case-studies.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DIR = path.join(process.cwd(), "content/case-studies");

export function getAllCaseStudies() {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(DIR, file), "utf8");
      const { data, content } = matter(raw);
      return { ...data, content, file } as CaseStudyFrontmatter & {
        content: string;
        file: string;
      };
    })
    .filter((c) => c.featured)
    .sort((a, b) => a.order - b.order);
}

export function getCaseStudy(slug: string) {
  const file = path.join(DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data as CaseStudyFrontmatter, content };
}
```

```tsx
// app/work/[slug]/page.tsx
import { MDXRemote } from "next-mdx-remote/rsc";
import { getCaseStudy, getAllCaseStudies } from "@/lib/case-studies";

export function generateStaticParams() {
  return getAllCaseStudies().map((c) => ({ slug: c.slug }));
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { frontmatter, content } = getCaseStudy(slug);
  return (
    <article>
      <header>
        <p>{frontmatter.org}</p>
        <h1>{frontmatter.title}</h1>
        <p>{frontmatter.outcomeMetric}</p>
        <ul>{frontmatter.stack.map((s) => <li key={s}>{s}</li>)}</ul>
        {frontmatter.status !== "public" && (
          <span>Proprietary — sanitized proof only</span>
        )}
      </header>
      <MDXRemote source={content} />
    </article>
  );
}
```

### Index page

Map `getAllCaseStudies()` to readable rows (title, `outcomeMetric`, stack chips, link to `/work/[slug]`). No flip-cards; content always visible. Use `status` to show Proprietary vs Source available.

### Site copy

Hero, nav, about, and contact strings live in [`../site-copy.md`](../site-copy.md). Import as a TS module or keep as MD and parse once—do not duplicate thesis wording in components.

## Integration checklist

- [ ] Copy three MDX files into `content/case-studies`
- [ ] Port `voice_ai_agent.png` and `Project_Management_UI.png` (rename to kebab-case if desired; update `coverImage`)
- [ ] Commission sanitized artifacts listed under each `nda.sanitizedProof`
- [ ] Wire CTAs from `site-copy.md`; disable live buttons when `links.live` is null
- [ ] OG title: `Mohammed Warish · AI Engineer` + case `title`
