"use client";
import { MotionConfig, motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const wordUp = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.8, ease } },
};

const headline = ["Sadržaj", "koji", "vas", "čini", "vidljivim"];

function DecorativeCircle() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease, delay: 0.3 }}
      className="pointer-events-none absolute right-30 top-25 hidden size-92 rounded-full border border-line lg:block"
    >
      {/* inner circle slowly rotates, with a small gold dot orbiting on it */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-11.5 rounded-full border border-gold/55"
      >
        <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
      </motion.div>
    </motion.div>
  );
}

const stats = [
  { value: "120+", label: "PROJEKATA" },
  { value: "45", label: "ZADOVOLJNIH" },
  { value: "4 god.", label: "SA VAMA" },
];

export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="flex flex-col overflow-x-hidden pb-16">
        <section className="relative px-6 pt-32 pb-12 lg:px-32 lg:pt-48">
          <DecorativeCircle />

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="relative z-10 flex max-w-5xl flex-col gap-6 lg:gap-12"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-normal tracking-eyebrow text-gold lg:text-base"
            >
              MARKETING STUDIO
            </motion.p>

            <motion.h1
              variants={stagger}
              className="text-5xl font-extralight leading-[1.05] tracking-tight sm:text-7xl lg:text-9xl"
            >
              {headline.map((word, i) => (
                <span
                  key={word}
                  className="-mb-[0.12em] mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom"
                >
                  <motion.span
                    variants={wordUp}
                    className={`inline-block ${
                      i === headline.length - 1 ? "text-gold" : ""
                    }`}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h1>
          </motion.div>
        </section>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.9 }}
          className="mx-6 h-px origin-left bg-muted/30 lg:mx-32"
        />

        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-8 px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-32"
        >
          <motion.p
            variants={fadeUp}
            className="max-w-sm text-sm text-muted lg:text-base"
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores at
            iusto ipsa asperiores, repellat ratione sint, totam velit, omnis
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-12"
          >
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="border border-gold px-8 py-4 text-sm font-normal tracking-widest text-gold transition-colors duration-300 hover:bg-gold hover:text-bg"
            >
              POKRENITE PROJEKAT
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              className="w-fit self-center border-b border-gold/55 pb-1 text-sm tracking-widest transition-colors duration-300 hover:text-gold"
            >
              PROŠLI RADOVI
            </motion.button>
          </motion.div>
        </motion.section>

        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="mx-6 mt-8 grid grid-cols-3 divide-x divide-muted/30 border-y border-muted/30 lg:mx-32"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="px-3 py-5 first:pl-0 lg:p-8 lg:first:pl-0"
            >
              <p className="text-2xl font-extralight sm:text-3xl lg:text-5xl">
                {s.value}
              </p>
              <p className="mt-1 text-[10px] font-normal tracking-normal text-muted sm:text-sm sm:tracking-wider">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.section>
      </main>
    </MotionConfig>
  );
}
