import Image from "next/image";
import { projects, projectsIntro, type Project } from "@/data/content";
import Section from "./Section";

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="glow-card flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="relative h-44 w-full bg-white/[0.03]">
        <Image
          src={`/images/${p.image}`}
          alt=""
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          unoptimized={p.image.endsWith(".svg")}
          className="object-contain p-3"
        />
        {p.metric && (
          <span className="absolute right-3 top-3 rounded-full border border-accent/50 bg-background/80 px-3 py-1 font-mono text-[0.6875rem] text-accent backdrop-blur">
            {p.metric}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold leading-snug">{p.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <li
              key={t}
              className="rounded-md border border-border px-2 py-0.5 font-mono text-[0.6875rem] text-foreground/75"
            >
              {t}
            </li>
          ))}
        </ul>
        {p.githubUrl && (
          <a
            href={p.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-fit items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            GitHub <span aria-hidden="true">↗</span>
            <span className="sr-only"> repository for {p.title}</span>
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => !p.legacy);
  const earlier = projects.filter((p) => p.legacy);
  return (
    <Section id="projects" eyebrow="02 / Projects" title="Featured projects" intro={projectsIntro}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
      <details className="group mt-10">
        <summary className="cursor-pointer list-none font-mono text-xs uppercase tracking-[0.2em] text-muted hover:text-foreground">
          <span className="group-open:hidden">+ Earlier engineering work ({earlier.length})</span>
          <span className="hidden group-open:inline">− Hide earlier engineering work</span>
        </summary>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {earlier.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>
      </details>
    </Section>
  );
}
