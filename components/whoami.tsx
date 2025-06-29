"use client";

import { motion } from "framer-motion";

export function Whoami() {
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
                I’m someone who thrives in complexity, creativity, and momentum — whether it’s racing on track, exploring epic worlds, or putting thoughts into art.
            </motion.p>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800"
                initial="hidden"
                whileInView="visible"
                transition={{ staggerChildren: 0.1 }}
                viewport={{ once: true }}
            >
                {[
                    {
                        title: "Motorsport",
                        items: ["Go Karts", "F1", "IndyCar", "Endurance", "MotoGP"],
                    },
                    {
                        title: "Games",
                        items: ["RPGs", "Action", "Racing", "Soulslike"],
                    },
                    {
                        title: "Outdoors",
                        items: ["Trekking", "Hiking", "Camping", "Trials"],
                    },
                    {
                        title: "Genres & Creativity",
                        items: ["Adventure", "Horror", "Fantasy", "Poetry", "Abstract Art"],
                    },
                ].map(({ title, items }) => (
                    <motion.div
                        key={title}
                        className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-md"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-xl font-semibold mb-3">{title}</h3>
                        <ul className="list-disc list-inside space-y-1">
                            {items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    );
}
