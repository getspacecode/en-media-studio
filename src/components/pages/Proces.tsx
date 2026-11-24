"use client";

import { MotionConfig, motion, type Variants } from "motion/react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const koraci = [
  {
    id: "01",
    title: "Profil",
    desc: "Da Vas ljudi razumeju za 3 sekunde. Ko ste Vi, šta radite, zašto da Vas zaprate.",
  },
  {
    id: "02",
    title: "Sadržaj",
    desc: "Sadržaj po planu, sa hook-om, sa pozivom. Da ljudi gledaju, čuvaju, komentarišu.",
  },
  {
    id: "03",
    title: "DM",
    desc: "Da se pratilac pretvori u zainteresovanog. Ja Vam napišem šablon šta da odgovorite, da ne izgubite klijenta. Vi odgovarate, jer Vi znate svoj posao.",
  },
  {
    id: "04",
    title: "Landing page",
    desc: "Da zainteresovani postane klijent. Stranica koja prodaje, ne samo lepa stranica. Sa cenom, sa dugmetom, sa prijavom.",
  },
];

const negacije = ["objava", "Reel", "landing"];

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
          viewport={{ once: true, amount: 0.4 }}
          className="mb-16 grid gap-8 lg:mb-24 lg:grid-cols-[420px_1fr] lg:gap-16"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-normal tracking-eyebrow text-gold"
          >
            SISTEM
          </motion.p>

          <div>
            {/* NEGACIJE */}
            <ul className="flex flex-col gap-1 lg:gap-2">
              {negacije.map((n) => (
                <li key={n} className="overflow-hidden pb-1">
                  <motion.p
                    variants={maskUp}
                    className="text-2xl font-extralight tracking-heading text-muted sm:text-3xl lg:text-5xl"
                  >
                    SISTEM nije{" "}
                    <span className="text-beige/70 line-through decoration-gold decoration-1">
                      {n}
                    </span>
                    .
                  </motion.p>
                </li>
              ))}
            </ul>

            {/* POENTA */}
            <motion.h2
              variants={fadeUp}
              className="mt-10 text-4xl font-extralight leading-[1.1] tracking-heading sm:text-5xl lg:mt-14 lg:text-7xl"
            >
              SISTEM je <span className="font-script text-gold">4 koraka</span>{" "}
              koji rade zajedno.
            </motion.h2>
          </div>
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
            className="h-px origin-left bg-gold-soft"
          />

          <div className="lg:grid lg:grid-cols-4">
            {koraci.map((k) => (
              <motion.article
                key={k.id}
                variants={fadeUp}
                className="group flex gap-6 border-b border-line py-8 transition-colors duration-300 hover:bg-beige/2 lg:flex-col lg:gap-0 lg:border-b-0 lg:border-l lg:px-8 lg:py-12 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
              >
                {/* BROJ */}
                <div className="w-16 shrink-0 overflow-hidden pb-2 lg:w-auto">
                  <motion.p
                    variants={maskUp}
                    className="text-5xl font-extralight leading-none tracking-tighter text-gold-soft transition-colors duration-300 group-hover:text-gold lg:text-7xl"
                  >
                    {k.id}
                  </motion.p>
                </div>

                <div>
                  <h3 className="text-xs font-normal uppercase tracking-eyebrow text-gold lg:mt-14">
                    {k.title}
                  </h3>

                  <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted lg:text-base">
                    {k.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* CLOSING */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-12 flex flex-col gap-4 border-t border-line pt-12 lg:mt-16 lg:pt-16"
        >
          <motion.p variants={fadeUp} className="text-sm text-muted lg:text-lg">
            Bez jednog koraka, ostala 3 ne rade.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="max-w-3xl text-3xl font-extralight leading-[1.15] tracking-heading text-beige lg:text-5xl"
          >
            Sa sva 4 koraka imate{" "}
            <span className="font-script text-gold">SISTEM</span> koji dovodi
            klijente.
          </motion.p>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
