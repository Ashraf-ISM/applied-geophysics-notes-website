import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { SubjectCard } from "@/components/home/SubjectCard";
import { StatsSection } from "@/components/home/StatsSection";
import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronRight,
  Compass,
  Database,
  FileCheck2,
  Globe2,
  Shield,
  Users,
} from "lucide-react";
import heroImage from "@/assets/hero-geophysics.jpg";

const subjects = [
  {
    id: "seismology",
    name: "Seismology",
    description: "Study of earthquakes and seismic wave propagation through Earth's interior",
    icon: "activity",
    materialCount: 45,
  },
  {
    id: "gravity-magnetics",
    name: "Gravity & Magnetics",
    description: "Potential field methods for subsurface exploration and crustal studies",
    icon: "magnet",
    materialCount: 38,
  },
  {
    id: "electrical-em",
    name: "Electrical & EM Methods",
    description: "Electromagnetic techniques for groundwater and mineral exploration",
    icon: "zap",
    materialCount: 42,
  },
  {
    id: "well-logging",
    name: "Well Logging & Petrophysics",
    description: "Borehole geophysical measurements and rock property analysis",
    icon: "layers",
    materialCount: 35,
  },
  {
    id: "exploration",
    name: "Exploration Geophysics",
    description: "Applied geophysics for oil, gas, and mineral resource exploration",
    icon: "compass",
    materialCount: 52,
  },
  {
    id: "geodynamics",
    name: "Geodynamics & GNSS",
    description: "Earth dynamics, plate tectonics, and satellite geodesy applications",
    icon: "globe",
    materialCount: 28,
  },
];

const capabilityBlocks = [
  {
    icon: Compass,
    title: "Exploration Decision-Making",
    description:
      "Learn to convert geophysical signals into exploration decisions using uncertainty-aware interpretation.",
  },
  {
    icon: Database,
    title: "Integrated Subsurface Workflows",
    description:
      "Connect seismic, logs, and reservoir data in one analytical path used in real subsurface teams.",
  },
  {
    icon: FileCheck2,
    title: "Interview-Ready Narratives",
    description:
      "Build project narratives with assumptions, trade-offs, and business impact expected in senior interview rounds.",
  },
  {
    icon: Shield,
    title: "Faculty-Verified Standards",
    description:
      "Use reviewed and structured learning assets mapped to core geophysics competencies.",
  },
];

const journeyPhases = [
  {
    step: "01",
    title: "Core Concepts",
    detail: "Master wave propagation, inversion fundamentals, and potential field interpretation.",
  },
  {
    step: "02",
    title: "Applied Analysis",
    detail: "Practice processing workflows and integrated interpretation using archived PYQs and notes.",
  },
  {
    step: "03",
    title: "Industry Context",
    detail: "Align technical preparation with exploration, reservoir, and production business objectives.",
  },
  {
    step: "04",
    title: "Career Execution",
    detail: "Use company-specific interview strategy and case simulations to perform in final rounds.",
  },
];

export default function HomePage() {
  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Geophysical seismic interpretation" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/88 to-slate-900/72" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20 md:py-28 lg:py-32">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-100 backdrop-blur-sm">
                <Globe2 className="h-4 w-4 text-emerald-300" />
                IIT (ISM) Applied Geophysics Knowledge Platform
              </div>

              <h1 className="max-w-4xl text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
                Built for Geophysicists Who Want
                <span className="block text-emerald-300">Industry-Level Depth, Not Surface-Level Notes</span>
              </h1>

              <p className="mt-6 max-w-3xl text-base text-slate-200 md:text-lg">
                A professional learning system that mirrors how experienced exploration and reservoir teams think: problem framing,
                uncertainty handling, integrated interpretation, and decision-driven communication.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/ism-library">
                  <Button variant="hero" size="xl">
                    Enter Resource Library
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/interview-prep">
                  <Button variant="heroOutline" size="xl">
                    Open Interview Strategy
                  </Button>
                </Link>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-md">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-200">Professional Focus</h2>
                <div className="mt-5 space-y-4">
                  <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                    <p className="text-2xl font-extrabold">240+</p>
                    <p className="text-xs uppercase tracking-wide text-slate-300">Structured Materials</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                    <p className="text-2xl font-extrabold">6+</p>
                    <p className="text-xs uppercase tracking-wide text-slate-300">Core Geophysics Domains</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                    <p className="text-2xl font-extrabold">Role-Based</p>
                    <p className="text-xs uppercase tracking-wide text-slate-300">Exploration to Reservoir Readiness</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col gap-3">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">How Experienced Teams Build Competence</h2>
            <p className="max-w-3xl text-slate-600">
              This platform is organized around field-tested competency areas used by professionals across exploration, interpretation,
              and development workflows.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {capabilityBlocks.map((block) => {
              const Icon = block.icon;
              return (
                <article key={block.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="mb-4 inline-flex rounded-xl bg-slate-900 p-2.5 text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{block.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{block.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col gap-3">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">From Classroom Learning to Industry Execution</h2>
            <p className="max-w-3xl text-slate-600">
              Follow a structured progression designed to move students from fundamentals to confident performance in technical and
              interview settings.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {journeyPhases.map((phase) => (
              <div key={phase.step} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-bold tracking-widest text-emerald-700">PHASE {phase.step}</p>
                <h3 className="mt-2 text-xl font-bold text-slate-900">{phase.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{phase.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 rounded-2xl border border-white/10 bg-white/5 p-8 md:grid-cols-12 md:items-center md:p-10">
            <div className="md:col-span-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-200">
                <BriefcaseBusiness className="h-4 w-4" />
                Career Track
              </div>
              <h2 className="text-3xl font-bold md:text-4xl">Interview Preparation by Recruiter and Role Type</h2>
              <p className="mt-3 max-w-2xl text-slate-200">
                Prepare with company-wise technical priorities, HR expectations, and case discussion themes across top energy and
                geoscience employers.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:col-span-4 md:items-end">
              <Link to="/interview-prep">
                <Button variant="hero" size="xl">
                  Launch Interview Hub
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/interview-prep/company-questions" className="inline-flex items-center gap-1 text-sm text-emerald-200 transition hover:gap-2">
                Explore Company Questions
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Browse by Core Discipline</h2>
              <p className="max-w-xl text-slate-600">Choose a domain and access targeted notes, PYQs, and supporting references.</p>
            </div>
            <Link to="/subjects" className="inline-flex items-center gap-1 font-medium text-primary transition hover:gap-2">
              View Full Subject Directory
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject, index) => (
              <SubjectCard key={subject.id} {...subject} delay={index * 100} />
            ))}
          </div>
        </div>
      </section>

      <StatsSection />

      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 py-16 text-white md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-100">
              <Users className="h-4 w-4" />
              Institutional Access
            </div>
            <h2 className="text-3xl font-bold md:text-4xl">Access the Full Professional Resource Stack</h2>
            <p className="mt-4 text-slate-200">
              IIT (ISM) students can unlock internal class materials and structured preparation tracks through verified login.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/login">
                <Button variant="hero" size="xl">
                  Verify Account
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/ism-library">
                <Button variant="heroOutline" size="xl">
                  Open Materials
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
