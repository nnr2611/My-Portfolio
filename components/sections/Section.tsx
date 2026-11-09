import type { ReactNode } from "react";

/** Shared wrapper: id for anchors, mono eyebrow, heading, optional intro. */
export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="reveal scroll-mt-12 border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-12">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        {intro && <p className="mt-4 max-w-2xl text-muted">{intro}</p>}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
