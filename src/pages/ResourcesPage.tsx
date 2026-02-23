import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { resources } from "@/data/resources";
import { ExternalLink, Search, X, ArrowUpRight, Database } from "lucide-react";

/* ─── Per-category color palette (light-friendly) ─── */
const PALETTE = [
  { hue: "#0066ff", rgb: "0,102,255",   soft: "#eff4ff", tag: "#dbeafe" },
  { hue: "#0891b2", rgb: "8,145,178",   soft: "#ecfeff", tag: "#cffafe" },
  { hue: "#7c3aed", rgb: "124,58,237",  soft: "#f5f3ff", tag: "#ede9fe" },
  { hue: "#059669", rgb: "5,150,105",   soft: "#ecfdf5", tag: "#d1fae5" },
  { hue: "#dc2626", rgb: "220,38,38",   soft: "#fff1f2", tag: "#ffe4e6" },
  { hue: "#d97706", rgb: "217,119,6",   soft: "#fffbeb", tag: "#fef3c7" },
  { hue: "#db2777", rgb: "219,39,119",  soft: "#fdf2f8", tag: "#fce7f3" },
  { hue: "#0d9488", rgb: "13,148,136",  soft: "#f0fdfa", tag: "#ccfbf1" },
];

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Stable color assignment */
  const colorMap = useRef<Record<string, typeof PALETTE[0]>>({});
  resources.forEach((s, i) => {
    if (!colorMap.current[s.category])
      colorMap.current[s.category] = PALETTE[i % PALETTE.length];
  });

  /* Intersection observer — staggered reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible((prev) =>
              new Set(prev).add(Number((e.target as HTMLElement).dataset.idx))
            );
          }
        }),
      { threshold: 0.07, rootMargin: "0px 0px -32px 0px" }
    );
    cardRefs.current.forEach((r) => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  const filtered = resources.filter((s) => {
    const matchesSearch =
      !search ||
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      s.description?.toLowerCase().includes(search.toLowerCase()) ||
      s.links.some((l) =>
        l.name.toLowerCase().includes(search.toLowerCase())
      );
    const matchesCat = !activeCategory || s.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const totalLinks = resources.reduce((a, s) => a + s.links.length, 0);

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Figtree:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        :root {
          --bg:       #f8f7f4;
          --bg1:      #ffffff;
          --bg2:      #f2f0ec;
          --bg3:      #eceae5;
          --ink:      #111318;
          --ink2:     #3d4250;
          --ink3:     #7a8099;
          --ink4:     #b0b6c8;
          --border:   #e2e0db;
          --border2:  #d0cec8;
          --shadow-sm: 0 1px 3px rgba(16,18,28,0.06), 0 1px 2px rgba(16,18,28,0.04);
          --shadow-md: 0 4px 16px rgba(16,18,28,0.08), 0 2px 6px rgba(16,18,28,0.05);
          --shadow-lg: 0 16px 48px rgba(16,18,28,0.12), 0 4px 14px rgba(16,18,28,0.07);
          --r: 12px;
          --r2: 16px;
          --mono: 'IBM Plex Mono', monospace;
          --serif: 'Newsreader', Georgia, serif;
          --sans: 'Figtree', sans-serif;
        }

        .rp { font-family: var(--sans); background: var(--bg); color: var(--ink); min-height: 100vh; -webkit-font-smoothing: antialiased; overflow-x: hidden; position: relative; }

        /* ── Fine linen texture ── */
        .rp::before {
          content: '';
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.018'/%3E%3C/svg%3E");
          background-size: 300px 300px;
        }

        /* ── Decorative top rule ── */
        .top-rule {
          position: fixed; top: 0; left: 0; right: 0;
          height: 3px; z-index: 200;
          background: linear-gradient(90deg, #0066ff 0%, #0891b2 35%, #7c3aed 65%, #0066ff 100%);
          background-size: 200% 100%;
          animation: ruleShift 6s linear infinite;
        }
        @keyframes ruleShift { from { background-position: 0% 50%; } to { background-position: 200% 50%; } }

        .rp-inner { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 72px 28px 120px; }

        /* ══════════ HERO ══════════ */
        .hero { margin-bottom: 68px; }

        .hero-top {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 48px;
          margin-bottom: 48px;
        }

        .hero-left { flex: 1; }

        .hero-kicker {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--mono); font-size: 10px;
          letter-spacing: 3px; text-transform: uppercase;
          color: #0066ff;
          border: 1px solid #dbeafe;
          background: #eff4ff;
          padding: 5px 14px; border-radius: 100px;
          margin-bottom: 24px;
          animation: slideIn 0.6s ease 0.1s both;
        }
        .kicker-dot { width: 6px; height: 6px; border-radius: 50%; background: #0066ff; animation: kdot 2s ease-in-out infinite; }
        @keyframes kdot { 0%,100% { opacity:1; } 50% { opacity:0.25; } }

        .hero-title {
          font-family: var(--serif);
          font-size: clamp(2.6rem, 5vw, 4.4rem);
          font-weight: 300; line-height: 1.08;
          letter-spacing: -0.03em; color: var(--ink);
          margin-bottom: 18px;
          animation: slideIn 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s both;
        }
        .hero-title strong { font-weight: 600; }
        .hero-title em {
          font-style: italic; font-weight: 300;
          background: linear-gradient(135deg, #0066ff 0%, #0891b2 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-desc {
          font-size: 16px; font-weight: 300;
          color: var(--ink2); line-height: 1.75;
          max-width: 480px;
          animation: slideIn 0.7s ease 0.25s both;
        }

        /* Hero right — stat panel */
        .hero-stats-panel {
          background: var(--bg1);
          border: 1px solid var(--border);
          border-radius: var(--r2);
          padding: 28px 32px;
          box-shadow: var(--shadow-md);
          min-width: 240px;
          animation: slideIn 0.7s ease 0.35s both;
          flex-shrink: 0;
        }

        .stat-panel-label {
          font-family: var(--mono); font-size: 9px;
          letter-spacing: 3px; text-transform: uppercase;
          color: var(--ink4); margin-bottom: 20px;
        }

        .stat-row {
          display: flex; flex-direction: column; gap: 16px;
        }

        .stat-item {
          display: flex; align-items: center;
          justify-content: space-between; gap: 16px;
        }

        .stat-item-label {
          font-size: 13px; font-weight: 400;
          color: var(--ink3); display: flex;
          align-items: center; gap: 8px;
        }

        .stat-color-dot {
          width: 8px; height: 8px; border-radius: 50%;
          flex-shrink: 0;
        }

        .stat-item-val {
          font-family: var(--serif); font-size: 22px;
          font-weight: 600; color: var(--ink);
          line-height: 1;
        }

        .stat-divider {
          height: 1px; background: var(--border);
          margin: 4px 0;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ══════════ CATEGORY PILLS ══════════ */
        .cat-pills {
          display: flex; flex-wrap: wrap; align-items: center;
          gap: 8px; margin-bottom: 28px;
          animation: slideIn 0.6s ease 0.4s both;
        }

        .cat-pills-label {
          font-family: var(--mono); font-size: 10px;
          letter-spacing: 2px; text-transform: uppercase;
          color: var(--ink4); margin-right: 4px;
        }

        .cat-pill {
          padding: 5px 14px; border-radius: 100px;
          font-family: var(--mono); font-size: 11px;
          font-weight: 500; letter-spacing: 0.3px;
          border: 1px solid var(--border);
          background: var(--bg1);
          color: var(--ink3);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cat-pill:hover { border-color: var(--border2); color: var(--ink); }
        .cat-pill.active {
          background: var(--ink); border-color: var(--ink); color: #fff;
        }
        .cat-pill.cat-clear {
          background: transparent; color: var(--ink4);
          border-color: transparent;
        }
        .cat-pill.cat-clear:hover { color: var(--ink3); border-color: var(--border); }

        /* ══════════ SEARCH BAR ══════════ */
        .search-wrap {
          position: relative;
          animation: slideIn 0.6s ease 0.45s both;
        }

        .search-field {
          width: 100%; padding: 13px 48px 13px 44px;
          background: var(--bg1);
          border: 1px solid var(--border);
          border-radius: var(--r);
          font-family: var(--sans); font-size: 14px;
          color: var(--ink); outline: none;
          box-shadow: var(--shadow-sm);
          transition: border-color 0.22s, box-shadow 0.22s;
        }
        .search-field:focus {
          border-color: #0066ff;
          box-shadow: 0 0 0 3px rgba(0,102,255,0.1), var(--shadow-sm);
        }
        .search-field::placeholder { color: var(--ink4); }

        .search-icon-l {
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%);
          color: var(--ink4); pointer-events: none;
          width: 16px; height: 16px;
        }
        .search-clear-btn {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: var(--ink4); display: flex; align-items: center;
          padding: 3px; border-radius: 4px;
          transition: color 0.2s;
        }
        .search-clear-btn:hover { color: var(--ink); }

        .search-meta {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-top: 10px; padding: 0 2px;
        }

        .search-result-count {
          font-family: var(--mono); font-size: 11px;
          color: var(--ink4); letter-spacing: 0.5px;
        }
        .search-result-count span { color: #0066ff; font-weight: 500; }

        .search-hint {
          font-family: var(--mono); font-size: 10px;
          color: var(--ink4); letter-spacing: 0.5px;
        }

        /* ══════════ GRID ══════════ */
        .res-grid {
          margin-top: 40px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 20px;
        }

        /* ══════════ CARD ══════════ */
        .res-card {
          background: var(--bg1);
          border: 1px solid var(--border);
          border-radius: var(--r2);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          position: relative;
          transition: border-color 0.25s, box-shadow 0.3s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
          opacity: 0; transform: translateY(28px);
        }
        .res-card.in {
          opacity: 1; transform: translateY(0);
        }
        .res-card:hover {
          border-color: var(--c-border, #d0cec8);
          box-shadow: var(--shadow-lg);
          transform: translateY(-5px) !important;
        }

        /* Colored left accent bar */
        .card-accent {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--c-hue, #0066ff);
          border-radius: 12px 0 0 12px;
          opacity: 0;
          transition: opacity 0.25s;
        }
        .res-card:hover .card-accent { opacity: 1; }

        /* ── Card Header ── */
        .card-head {
          padding: 26px 26px 20px;
          border-bottom: 1px solid var(--border);
        }

        .card-head-top {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .card-tag {
          font-family: var(--mono); font-size: 9px;
          letter-spacing: 2.5px; text-transform: uppercase;
          font-weight: 500;
          padding: 4px 10px; border-radius: 6px;
          border: 1px solid var(--c-tag-border, #dbeafe);
          background: var(--c-tag-bg, #eff4ff);
          color: var(--c-hue, #0066ff);
        }

        .card-count {
          display: flex; align-items: center; gap: 5px;
          font-family: var(--mono); font-size: 10px;
          color: var(--ink4); letter-spacing: 0.5px;
        }
        .card-count svg { width: 11px; height: 11px; }

        .card-title {
          font-family: var(--serif); font-size: 21px;
          font-weight: 400; color: var(--ink);
          letter-spacing: -0.02em; line-height: 1.25;
          margin-bottom: 8px;
        }

        .card-desc {
          font-size: 13px; font-weight: 300;
          color: var(--ink3); line-height: 1.65;
        }

        /* ── Links ── */
        .links-wrap { padding: 16px 20px 22px; }

        .links-label {
          font-family: var(--mono); font-size: 9px;
          letter-spacing: 2.5px; text-transform: uppercase;
          color: var(--ink4); margin-bottom: 10px;
          padding: 0 6px;
        }

        .link-row {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 10px;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.18s ease;
          position: relative;
          overflow: hidden;
        }
        .link-row::before {
          content: '';
          position: absolute; inset: 0;
          background: var(--c-soft, #eff4ff);
          opacity: 0; transition: opacity 0.18s;
          border-radius: 8px;
        }
        .link-row:hover::before { opacity: 1; }

        .link-num {
          font-family: var(--mono); font-size: 10px;
          color: var(--ink4); min-width: 16px;
          position: relative; z-index: 1;
          transition: color 0.18s;
        }
        .link-row:hover .link-num { color: var(--c-hue, #0066ff); }

        .link-text {
          flex: 1; font-size: 13px; font-weight: 400;
          color: var(--ink2);
          position: relative; z-index: 1;
          transition: color 0.18s;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .link-row:hover .link-text { color: var(--ink); }

        .link-ext {
          opacity: 0; transform: translate(-4px, 4px);
          transition: all 0.18s ease;
          position: relative; z-index: 1;
          flex-shrink: 0;
        }
        .link-ext svg {
          width: 13px; height: 13px;
          color: var(--c-hue, #0066ff);
        }
        .link-row:hover .link-ext {
          opacity: 1; transform: translate(0, 0);
        }

        /* ══════════ EMPTY STATE ══════════ */
        .empty {
          grid-column: 1 / -1;
          text-align: center; padding: 80px 24px;
          border: 1px dashed var(--border2);
          border-radius: var(--r2);
          background: var(--bg1);
        }
        .empty-title {
          font-family: var(--serif); font-style: italic;
          font-size: 20px; color: var(--ink3); margin-bottom: 8px;
        }
        .empty-sub { font-size: 13px; color: var(--ink4); }

        /* ══════════ FOOTER STRIP ══════════ */
        .footer-strip {
          margin-top: 64px; padding: 28px 32px;
          background: var(--bg1);
          border: 1px solid var(--border);
          border-radius: var(--r2);
          box-shadow: var(--shadow-sm);
          display: flex; align-items: center;
          justify-content: space-between; gap: 24px;
          flex-wrap: wrap;
        }
        .footer-strip-left { display: flex; align-items: center; gap: 14px; }
        .footer-strip-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: #eff4ff; border: 1px solid #dbeafe;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .footer-strip-icon svg { width: 18px; height: 18px; color: #0066ff; }
        .footer-strip-title { font-size: 14px; font-weight: 600; color: var(--ink); margin-bottom: 2px; }
        .footer-strip-sub { font-size: 12px; color: var(--ink3); }
        .footer-strip-badges { display: flex; gap: 8px; flex-wrap: wrap; }
        .footer-bdg {
          font-family: var(--mono); font-size: 10px;
          padding: 4px 12px; border-radius: 6px;
          border: 1px solid var(--border);
          color: var(--ink3); background: var(--bg2);
        }

        @media (max-width: 768px) {
          .hero-top { flex-direction: column; }
          .hero-stats-panel { width: 100%; }
          .res-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="rp">
        <div className="top-rule" />

        <div className="rp-inner">

          {/* ══ HERO ══ */}
          <div className="hero">
            <div className="hero-top">
              <div className="hero-left">
                <div className="hero-kicker">
                  <span className="kicker-dot" />
                  Open Data Repository
                </div>

                <h1 className="hero-title">
                  Geophysics <em>Data</em><br />
                  <strong>Resources</strong>
                </h1>

                <p className="hero-desc">
                  Curated open datasets, tools, and portals for seismic
                  analysis, well logs, and Earth sciences research —
                  all vetted for academic and professional use.
                </p>
              </div>

              {/* Stats panel */}
              <div className="hero-stats-panel">
                <div className="stat-panel-label">Repository Overview</div>
                <div className="stat-row">
                  <div className="stat-item">
                    <div className="stat-item-label">
                      <span className="stat-color-dot" style={{ background: "#0066ff" }} />
                      Categories
                    </div>
                    <div className="stat-item-val">{resources.length}</div>
                  </div>
                  <div className="stat-divider" />
                  <div className="stat-item">
                    <div className="stat-item-label">
                      <span className="stat-color-dot" style={{ background: "#0891b2" }} />
                      Total Resources
                    </div>
                    <div className="stat-item-val">{totalLinks}</div>
                  </div>
                  <div className="stat-divider" />
                  <div className="stat-item">
                    <div className="stat-item-label">
                      <span className="stat-color-dot" style={{ background: "#059669" }} />
                      Access Type
                    </div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "#059669", fontWeight: 600, letterSpacing: "0.5px" }}>FREE</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category pills */}
            <div className="cat-pills">
              <span className="cat-pills-label">Filter</span>
              {activeCategory && (
                <button
                  className="cat-pill cat-clear"
                  onClick={() => setActiveCategory(null)}
                >
                  ✕ Clear
                </button>
              )}
              {resources.map((s) => {
                const c = colorMap.current[s.category];
                return (
                  <button
                    key={s.category}
                    className={`cat-pill${activeCategory === s.category ? " active" : ""}`}
                    onClick={() =>
                      setActiveCategory(
                        activeCategory === s.category ? null : s.category
                      )
                    }
                    style={
                      activeCategory === s.category
                        ? { background: c.hue, borderColor: c.hue }
                        : {}
                    }
                  >
                    {s.category.split(" ")[0]}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="search-wrap">
              <Search className="search-icon-l" />
              <input
                className="search-field"
                placeholder="Search datasets, tools, categories…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  className="search-clear-btn"
                  onClick={() => setSearch("")}
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="search-meta">
              <span className="search-result-count">
                Showing <span>{filtered.length}</span> of {resources.length} categories
                {filtered.length < resources.length && " · filtered"}
              </span>
              <span className="search-hint">↑ click category pill to filter</span>
            </div>
          </div>

          {/* ══ GRID ══ */}
          <div className="res-grid">
            {filtered.length === 0 ? (
              <div className="empty">
                <div className="empty-title">No resources match your search.</div>
                <div className="empty-sub">Try different keywords or clear the filter.</div>
              </div>
            ) : (
              filtered.map((section, idx) => {
                const c = colorMap.current[section.category] || PALETTE[0];
                const isIn = visible.has(idx);

                return (
                  <div
                    key={section.category}
                    ref={(el) => (cardRefs.current[idx] = el)}
                    data-idx={idx}
                    className={`res-card${isIn ? " in" : ""}`}
                    style={{
                      ["--c-hue" as string]: c.hue,
                      ["--c-rgb" as string]: c.rgb,
                      ["--c-soft" as string]: c.soft,
                      ["--c-tag-bg" as string]: c.tag,
                      ["--c-tag-border" as string]: c.soft,
                      ["--c-border" as string]: `rgba(${c.rgb},0.3)`,
                      transitionDelay: isIn
                        ? `${(idx % 3) * 0.08}s`
                        : "0s",
                      transition: isIn
                        ? `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${(idx % 3) * 0.08}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${(idx % 3) * 0.08}s, border-color 0.25s, box-shadow 0.3s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)`
                        : "opacity 0.6s, transform 0.6s, border-color 0.25s, box-shadow 0.3s",
                    } as React.CSSProperties}
                  >
                    <div className="card-accent" />

                    {/* Header */}
                    <div className="card-head">
                      <div className="card-head-top">
                        <span className="card-tag">
                          {section.category.split(" ")[0]}
                        </span>
                        <span className="card-count">
                          <Database size={11} />
                          {section.links.length} resource{section.links.length !== 1 ? "s" : ""}
                        </span>
                      </div>

                      <h2 className="card-title">{section.category}</h2>

                      {section.description && (
                        <p className="card-desc">{section.description}</p>
                      )}
                    </div>

                    {/* Links */}
                    <div className="links-wrap">
                      <div className="links-label">Available Links</div>
                      {section.links.map((link, li) => (
                        <a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-row"
                        >
                          <span className="link-num">
                            {String(li + 1).padStart(2, "0")}
                          </span>
                          <span className="link-text">{link.name}</span>
                          <span className="link-ext">
                            <ArrowUpRight />
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* ══ FOOTER STRIP ══ */}
          <div className="footer-strip">
            <div className="footer-strip-left">
              <div className="footer-strip-icon">
                <Database />
              </div>
              <div>
                <div className="footer-strip-title">
                  All resources are openly accessible
                </div>
                <div className="footer-strip-sub">
                  Verified datasets for academic and research use
                </div>
              </div>
            </div>
            <div className="footer-strip-badges">
              <span className="footer-bdg">Open Access</span>
              <span className="footer-bdg">Peer Reviewed</span>
              <span className="footer-bdg">Research Grade</span>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}