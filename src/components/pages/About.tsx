"use client";
import { MotionConfig, motion, type Variants } from "motion/react";
import klijentkinja from "../../../public/klijentkinja.jpg";
import Image from "next/image";
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const heading = ["O", "meni"];

/* ---------- variants ---------- */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

// reči naslova izlaze iz maske
const maskUp: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.9, ease } },
};

// fotografija se otkriva odozgo nadole
const reveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  show: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 1.2, ease },
  },
};

const drawLine: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.2, ease } },
};

// svaki pasus se animira zasebno, kad dođe na ekran
const inView = {
  variants: fadeUp,
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: 0.3 },
} as const;

export default function OMeni() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="OMeni" className="w-full px-6 py-24 lg:px-32 lg:py-32">
        <motion.div
          variants={drawLine}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16 h-px origin-left bg-line lg:mb-24"
        />

        <div className="grid gap-12 lg:grid-cols-[420px_1fr] lg:gap-16">
          {/* LEVO: naslov + fotografija */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-8 lg:sticky lg:top-32 lg:self-start"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-normal tracking-eyebrow text-gold"
            >
              O MENI
            </motion.p>

            <motion.h2
              variants={stagger}
              className="text-5xl font-extralight leading-[1.1] tracking-heading sm:text-6xl lg:text-7xl"
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

            {/* FOTOGRAFIJA: zameni next/image kad klijentkinja pošalje sliku */}
            <motion.div
              variants={reveal}
              className="relative aspect-4/5 w-full max-w-sm border border-line"
            >
              <Image
                src={klijentkinja}
                alt="Osnivačica EN Media Studija"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 420px, 90vw"
              />

              {/* zlatni uglovi */}
              <span className="absolute -left-px -top-px size-6 border-l border-t border-gold" />
              <span className="absolute -bottom-px -right-px size-6 border-b border-r border-gold" />
            </motion.div>
          </motion.div>

          {/* DESNO: tekst */}
          <div className="flex flex-col gap-8 lg:gap-10">
            <motion.p
              {...inView}
              className="text-2xl font-extralight leading-snug text-beige sm:text-3xl lg:text-4xl"
            >
              Iza brenda En Media Studio stoji lična priča o posvećenosti,
              istrajnosti i želji da se gradi nešto autentično. Kao samohrana
              majka, pokrenula sam ovaj posao sa jasnim ciljem – da budem tu i
              prisutna u svakom važnom trenutku odrastanja svog deteta, a
              istovremeno da radim ono što volim i u šta verujem.
            </motion.p>

            <motion.p
              {...inView}
              className="max-w-2xl text-base font-light leading-relaxed text-beige/80 lg:text-lg"
            >
              Moje putovanje je počelo u januaru 2026. godine, kada sam
              posvećeno zaronila u proučavanje algoritma i psihologije
              društvenih mreža. Od tada ne prestajem da nadograđujem svoje
              znanje, pomažući biznisima da rastu, razvijaju se i skaliraju.
            </motion.p>

            <motion.p
              {...inView}
              className="max-w-2xl text-base font-light leading-relaxed text-beige/80 lg:text-lg"
            >
              Kod mene nema šablona ni copy-paste strategija. Svaki brend je
              priča za sebe, zato moj rad nosi taj autentični, ljudski dodir
              koji moji klijenti najviše cene. Sve se kreira i prilagođava tačno
              vašem identitetu, sa jednim jasnim ciljem:
            </motion.p>

            {/* citat */}
            <motion.blockquote
              {...inView}
              className="border-l border-gold py-2 pl-6 text-3xl font-extralight leading-tight tracking-heading text-gold sm:text-4xl lg:pl-10 lg:text-5xl"
            >
              Vaš uspeh je moj uspeh.
            </motion.blockquote>

            <motion.p
              {...inView}
              className="max-w-2xl text-base font-light leading-relaxed text-beige/80 lg:text-lg"
            >
              Kako bih osigurala da je svaka usluga besprekorna i sveobuhvatna,
              ne radim sama u trenucima kada je posla previše. Za tehničku
              podršku i izradu sajtova ostvarila sam stratešku saradnju sa Space
              Code-om, dok mi pouzdana koleginica pomaže u kreiranju sadržaja
              prema mojim preciznim uputstvima. Na taj način dobijate vrhunski
              kvalitet, posvećenost i sigurnost na svakom koraku.
            </motion.p>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
