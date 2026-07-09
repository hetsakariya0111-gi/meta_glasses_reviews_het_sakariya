export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060b14]/85 px-4 py-8 text-sm text-slate-400 shadow-[0_-8px_32px_rgba(2,8,23,0.24)] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Meta Glasses Reviews. Built for sharper product intelligence.</p>
        <div className="flex gap-4">
          <a href="/reviews" className="transition hover:text-emerald-400">Browse reviews</a>
          <a href="/stats" className="transition hover:text-emerald-400">Analytics</a>
          <a href="/login" className="transition hover:text-emerald-400">Login</a>
        </div>
      </div>
    </footer>
  );
}
