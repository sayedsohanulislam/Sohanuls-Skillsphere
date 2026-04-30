"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("See you soon! 👋");
    router.push("/");
    router.refresh();
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/my-profile", label: "My Profile" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#030712]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-white fill-current"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              <span className="text-orange-400">Skill</span>
              <span className="text-white">Sphere</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-orange-400 bg-orange-500/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Area */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <span className="loading loading-spinner loading-sm text-orange-400" />
            ) : session ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="cursor-pointer flex items-center gap-2 group"
                >
                  <div className="relative">
                    <img
                      src={
                        session.user?.image ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          session.user?.name || "User"
                        )}&background=f97316&color=fff&size=80`
                      }
                      alt={session.user?.name}
                      className="w-9 h-9 rounded-xl object-cover ring-2 ring-orange-500/40 group-hover:ring-orange-500/80 transition-all"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#030712]" />
                  </div>
                  <span className="text-sm font-medium text-slate-300 max-w-[100px] truncate">
                    {session.user?.name?.split(" ")[0]}
                  </span>
                  <svg
                    className="w-3.5 h-3.5 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-[#0f172a] border border-white/10 rounded-2xl z-10 w-56 p-2 shadow-2xl mt-2"
                >
                  <li className="px-3 py-2 mb-1">
                    <p className="text-sm font-semibold text-white truncate">
                      {session.user?.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {session.user?.email}
                    </p>
                  </li>
                  <div className="divider my-0 opacity-20" />
                  <li>
                    <Link
                      href="/my-profile"
                      className="flex items-center gap-2 text-sm hover:text-orange-400"
                    >
                      <span>👤</span> My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/courses"
                      className="flex items-center gap-2 text-sm hover:text-orange-400"
                    >
                      <span>📚</span> All Courses
                    </Link>
                  </li>
                  <div className="divider my-0 opacity-20" />
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <span>🚪</span> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-400 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn btn-primary btn-sm rounded-xl font-medium shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-sm px-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-[#0f172a] border border-white/10 rounded-2xl z-10 w-52 p-2 shadow-2xl mt-2"
            >
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={pathname === link.href ? "text-orange-400" : ""}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <div className="divider my-0 opacity-20" />
              {session ? (
                <li>
                  <button onClick={handleLogout} className="text-red-400">
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
