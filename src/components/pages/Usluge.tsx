"use client";
import { ArrowRight } from "lucide-react";
import { MotionConfig, motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

const usluge = [
  {
    id: "01",
    title: "Upravljanje mrežama",
    desc: "Plan objava, dizajn i tekstovi. Kompletno upravljanje mrežama i promocija",
  },
  {
    id: "02",
    title: "Video & Reels",
    desc: "Scenario, snimanje i montaža kratkih formata za vaše mreže.",
  },
  {
    id: "03",
    title: "Plaćeno oglašavanje",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo vitae enim r",
  },
  {
    id: "04",
    title: "Brending & identitet",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo vitae enim r",
  },
];

const heading = ["Sve", "što", "vašem", "brendu", "treba."];

/* ---------- variants ---------- */
const headingStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// words rise from behind a mask (same effect as the hero headline)
const wordUp = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.8, ease } },
};

const listStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const rowIn = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function Usluge() {
  return (
    <MotionConfig reducedMotion="user">
      <main
        id="Usluge"
        className="flex w-full flex-col gap-16 px-6 py-24 lg:gap-32 lg:px-32 lg:py-32"
      >
        <motion.h1
          variants={headingStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="text-center text-4xl font-extralight leading-[1.1] sm:text-5xl lg:text-7xl"
        >
          {heading.map((word) => (
            <span
              key={word}
              className="-mb-[0.12em] mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom"
            >
              <motion.span variants={wordUp} className="inline-block">
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.ul
          variants={listStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="border-b border-line"
        >
          {usluge.map((i) => (
            <motion.li
              key={i.id}
              variants={rowIn}
              className="group grid grid-cols-[3rem_1fr_auto] items-center gap-y-3 border-t border-line py-8 lg:grid-cols-[90px_1fr_1fr_40px] lg:py-11"
            >
              <span className="text-xs tracking-[0.14em] text-gold lg:text-sm">
                {i.id}
              </span>

              <h3 className="text-2xl font-extralight tracking-tight transition-colors duration-300 group-hover:text-gold lg:text-5xl">
                {i.title}
              </h3>

              <p className="col-span-2 col-start-2 text-sm text-muted lg:col-span-1 lg:col-start-3 lg:max-w-sm lg:text-base">
                {i.desc}
              </p>

              <ArrowRight
                size={24}
                className="col-start-3 row-start-1 text-gold transition-transform duration-300 group-hover:translate-x-2 lg:col-start-4 lg:justify-self-end"
              />
            </motion.li>
          ))}
        </motion.ul>
      </main>
    </MotionConfig>
  );
}
