import Link from "next/link";

export const metadata = { title: "404 — Page Not Found | SkillSphere" };

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center relative z-10">
        {/* Glitchy 404 */}
        <div className="relative inline-block mb-6">
          <span
            className="text-[8rem] md:text-[12rem] font-black leading-none select-none"
            style={{
              background: "linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fdba74 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 40px rgba(249,115,22,0.4))",
            }}
          >
            404
          </span>
        </div>

        <div className="glass-card p-8 max-w-md mx-auto rounded-2xl glow-border">
          <div className="text-5xl mb-4">🔭</div>
          <h1 className="text-2xl font-bold mb-3">Lost in the Knowledge Void</h1>
          <p className="text-base-content/60 mb-8 leading-relaxed">
            The page you&apos;re looking for has drifted into another dimension. Let&apos;s get
            you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="btn btn-primary rounded-full px-6"
            >
              ← Back to Home
            </Link>
            <Link
              href="/courses"
              className="btn btn-outline btn-primary rounded-full px-6"
            >
              Browse Courses
            </Link>
          </div>
        </div>

        {/* Fun floating orbs */}
        <div className="mt-12 flex justify-center gap-6 text-4xl animate-bounce">
          <span style={{ animationDelay: "0s" }}>🚀</span>
          <span style={{ animationDelay: "0.2s" }}>⭐</span>
          <span style={{ animationDelay: "0.4s" }}>🌌</span>
        </div>
      </div>
    </main>
  );
}
