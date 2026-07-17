import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { isAdmin } from "@/lib/server/auth";

// "Run now" — admin-only manual re-scan: drop the cached brief; the admin
// page's next load regenerates it fresh.
export async function POST() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  revalidateTag("daily-brief");
  return NextResponse.json({ ok: true });
}
