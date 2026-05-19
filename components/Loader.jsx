export default function Loader({ fullPage = false }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullPage ? "min-h-screen" : "min-h-[400px]"
      }`}
    >
      <div className="relative w-14 h-14">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-orange-500/20" />
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-orange-400 animate-spin" />
        {/* Logo center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-current text-orange-400"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
      </div>
      <p className="text-slate-500 text-sm animate-pulse">Loading…</p>
    </div>
  );
}
