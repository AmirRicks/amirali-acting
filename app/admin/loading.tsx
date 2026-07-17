export default function AdminLoading() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 bg-paper px-5 text-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-amber" />
      <p className="font-medium text-ink">Scanning today&apos;s casting feeds…</p>
      <p className="max-w-sm text-sm text-ink-soft">
        First load of the day fetches every source and runs the AI — up to a
        minute. After that it&apos;s instant.
      </p>
    </main>
  );
}
