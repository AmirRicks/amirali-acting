"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        window.location.href = "/admin";
        return;
      }
      setError("Wrong email or password.");
    } catch {
      setError("Network error — try again.");
    }
    setBusy(false);
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-paper px-5">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-3xl border border-line bg-white p-8 shadow-xl"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-dark">
          Private
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-ink">
          Admin login
        </h1>
        <label className="mt-6 block text-sm font-medium text-ink-soft">
          Email
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none transition focus:border-amber"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-ink-soft">
          Password
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink outline-none transition focus:border-amber"
          />
        </label>
        {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-full bg-amber py-3.5 font-semibold text-white shadow-md transition hover:bg-amber-dark disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
