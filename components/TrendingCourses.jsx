"use client";
import { useState } from "react";
import CourseCard from "./CourseCard";
import AnimatedSection from "./AnimatedSection";
import coursesData from "@/data/courses.json";

const categories = ["All", "Web Development", "UI/UX Design", "Data Science", "Business"];

export default function TrendingCourses() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = coursesData.filter((c) => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const isTrending = c.trending || c.new;
    return matchCat && isTrending;
  });

  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-950/10 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <AnimatedSection direction="up">
          <div className="text-center mb-14">
            <span className="section-label">🔥 What&apos;s Hot</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
              <span className="gradient-text">Trending</span> Right Now
            </h2>
            <p className="text-base-content/60 max-w-xl mx-auto">
              Stay ahead of the curve with our most in-demand courses — handpicked by learners like you.
            </p>
          </div>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection direction="up" delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-primary text-primary-content border-primary shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                    : "border-white/10 text-base-content/60 hover:border-primary/50 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Course Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-base-content/40">
            No trending courses in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((course, i) => (
              <AnimatedSection key={course.id} direction="up" delay={i * 0.08}>
                <CourseCard course={course} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
