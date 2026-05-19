import HeroSection from "@/components/HeroSection";
import PopularCourses from "@/components/PopularCourses";
import LearningTips from "@/components/LearningTips";
import TopInstructors from "@/components/TopInstructors";
import TrendingCourses from "@/components/TrendingCourses";

export const metadata = {
  title: "SkillSphere — Learn Without Limits",
  description:
    "Discover world-class courses in web development, design, data science and more. Join 50,000+ learners on SkillSphere.",
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PopularCourses />
      <TrendingCourses />
      <LearningTips />
      <TopInstructors />
    </main>
  );
}
