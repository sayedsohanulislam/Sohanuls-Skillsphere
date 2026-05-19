import instructors from "@/data/instructors.json";
import AnimatedSection from "./AnimatedSection";

export default function TopInstructors() {
  return (
    <section className="py-24 container mx-auto px-4 md:px-6">
      <AnimatedSection className="text-center mb-14">
        <p className="section-label mb-3">Expert Faculty</p>
        <h2 className="section-title mb-3">
          🏆 <span className="gradient-text">Top Instructors</span>
        </h2>
        <p className="text-slate-500 text-base max-w-md mx-auto">
          Learn directly from professionals who've worked at the world's best companies
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {instructors.map((instructor, i) => (
          <AnimatedSection key={instructor.id} delay={i * 0.1}>
            <div className="group glass-card-hover p-6 text-center h-full flex flex-col items-center">
              {/* Avatar */}
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-white/10 group-hover:ring-orange-500/40 transition-all">
                  <img
                    src={instructor.avatar}
                    alt={instructor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-emerald-400 rounded-full border-2 border-[#030712] flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3 h-3 text-[#030712] fill-current"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              <h3 className="font-display font-semibold text-white text-sm group-hover:text-orange-300 transition-colors">
                {instructor.name}
              </h3>
              <p className="text-orange-400 text-xs font-medium mt-1">
                {instructor.specialty}
              </p>
              <p className="text-slate-500 text-xs mt-2 leading-relaxed line-clamp-2">
                {instructor.bio}
              </p>

              <div className="mt-auto pt-4 w-full border-t border-white/[0.06] grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="font-display font-bold text-white text-sm">
                    {instructor.courses}
                  </p>
                  <p className="text-slate-600 text-[10px]">Courses</p>
                </div>
                <div>
                  <p className="font-display font-bold text-white text-sm">
                    {(instructor.students / 1000).toFixed(0)}K
                  </p>
                  <p className="text-slate-600 text-[10px]">Students</p>
                </div>
                <div>
                  <p className="font-display font-bold text-amber-400 text-sm">
                    {instructor.rating}★
                  </p>
                  <p className="text-slate-600 text-[10px]">Rating</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
