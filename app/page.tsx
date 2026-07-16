"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const EMAIL = "amirali.hamzeh@gmail.com";

const frames = [
  {
    src: "/photos/hero-suit.jpg",
    scene: "SC. 01",
    title: "The Professional",
    text: "Show up early. Know the job. Take direction fast. That's the whole reputation I'm building — one call time at a time.",
  },
  {
    src: "/photos/vegas-neon.jpg",
    scene: "SC. 02",
    title: "In a Scene",
    text: "Neon, night exteriors, long takes — I love being inside a frame. The camera doesn't make me nervous; it makes me focus.",
  },
  {
    src: "/photos/planche.jpg",
    scene: "SC. 03",
    title: "The Athlete",
    text: "A full planche over a Moab canyon. Years of training buy you balance, control, and total body awareness on camera.",
  },
  {
    src: "/photos/gym.jpg",
    scene: "SC. 04",
    title: "The Discipline",
    text: "Gym six days a week, every week. The same discipline I bring to a 5 AM call time in Park City.",
  },
  {
    src: "/photos/mountain.jpg",
    scene: "SC. 05",
    title: "The Utah Local",
    text: "Salt Lake City based, local hire across Utah — Park City, Summit and Wasatch counties, Provo, Ogden. These mountains are home.",
  },
  {
    src: "/photos/zion.jpg",
    scene: "SC. 06",
    title: "Range",
    text: "Editorial, lifestyle, print — comfortable holding a look and telling a story without saying a word.",
  },
  {
    src: "/photos/rome-road.jpg",
    scene: "SC. 07",
    title: "Camera Ready",
    text: "Rome, an empty road, one frame. Wherever the story is, I'll sit down in the middle of it.",
  },
  {
    src: "/photos/venice-smile.jpg",
    scene: "SC. 08",
    title: "The Smile",
    text: "Commercial warmth is real warmth. Off set I'm easy to work with, quick to laugh, and genuinely having fun out here.",
  },
];

const stats: [string, string][] = [
  ["Height", `5'8"`],
  ["Weight", "165 lb"],
  ["Hair", "Black"],
  ["Eyes", "Brown"],
  ["Playing age", "17–25"],
  ["Appearance", "Middle Eastern"],
  ["Languages", "English · Farsi (native)"],
  ["Union", "Non-union"],
  ["Base", "Salt Lake City, UT (local hire)"],
];

const plays = [
  "College student",
  "Athlete / physical roles",
  "Medical & clinical staff",
  "Young professional · founder",
  "Middle Eastern & Mediterranean",
];

const sports = [
  "Bodybuilding",
  "Calisthenics",
  "Boxing",
  "Wrestling",
  "Soccer",
  "Skiing",
  "Swimming",
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
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function Home() {
  useReveal();
  const rail = useRef<HTMLDivElement>(null);

  const scrollRail = (dir: number) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("article");
    const w = card ? card.getBoundingClientRect().width + 24 : 420;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <main className="grain relative">
      {/* ============ NAV ============ */}
      <nav className="fixed top-0 z-40 flex w-full items-center justify-between border-b border-line/60 bg-stage/80 px-5 py-3 backdrop-blur-md md:px-10">
        <a
          href="#top"
          className="font-[family-name:var(--font-display)] text-xl tracking-wide text-cream"
        >
          A<span className="text-gold">H</span>
        </a>
        <div className="hidden gap-8 text-xs uppercase tracking-[0.2em] text-cream-dim md:flex">
          <a href="#reel" className="transition hover:text-gold">
            Frames
          </a>
          <a href="#about" className="transition hover:text-gold">
            About
          </a>
          <a href="#credits" className="transition hover:text-gold">
            Credits
          </a>
          <a href="#discipline" className="transition hover:text-gold">
            Discipline
          </a>
          <a href="#contact" className="transition hover:text-gold">
            Contact
          </a>
        </div>
        <a
          href={`mailto:${EMAIL}`}
          className="border border-gold px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-gold transition hover:bg-gold hover:text-stage"
        >
          Book me
        </a>
      </nav>

      {/* ============ HERO ============ */}
      <section
        id="top"
        className="relative flex min-h-svh flex-col justify-end overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="kenburns absolute inset-0">
            <Image
              src="/photos/hero-suit.jpg"
              alt="Amirali Hamzeh — actor headshot in a navy suit"
              fill
              priority
              className="object-cover object-[70%_20%] md:object-[75%_25%]"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-stage via-stage/55 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-stage to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-32 md:px-10 md:pb-24">
          <p className="reveal mb-4 text-xs uppercase tracking-[0.35em] text-gold">
            Actor · Model · Salt Lake City
          </p>
          <h1 className="reveal font-[family-name:var(--font-display)] text-[17vw] leading-[0.9] text-cream md:text-[9rem]">
            AMIRALI
            <br />
            HAMZEH
          </h1>
          <p className="reveal mt-6 max-w-xl text-base leading-relaxed text-cream-dim md:text-lg">
            Athletic, bilingual, camera-ready — and disciplined enough to be on
            set before the coffee is. First screen credit:{" "}
            <span className="text-cream">Marshals (CBS)</span>, and building
            from there.
          </p>
          <div className="reveal mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${EMAIL}?subject=Casting%20inquiry%20—%20Amirali%20Hamzeh`}
              className="bg-gold px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-stage transition hover:bg-cream"
            >
              Cast me
            </a>
            <a
              href="/Amirali-Hamzeh-Acting-Resume.pdf"
              className="border border-cream/30 px-7 py-3 text-sm uppercase tracking-[0.15em] text-cream transition hover:border-gold hover:text-gold"
            >
              Resume (PDF)
            </a>
          </div>
        </div>

        {/* credit strip */}
        <div className="relative z-10 border-t border-line bg-stage-2/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-10 gap-y-2 px-5 py-4 text-[11px] uppercase tracking-[0.22em] text-cream-dim md:px-10">
            <span>
              <span className="text-gold">Marshals (CBS)</span> · Background ·
              2026
            </span>
            <span className="hidden md:inline">Non-union</span>
            <span className="hidden md:inline">EN · Farsi</span>
            <span className="hidden lg:inline">
              Utah local hire · will travel
            </span>
          </div>
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <div className="overflow-hidden border-b border-line bg-stage py-4">
        <div className="marquee-track flex w-max gap-8 whitespace-nowrap font-[family-name:var(--font-display)] text-2xl uppercase text-cream/20">
          {[0, 1].map((k) => (
            <span key={k} className="flex gap-8">
              {[
                "Background",
                "Commercial",
                "Student & Indie Film",
                "Print",
                "Fitness",
                "Television",
              ].map((w) => (
                <span key={w}>
                  {w} <span className="text-gold/40">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ============ FRAMES RAIL ============ */}
      <section id="reel" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-10">
          <div className="reveal flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-gold">
                Eight frames
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-5xl uppercase text-cream md:text-7xl">
                The story so far
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-cream-dim">
                Scroll through — every frame is real, and so is the caption
                under it.
              </p>
            </div>
            <div className="hidden gap-3 md:flex">
              <button
                onClick={() => scrollRail(-1)}
                aria-label="Previous frame"
                className="h-12 w-12 border border-line text-cream-dim transition hover:border-gold hover:text-gold"
              >
                ←
              </button>
              <button
                onClick={() => scrollRail(1)}
                aria-label="Next frame"
                className="h-12 w-12 border border-line text-cream-dim transition hover:border-gold hover:text-gold"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div
          ref={rail}
          className="rail mt-10 flex gap-6 overflow-x-auto px-5 md:px-10"
        >
          {frames.map((f) => (
            <article
              key={f.scene}
              className="group w-[78vw] flex-none sm:w-[400px]"
            >
              <div className="relative aspect-[3/4] overflow-hidden border border-line bg-stage-2">
                <Image
                  src={f.src}
                  alt={`${f.title} — Amirali Hamzeh`}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 78vw, 400px"
                />
                <span className="absolute left-3 top-3 bg-stage/70 px-2 py-1 text-[10px] tracking-[0.25em] text-gold backdrop-blur">
                  {f.scene}
                </span>
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-cream">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-dim">
                {f.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section
        id="about"
        className="border-y border-line bg-stage-2 py-20 md:py-28"
      >
        <div className="mx-auto grid max-w-6xl gap-14 px-5 md:grid-cols-[1.2fr_1fr] md:px-10">
          <div>
            <p className="reveal text-xs uppercase tracking-[0.35em] text-gold">
              About
            </p>
            <h2 className="reveal mt-3 font-[family-name:var(--font-display)] text-5xl uppercase leading-none text-cream md:text-6xl">
              Reliable is
              <br />a skill too
            </h2>
            <div className="reveal mt-8 space-y-5 text-[15px] leading-relaxed text-cream-dim">
              <p>
                Amirali Hamzeh is a Salt Lake City–based actor and model. He
                began on-camera work in 2026 as background talent on CBS&apos;s{" "}
                <span className="text-cream">Marshals</span> (Paramount
                Television Studios) and is training toward featured and
                speaking roles across film, TV, and commercial work.
              </p>
              <p>
                Off set he&apos;s a certified dental assistant, a pre-dental
                student, and a builder who ships AI products — a work ethic he
                brings to every call time. Persian roots and a native Farsi
                speaker; trains at the gym six days a week; plays ages 17–25
                and works as local hire across Utah.
              </p>
              <p>
                The goal is simple: be the easiest booking on the call sheet —
                prepared, coachable, and genuinely glad to be there.
              </p>
            </div>
          </div>

          <div className="reveal">
            <div className="border border-line bg-stage p-7">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">
                Stats
              </p>
              <dl className="mt-5 divide-y divide-line/70">
                {stats.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 py-2.5">
                    <dt className="text-xs uppercase tracking-[0.15em] text-cream-dim">
                      {k}
                    </dt>
                    <dd className="text-right text-sm text-cream">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-6 border border-line bg-stage p-7">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">
                Plays
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {plays.map((p) => (
                  <li
                    key={p}
                    className="border border-line px-3 py-1.5 text-xs text-cream-dim"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CREDITS ============ */}
      <section id="credits" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-10">
          <p className="reveal text-xs uppercase tracking-[0.35em] text-gold">
            Credits & training
          </p>
          <h2 className="reveal mt-3 font-[family-name:var(--font-display)] text-5xl uppercase text-cream md:text-6xl">
            On the record
          </h2>

          <div className="reveal mt-10 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line text-[11px] uppercase tracking-[0.25em] text-cream-dim">
                  <th className="py-3 pr-6 font-normal">Production</th>
                  <th className="py-3 pr-6 font-normal">Role</th>
                  <th className="py-3 pr-6 font-normal">Studio</th>
                  <th className="py-3 font-normal">Year</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line/60">
                  <td className="py-4 pr-6 text-cream">
                    Marshals (CBS) — Season 2
                  </td>
                  <td className="py-4 pr-6 text-cream-dim">Background</td>
                  <td className="py-4 pr-6 text-cream-dim">
                    Paramount Television Studios · Utah
                  </td>
                  <td className="py-4 text-cream-dim">2026</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="reveal mt-10 grid gap-6 md:grid-cols-2">
            <div className="border border-line p-7">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">
                Training — current
              </p>
              <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                On-set experience · self-tape setup at home with fast
                turnaround · athletic base built over years of daily training.
              </p>
            </div>
            <div className="border border-line p-7">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">
                Training — pursuing
              </p>
              <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                Stage combat & basic stunt work (Spearhead Stunts) · scene
                study · on-camera commercial workshops.
              </p>
            </div>
          </div>

          <a
            href="/Amirali-Hamzeh-Acting-Resume.pdf"
            className="reveal mt-10 inline-block border border-gold px-7 py-3 text-sm uppercase tracking-[0.15em] text-gold transition hover:bg-gold hover:text-stage"
          >
            Download full resume
          </a>
        </div>
      </section>

      {/* ============ DISCIPLINE ============ */}
      <section
        id="discipline"
        className="border-y border-line bg-stage-2 py-20 md:py-28"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2 md:px-10">
          <div className="reveal relative aspect-[3/4] overflow-hidden border border-line">
            <Image
              src="/photos/planche.jpg"
              alt="Amirali Hamzeh holding a full planche on a rock over a canyon in Moab, Utah"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 45vw"
            />
            <span className="absolute bottom-3 left-3 bg-stage/70 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-cream backdrop-blur">
              Full planche · Moab, Utah
            </span>
          </div>
          <div>
            <p className="reveal text-xs uppercase tracking-[0.35em] text-gold">
              The discipline
            </p>
            <h2 className="reveal mt-3 font-[family-name:var(--font-display)] text-5xl uppercase leading-none text-cream md:text-6xl">
              Body is part
              <br />
              of the craft
            </h2>
            <p className="reveal mt-6 max-w-md text-[15px] leading-relaxed text-cream-dim">
              Six training days a week, every week — strength, calisthenics,
              and sport. It shows up on camera as posture, stamina through long
              set days, and the control to repeat physical action take after
              take.
            </p>
            <ul className="reveal mt-8 flex max-w-md flex-wrap gap-2">
              {sports.map((s) => (
                <li
                  key={s}
                  className="border border-line px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-cream-dim"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="relative overflow-hidden py-24 md:py-36">
        <div className="pointer-events-none absolute -right-40 top-1/2 hidden h-[130%] w-[46rem] -translate-y-1/2 opacity-25 md:block">
          <Image
            src="/photos/mountain.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="46rem"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stage via-stage/60 to-stage/30" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 md:px-10">
          <p className="reveal text-xs uppercase tracking-[0.35em] text-gold">
            Casting · booking
          </p>
          <h2 className="reveal mt-4 font-[family-name:var(--font-display)] text-[14vw] uppercase leading-[0.9] text-cream md:text-[7.5rem]">
            Let&apos;s make
            <br />a scene
          </h2>
          <p className="reveal mt-6 max-w-md text-[15px] leading-relaxed text-cream-dim">
            Available for background, commercial, student and independent film,
            and print — Salt Lake City local hire, willing to travel.
          </p>
          <div className="reveal mt-9 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${EMAIL}?subject=Casting%20inquiry%20—%20Amirali%20Hamzeh`}
              className="bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-stage transition hover:bg-cream"
            >
              {EMAIL}
            </a>
            <a
              href="https://www.instagram.com/amirali.hamzeh/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-cream/30 px-8 py-4 text-sm uppercase tracking-[0.15em] text-cream transition hover:border-gold hover:text-gold"
            >
              Instagram
            </a>
          </div>
          <p className="reveal mt-8 text-xs uppercase tracking-[0.2em] text-cream-dim">
            Also on Casting Networks · Source & Cast · Backstage
          </p>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-line px-5 py-8 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.2em] text-cream-dim">
          <span>© {new Date().getFullYear()} Amirali Hamzeh</span>
          <span>
            Actor · Salt Lake City, Utah —{" "}
            <a href={`mailto:${EMAIL}`} className="text-gold">
              {EMAIL}
            </a>
          </span>
        </div>
      </footer>
    </main>
  );
}
