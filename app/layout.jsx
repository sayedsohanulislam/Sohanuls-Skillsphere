import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "SkillSphere – Learn Skills That Matter",
  description:
    "An elite online learning platform with world-class courses in Development, Design, Marketing, and more. Taught by industry veterans.",
  keywords: "online learning, courses, web development, design, marketing, skills",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="skillsphere">
      <body className="antialiased min-h-screen flex flex-col bg-base-100 text-base-content">
        {/* Ambient glow background */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        >
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -right-40 w-80 h-80 bg-orange-600/8 rounded-full blur-3xl" />
        </div>

        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />

        <Toaster
          position="top-right"
          gutter={12}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1e293b",
              color: "#f1f5f9",
              border: "1px solid rgba(249,115,22,0.25)",
              borderRadius: "12px",
              fontSize: "14px",
              fontFamily: "var(--font-dm-sans)",
            },
            success: {
              iconTheme: { primary: "#f97316", secondary: "#fff" },
            },
            error: {
              iconTheme: { primary: "#f87171", secondary: "#fff" },
            },
          }}
        />
      </body>
    </html>
  );
}
