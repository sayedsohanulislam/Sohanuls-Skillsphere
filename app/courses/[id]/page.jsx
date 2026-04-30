"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { StarRating } from "@/components/CourseCard";
import AnimatedSection from "@/components/AnimatedSection";
import coursesData from "@/data/courses.json";
import toast from "react-hot-toast";

export default function CourseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [enrolled, setEnrolled] = useState(false);

  const course = coursesData.find((c) => c.id === Number(id));

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please log in to view course details.");
      router.push(`/login?callbackUrl=/courses/${id}`);
    }
  }, [session, isPending, router, id]);

  if (isPending) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <span className="loading loading-ring loading-lg text-primary" />
      </main>
    );
  }

  if (!session) return null;

  if (!course) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-5xl">😕</div>
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Link href="/courses" className="btn btn-primary rounded-full">Browse Courses</Link>
      </main>
    );
  }

  const handleEnroll = () => {
    setEnrolled(true);
    toast.success("🎉 You're enrolled! Happy learning!");
  };

  const levelColor = {
    Beginner: "badge-success",
    Intermediate: "badge-warning",
    Advanced: "badge-error",
  }[course.level] || "badge-info";

  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm breadcrumbs text-base-content/50 mb-8">
          <ul>
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/courses" className="hover:text-primary">Courses</Link></li>
            <li className="text-primary">{course.title}</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatedSection direction="up">
              {/* Hero */}
              <div className="relative rounded-2xl overflow-hidden aspect-video">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 flex gap-2">
                  <span className={`badge ${levelColor} badge-sm`}>{course.level}</span>
                  <span className="badge badge-neutral badge-sm">{course.category}</span>
                  {course.new && <span className="badge badge-primary badge-sm">NEW</span>}
                  {course.trending && <span className="badge badge-warning badge-sm">🔥 HOT</span>}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.1}>
              <div>
                <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">{course.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/60 mb-4">
                  <div className="flex items-center gap-1">
                    <StarRating rating={course.rating} />
                    <span className="text-yellow-400 font-bold ml-1">{course.rating}</span>
                  </div>
                  <span>👥 {course.students.toLocaleString()} students</span>
                  <span>⏱ {course.duration}</span>
                  <span>by <span className="text-primary font-medium">{course.instructor}</span></span>
                </div>
                <p className="text-base-content/70 leading-relaxed text-lg">{course.description}</p>
              </div>
            </AnimatedSection>

            {/* What You'll Learn */}
            <AnimatedSection direction="up" delay={0.15}>
              <div className="glass-card rounded-2xl p-6 glow-border">
                <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                  <span className="text-primary">🎯</span> What You&apos;ll Learn
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.curriculum.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-primary mt-0.5 shrink-0">✓</span>
                      <span className="text-base-content/80 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Curriculum */}
            <AnimatedSection direction="up" delay={0.2}>
              <div>
                <h2 className="text-xl font-bold mb-5">📋 Course Curriculum</h2>
                <div className="space-y-2">
                  {course.curriculum.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-xl glass-card border border-white/5 hover:border-primary/20 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-primary font-mono text-sm w-6">{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-sm">{item}</span>
                      </div>
                      <span className={`badge badge-sm ${i === 0 ? "badge-primary" : "badge-ghost opacity-50"}`}>
                        {i === 0 ? "Free Preview" : "Locked"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Sticky Purchase Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <AnimatedSection direction="left" delay={0.2}>
                <div className="glass-card rounded-2xl p-6 glow-border space-y-5">
                  <div className="text-4xl font-black text-primary">${course.price}</div>

                  <button
                    onClick={handleEnroll}
                    disabled={enrolled}
                    className={`btn w-full rounded-full font-bold text-base ${
                      enrolled
                        ? "btn-success"
                        : "btn-primary shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)]"
                    } transition-all`}
                  >
                    {enrolled ? "✅ Enrolled!" : "Enroll Now →"}
                  </button>

                  <div className="divider opacity-20" />

                  <ul className="space-y-3 text-sm text-base-content/70">
                    {[
                      ["📹", "Full lifetime access"],
                      ["📱", "Access on mobile & desktop"],
                      ["🏆", "Certificate of completion"],
                      ["🔄", "30-day money-back guarantee"],
                      ["👨‍💻", `Instructor: ${course.instructor}`],
                      ["⏱", `Duration: ${course.duration}`],
                      ["📊", `Level: ${course.level}`],
                    ].map(([icon, text], i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span>{icon}</span>
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => toast("Added to wishlist! ❤️")}
                    className="btn btn-outline btn-sm w-full rounded-full text-sm"
                  >
                    ♡ Add to Wishlist
                  </button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
