"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Whoami() {
  const [expandedSections, setExpandedSections] = useState(new Set());
  const [showAllSections, setShowAllSections] = useState(false);

  const toggleSection = (title: String) => {
    const newExpanded = new Set(expandedSections);
    newExpanded.has(title) ? newExpanded.delete(title) : newExpanded.add(title);
    setExpandedSections(newExpanded);
  };

  const sections = [
    {
      title: "Wanderlust & Lens",
      items: ["Photography", "Travelling"],
      description: "Capturing moments and chasing horizons through travel and photography.",
      image: "/images/travel_photo.jpg"
    },
    {
      title: "Soul Food & Stove Time",
      items: ["Cooking"],
      description: "Creating comfort on a plate—my way of winding down.",
      image: "/images/cooking_time.png"
    },
    {
      title: "Digital Realms",
      items: ["RPG Games"],
      description: "Escaping into immersive RPGs and fantastical adventures.",
      image: "/images/games_i_play.png"
    },
    {
      title: "Stories & Screens",
      items: ["Manga", "Webtoons", "Anime", "K-Dramas", "English Series"],
      description: "I get lost in stories—flipping manga, bingeing anime, and exploring great dramas.",
      image: "/images/story_binge.png"
    },
    {
      title: "Sounds of My World",
      items: ["Instrumental", "Soundtracks", "Pop", "R&B"],
      description: "Life is better with a soundtrack—from orchestral scores to chill pop and R&B.",
      image: "/images/music_wave.png"
    },
  ];

  const visibleSections = showAllSections ? sections : [sections[0]];

  return (
    <motion.section
      id="whoami"
      className="py-16 md:py-24 px-4 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Personal Interests
      </motion.h2>

      <motion.p
        className="text-lg text-white-600 mb-16 text-center max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Photography. Cooking. Exploring new places. Bingeing anime, webtoons & series. Immersing in RPGs. Letting music carry the mood.
      </motion.p>

      <div className="space-y-12">
        {visibleSections.map(({ title, items, description, image }, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={title}
              className="relative"
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}>
                {/* Image Section */}
                <motion.div
                  className="lg:w-1/2 w-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                    <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center">
                      <Image src={`${image}?height=320&width=320`} alt={title} fill className="object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </motion.div>

                {/* Content Section */}
                <div className="lg:w-1/2 w-full">
                  <motion.div
                    className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {items.map((item, i) => (
                        <motion.span
                          key={item}
                          className="px-3 py-1 bg-black text-white text-sm rounded-full"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
        <div className="text-center mt-12">
          <Button variant="outline" onClick={() => setShowAllSections(!showAllSections)}>
            {showAllSections ? "View less" : "View all"}
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
