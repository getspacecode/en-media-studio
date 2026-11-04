"use client";
import { MotionConfig, motion, type Variants } from "motion/react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rezultati = [
  {
    brand: "RAST DOSEGA",
    value: "2000%",
    desc: "Prosečan rast reach-a klijenata od +2.000% do +2.500%.",
    gold: true,
  },
  {
    brand: "DNEVNI BUDŽET",
    value: "1 kafa",
    desc: "Cena jedne kafe dnevno za precizno optimizovane oglase.",
    gold: false,
  },

  {
    brand: "CENA PO POSETI",
    value: "Niža",
    desc: "Drastično smanjenje troškova po poseti profila.",
    gold: false,
  },
];

const heading = ["Brojevi", "umesto", "obećanja."];

/* ---------- variants ---------- */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

// words / numbers rise from behind a mask
const maskUp: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.9, ease } },
};

const drawLine: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.2, ease } },
};

export default function Rezultati() {
  return (
    <MotionConfig reducedMotion="user">
      <main
        id="Rezultati"
        className="flex w-full flex-col px-6 py-24 lg:px-32 lg:py-32"
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
                className="mb-[-0.12em] mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom"
              >
                <motion.span variants={maskUp} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>
        </motion.div>

        {/* LINE + NUMBERS */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div
            variants={drawLine}
            className="h-px origin-left bg-line"
          />

          <div className="md:grid md:grid-cols-3">
            {rezultati.map((r) => (
              <motion.div
                key={r.brand}
                variants={fadeUp}
                className="border-b border-line py-10 md:border-b-0 md:border-l md:py-14 md:pl-10 md:pr-6 md:first:border-l-0 md:first:pl-0"
              >
                <p className="text-xs tracking-eyebrow text-muted">{r.brand}</p>

                <div className="mt-8 overflow-hidden pb-2 md:mt-14">
                  <motion.p
                    variants={maskUp}
                    className={`text-7xl font-extralight leading-none tracking-tighter sm:text-8xl lg:text-8xl xl:text-9xl ${
                      r.gold ? "text-gold" : "text-beige"
                    }`}
                  >
                    {r.value}
                  </motion.p>
                </div>

                <p className="mt-4 max-w-72 text-sm text-muted lg:text-base">
                  {r.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* QUOTE */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-8 md:mt-16 lg:mt-24"
        >
          <motion.div
            variants={drawLine}
            className="h-px origin-left bg-line"
          />

          <div className="grid gap-6 pt-12 lg:grid-cols-[420px_1fr] lg:gap-16 lg:pt-16">
            <motion.p
              variants={fadeUp}
              className="text-xs font-normal tracking-eyebrow text-gold"
            >
              KLIJENTI KAŽU
            </motion.p>

            <div>
              <motion.blockquote
                variants={fadeUp}
                className="max-w-4xl text-2xl font-extralight leading-snug sm:text-3xl lg:text-5xl"
              >
                „Bitna je estetika a tvoja je jako lepa i suptilna“
              </motion.blockquote>
            </div>
          </div>
        </motion.div>
      </main>
    </MotionConfig>
  );
}
