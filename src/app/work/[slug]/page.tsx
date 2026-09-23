import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  getCaseStudy,
  getCaseStudySlugs,
} from "@/lib/case-studies";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = getCaseStudy(slug);
    return {
      title: frontmatter.title,
      description: frontmatter.seoDescription,
    };
  } catch {
    return { title: "Case study" };
  }
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  let study;
  try {
    study = getCaseStudy(slug);
  } catch {
    notFound();
  }

  const { frontmatter, content } = study;
  const isPublic = frontmatter.status === "public";

  return (
    <article className="pb-24 pt-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Link
          href="/#work"
          className="font-mono text-xs uppercase tracking-[0.16em] text-fog-dim hover:text-amber"
        >
          ← Work
        </Link>

        <header className="mt-8 border-b border-line pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-fog-dim">
              {frontmatter.org}
              {frontmatter.dateStart && (
                <>
                  {" "}
                  · {frontmatter.dateStart}
                  {frontmatter.dateEnd ? `–${frontmatter.dateEnd}` : ""}
                </>
              )}
            </p>
            <span className="border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fog-dim">
              {isPublic ? "Source available" : "Proprietary — sanitized proof"}
            </span>
          </div>
          <h1 className="mt-4 font-serif text-4xl tracking-tight text-white md:text-5xl">
            {frontmatter.title}
          </h1>
          <p className="mt-3 text-lg text-fog-dim">{frontmatter.subtitle}</p>
          <p className="mt-5 font-mono text-sm uppercase tracking-[0.12em] text-amber">
            {frontmatter.outcomeMetric}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {frontmatter.stack.map((s) => (
              <li
                key={s}
                className="border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-fog-dim"
              >
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            {frontmatter.links.repo && (
              <a
                href={frontmatter.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-amber/40 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-amber hover:bg-amber hover:text-ink"
              >
                Source
              </a>
            )}
            {frontmatter.links.live && isPublic && (
              <a
                href={frontmatter.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-fog/25 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-fog hover:border-amber hover:text-amber"
              >
                Live
              </a>
            )}
            {!isPublic && !frontmatter.links.repo && (
              <span className="border border-line px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-fog-dim opacity-70">
                Proprietary
              </span>
            )}
          </div>
        </header>

        {frontmatter.coverImage && (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden border border-line">
            <Image
              src={frontmatter.coverImage}
              alt={frontmatter.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        <div className="prose-case mt-12">
          <MDXRemote
            source={content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>
      </div>
    </article>
  );
}
