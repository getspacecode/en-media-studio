"use client";
import Image, { type StaticImageData } from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Variants,
} from "motion/react";

// zameni putanjama do svojih screenshotova
import poruka1 from "../../../public/poruka-1.jpg";
import poruka2 from "../../../public/poruka-2.jpg";
import poruka3 from "../../../public/poruka-3.jpg";

type Poruka = { text: string; image: StaticImageData };

const poruke: Poruka[] = [
  {
    text: "Bitna je estetika a tvoja je jako lepa i suptilna",
    image: poruka1,
  },
  {
    text: "E sad baš krećem na posao i baš si me obradovala i digla da odem i izdržim ceo dan",
    image: poruka2,
  },
  {
    text: "Tražila mi je jedna ženica ko mi radi profil, prosledila sam joj broj... ona ima knjigovodstvenu agenciju",
    image: poruka3,
  },
];
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
function PorukaModal({
  poruka,
  onClose,
}: {
  poruka: Poruka;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // stranica se ne skroluje iza modala
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Poruka klijenta"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-100 flex items-center justify-center bg-bg/90 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Zatvori"
        className="absolute right-4 top-4 cursor-pointer text-muted transition-colors duration-300 hover:text-gold sm:right-8 sm:top-8"
      >
        <X size={28} />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.4, ease }}
        onClick={(e) => e.stopPropagation()} // klik na sliku ne zatvara modal
        className="max-h-full max-w-full overflow-auto border border-line bg-bg p-2 sm:p-3"
      >
        <Image
          src={poruka.image}
          alt={`Screenshot poruke klijenta: „${poruka.text}“`}
          sizes="(min-width: 1024px) 480px, 90vw"
          className="h-auto max-h-[80vh] w-auto max-w-full"
        />
      </motion.div>
    </motion.div>
  );
}
export default function Rezultati() {
  const [selected, setSelected] = useState<Poruka | null>(null);
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
                className="mb-[-0.12em] font-script mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom"
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

        {/* KLIJENTI KAŽU */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
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
              {poruke.map((p) => (
                <motion.div
                  key={p.text}
                  variants={fadeUp}
                  className="flex flex-col gap-6 border-t border-line py-8 first:border-t-0 first:pt-0 sm:flex-row sm:items-center sm:justify-between sm:gap-10"
                >
                  <blockquote className="max-w-2xl text-xl font-extralight leading-snug sm:text-2xl lg:text-3xl">
                    „{p.text}“
                  </blockquote>

                  <button
                    onClick={() => setSelected(p)}
                    aria-haspopup="dialog"
                    className="group flex w-fit shrink-0 cursor-pointer items-center gap-2 border-b border-gold/55 pb-1 text-xs tracking-eyebrow transition-colors duration-300 hover:text-gold"
                  >
                    POGLEDAJ PORUKU
                    <ArrowUpRight
                      size={16}
                      className="text-gold transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* MODAL: mora biti van motion wrappera iznad, da `fixed` radi kako treba */}
        <AnimatePresence>
          {selected && (
            <PorukaModal poruka={selected} onClose={() => setSelected(null)} />
          )}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}
