import HeroCanvas from "./HeroCanvas";
import HeroHud from "./HeroHud";

export default function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative min-h-svh overflow-hidden"
      style={{ touchAction: "pan-y" }}
    >
      <HeroCanvas />
      <HeroHud />
    </section>
  );
}
