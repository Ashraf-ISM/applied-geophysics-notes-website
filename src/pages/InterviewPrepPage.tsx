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
} from "lucide-react";

export default function InterviewPrepPage() {
  const [query, setQuery] = useState("");
  const [company, setCompany] = useState("all");

  const filteredCompanies = useMemo(() => {
    return interviewPrepCompanies.filter((item) => {
      const matchesCompany = company === "all" || item.slug === company;
      const q = query.toLowerCase();
      const matchesQuery =
        item.name.toLowerCase().includes(q) ||
        item.segment.toLowerCase().includes(q) ||
        item.hiringFocus.some((focus) => focus.toLowerCase().includes(q));

      return matchesCompany && matchesQuery;
    });
  }, [company, query]);

  return (
    <Layout>
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 py-20 md:py-28">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute left-[-8rem] top-[-8rem] h-64 w-64 rounded-full bg-emerald-500 blur-3xl" />
          <div className="absolute right-[-8rem] bottom-[-8rem] h-64 w-64 rounded-full bg-blue-500 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-emerald-200">
              <BriefcaseBusiness className="h-4 w-4" />
              Interview Preparation Hub
            </div>
            <h1 className="mb-4 text-4xl font-black text-white md:text-5xl">
              Company-wise Interview Strategy for Geophysics Roles
            </h1>
            <p className="text-base text-slate-200 md:text-lg">
              Structured preparation for Reliance, ExxonMobil, BP, Chevron, Cairn Oil & Gas, and ONGC with targeted strategy and frequently asked interview questions.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by company, segment, focus area..."
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
          </div>

          <div className="mb-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 inline-flex rounded-lg bg-blue-50 p-2 text-blue-700">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">1. Role Targeting</h3>
              <p className="text-sm text-slate-600">Define target role first: exploration, processing, reservoir, or integrated subsurface.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 inline-flex rounded-lg bg-emerald-50 p-2 text-emerald-700">
                <ClipboardList className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">2. Technical Narrative</h3>
              <p className="text-sm text-slate-600">Build 2 project stories with assumptions, workflow, uncertainty, and business impact.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 inline-flex rounded-lg bg-amber-50 p-2 text-amber-700">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">3. Interview Simulation</h3>
              <p className="text-sm text-slate-600">Practice technical + HR + case rounds using company-specific question buckets.</p>
            </div>
          </div>

          <div className="grid gap-6">
            {filteredCompanies.map((item) => (
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
                        <div key={point} className="flex items-start gap-2 text-sm text-slate-700">
                          <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                    <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                      <h4 className="mb-2 text-sm font-semibold text-blue-800">Technical Round</h4>
                      <ul className="space-y-1.5 text-sm text-blue-900">
                        {item.questions.technical.map((question) => (
                          <li key={question}>{question}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
                      <h4 className="mb-2 text-sm font-semibold text-emerald-800">HR Round</h4>
                      <ul className="space-y-1.5 text-sm text-emerald-900">
                        {item.questions.hr.map((question) => (
                          <li key={question}>{question}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-lg border border-amber-100 bg-amber-50 p-4">
                      <h4 className="mb-2 text-sm font-semibold text-amber-800">Case Discussion</h4>
                      <ul className="space-y-1.5 text-sm text-amber-900">
                        {item.questions.caseStudy.map((question) => (
                          <li key={question}>{question}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
