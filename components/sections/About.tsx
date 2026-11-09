import Image from "next/image";
import { about, profile } from "@/data/content";
import SocialLinks from "@/components/SocialLinks";
import Section from "./Section";

/** Turn the first paragraph's key phrases into links, using about.inlineLinks. */
function linkify(text: string) {
  const nodes: (string | React.ReactElement)[] = [];
  let rest = text;
  about.inlineLinks.forEach((l, i) => {
    const at = rest.indexOf(l.label);
    if (at === -1) return;
    nodes.push(rest.slice(0, at));
    nodes.push(
      <a
        key={i}
        href={l.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
      >
        {l.label}
      </a>,
    );
    rest = rest.slice(at + l.label.length);
  });
  nodes.push(rest);
  return nodes;
}

export default function About() {
  return (
    <Section id="about" eyebrow="01 / About" title={about.heading}>
      <div className="grid items-start gap-12 md:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center gap-6 md:-mt-4">
          <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-full border border-border shadow-[0_0_40px_rgba(110,200,255,0.12)] sm:h-72 sm:w-72">
            <Image
              src={profile.photo}
              alt={profile.photoAlt}
              fill
              sizes="288px"
              className="object-cover object-top"
            />
          </div>
          <SocialLinks grid className="w-56 sm:w-72" />
        </div>
        <div className="space-y-5 text-base leading-relaxed text-foreground/80 sm:text-lg">
          {about.paragraphs.map((p, i) => (
            <p key={i}>{i === 0 ? linkify(p) : p}</p>
          ))}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-accent/60 bg-accent/10 px-7 py-3.5 text-base font-medium text-accent transition hover:bg-accent/20"
          >
            Download my resume
          </a>
        </div>
      </div>
    </Section>
  );
}
