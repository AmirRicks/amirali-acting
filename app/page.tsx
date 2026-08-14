"use client";

import Image from "next/image";
import { useEffect } from "react";

const EMAIL = "amirali.hamzeh@gmail.com";
const PHONE = "804-982-2814";
const PHONE_E164 = "+18049822814";

const photos = [
  { src: "/photos/hero-suit.jpg", label: "Headshot" },
  { src: "/photos/vegas-neon.jpg", label: "On location" },
  { src: "/photos/planche.jpg", label: "Moab, Utah" },
  { src: "/photos/gym.jpg", label: "Training" },
  { src: "/photos/mountain.jpg", label: "Utah local" },
  { src: "/photos/zion.jpg", label: "Editorial" },
  { src: "/photos/rome-road.jpg", label: "Print" },
  { src: "/photos/venice-smile.jpg", label: "Commercial" },
];

const quickStats = [
  "Plays 17–25",
  `5'8" · 165 lb`,
  "English + Farsi",
  "Non-union",
  "7 paid set days",
  "Salt Lake City · local hire",
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
      {/* ============ NAV ============ */}
      <nav className="fixed top-0 z-40 w-full border-b border-line bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
          <a
            href="#top"
            className="font-[family-name:var(--font-display)] text-xl font-semibold text-ink"
          >
            Amirali<span className="text-amber">.</span>
          </a>
          <div className="hidden gap-7 text-sm text-ink-soft md:flex">
            <a href="#photos" className="transition hover:text-amber-dark">Photos</a>
            <a href="#about" className="transition hover:text-amber-dark">About</a>
            <a href="#reel" className="transition hover:text-amber-dark">Intro video</a>
            <a href="#credits" className="transition hover:text-amber-dark">Credits</a>
            <a href="#book" className="transition hover:text-amber-dark">Contact</a>
          </div>
          <a
            href="#book"
            className="rounded-full bg-amber px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-dark"
          >
            Book me
          </a>
        </div>
      </nav>

      {/* ============ HERO — big professional image, light & warm ============ */}
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

      {/* ============ ROTATING PHOTO STRIP (small, left → right, infinite) ============ */}
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
                className="group relative h-52 w-40 flex-none overflow-hidden rounded-2xl shadow-md md:h-64 md:w-48"
              >
                <Image
                  src={p.src}
                  alt={`${p.label} — Amirali Hamzeh`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="192px"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-3 pb-2 pt-6 text-xs font-medium text-white">
                  {p.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ABOUT — short & warm ============ */}
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
              I started on camera in 2026 as background talent on CBS&apos;s{" "}
              <span className="font-semibold text-ink">Marshals</span> — and I
              was hooked. I train at the gym six days a week, speak native
              Farsi, and bring a builder&apos;s work ethic to every call time.
            </p>
            <p className="reveal mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">
              My goal is simple: be the easiest booking on your call sheet —
              prepared, coachable, and glad to be there.
            </p>
            <div className="reveal mt-7 flex flex-wrap gap-2">
              {["College student", "Athlete", "Medical roles", "Young professional"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-ink-soft shadow-sm"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
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

      {/* ============ CREDITS ============ */}
      <section id="credits" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <h2 className="reveal text-center font-[family-name:var(--font-display)] text-4xl font-semibold text-ink md:text-5xl">
            Credits
          </h2>
          <div className="reveal mt-10 overflow-hidden rounded-2xl border border-line bg-paper shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5">
              <div>
                <p className="font-semibold text-ink">Marshals (CBS) — Season 2</p>
                <p className="text-sm text-ink-soft">Background · 2 shoot days · Utah</p>
              </div>
              <span className="rounded-full bg-sand px-4 py-1.5 text-sm font-semibold text-amber-dark">
                2026
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-6 py-5">
              <div>
                <p className="font-semibold text-ink">The Wayfinders — Season 2</p>
                <p className="text-sm text-ink-soft">Background · 5 shoot days · Utah</p>
              </div>
              <span className="rounded-full bg-sand px-4 py-1.5 text-sm font-semibold text-amber-dark">
                2026
              </span>
            </div>
          </div>
          <p className="reveal mt-6 text-center text-sm text-ink-soft">
            Training now: self-tape studio at home · pursuing stage combat
            (Spearhead Stunts) & on-camera workshops
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
          <p className="reveal mx-auto mt-4 max-w-md text-lg text-ink-soft">
            Background · commercial · student & indie film · print. Utah local
            hire, willing to travel. I reply fast.
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
            Also on Casting Networks · Source & Cast · Backstage ·{" "}
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
