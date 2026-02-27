import { useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { addMaterial, getAllMaterials, type CreateMaterialInput, type Material, type ModerationStatus } from "@/data/materials";

const subjectOptions = [
  { value: "seismology", label: "Seismology" },
  { value: "well-logging", label: "Well Logging & Petrophysics" },
  { value: "exploration", label: "Exploration Geophysics" },
  { value: "gravity-magnetics", label: "Gravity & Magnetics" },
  { value: "electrical-em", label: "Electrical & EM Methods" },
  { value: "geodynamics", label: "Geodynamics & GNSS" },
];

const semesterOptions = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6"];

const typeOptions: Array<{ value: Material["type"]; label: string }> = [
  { value: "notes", label: "Class Notes" },
  { value: "reference", label: "Reference" },
  { value: "textbook", label: "Textbook" },
  { value: "pyq", label: "PYQ" },
];

const MAX_EMBED_FILE_SIZE_BYTES = 800 * 1024; // ~800 KB safe limit for localStorage persistence

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("File read failed"));
    reader.readAsDataURL(file);
  });
}

export default function AdminUpload() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sourceMode, setSourceMode] = useState<"file" | "link">("file");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [externalLink, setExternalLink] = useState("");
  const [recent, setRecent] = useState<Material[]>(() => getAllMaterials().slice(0, 5));

  const [form, setForm] = useState({
    title: "",
    description: "",
    subject: "seismology",
    type: "notes" as Material["type"],
    semester: "Semester 1",
    topic: "",
    accessLevel: "ism-only" as Material["accessLevel"],
    moderationStatus: "review" as ModerationStatus,
  });

  const subjectLabel = useMemo(
    () => subjectOptions.find((item) => item.value === form.subject)?.label || "Seismology",
    [form.subject],
  );

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      subject: "seismology",
      type: "notes",
      semester: "Semester 1",
      topic: "",
      accessLevel: "ism-only",
      moderationStatus: "review",
    });
    setUploadedFile(null);
    setExternalLink("");
    setSourceMode("file");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.topic.trim()) {
      toast.error("Title and topic are required");
      return;
    }

    if (sourceMode === "file" && !uploadedFile) {
      toast.error("Please upload a PDF/image file");
      return;
    }

    if (sourceMode === "file" && uploadedFile && uploadedFile.size > MAX_EMBED_FILE_SIZE_BYTES) {
      toast.error("File is too large for browser storage. Please use a Drive/PDF link.");
      return;
    }

    if (sourceMode === "link" && !externalLink.trim()) {
      toast.error("Please provide a file/link URL");
      return;
    }

    setIsSubmitting(true);

    try {
      let fileUrl = "";

      if (sourceMode === "file" && uploadedFile) {
        fileUrl = await fileToDataUrl(uploadedFile);
      }

      if (sourceMode === "link") {
        fileUrl = externalLink.trim();
      }

      const payload: CreateMaterialInput = {
        title: form.title.trim(),
        description: form.description.trim() || `${subjectLabel} ${form.type} resource`,
        subject: form.subject,
        subjectLabel,
        type: form.type,
        accessLevel: form.accessLevel,
        semester: form.semester,
        topic: form.topic.trim(),
        fileUrl,
        moderationStatus: form.moderationStatus,
      };

      addMaterial(payload);
      setRecent(getAllMaterials().slice(0, 5));
      toast.success("Material uploaded successfully");
      resetForm();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="container mx-auto max-w-5xl px-4 py-16">
        <h1 className="mb-3 text-3xl font-bold">Admin Upload Center</h1>
        <p className="mb-8 text-muted-foreground">
          Upload PDF/files or attach Drive links with metadata: subject, type, semester, and topic.
        </p>

        <div className="grid gap-8 lg:grid-cols-3">
          <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-card p-6 lg:col-span-2">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Example: Seismic Processing Notes Unit 3"
                />
              </div>

              <div>
                <Label>Subject</Label>
                <Select value={form.subject} onValueChange={(value) => setForm((prev) => ({ ...prev, subject: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectOptions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Type</Label>
                <Select value={form.type} onValueChange={(value) => setForm((prev) => ({ ...prev, type: value as Material["type"] }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {typeOptions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Semester</Label>
                <Select value={form.semester} onValueChange={(value) => setForm((prev) => ({ ...prev, semester: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {semesterOptions.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Topic</Label>
                <Input
                  value={form.topic}
                  onChange={(e) => setForm((prev) => ({ ...prev, topic: e.target.value }))}
                  placeholder="AVO Analysis / Well Correlation / ..."
                />
              </div>

              <div>
                <Label>Access</Label>
                <Select
                  value={form.accessLevel}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, accessLevel: value as Material["accessLevel"] }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ism-only">ISM Only</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Initial Status</Label>
                <Select
                  value={form.moderationStatus}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, moderationStatus: value as ModerationStatus }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="review">Under Review</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Short description of this resource"
                  rows={3}
                />
              </div>
            </div>

            <div className="rounded-lg border border-border p-4">
              <Label className="mb-2 block">Source</Label>
              <div className="mb-3 flex gap-2">
                <Button type="button" variant={sourceMode === "file" ? "default" : "outline"} onClick={() => setSourceMode("file")}>
                  Upload File
                </Button>
                <Button type="button" variant={sourceMode === "link" ? "default" : "outline"} onClick={() => setSourceMode("link")}>
                  Use Link
                </Button>
              </div>

              {sourceMode === "file" ? (
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                  />
                  <p className="text-xs text-muted-foreground">
                    For reliability, upload small files only (up to ~800 KB). Use link mode for large PDFs.
                  </p>
                </div>
              ) : (
                <Input
                  value={externalLink}
                  onChange={(e) => setExternalLink(e.target.value)}
                  placeholder="https://drive.google.com/... or direct PDF URL"
                />
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Uploading..." : "Upload Material"}
            </Button>
          </form>

          <aside className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-4 text-lg font-semibold">Recent Uploads</h2>
            <div className="space-y-3">
              {recent.map((item) => (
                <div key={item.id} className="rounded-lg border border-border bg-secondary/40 p-3">
                  <p className="line-clamp-2 text-sm font-semibold">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.subjectLabel} • {item.semester}
                  </p>
                  <p className="text-xs text-muted-foreground">Topic: {item.topic}</p>
                  <p className="text-xs text-muted-foreground">Status: {item.moderationStatus}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
