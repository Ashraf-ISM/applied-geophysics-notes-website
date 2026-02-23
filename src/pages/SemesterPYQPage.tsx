import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Layers,
  ArrowRight,
  GraduationCap,
  FileText,
  Sparkles,
} from "lucide-react";

const semesterData = [
  {
    id: "sem1",
    title: "Semester I",
    subtitle: "Foundation",
    description: "Core mathematical and physical foundations",
    subjects: [
      "Mathematics for Geophysics",
      "Physics for Earth Sciences",
      "Geology Basics",
    ],
    gradient: "from-blue-600 to-cyan-600",
    lightGradient: "from-blue-50 to-cyan-50",
    borderColor: "border-blue-200",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-700",
    number: "01",
  },
  {
    id: "sem2",
    title: "Semester II",
    subtitle: "Core Theory",
    description: "Theoretical foundations of geophysics",
    subjects: [
      "Seismology – I",
      "Gravity & Magnetic Methods",
      "Numerical Methods",
    ],
    gradient: "from-purple-600 to-pink-600",
    lightGradient: "from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-700",
    number: "02",
  },
  {
    id: "sem3",
    title: "Semester III",
    subtitle: "Advanced Methods",
    description: "Applied techniques and field methods",
    subjects: [
      "Electrical & EM Methods",
      "Well Logging & Petrophysics",
      "Signal Processing",
    ],
    gradient: "from-orange-600 to-amber-600",
    lightGradient: "from-orange-50 to-amber-50",
    borderColor: "border-orange-200",
    badgeBg: "bg-orange-100",
    badgeText: "text-orange-700",
    number: "03",
  },
  {
    id: "sem4",
    title: "Semester IV",
    subtitle: "Specialization",
    description: "Advanced exploration and research methods",
    subjects: [
      "Exploration Seismology",
      "Advanced Seismology",
      "Geophysical Inversion",
    ],
    gradient: "from-emerald-600 to-teal-600",
    lightGradient: "from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700",
    number: "04",
  },
  {
    id: "sem5",
    title: "Semester V",
    subtitle: "Research & Applications",
    description: "Research methodologies and practical applications",
    subjects: [
      "Seismological Data Analysis",

      "Carbon capture and storage",
      "Near-surface geophysics",
    ],
    gradient: "from-emerald-500 to-teal-500",
    lightGradient: "from-emerald-40 to-teal-50",
    borderColor: "border-emerald-200",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700",
    number: "05",
  },
];

export default function SemesterPYQPage() {
  return (
    <Layout>
      {/* ================= HERO SECTION ================= */}
      <section className="relative py-24 md:py-40 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-background">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: "4s" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Sparkles className="h-4 w-4 text-emerald-300" />
              <span className="text-sm font-semibold text-white/90">
                Academic Excellence Hub
              </span>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tight">
                Semester-wise <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">PYQs</span>
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
                Comprehensive collection of previous year question papers organized systematically by semester for the IIT (ISM) Applied Geophysics curriculum
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <FileText className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <p className="text-xs text-white/60">Total</p>
                  <p className="text-sm font-semibold text-white">4 Semesters</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <BookOpen className="h-5 w-5 text-blue-300" />
                </div>
                <div>
                  <p className="text-xs text-white/60">Subjects</p>
                  <p className="text-sm font-semibold text-white">12+ Courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SEMESTER CARDS ================= */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background via-white/5 to-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {semesterData.map((semester, index) => (
              <Link key={semester.id} to={`/pyq/semester/${semester.id}`}>
                <div className="group h-full cursor-pointer">
                  {/* Card */}
                  <div className={`relative h-full bg-gradient-to-br ${semester.lightGradient} border ${semester.borderColor} rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 overflow-hidden`}>
                    {/* Gradient Overlay on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${semester.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />

                    {/* Number Badge */}
                    <div className="flex items-start justify-between mb-6 relative z-10">
                      <div className={`inline-flex items-center justify-center h-16 w-16 rounded-xl ${semester.badgeBg} group-hover:shadow-lg transition-all duration-300`}>
                        <span className={`text-2xl font-black ${semester.badgeText}`}>
                          {semester.number}
                        </span>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-lg ${semester.badgeBg} ${semester.badgeText} uppercase tracking-wider`}>
                        {semester.subjects.length} Subjects
                      </span>
                    </div>

                    {/* Icon */}
                    <div className={`h-14 w-14 rounded-xl ${semester.badgeBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                      <Layers className={`h-7 w-7 ${semester.badgeText}`} />
                    </div>

                    {/* Title & Subtitle */}
                    <div className="mb-6 relative z-10">
                      <h3 className={`text-2xl font-bold ${semester.badgeText} mb-1`}>
                        {semester.title}
                      </h3>
                      <p className={`text-sm ${semester.badgeText} font-semibold opacity-70`}>
                        {semester.subtitle}
                      </p>
                    </div>

                    <p className="text-sm text-slate-700 mb-8 relative z-10 leading-relaxed">
                      {semester.description}
                    </p>

                    {/* Divider */}
                    <div className={`h-px bg-gradient-to-r ${semester.gradient} opacity-20 mb-8 relative z-10`} />

                    {/* Subject List */}
                    <div className="flex-1 space-y-4 mb-8 relative z-10">
                      {semester.subjects.map((sub) => (
                        <div key={sub} className="flex items-start gap-3 group/item">
                          <div className={`h-2 w-2 rounded-full ${semester.badgeText} mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform`} />
                          <span className="text-sm text-slate-700 font-medium">
                            {sub}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <button className={`w-full bg-gradient-to-r ${semester.gradient} text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-xl group-hover:gap-3 relative z-10`}>
                      <span>View Question Papers</span>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= INFO SECTION ================= */}
      <section className="py-16 border-t border-slate-200/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-50/50 via-emerald-50/50 to-purple-50/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-200/50">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-900">Always Updated</h3>
              </div>
              <p className="text-slate-700">
                Our question paper repository is regularly updated with the latest year-wise PDFs for each subject. Check back frequently for new additions and resources.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}