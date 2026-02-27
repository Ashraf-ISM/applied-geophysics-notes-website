import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import {
  FileText,
  GraduationCap,
  Award,
  BookOpen,
  ChevronRight,
  TrendingUp,
  Clock,
  Target,
  Sparkles,
  Download,
  Calendar,
  Users,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { ResourceFilterBar } from "@/components/resources/ResourceFilterBar";
import { filterAndSortResources, type ResourceSortKey } from "@/lib/resourceSearch";

const examCategories = [
  {
    id: "gate",
    title: "GATE (Geophysics)",
    description: "GATE PYQs arranged year-wise & topic-wise",
    icon: Award,
    count: "30+ Years",
    papers: "450+",
    difficulty: "Advanced",
    color: "from-amber-500/10 to-orange-500/10",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
    badge: "Most Popular",
    badgeColor: "bg-amber-500/20 text-amber-700",
    link: "/pyq/gate",

  },
  {
    id: "net",
    title: "CSIR–NET / UGC–NET",
    description: "NET PYQs for Earth Sciences & Geophysics",
    icon: GraduationCap,
    count: "25+ Years",
    papers: "380+",
    difficulty: "Intermediate",
    color: "from-blue-500/10 to-cyan-500/10",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
    badge: "Updated",
    badgeColor: "bg-blue-500/20 text-blue-700",
  },
  {
    id: "gsi",
    title: "GSI & Govt Exams",
    description: "PYQs from GSI, ONGC, CGWB & PSU exams",
    icon: FileText,
    count: "Multiple Exams",
    papers: "300+",
    difficulty: "Professional",
    color: "from-emerald-500/10 to-teal-500/10",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    badge: "Comprehensive",
    badgeColor: "bg-emerald-500/20 text-emerald-700",
  },
  {
    id: "other",
    title: "Other Competitive Exams",
    description: "JEST, JAM, TIFR, JNU & other entrances",
    icon: BookOpen,
    count: "10+ Exams",
    papers: "250+",
    difficulty: "Varied",
    color: "from-purple-500/10 to-pink-500/10",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600",
    badge: "Curated",
    badgeColor: "bg-purple-500/20 text-purple-700",
  },
];

const stats = [
  { label: "Total Questions", value: "1,380+", icon: FileText },
  { label: "Years Covered", value: "30+", icon: Calendar },
  { label: "Active Users", value: "2,500+", icon: Users },
  { label: "Success Rate", value: "85%", icon: TrendingUp },
];

const features = [
  {
    icon: Target,
    title: "Topic-wise Organization",
    description: "Questions organized by topics for focused practice",
  },
  {
    icon: Clock,
    title: "Year-wise Archive",
    description: "Access papers from the last 30+ years chronologically",
  },
  {
    icon: BarChart3,
    title: "Difficulty Analysis",
    description: "Questions tagged with difficulty levels and trends",
  },
  {
    icon: Download,
    title: "Instant Download",
    description: "Download PDFs instantly for offline preparation",
  },
];

export default function PYQPage() {
  const [query, setQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [sortBy, setSortBy] = useState<ResourceSortKey>("relevance");

  const filteredExamCategories = useMemo(() => {
    return filterAndSortResources({
      items: examCategories,
      query,
      sortBy,
      searchableText: (exam) => [exam.title, exam.description, exam.difficulty, exam.badge, exam.id],
      predicates: [
        (exam) => difficultyFilter === "all" || exam.difficulty.toLowerCase() === difficultyFilter,
      ],
      getTitle: (exam) => exam.title,
    });
  }, [difficultyFilter, query, sortBy]);

  const clearFilters = () => {
    setQuery("");
    setDifficultyFilter("all");
    setSortBy("relevance");
  };

  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-background"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(120,119,198,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(74,222,128,0.15),transparent_50%)]"></div>
        
        {/* Floating particles effect */}
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-primary/20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 rounded-full bg-primary/30 animate-pulse delay-150"></div>
        <div className="absolute bottom-20 left-1/4 w-2 h-2 rounded-full bg-primary/20 animate-pulse delay-300"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Your Complete PYQ Resource Hub</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent leading-tight">
              Previous Year Questions
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Comprehensive collection of exam-focused and semester-wise PYQs, 
              meticulously curated and organized for Geophysics students to excel in their academic journey.
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-4 hover:bg-card transition-all"
                >
                  <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPETITIVE EXAM PYQs */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <ResourceFilterBar
            query={query}
            onQueryChange={setQuery}
            onClear={clearFilters}
            queryPlaceholder="Search exam category, topic, or level..."
            filters={[
              {
                id: "difficulty",
                label: "Difficulty",
                value: difficultyFilter,
                onChange: setDifficultyFilter,
                options: [
                  { value: "all", label: "All Difficulty" },
                  { value: "advanced", label: "Advanced" },
                  { value: "intermediate", label: "Intermediate" },
                  { value: "professional", label: "Professional" },
                  { value: "varied", label: "Varied" },
                ],
              },
              {
                id: "sort",
                label: "Sort",
                value: sortBy,
                onChange: (value) => setSortBy(value as ResourceSortKey),
                options: [
                  { value: "relevance", label: "Sort: Relevance" },
                  { value: "title-asc", label: "Sort: Name A-Z" },
                ],
              },
            ]}
            className="mb-10"
          />

          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-4">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Competitive Exams</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Master Your Exam Preparation
            </h2>
            <p className="text-muted-foreground text-lg">
              Access comprehensive question banks from major geophysics competitive examinations
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Showing {filteredExamCategories.length} of {examCategories.length} exam categories
            </p>
          </div>

          {filteredExamCategories.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {filteredExamCategories.map((exam, index) => (
                <Link
                  key={exam.id}
                  to={`/pyq/${exam.id}`}
                  className="group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                {/* Gradient Background */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${exam.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Card Content */}
                <div className="relative bg-card border border-border rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                  {/* Badge */}
                  <div className="absolute top-6 right-6">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${exam.badgeColor}`}>
                      {exam.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`h-16 w-16 rounded-2xl ${exam.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <exam.icon className={`h-8 w-8 ${exam.iconColor}`} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {exam.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-1">
                    {exam.description}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Coverage</span>
                      <span className="font-semibold text-foreground">{exam.count}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Questions</span>
                      <span className="font-semibold text-foreground">{exam.papers}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Level</span>
                      <span className={`font-semibold ${exam.iconColor}`}>{exam.difficulty}</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6"></div>

                  {/* CTA */}
                  <div className="flex items-center justify-between text-primary font-semibold group/cta">
                    <span>Explore Papers</span>
                    <ChevronRight className="h-5 w-5 group-hover/cta:translate-x-1 transition-transform" />
                  </div>
                </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mb-16 rounded-2xl border border-border bg-card p-10 text-center">
              <p className="text-lg font-semibold">No exam categories match this filter.</p>
              <p className="mt-2 text-sm text-muted-foreground">Try clearing filters or searching broader keywords.</p>
            </div>
          )}

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:bg-card transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEMESTER PYQs CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-background"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-12 md:p-16 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Semester Exams</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                    Semester-wise Question Papers
                  </h2>
                  
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    Complete archive of IIT (ISM) Applied Geophysics semester examination questions, 
                    organized by year and subject for systematic preparation.
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span className="text-sm">All 4 semesters covered</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span className="text-sm">Subject-wise categorization</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                      <span className="text-sm">Multiple year papers available</span>
                    </div>
                  </div>

                  <Link to="/pyq/semester">
                    <Button size="lg" className="group">
                      Browse Semester PYQs
                      <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-3xl"></div>
                  <div className="relative bg-card border border-border rounded-2xl p-8 space-y-4">
                    {["Semester I", "Semester II", "Semester III", "Semester IV"].map((sem, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-border/50 hover:bg-background transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-semibold">{sem}</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INFO BANNER */}
      <section className="py-12 border-t border-border bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our question paper repository is continuously updated with the latest papers and organized for optimal learning. 
              All materials are verified for accuracy and aligned with current examination patterns. 
              <span className="text-primary font-medium"> Last updated: January 2026</span>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
