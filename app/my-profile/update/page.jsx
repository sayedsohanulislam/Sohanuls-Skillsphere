"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import AnimatedSection from "@/components/AnimatedSection";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [form, setForm] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?callbackUrl=/my-profile/update");
    }
    if (session?.user) {
      setForm({
        name: session.user.name || "",
        image: session.user.image || "",
      });
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "image") setImgError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }
    setLoading(true);
    const { error } = await authClient.updateUser({
      name: form.name,
      image: form.image || undefined,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message || "Update failed. Please try again.");
    } else {
      toast.success("Profile updated successfully! ✅");
      router.push("/my-profile");
      router.refresh();
    }
  };

  const initials = form.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U";

  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-lg mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm breadcrumbs text-base-content/50 mb-8">
          <ul>
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/my-profile" className="hover:text-primary">My Profile</Link></li>
            <li className="text-primary">Update Profile</li>
          </ul>
        </div>

        <AnimatedSection direction="up">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black mb-2">Update Profile</h1>
            <p className="text-base-content/50 text-sm">Keep your learning identity fresh</p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.1}>
          <div className="glass-card rounded-2xl p-8 glow-border">
            {/* Avatar Preview */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                {form.image && !imgError ? (
                  <img
                    src={form.image}
                    alt="Preview"
                    onError={() => setImgError(true)}
                    className="w-24 h-24 rounded-2xl object-cover border-2 border-primary/40 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-orange-700 flex items-center justify-center text-white text-2xl font-black shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                    {initials}
                  </div>
                )}
                <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs">
                  ✏️
                </div>
              </div>
              <p className="text-xs text-base-content/40 mt-3">Live preview — updates as you type</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="form-control">
                <label className="label pb-1">
                  <span className="label-text font-medium">Full Name</span>
                  <span className="label-text-alt text-base-content/40 text-xs">Required</span>
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="input w-full glass-card border border-white/10 focus:border-primary focus:outline-none rounded-xl h-12"
                />
              </div>

              <div className="form-control">
                <label className="label pb-1">
                  <span className="label-text font-medium">Profile Photo URL</span>
                  <span className="label-text-alt text-base-content/40 text-xs">Optional</span>
                </label>
                <input
                  name="image"
                  type="url"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://example.com/your-photo.jpg"
                  className="input w-full glass-card border border-white/10 focus:border-primary focus:outline-none rounded-xl h-12"
                />
                {imgError && form.image && (
                  <p className="text-xs text-warning mt-1">⚠️ Couldn&apos;t load image — check the URL</p>
                )}
                <p className="text-xs text-base-content/30 mt-1.5">
                  Tip: Use a direct link to a .jpg, .png, or .webp image
                </p>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full rounded-full h-12 font-bold text-base shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transition-all"
                >
                  {loading ? <span className="loading loading-spinner loading-sm" /> : "Save Changes ✓"}
                </button>

                <Link
                  href="/my-profile"
                  className="btn btn-ghost w-full rounded-full h-12 text-base-content/60 hover:text-base-content"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
