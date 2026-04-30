import Link from "next/link";

const LEVEL_STYLE = {
  Beginner: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Intermediate: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Advanced: "bg-rose-500/15 text-rose-400 border-rose-500/20",
};

const CATEGORY_STYLE = {
  Development: "bg-blue-500/15 text-blue-400",
  Design: "bg-purple-500/15 text-purple-400",
  Marketing: "bg-pink-500/15 text-pink-400",
  Business: "bg-teal-500/15 text-teal-400",
  "IT & Security": "bg-red-500/15 text-red-400",
};

export function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={`w-3.5 h-3.5 ${
              i <= full
                ? "text-amber-400 fill-amber-400"
                : i === full + 1 && half
                ? "text-amber-400 fill-amber-400/50"
                : "text-slate-700 fill-slate-700"
            }`}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-xs font-semibold text-amber-400">{rating}</span>
    </div>
  );
}

export default function CourseCard({ course }) {
  return (
    <article className="group relative flex flex-col bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-orange-500/25 hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-300 h-full">
      {/* Image */}
      <div className="relative overflow-hidden h-44 flex-shrink-0">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-black/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
              LEVEL_STYLE[course.level] || "bg-slate-500/20 text-slate-400"
            }`}
          >
            {course.level}
          </span>
          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
              CATEGORY_STYLE[course.category] || "bg-slate-500/15 text-slate-400"
            }`}
          >
            {course.category}
          </span>
        </div>
        {course.new && (
          <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500 text-white">
            NEW
          </span>
        )}
        {course.trending && !course.new && (
          <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/90 text-white">
            🔥 HOT
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display font-semibold text-sm text-white leading-snug mb-2 line-clamp-2 group-hover:text-orange-300 transition-colors">
          {course.title}
        </h3>
        <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-3">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor)}&background=f97316&color=fff&size=32`}
            className="w-5 h-5 rounded-full"
            alt={course.instructor}
          />
          <span className="text-xs text-slate-500">{course.instructor}</span>
        </div>

        <StarRating rating={course.rating} />

        <div className="flex items-center gap-3 mt-2.5 text-[11px] text-slate-600">
          <span>⏱ {course.duration}</span>
          <span>·</span>
          <span>👥 {course.students?.toLocaleString()}</span>
        </div>

        {/* Price + CTA */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/[0.05]">
          <span className="font-display font-bold text-orange-400 text-base">
            ${course.price}
          </span>
          <Link
            href={`/courses/${course.id}`}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500 hover:text-white hover:border-transparent transition-all duration-200"
          >
            View Details →
          </Link>
        </div>
      </div>
    </article>
  );
}
