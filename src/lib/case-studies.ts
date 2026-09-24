import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type StudyRow = {
  label: string;
  detail: string;
};

export type CaseStudyFrontmatter = {
  slug: string;
  title: string;
  subtitle: string;
  outcomeMetric: string;
  role: string;
  org: string;
  orgUrl: string | null;
  dateStart: string;
  dateEnd: string;
  featured: boolean;
  order: number;
  status: "public" | "proprietary" | "proprietary-summary" | string;
  stack: string[];
  problem: string[];
  built: string[];
  pipeline: StudyRow[];
  results: StudyRow[];
  links: {
    live: string | null;
    repo: string | null;
    demo: string | null;
  };
  coverImage: string | null;
  nda?: {
    blocked: string[];
    sanitizedProof: string[];
  };
  seoDescription: string;
};

export type CaseStudy = CaseStudyFrontmatter & {
  content: string;
  file: string;
};

const DIR = path.join(process.cwd(), "content/case-studies");

function normalize(data: CaseStudyFrontmatter): CaseStudyFrontmatter {
  return {
    ...data,
    problem: data.problem ?? [],
    built: data.built ?? [],
    pipeline: data.pipeline ?? [],
    results: data.results ?? [],
    stack: data.stack ?? [],
  };
}

function readAll(): CaseStudy[] {
  if (!fs.existsSync(DIR)) return [];

  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        ...normalize(data as CaseStudyFrontmatter),
        content,
        file,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getAllCaseStudies(): CaseStudy[] {
  return readAll().filter((c) => c.featured);
}

export function getCaseStudies(): CaseStudy[] {
  return readAll();
}

export function getCaseStudy(slug: string): {
  frontmatter: CaseStudyFrontmatter;
  content: string;
} {
  const file = path.join(DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: normalize(data as CaseStudyFrontmatter), content };
}

export function getCaseStudySlugs(): string[] {
  return readAll().map((c) => c.slug);
}
