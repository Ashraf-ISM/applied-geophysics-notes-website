import { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { MaterialCard } from "@/components/materials/MaterialCard";
import { ResourceFilterBar } from "@/components/resources/ResourceFilterBar";
import { getPublishedMaterials, recordMaterialDownload, subscribeMaterialsUpdate, type Material } from "@/data/materials";
import { filterAndSortResources, type ResourceSortKey } from "@/lib/resourceSearch";
import { addBookmark, addRecentItem, loadDashboardState, removeBookmark } from "@/lib/studentDashboard";
import { Lock, NotebookPen } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { openMaterialFile } from "@/lib/materialFileAccess";
import { toast } from "sonner";

const subjectOptions = [
  { value: "all", label: "All Subjects" },
  { value: "seismology", label: "Seismology" },
  { value: "well-logging", label: "Well Logging & Petrophysics" },
  { value: "exploration", label: "Exploration Geophysics" },
  { value: "gravity-magnetics", label: "Gravity & Magnetics" },
  { value: "electrical-em", label: "Electrical & EM Methods" },
  { value: "geodynamics", label: "Geodynamics & GNSS" },
];

export default function ISMLibraryPage() {
  const [searchParams] = useSearchParams();
  const initialSubject = searchParams.get("subject") || "all";
  const [allMaterials, setAllMaterials] = useState<Material[]>(() => getPublishedMaterials());

  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState(initialSubject);
  const [sortBy, setSortBy] = useState<ResourceSortKey>("relevance");
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(
    () => new Set(loadDashboardState().bookmarks.map((item) => item.id)),
  );

  const classMaterials = useMemo(() => allMaterials.filter((item) => item.type !== "pyq"), [allMaterials]);

  const filteredMaterials = useMemo(() => {
    return filterAndSortResources<Material>({
      items: classMaterials,
      query,
      sortBy,
      searchableText: (material) => [material.title, material.description, material.subjectLabel, material.type],
      predicates: [
        (material) => subject === "all" || material.subject === subject,
      ],
      getTitle: (material) => material.title,
      getDate: (material) => material.uploadDate,
      getPopularity: (material) => material.downloads,
    });
  }, [classMaterials, query, sortBy, subject]);

  useEffect(() => {
    const sync = () => setAllMaterials(getPublishedMaterials());
    const unsubscribe = subscribeMaterialsUpdate(sync);
    window.addEventListener("focus", sync);
    return () => {
      unsubscribe();
      window.removeEventListener("focus", sync);
    };
  }, []);

  const clearFilters = () => {
    setQuery("");
    setSubject("all");
    setSortBy("relevance");
  };

  const getMaterialId = (material: Material) => `material:${material.id}`;

  const handleToggleBookmark = (material: Material) => {
    const id = getMaterialId(material);

    if (bookmarkedIds.has(id)) {
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
      title: material.title,
      subtitle: `${material.subjectLabel} • ${material.type.toUpperCase()}`,
      type: "material",
    });
    setBookmarkedIds((prev) => new Set(prev).add(id));
  };

  const handleOpenMaterial = (material: Material) => {
    addRecentItem({
      id: getMaterialId(material),
      title: material.title,
      subtitle: `${material.subjectLabel} • ${material.type.toUpperCase()}`,
      type: "material",
    });
    recordMaterialDownload(material.id);
    const opened = openMaterialFile(material);
    if (!opened) {
      toast.error("No valid file/link attached for this material");
    }
  };

  const notesCount = classMaterials.filter((item) => item.type === "notes").length;
  const subjectCount = new Set(classMaterials.map((item) => item.subject)).size;

  return (
    <Layout>
      <section className="bg-gradient-primary py-16 text-primary-foreground md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5">
              <Lock className="h-4 w-4" />
              <span className="text-sm font-medium">ISM Verified Access</span>
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">ISM Library Materials Hub</h1>
            <p className="text-lg text-primary-foreground/80">
              Subject-wise internal lectures and notes for Well Log, Seismic, Reservoir, and other core geophysics domains.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 p-3">
                <p className="text-2xl font-black">{classMaterials.length}</p>
                <p className="text-xs uppercase tracking-wide text-primary-foreground/80">Class Materials</p>
              </div>
              <div className="rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 p-3">
                <p className="text-2xl font-black">{subjectCount}</p>
                <p className="text-xs uppercase tracking-wide text-primary-foreground/80">Subject Domains</p>
              </div>
              <div className="rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 p-3">
                <p className="text-2xl font-black">{notesCount}</p>
                <p className="text-xs uppercase tracking-wide text-primary-foreground/80">Lecture Notes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-sm font-semibold text-slate-700">Subject-wise Access</p>
            <div className="flex flex-wrap gap-2">
              {subjectOptions.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setSubject(item.value)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    subject === item.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <ResourceFilterBar
            query={query}
            onQueryChange={setQuery}
            onClear={clearFilters}
            queryPlaceholder="Search ISM lecture notes and material packs..."
            filters={[
              {
                id: "subject",
                label: "Subject",
                value: subject,
                onChange: setSubject,
                options: subjectOptions,
              },
              {
                id: "sort",
                label: "Sort",
                value: sortBy,
                onChange: (value) => setSortBy(value as ResourceSortKey),
                options: [
                  { value: "relevance", label: "Sort: Relevance" },
                  { value: "title-asc", label: "Sort: Title A-Z" },
                  { value: "date-desc", label: "Sort: Latest" },
                  { value: "popularity-desc", label: "Sort: Most Downloaded" },
                ],
              },
            ]}
            className="mb-8"
          />

          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredMaterials.length}</span> of {classMaterials.length} class materials
            </p>
            <p className="inline-flex items-center gap-1 text-xs text-slate-500">
              <NotebookPen className="h-3.5 w-3.5" />
              Subject-wise lectures and notes
            </p>
          </div>

          {filteredMaterials.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredMaterials.map((material, index) => (
                <MaterialCard
                  key={material.id}
                  material={material}
                  delay={index * 50}
                  isBookmarked={bookmarkedIds.has(getMaterialId(material))}
                  onBookmark={handleToggleBookmark}
                  onOpen={handleOpenMaterial}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white py-16 text-center shadow-sm">
              <p className="mb-2 text-lg text-muted-foreground">No ISM materials found</p>
              <p className="text-sm text-muted-foreground">Try changing subject or type filters.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
