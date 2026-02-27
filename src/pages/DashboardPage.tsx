import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  loadDashboardState,
  removeBookmark,
  updatePrepStatus,
  clearRecentItems,
  getDashboardUpdateEventName,
  type PrepStatus,
  type StudentDashboardState,
} from "@/lib/studentDashboard";
import { BarChart3, BookMarked, Clock3, ExternalLink, Trash2 } from "lucide-react";

const statusOptions: Array<{ value: PrepStatus; label: string; className: string }> = [
  { value: "not-started", label: "Not Started", className: "bg-slate-100 text-slate-700" },
  { value: "in-progress", label: "In Progress", className: "bg-blue-100 text-blue-700" },
  { value: "ready", label: "Interview Ready", className: "bg-emerald-100 text-emerald-700" },
];

export default function DashboardPage() {
  const [state, setState] = useState<StudentDashboardState>(() => loadDashboardState());

  useEffect(() => {
    const sync = () => setState(loadDashboardState());
    const eventName = getDashboardUpdateEventName();

    window.addEventListener(eventName, sync);
    window.addEventListener("focus", sync);

    return () => {
      window.removeEventListener(eventName, sync);
      window.removeEventListener("focus", sync);
    };
  }, []);

  const progress = useMemo(() => {
    const total = state.prep.length;
    const readyCount = state.prep.filter((task) => task.status === "ready").length;
    const inProgressCount = state.prep.filter((task) => task.status === "in-progress").length;
    const score = total === 0 ? 0 : Math.round(((readyCount + inProgressCount * 0.5) / total) * 100);

    return { total, readyCount, inProgressCount, score };
  }, [state.prep]);

  return (
    <Layout>
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 py-16 text-white md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-200">
              <BarChart3 className="h-4 w-4" />
              My Dashboard
            </p>
            <h1 className="text-4xl font-black md:text-5xl">Your Study Command Center</h1>
            <p className="mt-4 max-w-2xl text-slate-200">
              Track saved resources, recent activity, and interview preparation progress in one place.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10 md:py-12">
        <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">Bookmarks</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{state.bookmarks.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">Recent Views</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{state.recent.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">Prep Score</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{progress.score}%</p>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-12">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-7">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Saved Bookmarks</h2>
              <Link to="/ism-library" className="text-sm font-medium text-primary">
                Browse resources
              </Link>
            </div>

            {state.bookmarks.length === 0 ? (
              <p className="text-sm text-slate-600">No bookmarks yet. Save books or materials to build your shortlist.</p>
            ) : (
              <div className="space-y-3">
                {state.bookmarks.map((item) => (
                  <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-600">{item.subtitle || "Resource"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noreferrer">
                          <Button size="sm" variant="outline">
                            Open
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        </a>
                      ) : null}
                      <Button size="sm" variant="ghost" onClick={() => removeBookmark(item.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Interview Prep Tracker</h2>
              <span className="text-xs text-slate-500">Ready: {progress.readyCount}/{progress.total}</span>
            </div>

            <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${progress.score}%` }} />
            </div>

            <div className="space-y-3">
              {state.prep.map((task) => (
                <div key={task.id} className="rounded-lg border border-slate-200 p-3">
                  <p className="mb-2 text-sm font-semibold text-slate-800">{task.title}</p>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updatePrepStatus(task.id, option.value)}
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
                          task.status === option.value
                            ? `${option.className} ring-1 ring-slate-300`
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="inline-flex items-center gap-2 text-xl font-bold text-slate-900">
                <Clock3 className="h-5 w-5" />
                Recently Viewed
              </h2>
              <Button size="sm" variant="ghost" onClick={clearRecentItems}>
                Clear
              </Button>
            </div>

            {state.recent.length === 0 ? (
              <p className="text-sm text-slate-600">No recent activity yet. Open books and materials to populate this section.</p>
            ) : (
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {state.recent.map((item) => (
                  <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <p className="line-clamp-1 font-semibold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-600">{item.subtitle || item.type.toUpperCase()}</p>
                    <p className="mt-1 text-xs text-slate-500">{new Date(item.viewedAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </article>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/books">
              <Button variant="outline">
                <BookMarked className="h-4 w-4" />
                Find Books
              </Button>
            </Link>
            <Link to="/interview-prep">
              <Button>Continue Interview Prep</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
