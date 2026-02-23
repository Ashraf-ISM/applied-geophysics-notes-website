# 🌍 Applied Geophysics Notes Website

> A centralized, open-access academic resource platform for geophysics students — built with modern web technologies to make structured learning accessible to all.

<div align="center">

[![Build Status](https://img.shields.io/github/actions/workflow/status/YOUR_USERNAME/YOUR_REPO/ci.yml?style=flat-square&label=Build)](https://github.com/YOUR_USERNAME/YOUR_REPO)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](./LICENSE)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

</div>

---

## 📌 Overview

The **Applied Geophysics Notes Website** is a structured, student-driven academic platform developed for the Department of Applied Geophysics at **IIT (ISM) Dhanbad**. It aggregates subject-wise notes, categorized books, and semester-wise Previous Year Question (PYQ) papers into a single, fast, and accessible web application.

Built with a component-based architecture on top of **Vite + React + TypeScript**, the platform prioritizes performance, maintainability, and scalability — designed to serve as the definitive digital knowledge base for geophysics students, researchers, and competitive exam aspirants.

---

## 🔭 Vision

Geophysics as a discipline suffers from a fragmented academic resource landscape — notes scattered across drives, PYQs lost between batches, and reference books inaccessible to many students. This platform aims to change that.

The long-term vision is to build an **open-access, community-maintained geophysics knowledge base** comparable to top academic wikis and course repositories — one that:

- Eliminates information asymmetry between senior and junior students
- Provides structured, semester-aligned study resources
- Scales beyond IIT (ISM) to serve geophysics students at institutions across India and globally
- Evolves into a research and publication discovery layer for the geosciences community

This is not just a notes website. It is infrastructure for academic excellence.

---

## ✨ Features

- **Subject-wise Notes** — Organized, semester-aligned geophysics notes across all core and elective subjects
- **Book Categorization** — Reference books indexed and filtered by subject, author, and relevance
- **Semester-wise PYQs** — Previous Year Question papers organized by semester and subject with direct download
- **Fast Performance** — Powered by Vite's lightning-fast HMR and optimized production builds
- **Type-safe Codebase** — Full TypeScript coverage ensures reliability and developer confidence
- **Responsive UI** — Tailwind CSS utility-first design works seamlessly across all screen sizes
- **Modular Architecture** — Component-based structure makes the codebase easy to extend and maintain
- **Expandable Platform** — Architecture supports future addition of blog posts, research papers, and community Q&A

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 |
| Build Tool | Vite 5 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Routing | React Router DOM |
| Icons | Lucide React |
| Deployment | Vercel |
| Version Control | Git & GitHub |

---

## 📁 Folder Structure

```
geophysics-hub/
├── public/                     # Static assets (favicon, og-image, etc.)
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── home/               # Homepage-specific components
│   │   ├── layout/             # Layout wrappers (Navbar, Footer, Layout)
│   │   ├── materials/          # Materials & notes components
│   │   └── ui/                 # Base UI primitives (Button, Card, Badge, etc.)
│   ├── data/                   # Static data files (subjects, books, PYQs)
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
│   │   ├── SemesterPYQPage.tsx
│   │   ├── SemesterSubjectPYQPage.tsx
│   │   ├── SubjectsPage.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx                 # Root component with route definitions
│   ├── App.css
│   ├── index.css               # Global styles & Tailwind directives
│   └── main.tsx                # Application entry point
├── .gitignore
├── index.html                  # Vite HTML entry
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## ⚙️ Installation & Local Development

### Prerequisites

Ensure the following are installed on your system:

- [Node.js](https://nodejs.org/) `>= 18.x`
- [npm](https://www.npmjs.com/) `>= 9.x` or [pnpm](https://pnpm.io/) `>= 8.x`
- [Git](https://git-scm.com/)

### Setup

**1. Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

**2. Install dependencies**

```bash
npm install
# or
pnpm install
```

**3. Start the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:8080` (or the port specified in `vite.config.ts`).

**4. Lint the codebase**

```bash
npm run lint
```

---

## 🏗 Build & Deployment

### Production Build

Generate an optimized production bundle:

```bash
npm run build
```

Output will be placed in the `dist/` directory.

**Preview the production build locally:**

```bash
npm run preview
```

### Deploying to Vercel

This project is configured for zero-configuration deployment on [Vercel](https://vercel.com).

**Option 1 — Vercel CLI (recommended)**

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel will auto-detect the Vite framework and configure the build settings.

**Option 2 — Vercel Dashboard**

1. Push your repository to GitHub
2. Visit [vercel.com/new](https://vercel.com/new) and import the repository
3. Vercel will automatically detect:
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**

**Environment Variables**

If the project requires environment variables, create a `.env.local` file at the project root:

```env
VITE_API_URL=https://your-api-endpoint.com
VITE_SITE_TITLE=Applied Geophysics Notes
```

> ⚠️ Prefix all Vite environment variables with `VITE_` to expose them to the client bundle. Never commit secrets to version control.

Add the same variables in the **Vercel Dashboard → Project Settings → Environment Variables** for production.

---

## 🤝 Contributing

Contributions from students, faculty, and developers are welcome. This project is community-driven and improves with every pull request.

### Contribution Workflow

**1. Fork the repository**

```bash
# Click "Fork" on GitHub, then clone your fork
git clone https://github.com/YOUR_FORK/YOUR_REPO.git
```

**2. Create a feature branch**

```bash
git checkout -b feature/your-feature-name
# or for fixes:
git checkout -b fix/issue-description
```

**3. Make your changes and commit**

```bash
git add .
git commit -m "feat: add semester III PYQ papers for Seismology"
```

Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:
- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation changes
- `style:` — formatting, no logic change
- `refactor:` — code restructuring
- `data:` — adding or updating academic data/content

**4. Push and open a Pull Request**

```bash
git push origin feature/your-feature-name
```

Open a PR against the `main` branch with a clear description of your changes.

### Contribution Guidelines

- Add notes, PYQs, or books by updating the relevant files in `src/data/`
- Follow existing TypeScript interfaces when adding new data entries
- Do not commit large binary files — link PDFs via external storage (Google Drive, S3, etc.)
- Ensure the app builds successfully (`npm run build`) before submitting a PR

---

## 🗺 Future Roadmap

The following features and expansions are planned for future releases:

| Milestone | Feature | Status |
|---|---|---|
| v1.1 | Search across all subjects and PYQs | 🔜 Planned |
| v1.2 | Blog section for academic articles | 🔜 Planned |
| v1.3 | User authentication & bookmarks | 🔜 Planned |
| v2.0 | Admin CMS for content management | 🔜 Planned |
| v2.1 | Research paper discovery layer | 🔜 Planned |
| v2.2 | Community Q&A / discussion threads | 🔜 Planned |
| v3.0 | Multi-institution support | 🔜 Planned |
| v3.1 | Mobile app (React Native) | 🔜 Planned |

### Scalability Considerations

The current architecture is intentionally data-driven via static TypeScript files in `src/data/`, making it trivial to migrate to a headless CMS (Contentful, Sanity) or a REST/GraphQL API backend as content volume grows. The component structure supports lazy loading and route-based code splitting without architectural refactoring.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for full details.

Academic content (notes, PYQs, books) contributed to this platform remains the intellectual property of their respective authors and institutions. This platform serves purely as an organizational and accessibility layer.

---

## 👤 Author

**Md Ashraf**
Department of Applied Geophysics
IIT (ISM) Dhanbad, Jharkhand 826004

[![GitHub](https://img.shields.io/badge/GitHub-@YOUR_USERNAME-181717?style=flat-square&logo=github)](https://github.com/YOUR_USERNAME)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/YOUR_PROFILE)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=flat-square&logo=gmail)](mailto:your.email@iitism.ac.in)

---

<div align="center">

**Department of Applied Geophysics · IIT (ISM) Dhanbad**

*Building open knowledge infrastructure for the geosciences community.*

⭐ If this platform has helped your studies, consider starring the repository — it helps others discover it.

</div>
