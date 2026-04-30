"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Link from "next/link";
import { motion } from "motion/react";

const SLIDES = [
  {
    id: 1,
    eyebrow: "Elevate Your Career",
    title: "Upgrade Your Skills Today 🚀",
    desc: "Access 100+ premium courses taught by industry veterans. Join 50,000+ learners building skills that matter.",
    cta: "Explore Courses",
    ctaLink: "/courses",
    gradient: "from-orange-950/90 via-[#030712]/70 to-[#030712]/95",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80",
    accent: "#f97316",
  },
  {
    id: 2,
    eyebrow: "Learn from Industry Experts",
    title: "Master Web Development 💻",
    desc: "From beginner to full-stack engineer with React, Node.js, and cloud deployment. Build projects that impress.",
    cta: "Start Learning",
    ctaLink: "/courses",
    gradient: "from-blue-950/90 via-[#030712]/70 to-[#030712]/95",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=80",
    accent: "#38bdf8",
  },
  {
    id: 3,
    eyebrow: "Design Thinking & Craft",
    title: "Create Beautiful Products 🎨",
    desc: "Learn Figma, design systems, and UX research. Craft interfaces that users genuinely love to use.",
    cta: "View Design Courses",
    ctaLink: "/courses",
    gradient: "from-purple-950/90 via-[#030712]/70 to-[#030712]/95",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=80",
    accent: "#c084fc",
  },
];

const STATS = [
  { label: "Active Learners", value: "50K+" },
  { label: "Expert Courses", value: "100+" },
  { label: "Top Instructors", value: "50+" },
  { label: "Avg. Rating", value: "4.8★" },
];

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[620px] max-h-[860px] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="h-full"
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full flex items-center">
              {/* BG Image */}
              <img
                src={slide.image}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover scale-105"
              />
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
              />
              {/* Noise texture */}
              <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxmaWx0ZXIgaWQ9Im4iPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbikiLz48L3N2Zz4=')]" />

              {/* Content */}
              <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-2xl">
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-xs uppercase tracking-[0.25em] font-semibold mb-4"
                    style={{ color: slide.accent }}
                  >
                    {slide.eyebrow}
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="font-display text-4xl md:text-6xl font-extrabold text-white leading-[1.1] mb-5"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-lg"
                  >
                    {slide.desc}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-wrap gap-4"
                  >
                    <Link
                      href={slide.ctaLink}
                      className="btn btn-primary px-8 rounded-xl shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all"
                    >
                      {slide.cta}
                    </Link>
                    <Link
                      href="/register"
                      className="btn px-8 rounded-xl bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 backdrop-blur-sm"
                    >
                      Join Free →
                    </Link>
                  </motion.div>

                  {/* Stats row */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-white/10"
                  >
                    {STATS.map((s) => (
                      <div key={s.label}>
                        <p className="font-display font-black text-xl text-orange-400">
                          {s.value}
                        </p>
                        <p className="text-white/50 text-xs mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#030712] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
