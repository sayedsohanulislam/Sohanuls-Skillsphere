"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", image: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
      image: form.image || undefined,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
    } else {
      toast.success("Account created! Please sign in. 🎉");
      router.push("/login");
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    setGoogleLoading(false);
  };

  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "bg-error", "bg-warning", "bg-info", "bg-success"][strength];

  return (
    <main className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.5)]">
              <span className="text-white font-black text-lg">S</span>
            </div>
            <span className="text-xl font-black gradient-text">SkillSphere</span>
          </Link>
          <h1 className="text-3xl font-black mb-1">Start learning today</h1>
          <p className="text-base-content/50 text-sm">Create your free account in seconds</p>
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
            Sign up with Google
          </button>

          <div className="divider text-base-content/30 text-xs">OR SIGN UP WITH EMAIL</div>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="form-control">
              <label className="label pb-1"><span className="label-text text-sm font-medium">Full Name</span></label>
              <input name="name" type="text" required value={form.name} onChange={handleChange}
                placeholder="John Doe"
                className="input w-full glass-card border border-white/10 focus:border-primary focus:outline-none rounded-xl h-12" />
            </div>

            <div className="form-control">
              <label className="label pb-1"><span className="label-text text-sm font-medium">Email</span></label>
              <input name="email" type="email" required value={form.email} onChange={handleChange}
                placeholder="you@example.com"
                className="input w-full glass-card border border-white/10 focus:border-primary focus:outline-none rounded-xl h-12" />
            </div>

            <div className="form-control">
              <label className="label pb-1"><span className="label-text text-sm font-medium">Profile Photo URL <span className="text-base-content/30">(optional)</span></span></label>
              <input name="image" type="url" value={form.image} onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                className="input w-full glass-card border border-white/10 focus:border-primary focus:outline-none rounded-xl h-12" />
              {form.image && (
                <div className="mt-2 flex items-center gap-2">
                  <img src={form.image} alt="preview" className="w-10 h-10 rounded-full object-cover border border-primary/30" onError={(e) => { e.target.style.display = "none"; }} />
                  <span className="text-xs text-base-content/50">Preview</span>
                </div>
              )}
            </div>

            <div className="form-control">
              <label className="label pb-1"><span className="label-text text-sm font-medium">Password</span></label>
              <div className="relative">
                <input name="password" type={showPass ? "text" : "password"} required value={form.password} onChange={handleChange}
                  placeholder="Min. 8 characters"
                  className="input w-full glass-card border border-white/10 focus:border-primary focus:outline-none rounded-xl h-12 pr-12" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute inset-y-0 right-4 text-base-content/40 hover:text-primary">
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
              {form.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor : "bg-base-content/10"}`} />
                    ))}
                  </div>
                  <p className={`text-xs ${["","text-error","text-warning","text-info","text-success"][strength]}`}>{strengthLabel}</p>
                </div>
              )}
            </div>

            <div className="form-control">
              <label className="label pb-1"><span className="label-text text-sm font-medium">Confirm Password</span></label>
              <input name="confirm" type="password" required value={form.confirm} onChange={handleChange}
                placeholder="Repeat password"
                className={`input w-full glass-card border focus:outline-none rounded-xl h-12 transition-all ${
                  form.confirm && form.confirm !== form.password ? "border-error" : "border-white/10 focus:border-primary"
                }`} />
              {form.confirm && form.confirm !== form.password && (
                <p className="text-xs text-error mt-1">Passwords don&apos;t match</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full rounded-full h-12 font-bold text-base shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transition-all mt-2"
            >
              {loading ? <span className="loading loading-spinner loading-sm" /> : "Create Account →"}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/50 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
