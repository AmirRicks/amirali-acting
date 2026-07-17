"use client";

import { useEffect, useState } from "react";
import type { DailyBrief } from "@/lib/server/brief";

const DONE_KEY = "aa_submitted_v1";

// Login-gated feeds no server can scrape — one-tap manual checks.
const MANUAL_CHECKS = [
  { name: "Source & Cast (app)", href: "https://sourceandcast.com/", note: "your #1 Utah lane — check notifications" },
  { name: "Casting Networks — Your Alerts", href: "https://app.castingnetworks.com/talent/casting-billboard", note: "direct requests are invisible to scans" },
  { name: "Backstage — saved SLC search", href: "https://www.backstage.com/casting/", note: "inside your account: Matches" },
  { name: "@utahcasting (IG)", href: "https://www.instagram.com/utahcasting/", note: "local extras office insider feed" },
  { name: "@utahfilm (IG)", href: "https://www.instagram.com/utahfilm/", note: "Utah Film Commission" },
  { name: "Utah Actors Network FB", href: "https://www.facebook.com/groups/UtahActors/", note: "same-day CD posts" },
  { name: "Utah Actors (Ning) forum", href: "https://utahactors.ning.com/forum/topics", note: "community casting posts" },
];

function loadDone(): string[] {
  try {
    return JSON.parse(localStorage.getItem(DONE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export default function BriefClient({
  brief,
  fatal,
}: {
  brief: DailyBrief | null;
  fatal: string;
}) {
  const [done, setDone] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setDone(loadDone());
    const onStorage = () => setDone(loadDone());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function markDone(key: string) {
    const next = done.includes(key) ? done.filter((k) => k !== key) : [...done, key];
    localStorage.setItem(DONE_KEY, JSON.stringify(next));
    // same-tab listeners refresh via synthetic event
    window.dispatchEvent(new StorageEvent("storage", { key: DONE_KEY }));
    setDone(next);
  }

  async function runNow() {
    setRunning(true);
    await fetch("/api/admin/refresh", { method: "POST" });
    window.location.reload();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/";
  }

  const okSources = brief?.source_status.filter((s) => s.ok).length ?? 0;
  const totalSources = brief?.source_status.length ?? 0;

  return (
    <div className="mx-auto max-w-4xl px-5 pt-10 md:px-8">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-dark">
            Private · Daily casting brief
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-4xl font-semibold text-ink">
            {brief?.date ?? "Today"}
          </h1>
          {brief && (
            <p className="mt-1 text-sm text-ink-soft">
              {okSources}/{totalSources} sources scanned · AI: {brief.model} · generated{" "}
              {new Date(brief.generated_at).toLocaleTimeString("en-US", {
                timeZone: "America/Denver",
                hour: "numeric",
                minute: "2-digit",
              })}{" "}
              MT
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={runNow}
            disabled={running}
            className="rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-dark disabled:opacity-60"
          >
            {running ? "Re-scanning…" : "Run now"}
          </button>
          <button
            onClick={logout}
            className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-soft transition hover:border-amber hover:text-amber-dark"
          >
            Log out
          </button>
        </div>
      </div>

      {/* errors */}
      {(fatal || brief?.error) && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {fatal || brief?.error}
        </div>
      )}

      {/* fits */}
      <section className="mt-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
          Fits for you {brief ? `(${brief.fits.length})` : ""}
        </h2>
        {brief && brief.fits.length === 0 && !brief.error && (
          <p className="mt-3 rounded-2xl border border-line bg-white px-5 py-4 text-ink-soft">
            Nothing new fits today — honestly quiet, not padded. Check the manual
            feeds below; they see what scans can&apos;t.
          </p>
        )}
        <div className="mt-4 grid gap-4">
          {brief?.fits.map((f) => {
            const key = `${f.title}::${f.role}`;
            const isDone = done.includes(key);
            return (
              <article
                key={key}
                className={`rounded-2xl border bg-white p-5 shadow-sm transition ${
                  isDone ? "border-line opacity-50" : "border-line hover:border-amber"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      {f.urgency === "URGENT" && (
                        <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700">
                          URGENT
                        </span>
                      )}
                      {f.urgency === "soon" && (
                        <span className="rounded-full bg-amber/15 px-2.5 py-0.5 text-xs font-bold text-amber-dark">
                          SOON
                        </span>
                      )}
                      <h3 className="font-semibold text-ink">{f.title}</h3>
                    </div>
                    <p className="mt-1 text-sm text-ink-soft">{f.role}</p>
                  </div>
                  <button
                    onClick={() => markDone(key)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                      isDone
                        ? "bg-sand text-ink-soft"
                        : "border border-amber text-amber-dark hover:bg-amber hover:text-white"
                    }`}
                  >
                    {isDone ? "Submitted ✓ (undo)" : "Mark submitted"}
                  </button>
                </div>
                <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                  <div><dt className="inline font-medium text-ink">Pay: </dt><dd className="inline text-ink-soft">{f.pay}</dd></div>
                  <div><dt className="inline font-medium text-ink">Deadline: </dt><dd className="inline text-ink-soft">{f.deadline}</dd></div>
                  <div><dt className="inline font-medium text-ink">Location: </dt><dd className="inline text-ink-soft">{f.location}</dd></div>
                  <div><dt className="inline font-medium text-ink">Apply: </dt><dd className="inline text-ink-soft">{f.apply_path}</dd></div>
                </dl>
                <p className="mt-2 text-sm italic text-ink-soft">{f.why_fit}</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-ink-soft">
                  <span>{f.source}</span>
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-amber-dark hover:underline"
                  >
                    Open listing →
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* paid-gated */}
      {brief && brief.paid_gated_skipped.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-ink">
            ⚠ Found but paid-apply-only (free-only rule)
          </h2>
          <ul className="mt-2 list-inside list-disc text-sm text-ink-soft">
            {brief.paid_gated_skipped.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      )}

      {/* dropped summary */}
      {brief?.dropped_summary && (
        <p className="mt-6 rounded-2xl bg-sand px-5 py-4 text-sm text-ink-soft">
          <span className="font-semibold text-ink">Dropped on review: </span>
          {brief.dropped_summary}
        </p>
      )}

      {/* manual checks */}
      <section className="mt-10">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
          Your daily manual checks
        </h2>
        <p className="mt-1 text-sm text-ink-soft">
          These are login-gated — no scan can see inside them. One tap each:
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {MANUAL_CHECKS.map((m) => (
            <a
              key={m.name}
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-line bg-white px-4 py-3 shadow-sm transition hover:border-amber"
            >
              <p className="font-semibold text-ink">{m.name} →</p>
              <p className="text-xs text-ink-soft">{m.note}</p>
            </a>
          ))}
        </div>
      </section>

      {/* source status */}
      {brief && (
        <details className="mt-10 rounded-2xl border border-line bg-white px-5 py-4">
          <summary className="cursor-pointer text-sm font-semibold text-ink">
            Scan health — {okSources}/{totalSources} sources OK
          </summary>
          <ul className="mt-3 space-y-1 text-sm">
            {brief.source_status.map((s) => (
              <li key={s.source} className={s.ok ? "text-ink-soft" : "text-red-600"}>
                {s.ok ? "✓" : "✗"} {s.source} — {s.note}
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
