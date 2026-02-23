import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { books } from "@/data/books";
import { Button } from "@/components/ui/button";
import { Download, BookOpen, User, ExternalLink, ArrowLeft, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function BookCategoryPage() {
  const { subject } = useParams<{ subject: keyof typeof books }>();
  const bookList = subject ? books[subject] : [];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Layout>
      {/* Hero Header */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container relative mx-auto px-4">
          {/* Back Button */}
          <Link to="/books">
            <Button 
              variant="outline" 
              className="mb-8 border-2 hover:bg-white/80 dark:hover:bg-slate-800/80 backdrop-blur-sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Library
            </Button>
          </Link>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 text-sm font-semibold bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-full border border-indigo-200 dark:border-indigo-800 shadow-lg">
              <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-indigo-600 dark:text-indigo-400 capitalize">
                {subject} Collection
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black mb-6 capitalize">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                {subject} Books
              </span>
            </h1>

            <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
              {bookList.length} expertly selected textbooks and references
            </p>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {bookList?.map((book, index) => (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02]">
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 z-10 pointer-events-none" />
                  
                  {/* Book Cover */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                    <div className="aspect-[3/4] relative">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>

                    {/* Quick View Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end justify-center pb-6 transition-opacity duration-300 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <Button
                        size="sm"
                        className="bg-white text-slate-900 hover:bg-slate-100 shadow-xl font-semibold"
                        onClick={() => window.open(book.file, "_blank")}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Quick View
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {book.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <User className="h-3.5 w-3.5 text-indigo-500" />
                        <span className="font-medium">{book.author}</span>
                      </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />

                    <Button
                      className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold group/btn"
                      onClick={() => window.open(book.file, "_blank")}
                    >
                      <Download className="h-4 w-4 mr-2 transition-transform group-hover/btn:translate-y-0.5" />
                      <span>Download PDF</span>
                      <ExternalLink className="h-3.5 w-3.5 ml-2 opacity-70 transition-transform group-hover/btn:translate-x-0.5" />
                    </Button>
                  </div>

                  {/* Corner Decorations */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-indigo-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-pink-500/10 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Floating Shadow */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}