import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download, 
  Calendar,
  Clock,
  Eye,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

/**
 * STATIC DATA (replace later with Supabase)
 */
const examPYQs: Record<
  string,
  { year: number; title: string; pdf: string; pages?: number; size?: string; views?: number }[]
> = {
  gate: [
    { year: 2024, title: "GATE Geophysics 2024", pdf: "/assets/pdf/gate-2024.pdf", pages: 45, size: "2.3 MB", views: 1250 },
    { year: 2023, title: "GATE Geophysics 2023", pdf: "/assets/pdf/gate-2023.pdf", pages: 42, size: "2.1 MB", views: 980 },
    { year: 2022, title: "GATE Geophysics 2022", pdf: "/assets/pdf/gate-2022.pdf", pages: 40, size: "1.9 MB", views: 850 },
    { year: 2021, title: "GATE Geophysics 2021", pdf: "/assets/pdf/gate-2021.pdf", pages: 38, size: "1.8 MB", views: 720 },
  ],

  gsi: [
    { year: 2020, title: "GSI Exam 2020", pdf: "/assets/pdf/gsi-2020.pdf", pages: 35, size: "1.5 MB", views: 560 },
    { year: 2019, title: "GSI Exam 2019", pdf: "/assets/pdf/gsi-2019.pdf", pages: 33, size: "1.4 MB", views: 490 },
  ],

  net: [
    { year: 2023, title: "CSIR-NET 2023", pdf: "/assets/pdf/net-2023.pdf", pages: 50, size: "2.8 MB", views: 1100 },
    { year: 2022, title: "CSIR-NET 2022", pdf: "/assets/pdf/net-2022.pdf", pages: 48, size: "2.6 MB", views: 920 },
  ],

  other: [
    { year: 2021, title: "JEST 2021", pdf: "/assets/pdf/jest-2021.pdf", pages: 30, size: "1.2 MB", views: 380 },
  ],
};

const examDetails: Record<string, { 
  title: string; 
  description: string; 
  color: string;
  gradient: string;
  icon: string;
}> = {
  gate: {
    title: "GATE Geophysics",
    description: "Graduate Aptitude Test in Engineering - Complete question paper archive with solutions",
    color: "text-amber-600",
    gradient: "from-amber-500/10 to-orange-500/10",
    icon: "🎯",
  },
  net: {
    title: "CSIR / UGC NET",
    description: "National Eligibility Test - Earth Sciences & Geophysics question papers",
    color: "text-blue-600",
    gradient: "from-blue-500/10 to-cyan-500/10",
    icon: "🎓",
  },
  gsi: {
    title: "GSI & Government Exams",
    description: "Geological Survey of India and other government recruitment papers",
    color: "text-emerald-600",
    gradient: "from-emerald-500/10 to-teal-500/10",
    icon: "🏛️",
  },
  other: {
    title: "Other Competitive Exams",
    description: "JEST, JAM, TIFR, JNU and other entrance examination papers",
    color: "text-purple-600",
    gradient: "from-purple-500/10 to-pink-500/10",
    icon: "📚",
  },
};

export default function ExamPYQPage() {
  const { exam } = useParams<{ exam: string }>();
  const papers = exam ? examPYQs[exam] : [];
  const details = exam ? examDetails[exam] : null;

  // Calculate total stats
  const totalPapers = papers.length;
  const totalViews = papers.reduce((sum, paper) => sum + (paper.views || 0), 0);
  const latestYear = papers.length > 0 ? Math.max(...papers.map(p => p.year)) : 0;

  return (
    <Layout>
      {/* HERO HEADER */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-background"></div>
        {details && (
          <div className={`absolute inset-0 bg-gradient-to-br ${details.gradient} opacity-50`}></div>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Back Button */}
          <Link 
            to="/pyq" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to All PYQs
          </Link>

          <div className="max-w-4xl mx-auto text-center">
            {/* Icon Badge */}
            {details && (
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-card/80 backdrop-blur-sm border border-border mb-6 shadow-lg">
                <span className="text-3xl">{details.icon}</span>
                <span className={`text-sm font-semibold ${details.color}`}>
                  {details.title}
                </span>
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              {details?.title || "Previous Year Papers"}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
              {details?.description || "Year-wise question papers with downloadable PDFs"}
            </p>

            {/* Stats Bar */}
            {totalPapers > 0 && (
              <div className="flex items-center justify-center gap-8 flex-wrap">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">{totalPapers}</div>
                    <div className="text-xs text-muted-foreground">Papers</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">{latestYear}</div>
                    <div className="text-xs text-muted-foreground">Latest</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">{totalViews.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Downloads</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PAPERS GRID */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {papers?.length ? (
            <>
              {/* Filter/Sort Bar (placeholder for future) */}
              <div className="flex items-center justify-between mb-12 max-w-6xl mx-auto">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4" />
                  <span>Showing {papers.length} question papers</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  <span>All verified and updated</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {papers.map((paper, index) => (
                  <div
                    key={paper.year}
                    className="group relative"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Gradient Background on Hover */}
                    {details && (
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${details.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    )}
                    
                    {/* Card */}
                    <div className="relative bg-card border border-border rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                      {/* Year Badge */}
                      <div className="absolute top-6 right-6">
                        <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                          <span className="text-sm font-bold text-primary">{paper.year}</span>
                        </div>
                      </div>

                      {/* Icon */}
                      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <FileText className="h-8 w-8 text-primary" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {paper.title}
                      </h3>

                      {/* Meta Information */}
                      <div className="space-y-3 mb-6 flex-1">
                        {paper.pages && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              Pages
                            </span>
                            <span className="font-semibold">{paper.pages}</span>
                          </div>
                        )}
                        {paper.size && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center gap-2">
                              <Download className="h-4 w-4" />
                              Size
                            </span>
                            <span className="font-semibold">{paper.size}</span>
                          </div>
                        )}
                        {paper.views && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              Downloads
                            </span>
                            <span className="font-semibold">{paper.views.toLocaleString()}</span>
                          </div>
                        )}
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6"></div>

                      {/* Actions */}
                      <div className="space-y-3">
                        <a
                          href={paper.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <Button className="w-full group/btn relative overflow-hidden">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              <Download className="h-4 w-4 group-hover/btn:animate-bounce" />
                              Download PDF
                            </span>
                            <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover/btn:translate-y-0 transition-transform"></div>
                          </Button>
                        </a>

                        <Button 
                          variant="outline" 
                          className="w-full group/preview"
                          disabled
                        >
                          <Eye className="h-4 w-4 mr-2 group-hover/preview:scale-110 transition-transform" />
                          Quick Preview
                        </Button>
                      </div>

                      {/* Coming Soon Label */}
                      <p className="text-xs text-muted-foreground/60 text-center mt-3 italic">
                        Solutions available soon
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info Section */}
              <div className="mt-16 max-w-4xl mx-auto">
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 text-center">
                  <h3 className="text-xl font-bold mb-3">Need more papers?</h3>
                  <p className="text-muted-foreground mb-6">
                    We're constantly updating our collection. Check back regularly for newly added question papers and solutions.
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <Link to="/pyq">
                      <Button variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Browse All PYQs
                      </Button>
                    </Link>
                    <Button disabled>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Request Papers
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="max-w-2xl mx-auto text-center py-20">
              <div className="h-24 w-24 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <FileText className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">No Papers Available Yet</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We're working on adding question papers for this examination. 
                Please check back soon or explore other available collections.
              </p>
              <Link to="/pyq">
                <Button size="lg">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Explore Other Exams
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Tips Section */}
      {papers?.length > 0 && (
        <section className="py-16 border-t border-border bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-8 text-center">
                Tips for Using PYQs Effectively
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Time Yourself</h4>
                  <p className="text-sm text-muted-foreground">
                    Practice under exam conditions to improve time management
                  </p>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Track Progress</h4>
                  <p className="text-sm text-muted-foreground">
                    Identify patterns and focus on weak areas
                  </p>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Review Thoroughly</h4>
                  <p className="text-sm text-muted-foreground">
                    Analyze both correct and incorrect answers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}