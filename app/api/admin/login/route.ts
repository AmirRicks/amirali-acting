import { NextResponse } from "next/server";
import {
  checkCredentials,
  createSessionToken,
  sessionCookieOptions,
  SESSION_COOKIE,
} from "@/lib/server/auth";

export async function POST(req: Request) {
  let email = "", password = "";
  try {
    const body = await req.json();
    email = String(body.email ?? "");
    password = String(body.password ?? "");
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // small fixed delay — blunts brute-force without a rate-limit store
  await new Promise((r) => setTimeout(r, 400));

  if (!checkCredentials(email, password)) {
    return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, createSessionToken(), sessionCookieOptions());
  return res;
}
