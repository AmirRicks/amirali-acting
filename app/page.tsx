"use client";

import Image from "next/image";
import { useEffect } from "react";

const EMAIL = "amirali.hamzeh@gmail.com";
const PHONE = "804-982-2814";
const PHONE_E164 = "+18049822814";

const photos = [
  { src: "/photos/hero-suit.jpg", label: "Headshot" },
  { src: "/photos/physique.jpg", label: "Athletic" },
  { src: "/photos/vegas-neon.jpg", label: "On location" },
  { src: "/photos/venice-smile.jpg", label: "Commercial" },
  { src: "/photos/planche.jpg", label: "Moab, Utah" },
  { src: "/photos/rome-selfie.jpg", label: "Travel" },
  { src: "/photos/mountain.jpg", label: "Utah local" },
  { src: "/photos/zion.jpg", label: "Editorial" },
  { src: "/photos/rome-road.jpg", label: "Print" },
  { src: "/photos/gym-wall.jpg", label: "Training" },
];

const quickStats = [
  "Plays 17–25",
  `5'8" · 160 lb`,
  "English + Farsi",
  "Non-union",
  "7 paid set days",
  "Salt Lake City · local hire",
];

/* Size card — every value verified against his platform profiles. */
const sizeCard: { label: string; value: string }[] = [
  { label: "Height", value: `5'8"` },
  { label: "Weight", value: "160 lb" },
  { label: "Build", value: "Athletic / toned" },
  { label: "Hair", value: "Black" },
  { label: "Eyes", value: "Brown" },
  { label: "Playing age", value: "17–25" },
  { label: "Ethnicity", value: "Middle Eastern" },
  { label: "Union", value: "Non-union" },
];

const playsWell = [
  "College student",
  "Athlete / physical",
  "Medical & clinical staff",
  "Young professional / founder",
  "Middle Eastern & Mediterranean",
];

const availableFor = [
  "Acting & speaking roles",
  "Background",
  "Commercial",
  "Student & independent film",
  "Print / modeling",
];

const skillGroups: { title: string; items: string[] }[] = [
  {
    title: "Languages",
    items: ["Farsi — native", "English — fluent"],
  },
  {
    title: "Athletics & physical",
    items: [
      "Weightlifting / bodybuilding",
      "Calisthenics — full planche",
      "Boxing",
      "Wrestling",
      "Soccer",
      "Basketball",
      "Swimming",
      "Snow skiing",
    ],
  },
  {
    title: "Professional & technical",
    items: [
      "Certified Dental Assistant",
      "CPR / First Aid",
      "Radiography · HIPAA · OSHA",
      "React / Next.js developer",
      "Founder — ClearNest LLC",
    ],
  },
  {
    title: "Logistics",
    items: [
      "Valid driver's license + passport",
      "Picture car available",
      "Grows a full beard in ~5 days",
      "Comfortable with 12-hour days",
    ],
  },
];

const credits: {
  title: string;
  meta: string;
  detail: string;
  year: string;
}[] = [
  {
    title: "Marshals (CBS) — Season 2",
    meta: "Background · Paramount Television Studios · Utah",
    detail: "2 shoot days — July 8 & August 7, 2026",
    year: "2026",
  },
  {
    title: "The Wayfinders — Season 2",
    meta: "Background · Utah",
    detail:
      "5 shoot days — four consecutive rebookings from a single submission",
    year: "2026",
  },
];

const socials: { name: string; href: string; icon: React.ReactNode }[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/amirali-hamzeh",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/amirali.hamzeh.official/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@amirali.hamzeh",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.9 2.9 0 1 1-2.9-2.9c.28 0 .56.04.82.12V9.4a6.34 6.34 0 0 0-.82-.05A6.33 6.33 0 1 0 15.8 15.7V9.01a8.16 8.16 0 0 0 4.77 1.52V7.07a4.85 4.85 0 0 1-.98-.38z" />
      </svg>
    ),
  },
  {
    name: "Utah Actors",
    href: "https://utahactors.ning.com/members/AmiraliHamzeh",
    icon: (
      // theater masks — Utah Actors network profile
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
        <path d="M3 4h9v7.5A4.5 4.5 0 0 1 7.5 16 4.5 4.5 0 0 1 3 11.5V4z" />
        <path d="M5.4 7.2h1.6M9 7.2h1.6M5.6 11.2c.6.9 1.4 1.4 1.9 1.4s1.3-.5 1.9-1.4" />
        <path d="M12 8h9v7.5A4.5 4.5 0 0 1 16.5 20 4.5 4.5 0 0 1 12 15.5V8z" fill="currentColor" fillOpacity="0.08" />
        <path d="M14.4 11.2h1.6M18 11.2h1.6M14.6 16.6c.6-.9 1.4-1.4 1.9-1.4s1.3.5 1.9 1.4" />
      </svg>
    ),
  },
  // Facebook + Snapchat: waiting on Amir's real profile URLs — flip href and they render.
  // { name: "Facebook", href: "", icon: ... },
  // { name: "Snapchat", href: "", icon: ... },
];

const navLinks = [
  { href: "#photos", label: "Photos" },
  { href: "#about", label: "About" },
  { href: "#stats", label: "Stats" },
  { href: "#reel", label: "Intro video" },
  { href: "#credits", label: "Credits" },
  { href: "#book", label: "Contact" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function Home() {
  useReveal();

  return (
    <main className="overflow-x-clip">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      {/* ============ NAV ============ */}
      <nav className="fixed top-0 z-40 w-full border-b border-line bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
          <a
            href="#top"
            className="font-[family-name:var(--font-display)] text-xl font-semibold text-ink"
          >
            Amirali<span className="text-amber">.</span>
          </a>
          <div className="hidden gap-7 text-sm text-ink-soft lg:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="transition hover:text-amber-dark">
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="#book"
            className="rounded-full bg-amber px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-dark"
          >
            Book me
          </a>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section id="top" className="relative min-h-svh">
        <div className="absolute inset-0">
          <Image
            src="/photos/hero-suit.jpg"
            alt="Amirali Hamzeh — Salt Lake City actor, professional headshot"
            fill
            priority
            className="object-cover object-[62%_18%]"
            sizes="100vw"
          />
          {/* warm light veil, text side */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fdfbf6f2] via-[#fdfbf6cc] to-transparent md:via-[#fdfbf680]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fdfbf6] to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-5 pt-20 md:px-8">
          <p className="reveal text-sm font-semibold uppercase tracking-[0.25em] text-amber-dark">
            Actor · Model
          </p>
          <h1 className="reveal mt-4 max-w-2xl font-[family-name:var(--font-display)] text-6xl font-semibold leading-[1.02] text-ink md:text-8xl">
            Amirali
            <br />
            Hamzeh
          </h1>
          <p className="reveal mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            Salt Lake City actor — athletic, bilingual, and easy to work with.
            Seen on <span className="font-semibold text-ink">Marshals (CBS)</span> and{" "}
            <span className="font-semibold text-ink">The Wayfinders</span>.
          </p>
          <div className="reveal mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#book"
              className="rounded-full bg-amber px-8 py-3.5 font-semibold text-white shadow-md shadow-amber/25 transition hover:-translate-y-0.5 hover:bg-amber-dark"
            >
              Book me
            </a>
            <a
              href="#reel"
              className="rounded-full border-2 border-ink/15 bg-white/70 px-8 py-3.5 font-semibold text-ink backdrop-blur transition hover:-translate-y-0.5 hover:border-amber hover:text-amber-dark"
            >
              Watch intro
            </a>
            <a
              href="/Amirali-Hamzeh-Acting-Resume.pdf"
              className="rounded-full border-2 border-ink/15 bg-white/70 px-8 py-3.5 font-semibold text-ink backdrop-blur transition hover:-translate-y-0.5 hover:border-amber hover:text-amber-dark"
            >
              Resume
            </a>
          </div>
          <ul className="reveal mt-12 flex max-w-xl flex-wrap gap-2">
            {quickStats.map((s) => (
              <li
                key={s}
                className="rounded-full border border-line bg-white/80 px-4 py-1.5 text-sm text-ink-soft backdrop-blur"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ ROTATING PHOTO STRIP ============ */}
      <section id="photos" className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <h2 className="reveal text-center font-[family-name:var(--font-display)] text-4xl font-semibold text-ink md:text-5xl">
            In front of the camera
          </h2>
          <p className="reveal mt-3 text-center text-ink-soft">
            Headshots, training, and life — hover to pause.
          </p>
        </div>
        <div className="carousel mt-10 overflow-hidden" aria-label="Photo carousel">
          <div className="carousel-track flex w-max gap-5 pr-5">
            {[...photos, ...photos].map((p, i) => (
              <figure
                key={`${p.src}-${i}`}
                className="group relative h-64 w-48 flex-none overflow-hidden rounded-2xl shadow-md md:h-80 md:w-60"
              >
                <Image
                  src={p.src}
                  alt={`${p.label} — Amirali Hamzeh`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="240px"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-3 pb-2 pt-6 text-xs font-medium text-white">
                  {p.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section id="about" className="bg-sand py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-[1fr_1.2fr] md:px-8">
          <div className="reveal relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/photos/venice-smile.jpg"
              alt="Amirali Hamzeh smiling — commercial look"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 400px"
            />
          </div>
          <div>
            <h2 className="reveal font-[family-name:var(--font-display)] text-4xl font-semibold text-ink md:text-5xl">
              Hi, I&apos;m Amir.
            </h2>
            <p className="reveal mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
              I stepped on a set for the first time in July 2026 — background on
              CBS&apos;s <span className="font-semibold text-ink">Marshals</span>{" "}
              — and I was hooked. Seven paid set days later across two Utah
              productions, I&apos;m building this the same way I build
              everything: show up early, take the note, come back better.
            </p>
            <p className="reveal mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">
              Off set I&apos;m a pre-dental student at SLCC heading to the
              University of Utah in 2027, a certified dental assistant, and the
              founder of a small Salt Lake service business I built and run
              myself. I speak native Farsi, train six days a week, and I&apos;m
              the person on the call sheet who reads the entire email.
            </p>
            <p className="reveal mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">
              My goal is simple: be the easiest booking of your day — prepared,
              coachable, and glad to be there.
            </p>
            <div className="reveal mt-7 flex flex-wrap gap-2">
              {playsWell.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-ink-soft shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SIZE CARD / STATS ============ */}
      <section id="stats" className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <h2 className="reveal text-center font-[family-name:var(--font-display)] text-4xl font-semibold text-ink md:text-5xl">
            The stats
          </h2>
          <p className="reveal mx-auto mt-3 max-w-lg text-center text-ink-soft">
            Everything you need to size me up before a submission.
          </p>

          <dl className="reveal mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {sizeCard.map((s) => (
              <div key={s.label} className="bg-white px-5 py-6 text-center">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  {s.label}
                </dt>
                <dd className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="reveal rounded-2xl border border-line bg-white p-7">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-ink">
                Available for
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {availableFor.map((a) => (
                  <li
                    key={a}
                    className="rounded-full bg-sand px-4 py-1.5 text-sm font-medium text-amber-dark"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal rounded-2xl border border-line bg-white p-7">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-ink">
                Based in &amp; travel
              </h3>
              <p className="mt-4 text-ink-soft">
                <span className="font-semibold text-ink">Salt Lake City, Utah</span>{" "}
                — local hire, no travel or lodging needed anywhere on the Wasatch
                Front. Reliable transport and picture car available.
              </p>
              <p className="mt-3 text-ink-soft">
                Happy to travel outside Utah for any production that covers
                travel and hotel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ATHLETIC / PHYSIQUE ============ */}
      <section id="athletic" className="bg-ink py-16 text-white md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-[1.1fr_1fr] md:px-8">
          <div>
            <p className="reveal text-sm font-semibold uppercase tracking-[0.25em] text-amber">
              Athletic casting
            </p>
            <h2 className="reveal mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold md:text-5xl">
              Built for the physical roles.
            </h2>
            <p className="reveal mt-5 max-w-lg text-lg leading-relaxed text-white/70">
              Six days a week in the gym, year round — not a look I cut for a
              booking. If the breakdown calls for an athlete, a fighter, a
              trainer, military or first responder, or anything that needs a
              real physique on camera, I can be there tomorrow.
            </p>
            <ul className="reveal mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-white/80">
              {[
                "Weightlifting / bodybuilding",
                "Calisthenics — full planche",
                "Boxing",
                "Wrestling",
                "Soccer & basketball",
                "Swimming & snow skiing",
              ].map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-amber" />
                  {s}
                </li>
              ))}
            </ul>
            <p className="reveal mt-8 text-sm text-white/45">
              Currently training toward stage combat and basic stunts — not yet
              certified, and I won&apos;t list it until I am.
            </p>
          </div>
          <div className="reveal relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/photos/physique.jpg"
              alt="Amirali Hamzeh — athletic build, gym training photo"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 90vw, 440px"
            />
          </div>
        </div>
      </section>

      {/* ============ BIG IMAGE BAND — discipline ============ */}
      <section className="relative flex min-h-[75svh] items-end overflow-hidden md:min-h-[88svh]">
        <Image
          src="/photos/planche.jpg"
          alt="Amirali Hamzeh holding a full planche over a canyon in Moab, Utah"
          fill
          className="object-cover object-[55%_74%]"
          sizes="100vw"
        />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-12 md:px-8">
          <p className="reveal font-[family-name:var(--font-display)] text-3xl font-semibold text-white md:text-4xl">
            Discipline you can see.
          </p>
          <p className="reveal mt-2 max-w-md text-white/85">
            Full planche, Moab. Strength and control — take after take.
          </p>
        </div>
      </section>

      {/* ============ SKILLS ============ */}
      <section id="skills" className="bg-sand py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <h2 className="reveal text-center font-[family-name:var(--font-display)] text-4xl font-semibold text-ink md:text-5xl">
            Special skills
          </h2>
          <p className="reveal mx-auto mt-3 max-w-lg text-center text-ink-soft">
            Only things I can actually do on camera today.
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((g) => (
              <div
                key={g.title}
                className="reveal rounded-2xl border border-line bg-white p-6"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-ink">
                  {g.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-2 text-sm text-ink-soft"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-amber"
                      />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CREDITS ============ */}
      <section id="credits" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <h2 className="reveal text-center font-[family-name:var(--font-display)] text-4xl font-semibold text-ink md:text-5xl">
            Credits
          </h2>
          <div className="reveal mt-10 overflow-hidden rounded-2xl border border-line bg-paper shadow-sm">
            {credits.map((c, i) => (
              <div
                key={c.title}
                className={`flex flex-wrap items-center justify-between gap-3 px-6 py-5 ${
                  i > 0 ? "border-t border-line" : ""
                }`}
              >
                <div>
                  <p className="font-semibold text-ink">{c.title}</p>
                  <p className="text-sm text-ink-soft">{c.meta}</p>
                  <p className="mt-1 text-sm text-amber-dark">{c.detail}</p>
                </div>
                <span className="rounded-full bg-sand px-4 py-1.5 text-sm font-semibold text-amber-dark">
                  {c.year}
                </span>
              </div>
            ))}
          </div>

          {/* the strongest signal he has — repeat bookings */}
          <div className="reveal mt-6 rounded-2xl border border-amber/30 bg-sand px-6 py-6 text-center">
            <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
              Booked back four times without reapplying.
            </p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-ink-soft">
              Every Wayfinders day after the first came from casting emailing me
              directly. That&apos;s the part of this résumé I&apos;m proudest of
              — production knew I&apos;d show up.
            </p>
          </div>

          <p className="reveal mt-6 text-center text-sm text-ink-soft">
            Training now: self-tape studio at home · pursuing stage combat
            (Spearhead Stunts) &amp; on-camera workshops
          </p>
          <div className="reveal mt-8 text-center">
            <a
              href="/Amirali-Hamzeh-Acting-Resume.pdf"
              className="inline-block rounded-full border-2 border-amber px-8 py-3.5 font-semibold text-amber-dark transition hover:bg-amber hover:text-white"
            >
              Download resume (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* ============ INTRO VIDEO ============ */}
      <section id="reel" className="bg-sand py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <h2 className="reveal text-center font-[family-name:var(--font-display)] text-4xl font-semibold text-ink md:text-5xl">
            Meet me
          </h2>
          <p className="reveal mx-auto mt-4 max-w-xl text-center text-ink-soft">
            A quick introduction — who I am, what I bring to set, and the work
            I&apos;ve done so far.
          </p>
          <div className="reveal mx-auto mt-10 w-full max-w-[340px] md:max-w-[380px]">
            <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-lg">
              <video
                controls
                playsInline
                preload="metadata"
                poster="/photos/intro-poster.jpg"
                className="block aspect-[9/16] w-full bg-ink object-cover"
              >
                <source src="/amirali-hamzeh-intro.mp4" type="video/mp4" />
                Your browser doesn&apos;t support video playback.{" "}
                <a href="/amirali-hamzeh-intro.mp4">Download the intro video</a>.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BOOK ME ============ */}
      <section id="book" className="relative overflow-hidden">
        <Image
          src="/photos/mountain.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdfbf6] via-[#fdfbf6e6] to-[#fdfbf6cc]" />
        <div className="relative z-10 mx-auto max-w-3xl px-5 py-20 text-center md:px-8 md:py-28">
          <h2 className="reveal font-[family-name:var(--font-display)] text-5xl font-semibold text-ink md:text-6xl">
            Let&apos;s work together
          </h2>
          <p className="reveal mx-auto mt-4 max-w-lg text-lg text-ink-soft">
            Acting &amp; speaking roles · background · commercial · student
            &amp; indie film · print. Utah local hire — and happy to travel
            anywhere the production covers travel and hotel. I reply fast.
          </p>
          <div className="reveal mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={`mailto:${EMAIL}?subject=Booking%20inquiry%20—%20Amirali%20Hamzeh`}
              className="inline-block rounded-full bg-amber px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-amber/30 transition hover:-translate-y-0.5 hover:bg-amber-dark"
            >
              {EMAIL}
            </a>
            <a
              href={`sms:${PHONE_E164}`}
              className="inline-block rounded-full border-2 border-amber bg-white/80 px-8 py-4 text-lg font-semibold text-amber-dark backdrop-blur transition hover:-translate-y-0.5 hover:bg-amber hover:text-white"
            >
              Call / text {PHONE}
            </a>
          </div>
          <div className="reveal mt-9 flex items-center justify-center gap-4">
            {socials
              .filter((s) => s.href)
              .map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink-soft shadow-sm transition hover:-translate-y-0.5 hover:border-amber hover:text-amber-dark"
                >
                  {s.icon}
                </a>
              ))}
          </div>
          <p className="reveal mt-8 text-sm text-ink-soft">
            Also on Casting Networks · Source &amp; Cast · Backstage ·{" "}
            <a
              href="https://utahactors.ning.com/members/AmiraliHamzeh"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-amber-dark underline-offset-2 hover:underline"
            >
              Utah Actors
            </a>
          </p>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-line bg-white px-5 py-7 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-sm text-ink-soft">
          <span>© {new Date().getFullYear()} Amirali Hamzeh — Actor, Salt Lake City</span>
          <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a href={`mailto:${EMAIL}`} className="font-medium text-amber-dark">
              {EMAIL}
            </a>
            <a href={`tel:${PHONE_E164}`} className="font-medium text-amber-dark">
              {PHONE}
            </a>
          </span>
        </div>
      </footer>
    </main>
  );
}
