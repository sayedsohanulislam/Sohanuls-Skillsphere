import courses from "@/data/courses.json";
import CourseCard from "./CourseCard";
import AnimatedSection from "./AnimatedSection";
import Link from "next/link";

export default function PopularCourses() {
  const popular = [...courses].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <section className="py-24 container mx-auto px-4 md:px-6">
      <AnimatedSection className="text-center mb-14">
        <p className="section-label mb-3">Featured</p>
        <h2 className="section-title mb-3">
          🔥{" "}
          <span className="gradient-text">Popular Courses</span>
        </h2>
        <p className="text-slate-500 text-base max-w-md mx-auto">
          Top-rated courses loved by thousands of learners worldwide
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popular.map((course, i) => (
          <AnimatedSection key={course.id} delay={i * 0.1}>
            <CourseCard course={course} />
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.35} className="text-center mt-12">
        <Link
          href="/courses"
          className="btn btn-outline btn-wide rounded-xl border-orange-500/30 text-orange-400 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all"
        >
          Browse All Courses →
        </Link>
      </AnimatedSection>
    </section>
  );
}
