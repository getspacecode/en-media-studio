"use client";
import { MotionConfig, motion, type Variants } from "motion/react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const paketi = [
  {
    title: "Osnovni paket (Start)",
    price: "150",
    desc: "3 Premium Reel-a mesečno, 2 statične objave / karusela",
    featured: false,
  },
  {
    title: "Standardni paket (Rast)",
    price: "200",
    desc: "5 Premium Reel-a mesečno, 4 statične objave / karusela, osnovne storije",
    featured: true,
  },
  {
    title: "Premium paket (Autoritet)",
    price: "250",
    desc: "8 Premium Reel-a mesečno, 6 statičnih objava / karusela, storiji uz osmišljen koncept",
    featured: false,
  },
];

const heading = ["Izaberite", "i", "krećemo."];

/* ---------- variants ---------- */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

// words / prices rise from behind a mask
const maskUp: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.9, ease } },
};

const drawLine: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.2, ease } },
};

// feature list: rows appear one after another inside each card
const listStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};
const rowIn: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
};

export default function Paketi() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="Paketi"
        className="flex bg-beige/2 w-full flex-col px-6 py-24 lg:px-32 lg:py-32"
      >
        {/* HEADER */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="mb-16 grid gap-6 lg:mb-24 lg:grid-cols-[420px_1fr] lg:gap-16"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-normal tracking-eyebrow text-gold"
          ></motion.p>

          <motion.h2
            variants={stagger}
            className="text-4xl font-extralight leading-[1.1] tracking-heading sm:text-5xl lg:text-7xl"
          >
            {heading.map((word) => (
              <span
                key={word}
                className="-mb-[0.12em] font-script mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom"
              >
                <motion.span variants={maskUp} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>
        </motion.div>

        {/* LINE + PACKAGES */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div
            variants={drawLine}
            className="h-px origin-left bg-line"
          />

          <div className="md:grid md:grid-cols-3">
            {paketi.map((p) => (
              <motion.article
                key={p.title}
                variants={fadeUp}
                className={`flex flex-col border-b border-line py-10 transition-colors duration-300 hover:bg-beige/2 md:border-b-0 md:border-l md:py-14 md:pl-10 md:pr-8 md:first:border-l-0 md:first:pl-0 ${
                  p.featured ? "-mt-px border-t border-t-gold" : ""
                }`}
              >
                {/* name + badge */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3
                    className={`text-xs uppercase tracking-eyebrow ${
                      p.featured ? "text-gold" : "text-muted"
                    }`}
                  >
                    {p.title}
                  </h3>
                  {p.featured && (
                    <span className="text-xs uppercase tracking-eyebrow text-gold">
                      Preporuka
                    </span>
                  )}
                </div>

                {/* price */}
                <div className="mt-10 overflow-hidden pb-2 md:mt-14">
                  <motion.p
                    variants={maskUp}
                    className="text-7xl font-extralight leading-none tracking-tighter text-beige xl:text-8xl"
                  >
                    €{p.price}
                    <span className="ml-2 text-base font-light tracking-normal text-muted">
                      / mes
                    </span>
                  </motion.p>
                </div>

                {/* features */}
                <motion.ul
                  variants={listStagger}
                  className="mt-10 flex-1 md:mt-14"
                >
                  {p.desc.split(", ").map((feature) => (
                    <motion.li
                      key={feature}
                      variants={rowIn}
                      className="border-t border-line py-3 text-sm text-beige lg:text-base"
                    >
                      {feature}
                    </motion.li>
                  ))}
                </motion.ul>

                {/* button */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className={`mt-10 border border-gold px-8 py-4 text-center text-xs font-normal uppercase tracking-button transition-colors duration-300 ${
                    p.featured
                      ? "bg-gold text-bg hover:bg-gold/80"
                      : "text-gold hover:bg-gold hover:text-bg"
                  }`}
                >
                  {p.featured ? "Plati i počni" : "Izaberi"}
                </motion.button>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
