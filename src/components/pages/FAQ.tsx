"use client";
import { Plus } from "lucide-react";
import { useState } from "react";
import { MotionConfig, motion, type Variants } from "motion/react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const pitanja = [
  {
    q: "Šta je zapravo faceless video marketing i da li moram da se snimam?",
    a: "Ne, uopšte ne morate da se snimate. EN Media Studio radi faceless koncept – vi nam pošaljete materijal ili snimke, a mi se kompletno bavimo profesionalnom montažom, efektima i obradom kako bi vaš profil izgledao vrhunski i privlačno.",
  },
  {
    q: "Koliko mi je vremena potrebno da izdvojim za saradnju?",
    a: "Minimalno. Vaše je samo da nam dostavite sirove snimke ili materijale po dogovoru, a mi preuzimamo kompletnu realizaciju, montažu, optimizaciju opisa, ključnih reči i hashtagova.",
  },
  {
    q: "Da li se odmah vide rezultati i da li su reklame neophodne?",
    a: "Organski rast danas ide prilično sporo. Uz pametno podešene kampanje i optimizovan budžet (za cenu jedne kafe dnevno), dobijate veliki reach i prave klijente, bez bacanja stotina evra na neisplative oglase.",
  },
  {
    q: "Kako funkcioniše odabir paketa i početak saradnje?",
    a: "Možete izabrati jedan od naših paketa (Start, Rast ili Autoritet) u zavisnosti od toga koliko vam je objava mesečno potrebno. Nakon toga se dogovaramo oko detalja i kreiramo sadržaj koji gradi vaš autoritet i donosi upite u DM.",
  },
  {
    q: "Kako da vas kontaktiram i poručim uslugu?",
    a: "Najlakše je da pregledate pakete na sajtu i pošaljete nam direktnu poruku u DM na Instagramu (@en_media_studio) kako bismo odmah dogovorili saradnju i postavili sistem koji radi za vaš biznis.",
  },
];

const heading = ["Česta", "pitanja."];

/* ---------- variants ---------- */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

// reči naslova izlaze iz maske
const maskUp: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.9, ease } },
};

function FaqItem({
  index,
  q,
  a,
  open,
  onToggle,
}: {
  index: number;
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="border-t border-line last:border-b"
    >
      <h3>
        <button
          id={`faq-q-${index}`}
          aria-expanded={open}
          aria-controls={`faq-a-${index}`}
          onClick={onToggle}
          className="group flex w-full cursor-pointer items-center justify-between gap-6 py-7 text-left lg:py-9"
        >
          <span
            className={`text-xl font-extralight tracking-tight transition-colors duration-300 group-hover:text-gold sm:text-2xl lg:text-3xl ${
              open ? "text-gold" : "text-beige"
            }`}
          >
            {q}
          </span>

          {/* plus se okreće u X */}
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3, ease }}
            className="shrink-0 text-gold"
          >
            <Plus size={24} strokeWidth={1.5} />
          </motion.span>
        </button>
      </h3>

      {/* odgovor uvek ostaje u HTML-u (dobro za SEO), samo se animira visina */}
      <motion.div
        id={`faq-a-${index}`}
        role="region"
        aria-labelledby={`faq-q-${index}`}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease }}
        className="overflow-hidden"
      >
        <p className="max-w-xl pb-8 text-sm text-muted lg:text-base">{a}</p>
      </motion.div>
    </motion.div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="Faq"
        className="grid w-full gap-12 px-6 py-24 lg:grid-cols-[420px_1fr] lg:gap-16 lg:px-32 lg:py-32"
      >
        {/* LEVA STRANA: naslov */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col gap-6 lg:sticky lg:top-32 lg:self-start"
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
                className="-mb-[0.12em] mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom"
              >
                <motion.span variants={maskUp} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="max-w-xs text-sm text-muted lg:text-base"
          >
            Ne nalazite odgovor? Pišite nam, odgovaramo u roku od par sati.
          </motion.p>
        </motion.div>

        {/* DESNA STRANA: pitanja */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {pitanja.map((item, i) => (
            <FaqItem
              key={item.q}
              index={i}
              q={item.q}
              a={item.a}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </motion.div>
      </section>
    </MotionConfig>
  );
}
