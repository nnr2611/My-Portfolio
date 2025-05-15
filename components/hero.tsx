"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import Link from "next/link"
import Aurora from './animations/Aurora';
import HyperSpeed from './animations/HyperSpeed';
import GlitchText from './animations/GlitchText';
import "./animations/Aurora.css";

export function Hero() {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 -z-1">
          <Aurora
            colorStops={["#FA291F", "#1194B4", "#1F3FA2"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>
        {/* <div>
          <HyperSpeed
            effectOptions={{
              onSpeedUp: () => { },
              onSlowDown: () => { },
              distortion: 'turbulentDistortion',
              length: 400,
              roadWidth: 10,
              islandWidth: 2,
              lanesPerRoad: 4,
              fov: 90,
              fovSpeedUp: 150,
              speedUp: 2,
              carLightsFade: 0.4,
              totalSideLightSticks: 20,
              lightPairsPerRoadWay: 40,
              shoulderLinesWidthPercentage: 0.05,
              brokenLinesWidthPercentage: 0.1,
              brokenLinesLengthPercentage: 0.5,
              lightStickWidth: [0.12, 0.5],
              lightStickHeight: [1.3, 1.7],
              movingAwaySpeed: [60, 80],
              movingCloserSpeed: [-120, -160],
              carLightsLength: [400 * 0.03, 400 * 0.2],
              carLightsRadius: [0.05, 0.14],
              carWidthPercentage: [0.3, 0.5],
              carShiftX: [-0.8, 0.8],
              carFloorSeparation: [0, 5],
              colors: {
                roadColor: 0x080808,
                islandColor: 0x0a0a0a,
                background: 0x000000,
                shoulderLines: 0xFFFFFF,
                brokenLines: 0xFFFFFF,
                leftCars: [0xC856BF, 0x675BA2, 0xC251AC],
                rightCars: [0x02B3C3, 0x0E5AA5, 0x32D555],
                sticks: 0x03B3C3,
              }
            }}
          />
        </div> */}
        <motion.section
          id="hero"
          className="py-24 px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ amount: 0.2 }}
        >
          <section className="relative py-20 md:py-32 overflow-hidden">
            <div className="container flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">

                <span className="text-primary max-w-2xl mb-8 leading-relaxed">Hello there, I am</span> <br />

                <GlitchText
                  speed={1}
                  enableShadows={true}
                  enableOnHover={true}
                  className=''
                >
                  Anirudh
                </GlitchText>
                {/* <br /> */}
                <GlitchText
                  speed={1}
                  enableShadows={true}
                  enableOnHover={true}
                  className='custom-class'
                >
                  Chidambaram
                </GlitchText>

                {/* <span className="text-primary max-w-2xl mb-8 leading-relaxed"></span> <br /> */}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8">
                A Full Stack Developer and hands-on Engineer with a passion for building robust software systems and smart hardware solutions
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link href="#projects">View My Work</Link>
                </Button>
                <Button asChild>
                  <Link href="#contact">Contact Me</Link>
                </Button>
              </div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
                <Link href="#about" aria-label="Scroll down">
                  <ArrowDown className="h-6 w-6 text-muted-foreground" />
                </Link>
              </div>
            </div>
          </section>
        </motion.section>
      </div>
    </>
  );
}