"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import AnimatedSection from "@/components/AnimatedSection";

export default function MyProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?callbackUrl=/my-profile");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <span className="loading loading-ring loading-lg text-primary" />
      </main>
    );
  }

  if (!session) return null;

  const user = session.user;
  const initials = user.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U";
  const joinDate = new Date(user.createdAt || Date.now()).toLocaleDateString("en-US", { year: "numeric", month: "long" });

  const stats = [
    { label: "Courses Enrolled", value: "4", icon: "📚" },
    { label: "Hours Learned", value: "24", icon: "⏱" },
    { label: "Certificates", value: "1", icon: "🏆" },
    { label: "Streak Days", value: "7", icon: "🔥" },
  ];

  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection direction="up">
          {/* Profile Hero */}
          <div className="glass-card rounded-3xl p-8 glow-border mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
              {/* Avatar */}
              <div className="relative shrink-0">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-28 h-28 rounded-2xl object-cover border-2 border-primary/40 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary to-orange-700 flex items-center justify-center text-white text-3xl font-black shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                    {initials}
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-success rounded-full border-2 border-base-100 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-black mb-1">{user.name}</h1>
                <p className="text-primary font-medium mb-1">{user.email}</p>
                <p className="text-base-content/40 text-sm mb-5">Member since {joinDate}</p>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Link
                    href="/my-profile/update"
                    className="btn btn-primary btn-sm rounded-full px-5 shadow-[0_0_12px_rgba(249,115,22,0.3)]"
                  >
                    ✏️ Edit Profile
                  </Link>
                  <button
                    onClick={() => authClient.signOut().then(() => { router.push("/"); router.refresh(); })}
                    className="btn btn-outline btn-sm rounded-full px-5 border-white/10 hover:border-error hover:text-error"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Stats Grid */}
        <AnimatedSection direction="up" delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((s, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 text-center border border-white/5 hover:border-primary/20 transition-all">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-2xl font-black text-primary">{s.value}</div>
                <div className="text-xs text-base-content/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Account Information */}
        <AnimatedSection direction="up" delay={0.15}>
          <div className="glass-card rounded-2xl p-6 glow-border">
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
              <span className="text-primary">👤</span> Account Information
            </h2>

            <div className="space-y-4">
              {[
                { label: "Full Name", value: user.name, icon: "🏷" },
                { label: "Email Address", value: user.email, icon: "📧" },
                { label: "Account ID", value: user.id?.substring(0, 16) + "...", icon: "🔑" },
                { label: "Email Verified", value: user.emailVerified ? "✅ Verified" : "⚠️ Not Verified", icon: "✉️" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm text-base-content/50">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium text-right max-w-[55%] break-all">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
              <Link href="/my-profile/update" className="btn btn-primary w-full rounded-full">
                ✏️ Update Profile Information
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
