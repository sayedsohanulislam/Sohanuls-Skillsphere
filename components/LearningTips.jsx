import AnimatedSection from "./AnimatedSection";

const TIPS = [
  {
    icon: "🎯",
    title: "Set Crystal-Clear Goals",
    desc: "Define specific, measurable learning objectives. Break big skills into smaller milestones so you can track and celebrate progress.",
  },
  {
    icon: "⏱️",
    title: "The Pomodoro Method",
    desc: "Study in focused 25-minute sprints, then take 5-minute breaks. Short, concentrated sessions consistently outperform long, distracted ones.",
  },
  {
    icon: "📝",
    title: "Active Recall & Notes",
    desc: "Don't just watch — pause, summarize, and test yourself. The act of retrieval solidifies concepts in long-term memory far better than re-reading.",
  },
  {
    icon: "🔁",
    title: "Spaced Repetition",
    desc: "Review material at increasing intervals using apps like Anki. This technique leverages how memory works to maximize long-term retention.",
  },
  {
    icon: "🛠️",
    title: "Build Real Projects",
    desc: "Apply new skills to real projects immediately. Practical application cements knowledge far better than any amount of passive watching.",
  },
  {
    icon: "🤝",
    title: "Teach & Collaborate",
    desc: "Explaining a concept to someone else is the fastest way to expose gaps in your knowledge. Find a study buddy or write a blog post.",
  },
];

export default function LearningTips() {
  return (
    <section className="py-24 bg-base-200 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative">
        <AnimatedSection className="text-center mb-14">
          <p className="section-label mb-3">Study Smart</p>
          <h2 className="section-title mb-3">
            📌 <span className="gradient-text">Learning Tips</span>
          </h2>
          <p className="text-slate-500 text-base max-w-md mx-auto">
            Science-backed strategies that top learners use to absorb knowledge faster
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TIPS.map((tip, i) => (
            <AnimatedSection key={tip.title} delay={i * 0.08}>
              <div className="group glass-card-hover p-6 h-full">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {tip.icon}
                </div>
                <h3 className="font-display font-semibold text-white mb-2 group-hover:text-orange-300 transition-colors">
                  {tip.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
