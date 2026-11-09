import { profile } from "@/data/content";

const corner = "pointer-events-none absolute h-5 w-5 border-white/30";

/** HTML overlay on top of the canvas. All text stays real, selectable text. */
export default function HeroHud() {
  return (
    <div className="pointer-events-none relative z-10 flex min-h-svh flex-col justify-between px-6 py-20 sm:px-12">
      {/* thin corner brackets */}
      <span className={`${corner} left-4 top-16 border-l border-t sm:left-8`} aria-hidden="true" />
      <span className={`${corner} right-4 top-16 border-r border-t sm:right-8`} aria-hidden="true" />
      <span className={`${corner} bottom-4 left-4 border-b border-l sm:left-8`} aria-hidden="true" />
      <span className={`${corner} bottom-4 right-4 border-b border-r sm:right-8`} aria-hidden="true" />

      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-muted">
        {profile.location}
      </p>

      <div className="max-w-3xl [text-shadow:0_0_24px_#05070f,0_0_8px_#05070f]">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          {profile.role}
        </p>
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg">
          {profile.tagline}
        </p>
        <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="rounded-full border border-accent/60 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent transition hover:bg-accent/20"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground/90 transition hover:border-white/40"
          >
            Contact me
          </a>
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
        <dl className="flex gap-6">
          <div>
            <dt>Azimuth</dt>
            <dd className="text-foreground/90" data-readout="az">--</dd>
          </div>
          <div>
            <dt>Elevation</dt>
            <dd className="text-foreground/90" data-readout="el">--</dd>
          </div>
          <div>
            <dt>Particles</dt>
            <dd className="text-foreground/90" data-readout="count">0</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
