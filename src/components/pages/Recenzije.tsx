"use client";

import { Star } from "lucide-react";
import { MotionConfig, motion, type Variants } from "motion/react";
import { useEffect, useState, type FormEvent } from "react";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { z } from "zod";
import { getDb } from "@/lib/firebase";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const heading = ["Vaše", "recenzije."];

type Review = {
  id: string;
  name: string;
  rating: number;
  message: string;
  createdAt: Date | null;
};

// ista pravila kao u firestore.rules
const reviewSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Unesite ime (najmanje 2 karaktera).")
    .max(50, "Ime može imati najviše 50 karaktera."),
  rating: z
    .number()
    .int()
    .min(1, "Izaberite ocenu.")
    .max(5, "Izaberite ocenu."),
  message: z
    .string()
    .trim()
    .min(10, "Recenzija mora imati najmanje 10 karaktera.")
    .max(600, "Recenzija može imati najviše 600 karaktera."),
});

/* ---------- variants ---------- */
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

function Stars({ value }: { value: number }) {
  return (
    <div
      className="flex gap-0.5 text-gold"
      role="img"
      aria-label={`Ocena ${value} od 5`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={16}
          strokeWidth={1.5}
          fill={n <= value ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

function StarInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <div
      role="radiogroup"
      aria-label="Ocena"
      className="-ml-1 flex"
      onMouseLeave={() => setHover(0)}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} od 5`}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          className="p-1 text-gold transition-transform duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-gold"
        >
          <Star
            size={28}
            strokeWidth={1.5}
            fill={n <= shown ? "currentColor" : "none"}
          />
        </button>
      ))}
    </div>
  );
}

function formatDate(date: Date | null) {
  if (!date) return "";
  return date.toLocaleDateString("sr-Latn-RS", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const inputClass =
  "w-full border-b border-line bg-transparent py-3 text-base text-beige outline-none transition-colors duration-300 placeholder:text-muted/60 focus:border-gold";

export default function Recenzije() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  // recenzije se čitaju uživo, pa se nova pojavi odmah
  useEffect(() => {
    try {
      const q = query(
        collection(getDb(), "reviews"),
        orderBy("createdAt", "desc"),
        limit(100),
      );
      return onSnapshot(
        q,
        (snap) => {
          setReviews(
            snap.docs.map((d) => {
              const data = d.data({ serverTimestamps: "estimate" });
              return {
                id: d.id,
                name: data.name,
                rating: data.rating,
                message: data.message,
                createdAt: data.createdAt?.toDate() ?? null,
              };
            }),
          );
          setLoading(false);
        },
        () => {
          setLoadError(true);
          setLoading(false);
        },
      );
    } catch {
      setLoadError(true);
      setLoading(false);
    }
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsed = reviewSchema.safeParse({ name, rating, message });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await addDoc(collection(getDb(), "reviews"), {
        ...parsed.data,
        createdAt: serverTimestamp(),
      });
      setName("");
      setRating(0);
      setMessage("");
      setStatus("sent");
    } catch {
      setError("Recenzija nije poslata. Pokušajte ponovo.");
      setStatus("error");
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="Recenzije"
        className="grid w-full gap-16 px-6 pb-24 pt-32 lg:grid-cols-[420px_1fr] lg:gap-24 lg:px-32 lg:pb-32 lg:pt-44"
      >
        {/* LEVA STRANA: naslov + forma */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-normal tracking-eyebrow text-gold"
          >
            RECENZIJE
          </motion.p>

          <motion.h1
            variants={stagger}
            className="text-4xl font-extralight leading-[1.1] tracking-heading sm:text-5xl lg:text-7xl"
          >
            {heading.map((word) => (
              <span
                key={word}
                className="-mb-[0.12em] mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom font-script"
              >
                <motion.span variants={maskUp} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-sm text-sm text-muted lg:text-base"
          >
            Radili ste sa nama? Podelite svoje iskustvo, a ispod pročitajte šta
            su drugi ostavili.
          </motion.p>

          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            noValidate
            className="mt-6 flex flex-col gap-8"
          >
            <div>
              <label
                htmlFor="review-name"
                className="text-xs tracking-eyebrow text-muted"
              >
                IME
              </label>
              <input
                id="review-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
                autoComplete="name"
                placeholder="Vaše ime"
                className={inputClass}
              />
            </div>

            <div>
              <p
                id="review-rating-label"
                className="mb-2 text-xs tracking-eyebrow text-muted"
              >
                OCENA
              </p>
              <StarInput value={rating} onChange={setRating} />
            </div>

            <div>
              <label
                htmlFor="review-message"
                className="text-xs tracking-eyebrow text-muted"
              >
                RECENZIJA
              </label>
              <textarea
                id="review-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={600}
                rows={5}
                placeholder="Kako je izgledala saradnja?"
                className={`${inputClass} resize-none`}
              />
              <p className="mt-1 text-right text-[10px] tracking-wide text-muted">
                {message.length}/600
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group flex w-fit items-center gap-6 border-b border-gold-soft pb-4 text-xs tracking-[0.18em] text-gold transition-colors duration-300 hover:border-beige hover:text-beige disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "sending" ? "SLANJE..." : "POŠALJI RECENZIJU"}
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </button>

              {status === "sent" && (
                <p role="status" className="mt-4 text-sm text-gold">
                  Hvala vam na recenziji!
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="mt-4 text-sm text-red-400">
                  {error}
                </p>
              )}
            </div>
          </motion.form>
        </motion.div>
        {/* DESNA STRANA: sve recenzije */}
        <div
          tabIndex={0}
          role="region"
          aria-label="Lista recenzija"
          className="max-h-[70vh] overflow-y-auto pr-4 lg:max-h-[80vh]"
        >
          {loading && <p className="text-sm text-muted">Učitavanje...</p>}

          {!loading && loadError && (
            <p className="text-sm text-muted">
              Recenzije trenutno nije moguće učitati.
            </p>
          )}

          {!loading && !loadError && reviews.length === 0 && (
            <p className="text-sm text-muted">
              Još nema recenzija. Budite prvi koji će ostaviti utisak.
            </p>
          )}

          <ul>
            {reviews.map((r) => (
              <motion.li
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                className="border-t border-line py-8 last:border-b"
              >
                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
                  <p className="text-xl font-extralight tracking-tight text-beige lg:text-2xl">
                    {r.name}
                  </p>
                  <Stars value={r.rating} />
                </div>
                <p className="mt-4 max-w-2xl whitespace-pre-line break-words text-sm text-muted lg:text-base">
                  {r.message}
                </p>
                <p className="mt-4 text-xs tracking-wide text-muted/70">
                  {formatDate(r.createdAt)}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>{" "}
      </section>
    </MotionConfig>
  );
}
