import { socials } from "@/data/content";

/** Small pill buttons for profile links. Entries without an href are shown greyed out. */
/** `grid` lays the four buttons out as a full-width 2 x 2 block. */
export default function SocialLinks({
  className = "",
  grid = false,
}: {
  className?: string;
  grid?: boolean;
}) {
  const base = `inline-flex items-center gap-1 rounded-full border px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] ${
    grid ? "w-full justify-center" : ""
  }`;
  return (
    <ul className={`${grid ? "grid grid-cols-2 gap-2" : "flex flex-wrap gap-2"} ${className}`}>
      {socials.map((l) => (
        <li key={l.label}>
          {l.href ? (
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${base} pointer-events-auto border-accent/60 bg-accent/10 text-accent transition hover:bg-accent/20`}
            >
              {l.label} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span
              className={`${base} border-border/50 text-muted/60`}
              title="Link coming soon"
              aria-disabled="true"
            >
              {l.label}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
