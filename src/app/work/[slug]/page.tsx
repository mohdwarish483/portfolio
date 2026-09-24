import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getCaseStudy, getCaseStudySlugs, type StudyRow } from "@/lib/case-studies";

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
    return { title: "Project" };
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
  const notes = content.trim();
  const dates = [frontmatter.dateStart, frontmatter.dateEnd].filter(Boolean).join(" – ");

  return (
    <article className="section-anchor overflow-x-clip px-5 pb-20 pt-28 md:px-8 md:pt-32">
      <div className="mx-auto w-full max-w-3xl">
        <Link href="/#projects" className="text-secondary font-semibold text-fog hover:text-amber">
          ← Projects
        </Link>

        <header className="mt-6">
          <p className="meta-date text-fog-dim">
            {frontmatter.org}
            {dates ? ` · ${dates}` : ""}
          </p>
          <h1 className="heading-page mt-3">{frontmatter.title}</h1>
          {frontmatter.subtitle ? <p className="text-body mt-3 text-fog">{frontmatter.subtitle}</p> : null}
        </header>

        <div className="mt-6 flex flex-wrap gap-3">
          {frontmatter.links.repo ? (
            <a href={frontmatter.links.repo} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Source
            </a>
          ) : null}
          {frontmatter.links.live && isPublic ? (
            <a href={frontmatter.links.live} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Live
            </a>
          ) : null}
          <span className="chip">{isPublic ? "Source available" : "Proprietary"}</span>
        </div>

        <dl className="mt-6 grid gap-3">
          <div className="surface px-5 py-4">
            <dt className="text-secondary font-semibold text-amber">Outcome</dt>
            <dd className="text-body mt-1 text-white">{frontmatter.outcomeMetric}</dd>
          </div>
          <div className="surface px-5 py-4">
            <dt className="text-secondary font-semibold text-amber">Role</dt>
            <dd className="text-body mt-1 text-white">
              {frontmatter.role}
              {frontmatter.org ? ` · ${frontmatter.org}` : ""}
            </dd>
          </div>
        </dl>

        <section className="surface mt-3 px-5 py-4">
          <h2 className="text-secondary font-semibold text-amber">Stack</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {frontmatter.stack.map((item) => (
              <li key={item} className="chip">
                {item}
              </li>
            ))}
          </ul>
        </section>

        {frontmatter.coverImage ? (
          <div className="surface relative mt-4 aspect-[16/9] overflow-hidden">
            <Image
              src={frontmatter.coverImage}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        ) : null}

        <BulletBlock title="Problem" items={frontmatter.problem} />
        <BulletBlock title="What I built" items={frontmatter.built} />
        <PipelineBlock rows={frontmatter.pipeline} />
        <ResultsBlock rows={frontmatter.results} />

        {notes ? (
          <section className="surface mt-4 px-5 py-5">
            <h2 className="heading-card">Notes</h2>
            <div className="prose-case mt-3">
              <MDXRemote
                source={notes}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}

function BulletBlock({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <section className="surface mt-4 px-5 py-5">
      <h2 className="heading-card">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="text-body flex gap-3 text-fog">
            <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-amber" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PipelineBlock({ rows }: { rows: StudyRow[] }) {
  if (!rows.length) return null;
  return (
    <section className="surface mt-4 px-5 py-5">
      <h2 className="heading-card">Pipeline</h2>
      <ol className="mt-3">
        {rows.map((row) => (
          <li
            key={row.label}
            className="grid gap-1 border-b border-line py-3 last:border-b-0 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:items-baseline sm:gap-4"
          >
            <span className="text-secondary font-semibold text-amber">{row.label}</span>
            <span className="text-body min-w-0 text-fog">{row.detail}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ResultsBlock({ rows }: { rows: StudyRow[] }) {
  if (!rows.length) return null;
  return (
    <section className="surface mt-4 px-5 py-5">
      <h2 className="heading-card">Results</h2>
      <dl className="mt-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid gap-1 border-b border-line py-3 last:border-b-0 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-baseline sm:gap-4"
          >
            <dt className="text-secondary font-semibold text-fog">{row.label}</dt>
            <dd className="text-body min-w-0 text-white">{row.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
