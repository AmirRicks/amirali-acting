// ============================================================================
// Daily Casting Brief engine — runs fully server-side on Vercel.
// Sources: every publicly fetchable casting feed within Amir's market.
// AI: free-model router — Groq → OpenRouter → Pollinations (no key) → raw.
// Login-gated feeds (Instagram, Facebook, Source & Cast app, Backstage inbox,
// Casting Networks alerts) CANNOT be scraped server-side; the admin page
// surfaces them as one-tap manual checks instead. Honesty over pretending.
// ============================================================================

export type BriefItem = {
  title: string;
  role: string;
  pay: string;
  deadline: string;
  location: string;
  why_fit: string;
  apply_path: string;
  source: string;
  url: string;
  urgency: "URGENT" | "soon" | "normal";
};

export type SourceStatus = { source: string; ok: boolean; note: string };

export type DailyBrief = {
  date: string;
  generated_at: string;
  model: string;
  fits: BriefItem[];
  paid_gated_skipped: string[];
  dropped_summary: string;
  source_status: SourceStatus[];
  error?: string;
};

// --- Profile + laws (mirror of the canonical Brain daily-casting task) ------
const PROFILE = `
TALENT PROFILE (the ONLY person we are scouting for):
- Amirali "Amir" Hamzeh — male, 19 (plays 17–25). 5'8", 165 lb, athletic (gym 6x/wk).
- Middle Eastern appearance (black hair, brown eyes, medium/tan skin). Bilingual English + native Farsi.
- Non-union. Salt Lake City, Utah — LOCAL HIRE within ~60 miles (SLC, Provo, Orem, Ogden, Park City, Heber, Vineyard). Also fits: fully REMOTE gigs (UGC, voice, self-tape).
- Credits: background on "Marshals" (CBS, S2, Utah). Certified dental assistant (medical-scene realism). Reads as: college student, athlete, young professional, medical staff.
- Has: headshot, acting resume PDF, own car (2021 Nissan Rogue), valid DL + passport.

HARD FILTERS — a listing is a FIT only if ALL hold:
1. Male or any-gender role, playable age overlaps 17–25 (he cannot play 30+, cannot play under 16, and reality-TV/real-person calls that verify REAL age 21+ are OUT — he is really 19).
2. Location within ~60 mi of Salt Lake City OR explicitly remote/self-tape. Anything requiring relocation or shoots in other states is OUT.
3. Deadline / shoot date has NOT passed relative to today's date.
4. A FREE apply path exists (email in listing, Casting Networks free tier, Source & Cast, Backstage [he has a paid sub — allowed], a Google/website form, or a public social post). Listings where the ONLY apply path is a paywalled platform (e.g. allcasting "Apply" button) are NOT fits — list them separately under paid_gated.
5. Real-person/reality calls needing specific circumstances he doesn't have (debt, married, hoarder, owns a specific car, musician/DJ) are OUT.
6. NEVER invent or embellish a listing. Only use listings literally present in the source text. Copy pay/dates/locations exactly as written; if a field is missing write "not stated". This is a hard integrity law.
`;

// Already submitted / worked — never resurface these (seed list, updated in repo).
const EXCLUDE = [
  "Quitters",
  "Howie / Tech Commercial",
  "Marshals",
  "Miracles in Motion",
  "Death of a Cameraman",
  "Teen 17-20yo Major Hotel Brand",
  "Wayfinders",
  "UGC for A Coffee Brewer",
];

// --- Fetchable sources -------------------------------------------------------
// Verified 2026-07-16: Backstage hard-403s all server IPs and Utah Actors (Ning)
// serves a ~400-char login shell to bots — both live in the manual-checks strip
// instead. allcasting moved to /castingcalls and ignores the location param
// server-side (JS filter), so we take the nationwide first page and let the LLM
// location-filter. auditionsfree fetches rich text but posts are often stale —
// the prompt's expired-deadline rule handles that.
const SOURCES: { name: string; url: string }[] = [
  { name: "Utah Film Commission — job board", url: "https://film.utah.gov/job-opportunities/" },
  { name: "Casting Networks — public SLC feed", url: "https://www.castingnetworks.com/salt-lake-city-casting-calls/" },
  { name: "allcasting — nationwide feed (JS location filter; pick ONLY SLC-area or remote items; apply is paid-gated = discovery only)", url: "https://allcasting.com/castingcalls" },
  { name: "Stacker — Utah casting roundup (Backstage aggregate)", url: "https://stacker.com/stories/utah/movies-and-tv-shows-casting-utah" },
  { name: "auditionsfree — Utah tag (posts often STALE — check each post's date/deadline before treating as live)", url: "https://www.auditionsfree.com/tag/utah-auditions/" },
];

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#\d+;|&[a-z]+;/gi, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

async function fetchSource(src: { name: string; url: string }): Promise<{
  status: SourceStatus;
  text: string;
}> {
  try {
    const res = await fetch(src.url, {
      headers: { "user-agent": UA, accept: "text/html" },
      signal: AbortSignal.timeout(20_000),
      cache: "no-store",
    });
    if (!res.ok) {
      return {
        status: {
          source: src.name,
          ok: false,
          note:
            res.status === 403
              ? "HTTP 403 (bot-blocked)"
              : res.status === 404
                ? "HTTP 404 (URL changed — needs a fix in SOURCES)"
                : `HTTP ${res.status}`,
        },
        text: "",
      };
    }
    const text = htmlToText(await res.text()).slice(0, 3200);
    if (text.length < 300) {
      return {
        status: { source: src.name, ok: false, note: "page is JS-rendered / empty for bots" },
        text: "",
      };
    }
    return { status: { source: src.name, ok: true, note: `${text.length} chars` }, text };
  } catch (e) {
    return {
      status: { source: src.name, ok: false, note: (e as Error).message.slice(0, 80) },
      text: "",
    };
  }
}

// --- Free-model router -------------------------------------------------------
type LlmResult = { ok: boolean; model: string; content: string; reason?: string };

async function callOpenAICompatible(
  url: string,
  key: string | undefined,
  model: string,
  prompt: string
): Promise<LlmResult> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(key ? { authorization: `Bearer ${key}` } : {}),
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
              "You are a meticulous casting-brief analyst. You only report listings that literally appear in the provided source text. You never invent details. You output ONLY valid JSON, no markdown fences.",
          },
          { role: "user", content: prompt },
        ],
      }),
      signal: AbortSignal.timeout(90_000),
    });
    if (!res.ok) return { ok: false, model, content: "", reason: `HTTP ${res.status}` };
    const data = await res.json();
    const content: string = data?.choices?.[0]?.message?.content ?? "";
    if (!content) return { ok: false, model, content: "", reason: "empty completion" };
    return { ok: true, model, content };
  } catch (e) {
    return { ok: false, model, content: "", reason: (e as Error).message.slice(0, 80) };
  }
}

async function runLlm(prompt: string): Promise<LlmResult> {
  const groqKey = process.env.GROQ_API_KEY;
  if (groqKey) {
    const r = await callOpenAICompatible(
      "https://api.groq.com/openai/v1/chat/completions",
      groqKey,
      "llama-3.3-70b-versatile",
      prompt
    );
    if (r.ok) return { ...r, model: "groq/llama-3.3-70b" };
  }
  const orKey = process.env.OPENROUTER_API_KEY;
  if (orKey && orKey.startsWith("sk-or-")) {
    const r = await callOpenAICompatible(
      "https://openrouter.ai/api/v1/chat/completions",
      orKey,
      "meta-llama/llama-3.3-70b-instruct:free",
      prompt
    );
    if (r.ok) return { ...r, model: "openrouter/llama-3.3-70b:free" };
  }
  // Pollinations — free, no key. Last-resort hosted model.
  const p = await callOpenAICompatible(
    "https://text.pollinations.ai/openai",
    undefined,
    "openai",
    prompt
  );
  if (p.ok) return { ...p, model: "pollinations/openai (free, no key)" };
  return { ok: false, model: "none", content: "", reason: p.reason ?? "all providers failed" };
}

function extractJson(raw: string): unknown {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end <= start) throw new Error("no JSON object in model output");
  return JSON.parse(raw.slice(start, end + 1));
}

// --- Main --------------------------------------------------------------------
export async function generateDailyBrief(): Promise<DailyBrief> {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    timeZone: "America/Denver",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const results = await Promise.all(SOURCES.map(fetchSource));
  const statuses = results.map((r) => r.status);
  const corpus = results
    .filter((r) => r.status.ok)
    .map((r) => `===== SOURCE: ${r.status.source} =====\n${r.text}`)
    .join("\n\n");

  const base: Omit<DailyBrief, "fits" | "paid_gated_skipped" | "dropped_summary" | "model"> = {
    date: dateStr,
    generated_at: now.toISOString(),
    source_status: statuses,
  };

  if (!corpus) {
    return {
      ...base,
      model: "none",
      fits: [],
      paid_gated_skipped: [],
      dropped_summary: "",
      error: "Every source failed to fetch — check source_status. Try Run Now later.",
    };
  }

  const prompt = `${PROFILE}

TODAY'S DATE: ${dateStr} (America/Denver).

ALREADY SUBMITTED / WORKED — permanently exclude any listing matching these projects:
${EXCLUDE.map((e) => `- ${e}`).join("\n")}

Below is raw text scraped from public casting feeds right now. Analyze it and return ONLY this JSON object (no markdown, no commentary):

{
  "fits": [
    {
      "title": "project title as written",
      "role": "role name/description as written",
      "pay": "exact pay text or 'not stated'",
      "deadline": "exact deadline/shoot dates or 'not stated'",
      "location": "as written",
      "why_fit": "one sentence tying it to HIS profile",
      "apply_path": "the concrete free way to apply (email address / 'CN free tier' / form URL / etc.)",
      "source": "which SOURCE block it came from",
      "url": "listing URL if present in text, else the source feed URL",
      "urgency": "URGENT if deadline within 48h, 'soon' if within a week, else 'normal'"
    }
  ],
  "paid_gated_skipped": ["title — reason (e.g. allcasting Apply-only)"],
  "dropped_summary": "one compact paragraph: how many listings you saw and the main reasons for drops (age/gender/location/expired/real-person mismatch)"
}

Rules reminder: fits may be EMPTY — say so honestly rather than padding. Copy fields verbatim from the text. Do not merge separate listings.

${corpus}`.slice(0, 24_000);

  let llm = await runLlm(prompt);
  if (!llm.ok || !llm.content.includes("{")) {
    // free-tier models choke on long inputs — one retry at half size
    llm = await runLlm(prompt.slice(0, 12_000) + "\n(Sources truncated — analyze what is present.)");
  }
  if (!llm.ok) {
    return {
      ...base,
      model: llm.model,
      fits: [],
      paid_gated_skipped: [],
      dropped_summary: "",
      error: `AI unavailable (${llm.reason}). Sources fetched fine — hit Run Now to retry.`,
    };
  }

  try {
    const parsed = extractJson(llm.content) as Partial<DailyBrief>;
    return {
      ...base,
      model: llm.model,
      fits: Array.isArray(parsed.fits) ? (parsed.fits as BriefItem[]) : [],
      paid_gated_skipped: Array.isArray(parsed.paid_gated_skipped)
        ? (parsed.paid_gated_skipped as string[])
        : [],
      dropped_summary: typeof parsed.dropped_summary === "string" ? parsed.dropped_summary : "",
    };
  } catch {
    return {
      ...base,
      model: llm.model,
      fits: [],
      paid_gated_skipped: [],
      dropped_summary: "",
      error: "Model returned unparseable output — hit Run Now to retry.",
    };
  }
}

// --- Cached access (Vercel data cache via fetch, tag: daily-brief) -----------
export function baseUrl(): string {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export async function getBriefCached(): Promise<DailyBrief> {
  const res = await fetch(`${baseUrl()}/api/internal/generate-brief`, {
    headers: { authorization: `Bearer ${process.env.CRON_SECRET ?? ""}` },
    next: { revalidate: 93600, tags: ["daily-brief"] }, // ~26h; cron revalidates daily
  });
  if (!res.ok) throw new Error(`brief generator returned ${res.status}`);
  return (await res.json()) as DailyBrief;
}
