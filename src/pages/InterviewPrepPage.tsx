import { useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { interviewPrepCompanies } from "@/data/interviewPrep";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  ClipboardList,
  Search,
  Target,
  Gauge,
  Layers3,
  Filter,
  Clock3,
  NotebookPen,
} from "lucide-react";

type RoundKey = "technical" | "hr" | "caseStudy";
type RoleTag = "Exploration" | "Processing" | "Reservoir" | "Integrated";
type DifficultyTag = "L1" | "L2" | "L3";

const recruiterLens = [
  "Problem framing under uncertainty",
  "Interpretation quality and assumptions",
  "Business impact orientation",
  "Cross-functional communication",
];

const prepRoadmap = [
  {
    phase: "Weeks 1-3",
    title: "Core Fundamentals",
    details: "Revise wave propagation, seismic processing, inversion basics, and basin context.",
  },
  {
    phase: "Weeks 4-6",
    title: "Applied Interpretation",
    details: "Build two end-to-end project narratives with QC logic, assumptions, and decision outcomes.",
  },
  {
    phase: "Weeks 7-9",
    title: "Company Targeting",
    details: "Map each company to its hiring focus and rehearse role-specific technical depth.",
  },
  {
    phase: "Weeks 10-12",
    title: "Mock Execution",
    details: "Run technical, HR, and case simulations with timed responses and feedback loops.",
  },
];

function inferRole(question: string): RoleTag {
  const q = question.toLowerCase();

  if (q.includes("processing") || q.includes("migration") || q.includes("velocity") || q.includes("qc")) {
    return "Processing";
  }
  if (
    q.includes("reservoir") ||
    q.includes("volumetric") ||
    q.includes("pressure") ||
    q.includes("seal") ||
    q.includes("fluid")
  ) {
    return "Reservoir";
  }
  if (q.includes("prospect") || q.includes("basin") || q.includes("drilling") || q.includes("lead")) {
    return "Exploration";
  }
  return "Integrated";
}

function inferDifficulty(round: RoundKey, index: number, question: string): DifficultyTag {
  const q = question.toLowerCase();

  if (round === "hr") {
    return "L1";
  }

  if (q.includes("design") || q.includes("framework") || q.includes("tradeoff") || q.includes("validate")) {
    return "L3";
  }

  if (round === "caseStudy" || index > 1) {
    return "L2";
  }

  return "L1";
}

function estimateTime(round: RoundKey, difficulty: DifficultyTag): string {
  if (round === "hr") {
    return difficulty === "L1" ? "2-3 min" : "3-4 min";
  }
  if (round === "caseStudy") {
    return difficulty === "L3" ? "12-15 min" : "8-10 min";
  }
  if (difficulty === "L3") {
    return "6-8 min";
  }
  if (difficulty === "L2") {
    return "4-6 min";
  }
  return "3-4 min";
}

function relevanceScore(
  name: string,
  segment: string,
  focus: string[],
  query: string,
  questions: string[],
): number {
  if (!query) {
    return 0;
  }

  const q = query.toLowerCase();
  let score = 0;

  if (name.toLowerCase().includes(q)) score += 4;
  if (segment.toLowerCase().includes(q)) score += 3;
  score += focus.filter((item) => item.toLowerCase().includes(q)).length * 2;
  score += questions.filter((item) => item.toLowerCase().includes(q)).length;

  return score;
}

export default function InterviewPrepPage() {
  const [query, setQuery] = useState("");
  const [company, setCompany] = useState("all");
  const [roundFilter, setRoundFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  const filteredCompanies = useMemo(() => {
    const base = interviewPrepCompanies.filter((item) => {
      const matchesCompany = company === "all" || item.slug === company;
      const q = query.toLowerCase();

      const allQuestions = [...item.questions.technical, ...item.questions.hr, ...item.questions.caseStudy];
      const matchesQuery =
        item.name.toLowerCase().includes(q) ||
        item.segment.toLowerCase().includes(q) ||
        item.hiringFocus.some((focus) => focus.toLowerCase().includes(q)) ||
        allQuestions.some((question) => question.toLowerCase().includes(q));

      const questionEntries: Array<{ round: RoundKey; text: string; index: number }> = [
        ...item.questions.technical.map((text, index) => ({ round: "technical" as const, text, index })),
        ...item.questions.hr.map((text, index) => ({ round: "hr" as const, text, index })),
        ...item.questions.caseStudy.map((text, index) => ({ round: "caseStudy" as const, text, index })),
      ];

      const matchesRound =
        roundFilter === "all" ||
        questionEntries.some((entry) => {
          if (roundFilter === "technical") return entry.round === "technical";
          if (roundFilter === "hr") return entry.round === "hr";
          return entry.round === "caseStudy";
        });

      const matchesRole =
        roleFilter === "all" || questionEntries.some((entry) => inferRole(entry.text).toLowerCase() === roleFilter);

      const matchesDifficulty =
        difficultyFilter === "all" ||
        questionEntries.some((entry) => inferDifficulty(entry.round, entry.index, entry.text).toLowerCase() === difficultyFilter);

      return matchesCompany && matchesQuery && matchesRound && matchesRole && matchesDifficulty;
    });

    const sorted = [...base].sort((a, b) => {
      const aQuestions = [...a.questions.technical, ...a.questions.hr, ...a.questions.caseStudy];
      const bQuestions = [...b.questions.technical, ...b.questions.hr, ...b.questions.caseStudy];
      const aScore = relevanceScore(a.name, a.segment, a.hiringFocus, query, aQuestions);
      const bScore = relevanceScore(b.name, b.segment, b.hiringFocus, query, bQuestions);

      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "focus") {
        return b.hiringFocus.length - a.hiringFocus.length;
      }
      return bScore - aScore;
    });

    return sorted;
  }, [company, difficultyFilter, query, roleFilter, roundFilter, sortBy]);

  return (
    <Layout>
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 py-20 md:py-28">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute left-[-8rem] top-[-8rem] h-64 w-64 rounded-full bg-emerald-500 blur-3xl" />
          <div className="absolute bottom-[-8rem] right-[-8rem] h-64 w-64 rounded-full bg-blue-500 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-emerald-200">
              <BriefcaseBusiness className="h-4 w-4" />
              Interview Preparation Hub
            </div>
            <h1 className="mb-4 text-4xl font-black text-white md:text-5xl">
              Company-wise Interview Strategy for Geophysics Roles
            </h1>
            <p className="text-base text-slate-200 md:text-lg">
              Structured preparation for Reliance, ExxonMobil, BP, Chevron, Cairn Oil & Gas, and ONGC with targeted strategy and
              frequently asked interview questions.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {recruiterLens.map((item) => (
                <div key={item} className="rounded-xl border border-white/15 bg-white/10 p-3 text-sm text-slate-100 backdrop-blur-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Filter className="h-4 w-4" />
              Smart Filters
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <label className="relative block xl:col-span-2">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by company, segment, focus area, or question keyword..."
                  className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-emerald-500"
                />
              </label>

              <select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500"
              >
                <option value="all">All Companies</option>
                {interviewPrepCompanies.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>

              <select
                value={roundFilter}
                onChange={(e) => setRoundFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500"
              >
                <option value="all">All Rounds</option>
                <option value="technical">Technical</option>
                <option value="hr">HR</option>
                <option value="caseStudy">Case Discussion</option>
              </select>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500"
              >
                <option value="all">All Roles</option>
                <option value="exploration">Exploration</option>
                <option value="processing">Processing</option>
                <option value="reservoir">Reservoir</option>
                <option value="integrated">Integrated</option>
              </select>

              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500"
              >
                <option value="all">All Difficulty</option>
                <option value="l1">L1 Foundation</option>
                <option value="l2">L2 Applied</option>
                <option value="l3">L3 Advanced</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="name">Sort: Company Name</option>
                <option value="focus">Sort: Hiring Focus Coverage</option>
              </select>
            </div>
          </div>

          <div className="mb-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 inline-flex rounded-lg bg-blue-50 p-2 text-blue-700">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">1. Role Targeting</h3>
              <p className="text-sm text-slate-600">Define your target role first: exploration, processing, reservoir, or integrated subsurface.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 inline-flex rounded-lg bg-emerald-50 p-2 text-emerald-700">
                <ClipboardList className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">2. Technical Narrative</h3>
              <p className="text-sm text-slate-600">Build two project stories with assumptions, workflow, uncertainty, and business impact.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 inline-flex rounded-lg bg-amber-50 p-2 text-amber-700">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">3. Interview Simulation</h3>
              <p className="text-sm text-slate-600">Practice technical + HR + case rounds using company-specific question buckets.</p>
            </div>
          </div>

          <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Gauge className="h-4 w-4" />
              90-Day Professional Prep Roadmap
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {prepRoadmap.map((phase) => (
                <div key={phase.phase} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">{phase.phase}</p>
                  <h3 className="mt-2 text-base font-bold text-slate-900">{phase.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{phase.details}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {filteredCompanies.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <p className="text-lg font-semibold text-slate-900">No companies match the current filters.</p>
                <p className="mt-2 text-sm text-slate-600">Try broadening role, round, or difficulty filters.</p>
              </div>
            ) : (
              filteredCompanies.map((item) => {
                const roundSections: Array<{
                  key: RoundKey;
                  title: string;
                  containerClass: string;
                  headerClass: string;
                  textClass: string;
                  questions: string[];
                }> = [
                  {
                    key: "technical",
                    title: "Technical Round",
                    containerClass: "border-blue-100 bg-blue-50",
                    headerClass: "text-blue-800",
                    textClass: "text-blue-900",
                    questions: item.questions.technical,
                  },
                  {
                    key: "hr",
                    title: "HR Round",
                    containerClass: "border-emerald-100 bg-emerald-50",
                    headerClass: "text-emerald-800",
                    textClass: "text-emerald-900",
                    questions: item.questions.hr,
                  },
                  {
                    key: "caseStudy",
                    title: "Case Discussion",
                    containerClass: "border-amber-100 bg-amber-50",
                    headerClass: "text-amber-800",
                    textClass: "text-amber-900",
                    questions: item.questions.caseStudy,
                  },
                ];

                return (
                  <article key={item.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <header className="border-b border-slate-200 bg-slate-900 px-6 py-5 text-white">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h2 className="text-2xl font-bold">{item.name}</h2>
                          <p className="mt-1 text-sm text-slate-300">{item.segment}</p>
                        </div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs">
                          <Building2 className="h-3.5 w-3.5" />
                          Hiring Focus
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.hiringFocus.map((focus) => (
                          <span key={focus} className="rounded-full bg-white/10 px-3 py-1 text-xs">
                            {focus}
                          </span>
                        ))}
                      </div>
                    </header>

                    <div className="grid gap-6 p-6 lg:grid-cols-2">
                      <div>
                        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">Strategy</h3>
                        <div className="space-y-2">
                          {item.strategy.map((point) => (
                            <div key={point} className="flex items-start gap-2 border-b border-slate-100 pb-2 text-sm text-slate-700 last:border-none last:pb-0">
                              <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-4">
                        {roundSections
                          .filter((section) => roundFilter === "all" || section.key === roundFilter)
                          .map((section) => (
                            <div key={section.key} className={`rounded-lg border p-4 ${section.containerClass}`}>
                              <h4 className={`mb-3 text-sm font-semibold ${section.headerClass}`}>{section.title}</h4>
                              <ul className={`space-y-3 text-sm ${section.textClass}`}>
                                {section.questions.map((question, index) => {
                                  const role = inferRole(question);
                                  const difficulty = inferDifficulty(section.key, index, question);
                                  const timing = estimateTime(section.key, difficulty);

                                  if (roleFilter !== "all" && role.toLowerCase() !== roleFilter) {
                                    return null;
                                  }
                                  if (difficultyFilter !== "all" && difficulty.toLowerCase() !== difficultyFilter) {
                                    return null;
                                  }

                                  return (
                                    <li key={question} className="rounded-md border border-white/50 bg-white/60 p-3">
                                      <p className="font-medium leading-relaxed">• {question}</p>
                                      <div className="mt-2 flex flex-wrap gap-2 text-xs">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/90 px-2.5 py-1 text-white">
                                          <Layers3 className="h-3 w-3" />
                                          {role}
                                        </span>
                                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-700 px-2.5 py-1 text-white">
                                          <BadgeCheck className="h-3 w-3" />
                                          {difficulty}
                                        </span>
                                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-2.5 py-1 text-slate-700">
                                          <Clock3 className="h-3 w-3" />
                                          {timing}
                                        </span>
                                      </div>
                                      <details className="mt-2 rounded-md border border-slate-200 bg-white p-2">
                                        <summary className="cursor-pointer text-xs font-semibold text-slate-700">
                                          Model answer framework
                                        </summary>
                                        <div className="mt-2 grid gap-1 text-xs text-slate-600">
                                          <p>
                                            <span className="font-semibold text-slate-700">Approach:</span> Define objective and the data used.
                                          </p>
                                          <p>
                                            <span className="font-semibold text-slate-700">Assumptions:</span> State key geological and data assumptions.
                                          </p>
                                          <p>
                                            <span className="font-semibold text-slate-700">Trade-offs:</span> Explain uncertainty vs speed/cost choices.
                                          </p>
                                          <p>
                                            <span className="font-semibold text-slate-700">Decision:</span> Conclude with business-impact recommendation.
                                          </p>
                                        </div>
                                      </details>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                      </div>
                    </div>

                    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-6 py-3 text-xs text-slate-600">
                      <span className="inline-flex items-center gap-1">
                        <NotebookPen className="h-3.5 w-3.5" />
                        Interview readiness note: prioritize clarity, uncertainty handling, and recommendation quality.
                      </span>
                      <span>Updated for practice cycle planning</span>
                    </footer>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
