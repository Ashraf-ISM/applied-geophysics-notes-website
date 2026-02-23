import { Layout } from "@/components/layout/Layout";
import { useParams } from "react-router-dom";
import { subjects } from "@/data/subjects";
import { Download, FileText } from "lucide-react";

export default function SubjectDetailPage() {
  const { id } = useParams();

  const subject = subjects.find((s) => s.id === id);

  if (!subject) {
    return (
      <Layout>
        <div className="py-20 text-center text-muted-foreground">
          Subject not found
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* HEADER */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-3">{subject.name}</h1>
          <p className="text-white/90">{subject.tagline}</p>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="py-14">
        <div className="container mx-auto px-4">

          <h2 className="text-2xl font-bold mb-6">
            Download Materials
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {subject.materials.map((mat, index) => (
              <a
                key={index}
                href={mat.path}
                download
                className="p-5 rounded-xl border bg-card hover:shadow-lg transition flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">{mat.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {mat.type}
                    </p>
                  </div>
                </div>

                <Download className="w-5 h-5 text-primary" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
