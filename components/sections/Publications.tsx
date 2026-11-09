import { publications } from "@/data/content";
import Section from "./Section";

export default function Publications() {
  return (
    <Section id="publications" eyebrow="04 / Publications" title="Publications">
      <ul className="space-y-5">
        {publications.map((p) => (
          <li key={p.href} className="glow-card rounded-2xl p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
              {p.venue} · {p.date}
            </p>
            <h3 className="mt-2 text-xl font-semibold leading-snug">{p.title}</h3>
            <p className="mt-3 text-foreground/80">{p.result}</p>
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
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-sm font-medium text-accent hover:underline"
            >
              Read the paper <span aria-hidden="true">↗</span>
              <span className="sr-only"> {p.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
