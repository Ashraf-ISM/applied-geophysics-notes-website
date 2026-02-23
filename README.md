# 🌍 Applied Geophysics Notes Website

> A centralized, open-access academic resource platform for geophysics students — built with modern web technologies to make structured learning accessible to all.

<div align="center">

[![Build Status](https://img.shields.io/github/actions/workflow/status/YOUR_USERNAME/YOUR_REPO/ci.yml?style=flat-square&label=Build)](https://github.com/YOUR_USERNAME/YOUR_REPO)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e.svg?style=flat-square)](./LICENSE)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com)

</div>

---

## 📌 Overview

The **Applied Geophysics Notes Website** is a structured, student-driven academic platform for the Department of Applied Geophysics at **IIT (ISM) Dhanbad**. It aggregates subject-wise notes, categorized reference books, and semester-wise Previous Year Question (PYQ) papers into a single, fast, and accessible web application.

Built with a component-based architecture on top of **Vite + React + TypeScript**, the platform prioritizes performance, maintainability, and scalability — designed to serve as the definitive digital knowledge base for geophysics students, researchers, and competitive exam aspirants.

---

## 🔭 Vision

Geophysics as a discipline suffers from a fragmented academic resource landscape — notes scattered across drives, PYQs lost between batches, and reference books inaccessible to many students. This platform aims to change that.

The long-term vision is to build an **open-access, community-maintained geophysics knowledge base** comparable to top academic wikis and course repositories — one that:

- 🌐 **Eliminates information asymmetry** between senior and junior students
- 📚 **Provides structured, semester-aligned** study resources for all subjects
- 🌍 **Scales beyond IIT (ISM)** to serve geophysics students at institutions globally
- 🔬 **Evolves into a research layer** for paper discovery and citation in the geosciences

> This is not just a notes website. It is infrastructure for academic excellence.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📚 Subject-wise Notes | Semester-aligned notes across all core and elective subjects |
| 📖 Book Categorization | Reference books indexed by subject, author, and relevance |
| 📄 Semester-wise PYQs | Past papers by semester and subject with direct PDF download |
| ⚡ Fast Performance | Vite-powered HMR and optimized production builds |
| 🔷 Type-safe Codebase | Full TypeScript coverage for reliability at scale |
| 📱 Fully Responsive | Seamless experience across desktop, tablet, and mobile |
| 🧩 Modular Architecture | Component-based structure for easy extension and maintenance |
| 🔮 Expandable Platform | Ready for blog, research papers, and community Q&A |

---

## 🛠 Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Build Tool | Vite | 5.x |
| Frontend Framework | React | 18.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.x |
| Routing | React Router DOM | 6.x |
| Icons | Lucide React | Latest |
| Deployment | Vercel | — |
| Version Control | Git & GitHub | — |

---

## 📁 Folder Structure

```
geophysics-hub/
├── public/                     # Static assets (favicon, og-image, etc.)
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── home/               # Homepage-specific components
│   │   ├── layout/             # Navbar, Footer, Layout wrapper
│   │   ├── materials/          # Notes & materials components
│   │   └── ui/                 # Base UI primitives (Button, Card, Badge…)
│   ├── data/                   # Static typed data files
│   │   ├── books.ts
│   │   ├── pyqData.ts
│   │   ├── semesterPYQs.ts
│   │   └── subjects.ts
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions and helpers
│   ├── pages/                  # Route-level page components
│   │   ├── admin/              # Admin dashboard pages
│   │   ├── AboutPage.tsx
│   │   ├── BookCategoryPage.tsx
│   │   ├── BooksPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── ISMLibraryPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── MaterialsPage.tsx
│   │   ├── PYQPage.tsx
│   │   ├── SemesterSubjectPYQPage.tsx
│   │   ├── SubjectsPage.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx                 # Root component with route definitions
│   ├── index.css               # Global styles & Tailwind directives
│   └── main.tsx                # Application entry point
├── index.html                  # Vite HTML entry
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## ⚙️ Installation & Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) `>= 18.x`
- npm `>= 9.x` or pnpm `>= 8.x`
- Git

### Steps

**1. Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

**2. Install dependencies**

```bash
npm install
# or: pnpm install
```

**3. Start the development server**

```bash
npm run dev
# → http://localhost:8080
```

**4. Lint the codebase**

```bash
npm run lint
```

---

## 🏗 Build & Deployment

### Production Build

```bash
npm run build          # → outputs to /dist
npm run preview        # preview production build locally
```

### Deploy to Vercel

**Option 1 — Vercel CLI**

```bash
npm install -g vercel
vercel
# Framework: Vite · Build Command: npm run build · Output: dist
```

**Option 2 — Vercel Dashboard**

1. Push your repository to GitHub
2. Visit [vercel.com/new](https://vercel.com/new) → Import repository
3. Vercel auto-detects Vite — click **Deploy**

### Environment Variables

Create `.env.local` at the project root:

```env
VITE_SITE_TITLE=Applied Geophysics Notes
VITE_API_URL=https://your-api-endpoint.com
```

> ⚠️ All client-exposed variables must be prefixed with `VITE_`. Never commit secrets. Add the same variables in **Vercel Dashboard → Project → Environment Variables**.

---

## 🤝 Contributing

Contributions from students, faculty, and developers are welcome. This project is community-driven and improves with every pull request.

### Workflow

```bash
# 1. Fork and clone your fork
git clone https://github.com/YOUR_FORK/YOUR_REPO.git

# 2. Create a feature branch
git checkout -b feat/your-feature-name

# 3. Commit with Conventional Commits
git commit -m "feat: add semester III PYQ for Seismology"

# 4. Push and open a Pull Request
git push origin feat/your-feature-name
```

### Commit Convention

| Prefix | Purpose |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation update |
| `data:` | Academic content added or updated |
| `style:` | Formatting, no logic change |
| `refactor:` | Code restructuring |

### Guidelines

- Add notes, PYQs, or books via `src/data/` — follow existing TypeScript interfaces
- Do not commit large binary files — link PDFs via Google Drive or external storage
- Ensure `npm run build` passes before submitting a PR

---

## 🗺 Roadmap

### v1.x — Core Platform

- [ ] Global search across subjects, PYQs, and books
- [ ] Bookmark and save resources
- [ ] Dark / Light theme toggle

### v2.x — Community Features

- [ ] Blog section for academic articles
- [ ] User authentication and personalization
- [ ] Admin CMS for content management

### v3.x — Research Platform

- [ ] Research paper discovery and citation layer
- [ ] Community Q&A and discussion threads
- [ ] Multi-institution support
- [ ] Native mobile app (React Native)

> **Scalability note:** The current data-driven architecture (static TypeScript in `src/data/`) makes migration to a headless CMS or REST/GraphQL API trivial as content volume grows — no architectural refactoring required.

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](./LICENSE) for details.

Academic content (notes, PYQs, books) contributed to this platform remains the intellectual property of their respective authors and institutions. This platform serves purely as an organizational and accessibility layer.

---

## 👤 Author

**Md Ashraf**  
Department of Applied Geophysics · IIT (ISM) Dhanbad, Jharkhand 826004

[![GitHub](https://img.shields.io/badge/GitHub-@YOUR_USERNAME-181717?style=flat-square&logo=github)](https://github.com/YOUR_USERNAME)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/YOUR_PROFILE)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=flat-square&logo=gmail)](mailto:your.email@iitism.ac.in)

---

<div align="center">

**Department of Applied Geophysics · IIT (ISM) Dhanbad**

*Building open knowledge infrastructure for the geosciences community.*

⭐ **If this platform helped your studies, star the repository — it helps others discover it.**

</div>
