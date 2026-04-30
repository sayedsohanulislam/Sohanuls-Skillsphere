"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await authClient.signIn.email({
      email: form.email,
      password: form.password,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message || "Invalid credentials. Please try again.");
    } else {
      toast.success("Welcome back! 🎉");
      router.push(callbackUrl);
      router.refresh();
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await authClient.signIn.social({ provider: "google", callbackURL: callbackUrl });
    setGoogleLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.5)]">
              <span className="text-white font-black text-lg">S</span>
            </div>
            <span className="text-xl font-black gradient-text">SkillSphere</span>
          </Link>
          <h1 className="text-3xl font-black mb-1">Welcome back</h1>
          <p className="text-base-content/50 text-sm">Sign in to continue your learning journey</p>
        </div>

        <div className="glass-card rounded-2xl p-8 glow-border">
          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="btn btn-outline w-full rounded-full mb-6 gap-3 border-white/10 hover:border-primary/40 hover:bg-primary/5"
          >
            {googleLoading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            Continue with Google
          </button>

          <div className="divider text-base-content/30 text-xs">OR CONTINUE WITH EMAIL</div>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            <div className="form-control">
              <label className="label pb-1"><span className="label-text text-sm font-medium">Email</span></label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input w-full glass-card border border-white/10 focus:border-primary focus:outline-none rounded-xl h-12"
              />
            </div>

            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text text-sm font-medium">Password</span>
                <Link href="#" className="label-text-alt text-primary hover:underline text-xs">Forgot password?</Link>
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input w-full glass-card border border-white/10 focus:border-primary focus:outline-none rounded-xl h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-4 text-base-content/40 hover:text-primary"
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full rounded-full h-12 font-bold text-base shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transition-all"
            >
              {loading ? <span className="loading loading-spinner loading-sm" /> : "Sign In →"}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/50 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary font-semibold hover:underline">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
