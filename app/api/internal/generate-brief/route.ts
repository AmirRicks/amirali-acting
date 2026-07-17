import { NextResponse } from "next/server";
import { generateDailyBrief } from "@/lib/server/brief";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/server/auth";
import { cookies } from "next/headers";

// Uncached generator. Called via the tagged fetch in getBriefCached() —
// Vercel's data cache stores the response for ~26h under tag "daily-brief".
// Auth: CRON_SECRET bearer (server-to-server) OR a valid admin session.
export const maxDuration = 300;

export async function GET(req: Request) {
  const bearer = req.headers.get("authorization");
  const secretOk =
    !!process.env.CRON_SECRET && bearer === `Bearer ${process.env.CRON_SECRET}`;
  const jar = await cookies();
  const sessionOk = verifySessionToken(jar.get(SESSION_COOKIE)?.value);
  if (!secretOk && !sessionOk) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const brief = await generateDailyBrief();
  return NextResponse.json(brief);
}
