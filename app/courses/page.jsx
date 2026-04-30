"use client";
import { useState, useMemo } from "react";
import CourseCard from "@/components/CourseCard";
import AnimatedSection from "@/components/AnimatedSection";
import coursesData from "@/data/courses.json";

const categories = ["All", "Web Development", "UI/UX Design", "Data Science", "Business"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLevel, setActiveLevel] = useState("All Levels");
  const [sortBy, setSortBy] = useState("rating");

  const filtered = useMemo(() => {
    let result = [...coursesData];

    // Search by title or instructor
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (activeCategory !== "All") {
      result = result.filter((c) => c.category === activeCategory);
    }

    // Level filter
    if (activeLevel !== "All Levels") {
      result = result.filter((c) => c.level === activeLevel);
    }

    // Sort
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "students") result.sort((a, b) => b.students - a.students);

    return result;
  }, [search, activeCategory, activeLevel, sortBy]);

  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection direction="up">
          <div className="text-center mb-14">
            <span className="section-label">📚 All Courses</span>
            <h1 className="text-4xl md:text-6xl font-black mt-4 mb-4">
              Find Your <span className="gradient-text">Perfect Course</span>
            </h1>
            <p className="text-base-content/60 max-w-2xl mx-auto text-lg">
              Browse our full catalog of expert-led courses. Filter by category, level, or search for exactly what you need.
            </p>
          </div>
        </AnimatedSection>

        {/* Search Bar */}
        <AnimatedSection direction="up" delay={0.1}>
          <div className="relative max-w-2xl mx-auto mb-10">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by title, instructor, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input w-full pl-12 pr-4 h-14 rounded-full glass-card border border-white/10 focus:border-primary focus:outline-none text-base placeholder:text-base-content/40 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-4 flex items-center text-base-content/40 hover:text-primary"
              >
                ✕
              </button>
            )}
          </div>
        </AnimatedSection>

        {/* Filters Row */}
        <AnimatedSection direction="up" delay={0.15}>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    activeCategory === cat
                      ? "bg-primary text-primary-content border-primary shadow-[0_0_12px_rgba(249,115,22,0.3)]"
                      : "border-white/10 text-base-content/60 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Level + Sort */}
            <div className="flex gap-3">
              <select
                value={activeLevel}
                onChange={(e) => setActiveLevel(e.target.value)}
                className="select select-sm rounded-full glass-card border border-white/10 focus:border-primary focus:outline-none text-sm min-w-[130px]"
              >
                {levels.map((l) => <option key={l}>{l}</option>)}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select select-sm rounded-full glass-card border border-white/10 focus:border-primary focus:outline-none text-sm min-w-[130px]"
              >
                <option value="rating">Top Rated</option>
                <option value="students">Most Popular</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
            </div>
          </div>
        </AnimatedSection>

        {/* Results count */}
        <div className="text-base-content/50 text-sm mb-6">
          Showing <span className="text-primary font-semibold">{filtered.length}</span> course{filtered.length !== 1 ? "s" : ""}
          {search && <> for &ldquo;<span className="text-base-content/80">{search}</span>&rdquo;</>}
        </div>

        {/* Course Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-base-content/50 mb-6">Try adjusting your search or filters.</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); setActiveLevel("All Levels"); }}
              className="btn btn-primary btn-sm rounded-full"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((course, i) => (
              <AnimatedSection key={course.id} direction="up" delay={i * 0.06}>
                <CourseCard course={course} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
