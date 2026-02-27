import { Layout } from "@/components/layout/Layout";
import { interviewPrepCompanies } from "@/data/interviewPrep";
import { BriefcaseBusiness, Building2, CheckCircle2 } from "lucide-react";

export default function InterviewCompanyPrepPage() {
  return (
    <Layout>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-20 md:py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-[-6rem] top-[-6rem] h-56 w-56 rounded-full bg-emerald-500 blur-3xl" />
          <div className="absolute right-[-6rem] bottom-[-6rem] h-56 w-56 rounded-full bg-blue-500 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-emerald-100">
              <BriefcaseBusiness className="h-4 w-4" />
              Interview Prep - Company Questions
            </div>
            <h1 className="mb-4 text-4xl font-black text-white md:text-5xl">
              Company-wise Strategy and Asked Interview Questions
            </h1>
            <p className="text-base text-slate-200 md:text-lg">
              Prepare for ONGC, ExxonMobil, Chevron, Reliance and other companies with practical strategy points and commonly asked interview questions.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6">
            {interviewPrepCompanies.map((company) => (
              <article key={company.slug} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <header className="border-b border-slate-200 bg-slate-900 px-6 py-5 text-white">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-bold">{company.name}</h2>
                      <p className="mt-1 text-sm text-slate-300">{company.segment}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs">
                      <Building2 className="h-3.5 w-3.5" />
                      Hiring Focus
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {company.hiringFocus.map((focus) => (
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
                      {company.strategy.map((point) => (
                        <div key={point} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                    <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                      <h4 className="mb-2 text-sm font-semibold text-blue-800">Technical Round</h4>
                      <ul className="space-y-1.5 text-sm text-blue-900">
                        {company.questions.technical.map((question) => (
                          <li key={question}>{question}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4">
                      <h4 className="mb-2 text-sm font-semibold text-emerald-800">HR Round</h4>
                      <ul className="space-y-1.5 text-sm text-emerald-900">
                        {company.questions.hr.map((question) => (
                          <li key={question}>{question}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-lg border border-amber-100 bg-amber-50 p-4">
                      <h4 className="mb-2 text-sm font-semibold text-amber-800">Case Discussion</h4>
                      <ul className="space-y-1.5 text-sm text-amber-900">
                        {company.questions.caseStudy.map((question) => (
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
