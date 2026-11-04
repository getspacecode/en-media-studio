"use client";

import { MotionConfig, motion, type Variants } from "motion/react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const koraci = [
  {
    id: "01",
    title: "Analiza i strategija",
    desc: "Proučavamo vaš biznis, ciljnu publiku i trenutno stanje profila kako bismo definisali strategiju prilagođenu vašim ciljevima.",
  },
  {
    id: "02",
    title: "Kreiranje sadržaja",
    desc: "Produkujemo i montiramo profesionalne faceless video zapise i karusele prilagođene vašem brendu. Vi ne morate da se snimate.",
  },
  {
    id: "03",
    title: "Optimizacija i lansiranje",
    desc: "Pripremamo SEO opise, ključne reči i hashtagove, a po potrebi pokrećemo pametno podešene kampanje sa optimizovanim budžetom.",
  },
  {
    id: "04",
    title: "Rezultati i rast",
    desc: "Gradimo autoritet vašeg brenda, privlačimo novu publiku i usmeravamo potencijalne klijente direktno u vaš DM.",
  },
];

const heading = ["Jednostavno,", "u", "četiri", "koraka."];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const maskUp: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.9, ease } },
};

const drawLine: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.2, ease } },
};

export default function Proces() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="Proces"
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
          >
            NAŠ PROCES RADA
          </motion.p>

          <motion.h2
            variants={stagger}
            className="text-4xl font-extralight leading-[1.1] tracking-heading sm:text-5xl lg:text-7xl"
          >
            {heading.map((word) => (
              <span
                key={word}
                className="-mb-[0.12em] mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom"
              >
                <motion.span variants={maskUp} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>
        </motion.div>

        {/* LINE + STEPS */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            variants={drawLine}
            className="h-px origin-left bg-line"
          />

          <div className="lg:grid lg:grid-cols-4">
            {koraci.map((k) => (
              <motion.article
                key={k.id}
                variants={fadeUp}
                className="flex gap-6 border-b border-line py-8 transition-colors duration-300 hover:bg-beige/2 lg:flex-col lg:gap-0 lg:border-b-0 lg:border-l lg:px-8 lg:py-12 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
              >
                {/* BROJ */}
                <div className="w-16 shrink-0 overflow-hidden pb-2 lg:w-auto">
                  <motion.p
                    variants={maskUp}
                    className="text-5xl font-extralight leading-none tracking-tighter text-gold lg:text-6xl"
                  >
                    {k.id}
                  </motion.p>
                </div>

                <div>
                  <h3 className="text-2xl font-light tracking-tight text-beige lg:mt-14 lg:text-3xl">
                    {k.title}
                  </h3>

                  <p className="mt-3 max-w-60 text-sm text-muted lg:text-base">
                    {k.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
