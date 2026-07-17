import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getBriefCached } from "@/lib/server/brief";

// Vercel Cron hits this daily (see vercel.json). Vercel automatically sends
// "Authorization: Bearer $CRON_SECRET" when the env var exists.
// Flow: invalidate yesterday's cached brief → regenerate + warm the cache,
// so the admin page is instant on any device all day — no computer needed.
export const maxDuration = 300;

export async function GET(req: Request) {
  const bearer = req.headers.get("authorization");
  if (!process.env.CRON_SECRET || bearer !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  revalidateTag("daily-brief", "max");
  const brief = await getBriefCached(); // regenerates + repopulates the cache
  return NextResponse.json({
    ok: true,
    date: brief.date,
    fits: brief.fits.length,
    model: brief.model,
    error: brief.error ?? null,
  });
}
