"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function Whoami() {
    const [expandedSections, setExpandedSections] = useState(new Set());

    const toggleSection = (title) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(title)) {
            newExpanded.delete(title);
        } else {
            newExpanded.add(title);
        }
        setExpandedSections(newExpanded);
    };

    const sections = [
        {
            title: "Motorsport",
            items: ["Go Karts", "F1", "IndyCar", "Endurance", "MotoGP"],
            description: "The thrill of speed and precision on track"
        },
        {
            title: "Games",
            items: ["RPGs", "Action", "Racing", "Soulslike"],
            description: "Epic adventures and challenging worlds"
        },
        {
            title: "Outdoors",
            items: ["Trekking", "Hiking", "Camping", "Trials"],
            description: "Exploring nature and pushing limits"
        },
        {
            title: "Genres & Creativity",
            items: ["Adventure", "Horror", "Fantasy", "Poetry", "Abstract Art"],
            description: "Creative expression and storytelling"
        },
    ];

    return (
        <motion.section
            id="whoami"
            className="py-16 md:py-24 px-4 max-w-4xl mx-auto"
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
                Who am I?
            </motion.h2>

            <motion.p
                className="text-lg text-gray-600 mb-10 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                I'm someone who thrives in complexity, creativity, and momentum — whether it's racing on track, exploring epic worlds, or putting thoughts into art.
            </motion.p>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800"
                initial="hidden"
                whileInView="visible"
                transition={{ staggerChildren: 0.1 }}
                viewport={{ once: true }}
            >
                {sections.map(({ title, items, description }) => (
                    <motion.div
                        key={title}
                        className="bg-white/80 backdrop-blur rounded-2xl shadow-md overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xl font-semibold">{title}</h3>
                                <motion.button
                                    onClick={() => toggleSection(title)}
                                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {expandedSections.has(title) ? (
                                        <ChevronUp size={20} />
                                    ) : (
                                        <ChevronDown size={20} />
                                    )}
                                </motion.button>
                            </div>

                            <p className="text-gray-600 text-sm mb-4">{description}</p>

                            {/* Image placeholder - you can add your images here */}
                            <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                                <span className="text-gray-400 text-sm">Add {title} image here</span>
                            </div>

                            <ul className="list-disc list-inside space-y-1">
                                {items.slice(0, 2).map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <AnimatePresence>
                            {expandedSections.has(title) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="border-t border-gray-200"
                                >
                                    <div className="p-6 pt-4 bg-gray-50/50">
                                        <ul className="list-disc list-inside space-y-1">
                                            {items.slice(2).map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                        {/* Additional image space for expanded view */}
                                        {items.length > 2 && (
                                            <div className="w-full h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mt-4 flex items-center justify-center">
                                                <span className="text-gray-400 text-xs">Add secondary {title} image</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
}