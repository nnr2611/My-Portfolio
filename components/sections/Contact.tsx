import { contact, profile } from "@/data/content";
import SocialLinks from "@/components/SocialLinks";
import Section from "./Section";

export default function Contact() {
  return (
    <Section id="contact" eyebrow="05 / Contact" title="Get in touch" intro={contact.intro}>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="glow-card rounded-2xl p-6 sm:p-8">
          <dl className="space-y-5">
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${contact.email}`}
                  className="text-lg text-accent hover:underline"
                >
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Location</dt>
              <dd className="mt-1 text-lg">{contact.location}</dd>
            </div>
          </dl>
        </div>
        <div className="glow-card flex flex-col justify-between gap-6 rounded-2xl p-6 sm:p-8">
          <SocialLinks />
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit rounded-full border border-accent/60 bg-accent/10 px-7 py-3.5 text-base font-medium text-accent transition hover:bg-accent/20"
          >
            Download my resume
          </a>
        </div>
      </div>
    </Section>
  );
}
