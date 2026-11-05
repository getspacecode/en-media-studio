"use client";
import { CalendarCheck, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-scroll";
import { AnimatePresence, motion, type Variants } from "motion/react";

const items = [
  { label: "O MENI", to: "OMeni" },
  { label: "USLUGE", to: "Usluge" },
  { label: "REZULTATI", to: "Rezultati" },
  { label: "PROCES", to: "Proces" },
  { label: "PAKETI", to: "Paketi" },
  { label: "FAQ", to: "Faq" },
  { label: "KONTAKT", to: "Kontakt" },
];

/* ---------- animation variants ---------- */
const ease: [number, number, number, number] = [0.76, 0, 0.24, 1];

// desktop: navbar children appear one after another
const barContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const barItem: Variants = {
  hidden: { opacity: 0, y: -12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// mobile: panel slides down, links slide in one by one
const panel: Variants = {
  closed: { y: "-100%", transition: { duration: 0.4, ease } },
  open: {
    y: 0,
    transition: {
      duration: 0.5,
      ease,
      staggerChildren: 0.07,
      delayChildren: 0.25,
    },
  },
};
const mobileItem: Variants = {
  closed: { opacity: 0, x: -24 },
  open: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
function MobileMenu() {
  const [menu, setMenu] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setMenu(!menu)}
        aria-label={menu ? "Close menu" : "Open menu"}
        aria-expanded={menu}
        className="relative z-60 text-muted hover:text-gold transition-colors"
      >
        {/* icon rotates while swapping Menu <-> X */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={menu ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="block"
          >
            {menu ? <X size={28} /> : <Menu size={28} />}
          </motion.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {menu && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenu(false)}
              className="fixed inset-0 z-40 bg-black/60"
            />

            <motion.div
              key="panel"
              variants={panel}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed left-0 top-0 z-50 w-full h-max bg-bg border-b border-gold/20 shadow-2xl"
            >
              <div className="flex flex-col h-full px-8 pt-24 pb-8">
                <div className="flex flex-col mb-8 gap-6 flex-1">
                  {items.map((item) => (
                    <motion.div key={item.to} variants={mobileItem}>
                      <Link
                        to={item.to}
                        smooth
                        duration={500}
                        onClick={() => setMenu(false)}
                        className="group cursor-pointer flex items-center justify-between text-xl font-medium tracking-button text-muted hover:text-white transition-colors"
                      >
                        <span>{item.label}</span>
                        <span className="text-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          →
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  variants={mobileItem}
                  className="border-t border-white/10 pt-6"
                >
                  <Link
                    to="Kontakt"
                    smooth
                    duration={500}
                    onClick={() => setMenu(false)}
                    className="flex cursor-pointer hover:bg-gold/80 transition-all duration-300 items-center justify-between w-full bg-gold text-bg p-4 tracking-widest font-semibold"
                  >
                    <span>KRENIMO ZAJEDNO</span>
                    <CalendarCheck size={22} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  return (
    <motion.nav
      variants={barContainer}
      initial="hidden"
      animate="show"
      className="flex fixed top-0 left-0 w-full bg-bg z-40 justify-around p-4"
    >
      {/* logo */}
      <motion.div
        variants={barItem}
        className="flex tracking-widest *:flex *:items-center *:justify-center justify-center gap-3 items-center text-2xl"
      >
        <h1>EN</h1>
        {/* gold dot pulses slowly */}
        <motion.div
          animate={{ scale: [1, 1.8, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="bg-gold size-1 rounded-full"
        />
        <h1>MEDIA STUDIO</h1>
      </motion.div>
      {/* desktop links */}
      <div className="hidden lg:flex gap-12 items-center justify-center text-muted">
        {items.map((item) => (
          <motion.div
            key={item.to}
            variants={barItem}
            className="flex items-center justify-center tracking-widest"
          >
            <Link
              to={item.to}
              smooth
              duration={500}
              className="group relative cursor-pointer flex items-center justify-center hover:text-white transition-colors"
            >
              {item.label}
              {/* gold underline grows from the left on hover */}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          </motion.div>
        ))}
      </div>
      <MobileMenu />
      {/* calendar button */}{" "}
      <Link to="Kontakt" smooth duration={500}>
        <motion.button
          variants={barItem}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="hidden lg:flex p-1.5 items-end transition-colors duration-300 justify-center text-muted hover:text-white border-b-2 border-transparent hover:border-gold font-semibold tracking-wider"
        >
          <CalendarCheck size={30} />
        </motion.button>
      </Link>
    </motion.nav>
  );
}
