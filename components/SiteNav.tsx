import { nav } from "@/data/content";

export default function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-12 max-w-6xl items-center justify-between px-6 font-mono text-[0.6875rem] uppercase tracking-[0.08em] sm:px-12 sm:tracking-[0.18em]"
      >
        <a href="#top" className="text-foreground">My Portfolio</a>
        <ul className="flex gap-3 sm:gap-7">
          {nav.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-muted transition hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
