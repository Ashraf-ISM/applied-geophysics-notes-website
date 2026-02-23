import { Layout } from "@/components/layout/Layout";
import {
  Search,
  BookOpen,
  FileText,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { subjects } from "@/data/subjects";

export default function SubjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSubject, setOpenSubject] = useState<string | null>(null);

  const navigate = useNavigate();

  const filteredSubjects = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.courses.some((c) =>
        c.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <Layout>
      {/* HERO */}
      <section className="relative py-24 bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:40px_40px]" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Geophysics Learning Hub</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Explore Geophysics Subjects
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-white/90 mb-8">
            Department-aligned courses organized into modern learning domains.
            Click a subject to open its dedicated materials page.
          </p>

          {/* SEARCH */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search subjects or courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-white text-black rounded-xl border-0 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* SUBJECT GRID */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSubjects.map((subject) => {
              const isOpen = openSubject === subject.id;

              return (
                <div
                  key={subject.id}
                  onClick={() => navigate(`/subject/${subject.id}`)}
                  className="rounded-2xl border bg-card shadow-sm hover:shadow-xl
                             transition-all hover:-translate-y-1 cursor-pointer group"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold group-hover:text-primary transition">
                        {subject.name}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {subject.level}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {subject.tagline}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {subject.courses.length} Courses
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        Materials
                      </span>
                    </div>

                    {/* Open Subject CTA */}
                    <div className="flex items-center text-primary text-sm font-medium mb-4">
                      Open Subject Page
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>

                    {/* Expand Courses (prevent navigation) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenSubject(isOpen ? null : subject.id);
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition"
                    >
                      {isOpen ? "Hide Courses" : "Preview Courses"}
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    {/* Course list */}
                    {isOpen && (
                      <div className="mt-4 space-y-2 animate-fade-in">
                        {subject.courses.map((course, i) => (
                          <div
                            key={i}
                            className="text-sm p-2 rounded bg-muted/40 hover:bg-primary/5 transition"
                          >
                            {course}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredSubjects.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              No matching subjects found.
            </div>
          )}
        </div>
      </section>

      {/* Animation */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.35s ease-out forwards;
        }
      `}</style>
    </Layout>
  );
}
