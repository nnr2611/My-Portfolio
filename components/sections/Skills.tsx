import { skills, skillsIntro } from "@/data/content";
import Section from "./Section";

export default function Skills() {
  return (
    <Section id="skills" eyebrow="03 / Skills" title="Skills & expertise" intro={skillsIntro}>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((g) => (
          <div key={g.category} className="glow-card rounded-2xl p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {g.category}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <li
                  key={s}
                  className="rounded-md border border-border px-2 py-1 text-xs text-foreground/80"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
