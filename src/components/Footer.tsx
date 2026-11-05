"use client";
import { ArrowUp } from "lucide-react";
import { Link, animateScroll } from "react-scroll";
import { MotionConfig, motion, type Variants } from "motion/react";
import NextLink from "next/link";
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const links = [
  { label: "O meni", to: "OMeni" },
  { label: "Usluge", to: "Usluge" },
  { label: "Rezultati", to: "Rezultati" },
  { label: "Proces", to: "Proces" },
  { label: "Paketi", to: "Paketi" },
  { label: "FAQ", to: "Faq" },
  { label: "Kontakt", to: "Kontakt" },
];

/* ---------- variants ---------- */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const drawLine: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.2, ease } },
};
const today = new Date().getFullYear();
export default function Footer() {
  return (
    <MotionConfig reducedMotion="user">
      <footer className="w-full px-6 pb-8 pt-16 lg:px-32 lg:pt-24">
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

          <div className="grid gap-12 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-16 lg:py-16">
            {/* brend */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center gap-3 text-xl tracking-widest">
                <span>EN</span>
                <span className="size-1 rounded-full bg-gold" />
                <span>MEDIA STUDIO</span>
              </div>
              <p className="max-w-xs text-sm font-light text-muted lg:text-base">
                Pričamo priče koje prodaju. Autentičan sadržaj prilagođen tačno
                vašem brendu.
              </p>
            </motion.div>

            {/* navigacija */}
            <motion.nav variants={fadeUp} aria-label="Footer navigacija">
              <h3 className="mb-5 text-xs tracking-eyebrow text-gold">
                NAVIGACIJA
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      smooth
                      duration={500}
                      className="cursor-pointer text-sm text-muted transition-colors duration-300 hover:text-gold lg:text-base"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>

            {/* kontakt */}
            <motion.div variants={fadeUp}>
              <h3 className="mb-5 text-xs tracking-eyebrow text-gold">
                KONTAKT
              </h3>
              <ul className="flex flex-col gap-3 text-sm text-muted lg:text-base">
                <li>
                  <a
                    href="https://www.instagram.com/en_media_studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300 hover:text-gold"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  {/* zameni pravim mejlom */}
                  <a
                    href="mailto:enmediastudioig@gmail.com"
                    className="transition-colors duration-300 hover:text-gold"
                  >
                    enmediastudioig@gmail.com
                  </a>
                </li>
                <li>
                  {/* zameni pravim brojem */}
                  <a
                    href="tel:+381614492910"
                    className="transition-colors duration-300 hover:text-gold"
                  >
                    +381 61 449 2910
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* donja traka */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col-reverse items-start justify-between gap-6 border-t border-line pt-6 sm:flex-row sm:items-center"
          >
            <p className="text-xs tracking-wide text-muted">
              © {today} EN Media Studio. Sva prava zadržana.
            </p>
            <motion.div className="text-xs tracking-wide text-muted">
              <NextLink
                href="https://spacecodestudio.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-beige"
              >
                Made by
                <span className="border-b border-gold/55 pb-px text-gold transition-colors duration-300 group-hover:border-gold">
                  Space Code Studio
                </span>
              </NextLink>
            </motion.div>
            <motion.button
              onClick={() => animateScroll.scrollToTop({ duration: 500 })}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Nazad na vrh"
              className="group flex cursor-pointer items-center gap-3 text-xs tracking-eyebrow text-muted transition-colors duration-300 hover:text-gold"
            >
              NA VRH
              <span className="flex size-9 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-gold">
                <ArrowUp size={16} />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </footer>
    </MotionConfig>
  );
}
