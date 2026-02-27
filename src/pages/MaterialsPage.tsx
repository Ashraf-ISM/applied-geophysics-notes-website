import { Layout } from "@/components/layout/Layout";
import { MaterialCard } from "@/components/materials/MaterialCard";
import { ResourceFilterBar } from "@/components/resources/ResourceFilterBar";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { filterAndSortResources, type ResourceSortKey } from "@/lib/resourceSearch";
import { addBookmark, addRecentItem, loadDashboardState, removeBookmark } from "@/lib/studentDashboard";
import { getPublishedMaterials, recordMaterialDownload, subscribeMaterialsUpdate, type Material } from "@/data/materials";
import { openMaterialFile } from "@/lib/materialFileAccess";
import { toast } from "sonner";

export default function MaterialsPage() {
  const [searchParams] = useSearchParams();
  const initialSubject = searchParams.get("subject") || "all";
  const initialType = searchParams.get("type") || "all";
  const [allMaterials, setAllMaterials] = useState<Material[]>(() => getPublishedMaterials());

  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState(initialSubject);
  const [type, setType] = useState(initialType);
  const [accessLevel, setAccessLevel] = useState("all");
  const [sortBy, setSortBy] = useState<ResourceSortKey>("relevance");
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(
    () => new Set(loadDashboardState().bookmarks.map((item) => item.id)),
  );

  const filteredMaterials = useMemo(() => {
    return filterAndSortResources<Material>({
      items: allMaterials,
      query,
      sortBy,
      searchableText: (material) => [material.title, material.description, material.subjectLabel, material.type],
      predicates: [
        (material) => subject === "all" || material.subject === subject,
        (material) => type === "all" || material.type === type,
        (material) => accessLevel === "all" || material.accessLevel === accessLevel,
      ],
      getTitle: (material) => material.title,
      getDate: (material) => material.uploadDate,
      getPopularity: (material) => material.downloads,
    });
  }, [accessLevel, allMaterials, query, sortBy, subject, type]);

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
    setType("all");
    setAccessLevel("all");
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

  return (
    <Layout>
      <section className="bg-gradient-primary py-16 text-primary-foreground md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Study Materials</h1>
            <p className="text-lg text-primary-foreground/80">Browse PYQs, class notes, reference materials, and textbooks</p>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <ResourceFilterBar
            query={query}
            onQueryChange={setQuery}
            onClear={clearFilters}
            queryPlaceholder="Search notes, PYQs, textbooks..."
            filters={[
              {
                id: "subject",
                label: "Subject",
                value: subject,
                onChange: setSubject,
                options: [
                  { value: "all", label: "All Subjects" },
                  { value: "seismology", label: "Seismology" },
                  { value: "gravity-magnetics", label: "Gravity & Magnetics" },
                  { value: "electrical-em", label: "Electrical & EM Methods" },
                  { value: "well-logging", label: "Well Logging & Petrophysics" },
                  { value: "exploration", label: "Exploration Geophysics" },
                  { value: "geodynamics", label: "Geodynamics & GNSS" },
                ],
              },
              {
                id: "type",
                label: "Type",
                value: type,
                onChange: setType,
                options: [
                  { value: "all", label: "All Types" },
                  { value: "pyq", label: "Previous Year Questions" },
                  { value: "notes", label: "Class Notes" },
                  { value: "reference", label: "Reference Notes" },
                  { value: "textbook", label: "Textbooks" },
                ],
              },
              {
                id: "access",
                label: "Access",
                value: accessLevel,
                onChange: setAccessLevel,
                options: [
                  { value: "all", label: "All Access" },
                  { value: "public", label: "Public" },
                  { value: "ism-only", label: "ISM Only" },
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
                  { value: "date-desc", label: "Sort: Latest" },
                  { value: "popularity-desc", label: "Sort: Most Downloaded" },
                ],
              },
            ]}
            className="mb-8"
          />

          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredMaterials.length}</span> of {allMaterials.length} materials
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
            <div className="rounded-xl bg-secondary/50 py-16 text-center">
              <p className="mb-2 text-lg text-muted-foreground">No materials found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
