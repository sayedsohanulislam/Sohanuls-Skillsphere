# SkillSphere 🚀

> **Learn Without Limits** — A modern online learning platform built with Next.js 15, BetterAuth, DaisyUI, and Motion.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://skillsphere.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)

---

## 📖 Project Overview

**SkillSphere** is a feature-rich online learning platform that connects learners with expert-led courses across web development, UI/UX design, data science, and business. The platform offers a stunning dark-mode UI with glassmorphism effects, smooth scroll animations, and a Swiper-powered hero carousel.

---

## ✨ Key Features

- 🎯 **Hero Carousel** — Swiper.js fade-effect carousel with animated slide content
- 📚 **Course Catalog** — Browse 8+ courses with search, category, level, and sort filters
- 🔐 **Authentication** — Email/password + Google OAuth via BetterAuth
- 🛡 **Protected Routes** — Course detail pages require authentication
- 👤 **My Profile** — View account info and learning stats
- ✏️ **Update Profile** — Edit name and avatar with live preview
- 🔥 **Trending Section** — Filterable trending/new courses by category
- 💡 **Learning Tips** — Science-backed study techniques
- 🏆 **Top Instructors** — Showcase instructor cards with stats
- 🎨 **Motion Animations** — Scroll-triggered reveal animations on every section
- 📱 **Fully Responsive** — Mobile, tablet, and desktop optimized

---

## 🛠 Tech Stack & NPM Packages

| Package | Purpose |
|---|---|
| `next` ^15 | React framework with App Router |
| `react` ^19 | UI library |
| `better-auth` | Authentication (email + Google OAuth) |
| `better-sqlite3` | SQLite database for BetterAuth |
| `motion` | Scroll-triggered animations (framer-motion v11) |
| `swiper` | Hero carousel with fade effect |
| `react-hot-toast` | Toast notifications |
| `tailwindcss` ^3 | Utility-first CSS |
| `daisyui` ^4 | Component library with custom theme |
| `autoprefixer` | CSS vendor prefixes |

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/skillsphere.git
cd skillsphere
npm install
```

### 2. Environment Variables

```bash
cp .env.local.example .env.local
```

Fill in your values:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

> **Generate BETTER_AUTH_SECRET:** `openssl rand -base64 32`

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new OAuth 2.0 Client ID
3. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
skillsphere/
├── app/
│   ├── api/auth/[...all]/  # BetterAuth handler
│   ├── courses/
│   │   ├── page.jsx        # All Courses (search + filter)
│   │   └── [id]/page.jsx   # Course Detail (protected)
│   ├── login/page.jsx
│   ├── register/page.jsx
│   ├── my-profile/
│   │   ├── page.jsx
│   │   └── update/page.jsx
│   ├── layout.jsx
│   ├── page.jsx            # Home
│   └── not-found.jsx       # 404
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── HeroSection.jsx     # Swiper carousel
│   ├── CourseCard.jsx
│   ├── PopularCourses.jsx
│   ├── TrendingCourses.jsx
│   ├── LearningTips.jsx
│   ├── TopInstructors.jsx
│   ├── AnimatedSection.jsx # Motion wrapper
│   └── Loader.jsx
├── data/
│   ├── courses.json
│   └── instructors.json
├── lib/
│   ├── auth.js             # BetterAuth server config
│   └── auth-client.js      # BetterAuth client
├── middleware.js
├── tailwind.config.js
├── next.config.mjs
└── .env.local.example
```

---

## 🎨 Design System

- **Theme:** Custom DaisyUI `skillsphere` theme
- **Colors:** Deep space dark (`#030712`) + Electric orange (`#f97316`)
- **Fonts:** Sora (display) + DM Sans (body)
- **Effects:** Glassmorphism cards, orange glow borders, scroll animations

---

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.local.example`
4. Deploy!

> **Note:** Update `NEXT_PUBLIC_APP_URL` and Google OAuth redirect URI to your production URL after deployment.

---

## 📝 Assignment Challenges Completed

- ✅ **Challenge 1:** Search by title/instructor/category on All Courses page
- ✅ **Challenge 2:** My Profile page showing logged-in user data
- ✅ **Challenge 3:** Update Information (name + image URL) via `authClient.updateUser()`
- ✅ **Challenge 4:** Animation packages — **Motion** (scroll animations) + **Swiper.js** (hero carousel)

---

Made with 🔥 by a SkillSphere learner
