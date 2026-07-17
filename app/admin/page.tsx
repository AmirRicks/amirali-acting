import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { isAdmin } from "@/lib/server/auth";
import { getBriefCached } from "@/lib/server/brief";
import BriefClient from "./BriefClient";

export const metadata: Metadata = {
  title: "Daily Casting — Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  let brief = null;
  let fatal = "";
  try {
    brief = await getBriefCached();
  } catch (e) {
    fatal = (e as Error).message;
  }

  return (
    <main className="min-h-svh bg-paper pb-20">
      <BriefClient brief={brief} fatal={fatal} />
    </main>
  );
}
