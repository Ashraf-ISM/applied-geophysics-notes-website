import { Layout } from "@/components/layout/Layout";
import { books } from "@/data/books";
import { Button } from "@/components/ui/button";
import { Download, BookOpen, User, ExternalLink, Star, ArrowRight, Sparkles, Bookmark, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { ResourceFilterBar } from "@/components/resources/ResourceFilterBar";
import { filterAndSortResources, type ResourceSortKey } from "@/lib/resourceSearch";
import { addBookmark, addRecentItem, loadDashboardState, removeBookmark } from "@/lib/studentDashboard";

type Book = (typeof books)[number];

export default function BooksPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [authorFilter, setAuthorFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [sortBy, setSortBy] = useState<ResourceSortKey>("relevance");
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(
    () => new Set(loadDashboardState().bookmarks.map((item) => item.id)),
  );

  const getBookId = (book: Book) => `book:${book.title}:${book.author}`;

  const handleOpenBook = (book: Book) => {
    addRecentItem({
      id: getBookId(book),
      title: book.title,
      subtitle: book.author,
      type: "book",
      href: book.pdf,
    });
    window.open(book.pdf, "_blank");
  };

  const toggleBookmark = (book: Book) => {
    const id = getBookId(book);
    const isSaved = bookmarkedIds.has(id);

    if (isSaved) {
      removeBookmark(id);
      setBookmarkedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      return;
    }

    addBookmark({
      id,
      title: book.title,
      subtitle: book.author,
      type: "book",
      href: book.pdf,
    });
    setBookmarkedIds((prev) => new Set(prev).add(id));
  };

  const authorOptions = useMemo(() => {
    return Array.from(new Set(books.map((book) => book.author))).sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredBooks = useMemo(() => {
    return filterAndSortResources<Book>({
      items: books,
      query,
      sortBy,
      searchableText: (book) => [book.title, book.author],
      predicates: [
        (book) => authorFilter === "all" || book.author === authorFilter,
        (book) => {
          if (sourceFilter === "all") return true;
          const isExternal = book.pdf.startsWith("http");
          return sourceFilter === "external" ? isExternal : !isExternal;
        },
      ],
      getTitle: (book) => book.title,
    });
  }, [authorFilter, query, sourceFilter, sortBy]);

  const clearFilters = () => {
    setQuery("");
    setAuthorFilter("all");
    setSourceFilter("all");
    setSortBy("relevance");
  };

  return (
    <Layout>
      {/* Hero Header with Dynamic Gradient */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        
        <div className="container relative mx-auto px-4 text-center z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 text-sm font-semibold bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-full border border-indigo-200 dark:border-indigo-800 shadow-lg shadow-indigo-500/20">
            <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400 animate-pulse" />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Premium Academic Collection
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Geophysics Library
            </span>
          </h1>
          
          <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 font-medium">
            Discover world-class textbooks and authoritative references curated for 
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold"> advanced research </span>
            and comprehensive learning
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              <span>{books.length} Premium Resources</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>Expert Curated</span>
            </div>
          </div>
        </div>
      </section>

      {/* Books Grid with 3D Cards */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <ResourceFilterBar
              query={query}
              onQueryChange={setQuery}
              onClear={clearFilters}
              queryPlaceholder="Search by title or author..."
              filters={[
                {
                  id: "author",
                  label: "Author",
                  value: authorFilter,
                  onChange: setAuthorFilter,
                  options: [
                    { value: "all", label: "All Authors" },
                    ...authorOptions.map((author) => ({ value: author, label: author })),
                  ],
                },
                {
                  id: "source",
                  label: "Source",
                  value: sourceFilter,
                  onChange: setSourceFilter,
                  options: [
                    { value: "all", label: "All Sources" },
                    { value: "local", label: "Local Library" },
                    { value: "external", label: "External Links" },
                  ],
                },
                {
                  id: "sort",
                  label: "Sort",
                  value: sortBy,
                  onChange: (value) => setSortBy(value as ResourceSortKey),
                  options: [
                    { value: "relevance", label: "Sort: Relevance" },
                    { value: "title-asc", label: "Sort: Title A-Z" },
                  ],
                },
              ]}
            />
          </div>

          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Featured Textbooks
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Showing {filteredBooks.length} of {books.length} resources
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
          </div>

          {filteredBooks.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredBooks.map((book, index) => (
                <div
                  key={`${book.title}-${book.author}-${index}`}
                  className="group relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                {/* Card with 3D Effect */}
                <div className="relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02]">
                  
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 z-10 pointer-events-none" />
                  
                  {/* Book Cover - Full Display */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                    <div className="aspect-[3/4] relative">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Shine Effect on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 bg-white rounded-full animate-pulse" />
                        Available
                      </div>
                    </div>

                    {/* Quick Actions Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end justify-center pb-6 transition-opacity duration-300 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <Button
                        size="sm"
                        className="bg-white text-slate-900 hover:bg-slate-100 shadow-xl font-semibold"
                        onClick={() => handleOpenBook(book)}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Quick View
                      </Button>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 space-y-4">
                    {/* Title */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                        {book.title}
                      </h3>
                      
                      {/* Author */}
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <User className="h-3.5 w-3.5 text-indigo-500" />
                        <span className="font-medium">{book.author}</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />

                    {/* Action Button */}
                    <div className="grid grid-cols-1 gap-2">
                      <Button
                        className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold group/btn"
                        onClick={() => handleOpenBook(book)}
                      >
                        <Download className="h-4 w-4 mr-2 transition-transform group-hover/btn:translate-y-0.5" />
                        <span>Download PDF</span>
                        <ExternalLink className="h-3.5 w-3.5 ml-2 opacity-70 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => toggleBookmark(book)}
                      >
                        {bookmarkedIds.has(getBookId(book)) ? <Check className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                        {bookmarkedIds.has(getBookId(book)) ? "Saved to Dashboard" : "Save to Dashboard"}
                      </Button>
                    </div>
                  </div>

                  {/* Corner Decoration */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-indigo-500/10 via-purple-500/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Top Corner Accent */}
                  <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Floating Shadow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" />
              </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">No books match these filters.</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Try clearing filters or broadening your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Footer CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-slate-900 dark:via-indigo-950 dark:to-purple-950" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-indigo-200 dark:border-indigo-800">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Trusted by Students & Researchers Worldwide
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Educational Resources for Excellence
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                All resources are provided for educational purposes. Please respect copyright 
                and licensing terms when using these materials.
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 pt-4">
              <Button 
                variant="outline" 
                className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-semibold"
              >
                Report Issue
              </Button>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg">
                Request a Book
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
