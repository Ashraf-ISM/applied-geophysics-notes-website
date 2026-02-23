import { Layout } from "@/components/layout/Layout";
import { MaterialCard } from "@/components/materials/MaterialCard";
import { MaterialFilters } from "@/components/materials/MaterialFilters";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export interface Material {
  id: string;
  title: string;
  description: string;
  subject: string;
  subjectLabel: string;
  type: "pyq" | "notes" | "reference" | "textbook";
  accessLevel: "public" | "ism-only";
  uploadDate: string;
  downloads: number;
}

const materials: Material[] = [
  {
    id: "1",
    title: "Seismology Mid-Semester 2023",
    description: "Complete mid-semester question paper with solutions for Seismology course",
    subject: "seismology",
    subjectLabel: "Seismology",
    type: "pyq",
    accessLevel: "public",
    uploadDate: "2024-01-15",
    downloads: 234,
  },
  {
    id: "2",
    title: "Introduction to Seismic Waves",
    description: "Comprehensive class notes covering P-waves, S-waves, and surface wave propagation",
    subject: "seismology",
    subjectLabel: "Seismology",
    type: "notes",
    accessLevel: "ism-only",
    uploadDate: "2024-02-10",
    downloads: 156,
  },
  {
    id: "3",
    title: "Gravity Methods in Exploration",
    description: "Reference notes on gravity surveying techniques and data interpretation",
    subject: "gravity-magnetics",
    subjectLabel: "Gravity & Magnetics",
    type: "reference",
    accessLevel: "public",
    uploadDate: "2024-01-20",
    downloads: 189,
  },
  {
    id: "4",
    title: "Fundamentals of Geophysical Data Processing",
    description: "Standard textbook reference for signal processing in geophysics",
    subject: "exploration",
    subjectLabel: "Exploration Geophysics",
    type: "textbook",
    accessLevel: "public",
    uploadDate: "2023-12-05",
    downloads: 312,
  },
  {
    id: "5",
    title: "Electrical Methods End-Semester 2022",
    description: "Previous year end-semester examination paper",
    subject: "electrical-em",
    subjectLabel: "Electrical & EM Methods",
    type: "pyq",
    accessLevel: "public",
    uploadDate: "2023-11-15",
    downloads: 276,
  },
  {
    id: "6",
    title: "Well Logging Interpretation Guide",
    description: "Detailed class notes on log interpretation techniques and formation evaluation",
    subject: "well-logging",
    subjectLabel: "Well Logging & Petrophysics",
    type: "notes",
    accessLevel: "ism-only",
    uploadDate: "2024-02-25",
    downloads: 98,
  },
  {
    id: "7",
    title: "GNSS Data Processing Techniques",
    description: "Reference material on GPS/GNSS data processing and error analysis",
    subject: "geodynamics",
    subjectLabel: "Geodynamics & GNSS",
    type: "reference",
    accessLevel: "public",
    uploadDate: "2024-01-08",
    downloads: 145,
  },
  {
    id: "8",
    title: "Applied Seismology Textbook Notes",
    description: "Summary notes from Aki & Richards Applied Quantitative Seismology",
    subject: "seismology",
    subjectLabel: "Seismology",
    type: "textbook",
    accessLevel: "ism-only",
    uploadDate: "2024-03-01",
    downloads: 67,
  },
];

export default function MaterialsPage() {
  const [searchParams] = useSearchParams();
  const initialSubject = searchParams.get("subject") || "";
  const initialType = searchParams.get("type") || "";

  const [filters, setFilters] = useState({
    search: "",
    subject: initialSubject,
    type: initialType,
    accessLevel: "",
  });

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      !filters.search ||
      material.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      material.description.toLowerCase().includes(filters.search.toLowerCase());

    const matchesSubject = !filters.subject || material.subject === filters.subject;
    const matchesType = !filters.type || material.type === filters.type;
    const matchesAccess = !filters.accessLevel || material.accessLevel === filters.accessLevel;

    return matchesSearch && matchesSubject && matchesType && matchesAccess;
  });

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-primary text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Study Materials
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Browse PYQs, class notes, reference materials, and textbooks
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-72 shrink-0">
              <MaterialFilters filters={filters} setFilters={setFilters} />
            </div>

            {/* Materials Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{filteredMaterials.length}</span> materials
                </p>
              </div>

              {filteredMaterials.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredMaterials.map((material, index) => (
                    <MaterialCard
                      key={material.id}
                      material={material}
                      delay={index * 50}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-secondary/50 rounded-xl">
                  <p className="text-muted-foreground text-lg mb-2">
                    No materials found
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
