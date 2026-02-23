import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import {
  FileText, Download, ChevronDown, Search, X,
  BookMarked, GraduationCap, Clock, Filter, CheckCircle2
} from "lucide-react";
import { semesterPYQs } from "@/data/semesterPYQs";

export default function SemesterSubjectPYQPage() {
  const { semId } = useParams<{ semId: string }>();
  const [openSubjects, setOpenSubjects] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [downloaded, setDownloaded] = useState<Set<string>>(new Set());

  const semester = semId ? semesterPYQs[semId as keyof typeof semesterPYQs] : null;

  const allYears = useMemo(() => {
    if (!semester) return [];
    const years = new Set<number>();
    Object.values(semester.subjects).forEach(papers =>
      papers.forEach(p => years.add(p.year))
    );
    return Array.from(years).sort((a, b) => b - a);
  }, [semester]);

  const filteredSubjects = useMemo(() => {
    if (!semester) return [];
    return Object.entries(semester.subjects).filter(([subject, papers]) => {
      const matchesSearch = subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesYear = !selectedYear || papers.some(p => p.year === selectedYear);
      return matchesSearch && matchesYear;
    });
  }, [semester, searchQuery, selectedYear]);

  const totalPapers = useMemo(() =>
    semester ? Object.values(semester.subjects).reduce((a, p) => a + p.length, 0) : 0,
    [semester]
  );

  const toggleSubject = (subject: string) => {
    setOpenSubjects(prev => {
      const next = new Set(prev);
      next.has(subject) ? next.delete(subject) : next.add(subject);
      return next;
    });
  };

  const expandAll = () => setOpenSubjects(new Set(filteredSubjects.map(([s]) => s)));
  const collapseAll = () => setOpenSubjects(new Set());

  const markDownloaded = (key: string) => {
    setDownloaded(prev => new Set(prev).add(key));
  };

  if (!semester) {
    return (
      <Layout>
        <div style={{ padding: "80px 24px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.4rem", color: "#2d4a3e" }}>
            Semester not found.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@300;400;500;600&family=Fira+Code:wght@400;500&display=swap');

        /* ─── TOKENS ─────────────────────────────────── */
        :root {
          --bg:         #f2f4f0;
          --surface:    #ffffff;
          --surface2:   #f7f8f6;
          --ink:        #1a2e25;
          --ink2:       #3b5247;
          --ink3:       #6b8278;
          --pine:       #1e4035;
          --pine2:      #2a5a4a;
          --pine3:      #3d7a64;
          --moss:       #5a8a6e;
          --sage:       #8ab89a;
          --sage2:      #b8d4c4;
          --cream:      #f5f3ed;
          --border:     #d4ddd8;
          --border2:    #c0cdc6;
          --accent:     #1e4035;
          --gold:       #c8922a;
          --gold2:      #e8b84a;
          --red:        #c0392b;
          --shadow-sm:  0 1px 3px rgba(26,46,37,0.08), 0 1px 2px rgba(26,46,37,0.05);
          --shadow-md:  0 4px 16px rgba(26,46,37,0.10), 0 2px 6px rgba(26,46,37,0.06);
          --shadow-lg:  0 12px 40px rgba(26,46,37,0.14), 0 4px 12px rgba(26,46,37,0.08);
          --radius:     8px;
          --radius-lg:  12px;
          --transition: 220ms cubic-bezier(0.4,0,0.2,1);
        }

        /* ─── BASE ───────────────────────────────────── */
        .pg {
          font-family: 'Source Sans 3', 'Helvetica Neue', sans-serif;
          background: var(--bg);
          min-height: 100vh;
          color: var(--ink);
        }

        /* ─── HERO ───────────────────────────────────── */
        .hero {
          background: var(--pine);
          background-image:
            linear-gradient(135deg, #0f2a20 0%, #1e4035 45%, #2a5a4a 100%);
          padding: 64px 24px 80px;
          position: relative;
          overflow: hidden;
        }

        /* Halftone dot texture */
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 24px 24px;
          pointer-events: none;
        }

        /* Diagonal rule accent */
        .hero::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--gold), var(--gold2), var(--gold));
        }

        .hero-inner {
          max-width: 920px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .hero-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 32px;
          font-family: 'Fira Code', monospace;
          font-size: 11px;
          color: var(--sage);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hero-breadcrumb span { opacity: 0.5; }

        .hero-title-wrap { margin-bottom: 36px; }

        .hero-label {
          font-family: 'Fira Code', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold2);
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .hero-label::before {
          content: '';
          display: inline-block;
          width: 20px; height: 1px;
          background: var(--gold2);
        }

        .hero-title {
          font-family: 'Libre Baskerville', Georgia, serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin: 0 0 12px;
        }

        .hero-title em {
          font-style: italic;
          color: var(--gold2);
        }

        .hero-sub {
          font-size: 15px;
          font-weight: 300;
          color: var(--sage);
          letter-spacing: 0.02em;
        }

        /* Stats chips */
        .hero-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 36px;
        }

        .stat-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--radius);
          backdrop-filter: blur(4px);
        }

        .stat-chip-icon { color: var(--gold2); flex-shrink: 0; }

        .stat-chip-text { line-height: 1.25; }

        .stat-chip-num {
          font-family: 'Libre Baskerville', serif;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
        }

        .stat-chip-lbl {
          font-family: 'Fira Code', monospace;
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--sage2);
        }

        /* ─── MAIN CONTENT ───────────────────────────── */
        .main-wrap {
          max-width: 920px;
          margin: 0 auto;
          padding: 40px 24px 100px;
        }

        /* ─── TOOLBAR ────────────────────────────────── */
        .toolbar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
          padding: 16px 20px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
        }

        .search-wrap {
          position: relative;
          flex: 1;
          min-width: 200px;
        }

        .search-icon {
          position: absolute;
          left: 12px; top: 50%;
          transform: translateY(-50%);
          color: var(--ink3);
          pointer-events: none;
          width: 15px; height: 15px;
        }

        .search-input {
          width: 100%;
          padding: 9px 36px 9px 36px;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          font-family: 'Source Sans 3', sans-serif;
          font-size: 14px;
          color: var(--ink);
          background: var(--surface2);
          outline: none;
          transition: border-color var(--transition), box-shadow var(--transition);
        }

        .search-input:focus {
          border-color: var(--pine3);
          box-shadow: 0 0 0 3px rgba(61,122,100,0.12);
          background: var(--surface);
        }

        .search-input::placeholder { color: var(--ink3); }

        .search-clear {
          position: absolute;
          right: 10px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none;
          cursor: pointer;
          color: var(--ink3);
          display: flex; align-items: center;
          padding: 2px;
          border-radius: 4px;
          transition: color var(--transition);
        }
        .search-clear:hover { color: var(--ink); }
        .search-clear svg { width: 14px; height: 14px; }

        /* Year filter */
        .filter-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Fira Code', monospace;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--ink3);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .filter-label svg { width: 13px; height: 13px; }

        .year-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          align-items: center;
        }

        .year-chip {
          padding: 5px 12px;
          border-radius: 100px;
          border: 1px solid var(--border);
          background: var(--surface2);
          font-family: 'Fira Code', monospace;
          font-size: 11px;
          font-weight: 500;
          color: var(--ink2);
          cursor: pointer;
          transition: all var(--transition);
          white-space: nowrap;
        }

        .year-chip:hover {
          border-color: var(--pine3);
          color: var(--pine);
          background: rgba(61,122,100,0.06);
        }

        .year-chip.active {
          background: var(--pine);
          border-color: var(--pine);
          color: #fff;
        }

        /* Expand / Collapse */
        .toolbar-actions {
          display: flex;
          gap: 8px;
          margin-left: auto;
          flex-shrink: 0;
        }

        .action-btn {
          padding: 6px 14px;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          background: transparent;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: var(--ink2);
          cursor: pointer;
          transition: all var(--transition);
          white-space: nowrap;
        }

        .action-btn:hover {
          border-color: var(--pine3);
          color: var(--pine);
          background: rgba(61,122,100,0.05);
        }

        /* Results count */
        .results-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          padding: 0 4px;
        }

        .results-count {
          font-family: 'Fira Code', monospace;
          font-size: 11px;
          letter-spacing: 1px;
          color: var(--ink3);
        }

        .results-count strong { color: var(--pine3); }

        /* No results */
        .no-results {
          text-align: center;
          padding: 60px 24px;
          background: var(--surface);
          border: 1px dashed var(--border2);
          border-radius: var(--radius-lg);
        }
        .no-results p {
          font-family: 'Libre Baskerville', serif;
          font-style: italic;
          color: var(--ink3);
          font-size: 17px;
        }

        /* ─── SUBJECT CARD ───────────────────────────── */
        .subject-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          margin-bottom: 10px;
          box-shadow: var(--shadow-sm);
          overflow: hidden;
          transition: box-shadow var(--transition), border-color var(--transition);
          position: relative;
        }

        .subject-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: var(--border);
          transition: background var(--transition);
          border-radius: 12px 0 0 12px;
        }

        .subject-card.open {
          box-shadow: var(--shadow-md);
          border-color: var(--sage2);
        }

        .subject-card.open::before {
          background: linear-gradient(180deg, var(--pine3), var(--moss));
        }

        .subject-header {
          display: flex;
          align-items: center;
          padding: 18px 20px 18px 24px;
          cursor: pointer;
          user-select: none;
          gap: 16px;
          transition: background var(--transition);
        }

        .subject-header:hover { background: var(--surface2); }

        .subject-index {
          font-family: 'Fira Code', monospace;
          font-size: 10px;
          font-weight: 500;
          color: var(--ink3);
          min-width: 24px;
          flex-shrink: 0;
          letter-spacing: 1px;
        }

        .subject-icon {
          width: 36px; height: 36px;
          border-radius: var(--radius);
          background: var(--surface2);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all var(--transition);
        }
        .subject-icon svg { width: 16px; height: 16px; color: var(--ink3); transition: color var(--transition); }
        .subject-card.open .subject-icon {
          background: rgba(30,64,53,0.08);
          border-color: rgba(61,122,100,0.3);
        }
        .subject-card.open .subject-icon svg { color: var(--pine3); }

        .subject-info { flex: 1; min-width: 0; }

        .subject-name {
          font-family: 'Libre Baskerville', Georgia, serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: -0.01em;
          line-height: 1.3;
          margin-bottom: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .subject-meta {
          font-family: 'Fira Code', monospace;
          font-size: 10px;
          color: var(--ink3);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .subject-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .papers-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          background: rgba(30,64,53,0.06);
          border: 1px solid rgba(61,122,100,0.2);
          border-radius: 100px;
          font-family: 'Fira Code', monospace;
          font-size: 10px;
          font-weight: 500;
          color: var(--pine3);
          white-space: nowrap;
        }
        .papers-badge svg { width: 11px; height: 11px; }

        .chevron-icon {
          width: 30px; height: 30px;
          border-radius: 50%;
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          transition: all var(--transition);
          flex-shrink: 0;
          background: transparent;
        }
        .chevron-icon svg { width: 14px; height: 14px; color: var(--ink3); transition: transform var(--transition); }
        .subject-card.open .chevron-icon {
          background: rgba(30,64,53,0.08);
          border-color: rgba(61,122,100,0.3);
        }
        .subject-card.open .chevron-icon svg {
          transform: rotate(180deg);
          color: var(--pine3);
        }

        /* ─── PAPERS PANEL ───────────────────────────── */
        .papers-panel {
          border-top: 1px solid var(--border);
          background: var(--surface2);
          animation: panelIn 0.24s ease;
        }

        @keyframes panelIn {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .papers-panel-inner { padding: 20px 24px 24px 24px; }

        .papers-section-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          font-family: 'Fira Code', monospace;
          font-size: 10px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--ink3);
        }
        .papers-section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .papers-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        /* ─── PAPER CARD ─────────────────────────────── */
        .paper-card {
          display: flex;
          align-items: stretch;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          transition: all var(--transition);
          min-width: 160px;
        }

        .paper-card:hover {
          border-color: var(--pine3);
          box-shadow: 0 4px 16px rgba(30,64,53,0.1);
          transform: translateY(-1px);
        }

        .paper-card.done {
          border-color: rgba(61,122,100,0.35);
          background: rgba(61,122,100,0.04);
        }

        .paper-year-block {
          padding: 14px 16px;
          background: var(--pine);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 72px;
          position: relative;
        }

        .paper-card.done .paper-year-block { background: var(--pine3); }

        .paper-year-num {
          font-family: 'Libre Baskerville', serif;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .paper-year-tag {
          font-family: 'Fira Code', monospace;
          font-size: 8px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--sage2);
          margin-top: 2px;
        }

        .paper-action {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 16px;
          gap: 0;
          flex-direction: column;
        }

        .paper-dl-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          padding: 6px 12px;
          border-radius: 6px;
          background: rgba(30,64,53,0.06);
          border: 1px solid rgba(61,122,100,0.2);
          font-family: 'Source Sans 3', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: var(--pine);
          transition: all var(--transition);
          letter-spacing: 0.01em;
        }

        .paper-dl-btn:hover {
          background: var(--pine);
          border-color: var(--pine);
          color: #fff;
        }

        .paper-dl-btn svg { width: 13px; height: 13px; flex-shrink: 0; }

        .paper-done-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: 'Fira Code', monospace;
          font-size: 9px;
          letter-spacing: 1px;
          color: var(--pine3);
          margin-top: 4px;
          text-transform: uppercase;
        }
        .paper-done-badge svg { width: 11px; height: 11px; }

        /* ─── EMPTY STATE ────────────────────────────── */
        .empty-papers {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px;
          background: var(--cream);
          border: 1px dashed var(--border2);
          border-radius: var(--radius);
          font-family: 'Libre Baskerville', serif;
          font-style: italic;
          color: var(--ink3);
          font-size: 14px;
        }
        .empty-papers svg { width: 16px; height: 16px; opacity: 0.5; flex-shrink: 0; }

        /* ─── BOTTOM PROGRESS ────────────────────────── */
        .progress-footer {
          margin-top: 48px;
          padding: 24px 28px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
        }

        .progress-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .progress-label {
          font-family: 'Fira Code', monospace;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--ink3);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .progress-label svg { width: 13px; height: 13px; color: var(--pine3); }

        .progress-count {
          font-family: 'Libre Baskerville', serif;
          font-size: 14px;
          font-weight: 700;
          color: var(--pine);
        }

        .progress-track {
          height: 6px;
          background: var(--border);
          border-radius: 100px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--pine3), var(--moss));
          border-radius: 100px;
          transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>

      <div className="pg">
        {/* ── Hero ── */}
        <div className="hero">
          <div className="hero-inner">
            <div className="hero-breadcrumb">
              <GraduationCap size={13} />
              IIT (ISM) Dhanbad
              <span>›</span>
              Applied Geophysics
              <span>›</span>
              {semester.title}
            </div>

            <div className="hero-title-wrap">
              <div className="hero-label">Previous Year Questions</div>
              <h1 className="hero-title">
                {(() => {
                  const words = semester.title.split(" ");
                  return words.map((w, i) =>
                    i === words.length - 1
                      ? <em key={i}>{w}</em>
                      : <span key={i}>{w} </span>
                  );
                })()}
              </h1>
              <p className="hero-sub">Archived question papers for academic reference</p>
            </div>

            <div className="hero-stats">
              <div className="stat-chip">
                <BookMarked size={16} className="stat-chip-icon" />
                <div className="stat-chip-text">
                  <div className="stat-chip-num">{Object.keys(semester.subjects).length}</div>
                  <div className="stat-chip-lbl">Subjects</div>
                </div>
              </div>
              <div className="stat-chip">
                <FileText size={16} className="stat-chip-icon" />
                <div className="stat-chip-text">
                  <div className="stat-chip-num">{totalPapers}</div>
                  <div className="stat-chip-lbl">Papers</div>
                </div>
              </div>
              <div className="stat-chip">
                <Clock size={16} className="stat-chip-icon" />
                <div className="stat-chip-text">
                  <div className="stat-chip-num">{allYears[0] ?? "—"}</div>
                  <div className="stat-chip-lbl">Latest</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main ── */}
        <div className="main-wrap">

          {/* Toolbar */}
          <div className="toolbar">
            {/* Search */}
            <div className="search-wrap">
              <Search className="search-icon" />
              <input
                className="search-input"
                placeholder="Search subjects…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="search-clear" onClick={() => setSearchQuery("")}>
                  <X />
                </button>
              )}
            </div>

            {/* Year filter */}
            {allYears.length > 0 && (
              <>
                <div className="filter-label">
                  <Filter size={13} />
                  Year
                </div>
                <div className="year-chips">
                  {allYears.map(yr => (
                    <button
                      key={yr}
                      className={`year-chip${selectedYear === yr ? " active" : ""}`}
                      onClick={() => setSelectedYear(selectedYear === yr ? null : yr)}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Expand / Collapse */}
            <div className="toolbar-actions">
              <button className="action-btn" onClick={expandAll}>Expand all</button>
              <button className="action-btn" onClick={collapseAll}>Collapse</button>
            </div>
          </div>

          {/* Results bar */}
          <div className="results-bar">
            <span className="results-count">
              Showing <strong>{filteredSubjects.length}</strong> of{" "}
              {Object.keys(semester.subjects).length} subjects
              {selectedYear && <> · filtered by <strong>{selectedYear}</strong></>}
            </span>
          </div>

          {/* Subject list */}
          {filteredSubjects.length === 0 ? (
            <div className="no-results">
              <p>No subjects match your search.</p>
            </div>
          ) : (
            filteredSubjects.map(([subject, papers], idx) => {
              const isOpen = openSubjects.has(subject);
              const sorted = [...papers].sort((a, b) => b.year - a.year);
              const filtered = selectedYear
                ? sorted.filter(p => p.year === selectedYear)
                : sorted;

              return (
                <div
                  key={subject}
                  className={`subject-card${isOpen ? " open" : ""}`}
                >
                  <div
                    className="subject-header"
                    onClick={() => toggleSubject(subject)}
                    role="button"
                    aria-expanded={isOpen}
                  >
                    <span className="subject-index">{String(idx + 1).padStart(2, "0")}</span>

                    <div className="subject-icon">
                      <FileText />
                    </div>

                    <div className="subject-info">
                      <div className="subject-name">{subject}</div>
                      <div className="subject-meta">
                        {papers.length} paper{papers.length !== 1 ? "s" : ""}
                        {papers.length > 0 && ` · ${sorted[sorted.length - 1].year}–${sorted[0].year}`}
                      </div>
                    </div>

                    <div className="subject-right">
                      <span className="papers-badge">
                        <BookMarked />
                        {papers.length}
                      </span>
                      <div className="chevron-icon">
                        <ChevronDown />
                      </div>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="papers-panel">
                      <div className="papers-panel-inner">
                        <div className="papers-section-label">Available Papers</div>

                        {filtered.length === 0 ? (
                          <div className="empty-papers">
                            <Clock />
                            No papers for {selectedYear} yet.
                          </div>
                        ) : papers.length === 0 ? (
                          <div className="empty-papers">
                            <Clock />
                            Papers will be added soon.
                          </div>
                        ) : (
                          <div className="papers-grid">
                            {filtered.map(paper => {
                              const key = `${subject}-${paper.year}`;
                              const isDone = downloaded.has(key);
                              return (
                                <div key={paper.year} className={`paper-card${isDone ? " done" : ""}`}>
                                  <div className="paper-year-block">
                                    <div className="paper-year-num">{paper.year}</div>
                                    <div className="paper-year-tag">Exam</div>
                                  </div>
                                  <div className="paper-action">
                                    <a
                                      href={paper.pdf}
                                      download
                                      className="paper-dl-btn"
                                      onClick={() => markDownloaded(key)}
                                    >
                                      <Download />
                                      Download PDF
                                    </a>
                                    {isDone && (
                                      <div className="paper-done-badge">
                                        <CheckCircle2 />
                                        Downloaded
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}

          {/* Download progress footer */}
          {totalPapers > 0 && (
            <div className="progress-footer">
              <div className="progress-header">
                <div className="progress-label">
                  <Download size={13} />
                  Download Progress
                </div>
                <div className="progress-count">
                  {downloaded.size} / {totalPapers} papers
                </div>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${(downloaded.size / totalPapers) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}