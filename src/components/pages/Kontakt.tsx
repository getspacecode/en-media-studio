"use client";

import { MotionConfig, motion, type Variants } from "motion/react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

const maskUp: Variants = {
  hidden: { y: "110%" },
  show: {
    y: 0,
    transition: { duration: 0.9, ease },
  },
};

const drawLine: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 1.2, ease },
  },
};

export default function Kontakt() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="Kontakt"
        className="relative flex w-full flex-col px-6 py-24 lg:px-32 lg:py-40"
      >
        {/* TOP LINE */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={drawLine}
          className="h-px origin-left bg-line"
        />

        {/* CONTENT */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-16 py-16 lg:grid-cols-[1fr_380px] lg:gap-24 lg:py-24"
        >
          {/* LEFT */}
          <div>
            <motion.p
              variants={fadeUp}
              className="text-xs font-normal tracking-eyebrow text-gold"
            >
              HAJDE DA RAZGOVARAMO
            </motion.p>

            <motion.h2
              variants={stagger}
              className="mt-8 max-w-4xl text-5xl font-extralight leading-[1.05] tracking-heading sm:text-6xl lg:text-8xl"
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span variants={maskUp} className="block">
                  Vaša ideja.
                </motion.span>
              </span>

              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  variants={maskUp}
                  className="block font-script text-gold"
                >
                  Naša realizacija.
                </motion.span>
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-lg text-sm leading-relaxed text-muted sm:text-base"
            >
              Svaki uspešan brend počinje dobrom idejom. Recite nam nešto više o
              svom biznisu, ciljevima i onome što želite da postignete. Tu smo
              da zajedno pronađemo pravi pravac.
            </motion.p>
          </div>

          {/* RIGHT */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col justify-end lg:pb-2"
          >
            <p className="text-xs tracking-eyebrow text-muted">
              ZAPOČNIMO SARADNJU
            </p>

            <p className="mt-4 text-2xl font-light leading-snug text-beige sm:text-3xl">
              Spremni ste za sledeći korak?
            </p>

            <a
              href="https://www.instagram.com/en_media_studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 flex w-fit items-center gap-6 border-b border-gold-soft pb-4 text-xs tracking-[0.18em] text-gold transition-colors duration-300 hover:border-beige hover:text-beige"
            >
              KONTAKTIRAJTE NAS
              <span className="text-lg transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </a>

            <div className="mt-12">
              <p className="text-xs tracking-eyebrow text-muted">
                PRONAĐITE NAS NA INSTAGRAMU
              </p>

              <a
                href="https://www.instagram.com/en_media_studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-beige transition-colors hover:text-gold"
              >
                @en_media_studio
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* BOTTOM LINE */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={drawLine}
          className="h-px origin-left bg-line"
        />

        {/* FOOTER NOTE */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col justify-between gap-4 pt-6 sm:flex-row sm:items-center"
        >
          <p className="text-[10px] tracking-[0.18em] text-muted">
            EN MEDIA STUDIO
          </p>

          <p className="text-[10px] tracking-[0.12em] text-muted">
            VAŠ BREND. VAŠA PRIČA. NAŠA STRATEGIJA.
          </p>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
