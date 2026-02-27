import { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  getAllMaterials,
  subscribeMaterialsUpdate,
  updateMaterialLinkHealth,
  updateMaterialModeration,
  type LinkHealth,
  type Material,
  type ModerationStatus,
} from "@/data/materials";
import { toast } from "sonner";

function statusBadgeClass(status: ModerationStatus): string {
  if (status === "published") return "bg-emerald-100 text-emerald-800";
  if (status === "review") return "bg-amber-100 text-amber-800";
  return "bg-slate-100 text-slate-700";
}

function healthBadgeClass(status: LinkHealth): string {
  if (status === "ok") return "bg-emerald-100 text-emerald-800";
  if (status === "broken") return "bg-red-100 text-red-700";
  return "bg-slate-100 text-slate-700";
}

async function checkLink(url: string): Promise<LinkHealth> {
  const value = url.trim();
  if (!value) return "broken";

  if (value.startsWith("data:")) return "ok";
  if (value.startsWith("/")) return "ok";

  if (!/^https?:\/\//i.test(value)) return "broken";

  try {
    await fetch(value, { method: "HEAD", mode: "no-cors" });
    return "ok";
  } catch {
    return "broken";
  }
}

export default function AdminDashboard() {
  const [materials, setMaterials] = useState<Material[]>(() => getAllMaterials());
  const [checkingAll, setCheckingAll] = useState(false);
  const [checkingIds, setCheckingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const sync = () => setMaterials(getAllMaterials());
    const unsubscribe = subscribeMaterialsUpdate(sync);
    window.addEventListener("focus", sync);
    return () => {
      unsubscribe();
      window.removeEventListener("focus", sync);
    };
  }, []);

  const stats = useMemo(() => {
    const notes = materials.filter((item) => item.type === "notes").length;
    const pyq = materials.filter((item) => item.type === "pyq").length;
    const references = materials.filter((item) => item.type === "reference").length;
    const textbooks = materials.filter((item) => item.type === "textbook").length;
    const published = materials.filter((item) => item.moderationStatus === "published").length;
    const review = materials.filter((item) => item.moderationStatus === "review").length;
    const draft = materials.filter((item) => item.moderationStatus === "draft").length;
    const brokenLinks = materials.filter((item) => item.linkHealth === "broken").length;

    return { notes, pyq, references, textbooks, total: materials.length, published, review, draft, brokenLinks };
  }, [materials]);

  const setModeration = (id: string, status: ModerationStatus) => {
    updateMaterialModeration(id, status, "Ashraf");
    setMaterials(getAllMaterials());
    toast.success(`Status updated to ${status}`);
  };

  const runLinkCheck = async (item: Material) => {
    setCheckingIds((prev) => new Set(prev).add(item.id));
    try {
      const health = await checkLink(item.fileUrl || "");
      updateMaterialLinkHealth(item.id, health);
      setMaterials(getAllMaterials());
    } finally {
      setCheckingIds((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }
  };

  const runBulkLinkCheck = async () => {
    setCheckingAll(true);
    for (const item of materials) {
      const health = await checkLink(item.fileUrl || "");
      updateMaterialLinkHealth(item.id, health);
    }
    setMaterials(getAllMaterials());
    setCheckingAll(false);
    toast.success("Link check completed");
  };

  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        <h1 className="mb-2 text-3xl font-bold">Admin Dashboard</h1>
        <p className="mb-8 text-muted-foreground">Moderate uploads, publish approved resources, and monitor link health.</p>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
          <div className="rounded-xl border border-border bg-card p-4"><p className="text-xs uppercase text-muted-foreground">Total</p><p className="text-2xl font-bold">{stats.total}</p></div>
          <div className="rounded-xl border border-border bg-card p-4"><p className="text-xs uppercase text-muted-foreground">Draft</p><p className="text-2xl font-bold">{stats.draft}</p></div>
          <div className="rounded-xl border border-border bg-card p-4"><p className="text-xs uppercase text-muted-foreground">Review</p><p className="text-2xl font-bold">{stats.review}</p></div>
          <div className="rounded-xl border border-border bg-card p-4"><p className="text-xs uppercase text-muted-foreground">Published</p><p className="text-2xl font-bold">{stats.published}</p></div>
          <div className="rounded-xl border border-border bg-card p-4"><p className="text-xs uppercase text-muted-foreground">Broken Links</p><p className="text-2xl font-bold">{stats.brokenLinks}</p></div>
          <div className="rounded-xl border border-border bg-card p-4"><p className="text-xs uppercase text-muted-foreground">Notes</p><p className="text-2xl font-bold">{stats.notes}</p></div>
          <div className="rounded-xl border border-border bg-card p-4"><p className="text-xs uppercase text-muted-foreground">Reference</p><p className="text-2xl font-bold">{stats.references}</p></div>
          <div className="rounded-xl border border-border bg-card p-4"><p className="text-xs uppercase text-muted-foreground">Textbook</p><p className="text-2xl font-bold">{stats.textbooks}</p></div>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          <Link to="/admin/upload">
            <Button>Upload Materials</Button>
          </Link>
          <Button variant="outline" onClick={runBulkLinkCheck} disabled={checkingAll}>
            {checkingAll ? "Checking links..." : "Check All Links"}
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h2 className="mb-4 text-xl font-semibold">Moderation Queue</h2>
          <div className="space-y-3">
            {materials.slice(0, 20).map((item) => (
              <div key={item.id} className="rounded-lg border border-border bg-secondary/40 p-3">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{item.title}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className={`rounded-full px-2 py-1 font-semibold ${statusBadgeClass(item.moderationStatus)}`}>
                      {item.moderationStatus}
                    </span>
                    <span className={`rounded-full px-2 py-1 font-semibold ${healthBadgeClass(item.linkHealth)}`}>
                      link: {item.linkHealth}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  {item.subjectLabel} • {item.type.toUpperCase()} • {item.semester} • {item.topic}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Verified by: {item.verifiedBy ?? "—"}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => setModeration(item.id, "draft")}>Set Draft</Button>
                  <Button size="sm" variant="outline" onClick={() => setModeration(item.id, "review")}>Set Review</Button>
                  <Button size="sm" onClick={() => setModeration(item.id, "published")}>Publish</Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => runLinkCheck(item)}
                    disabled={checkingIds.has(item.id)}
                  >
                    {checkingIds.has(item.id) ? "Checking..." : "Check Link"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
