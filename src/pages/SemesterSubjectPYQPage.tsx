import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import {
  FileText, Download, Search, X, BookMarked, GraduationCap,
  Clock, Filter, ChevronRight, Layers, Award, Zap, Activity,
  Radio, Cpu, Globe, BarChart2, Waves, Database, Triangle,
  Crosshair, Grid, TrendingUp, BookOpen, Star, ArrowRight,
  PenTool, HelpCircle
} from "lucide-react";
import { semesterPYQs } from "@/data/semesterPYQs";

// ─── Types ────────────────────────────────────────────────────────────────────
interface PaperEntry {
  year: number;
  pdf: string;
  type?: string;
  label?: string;
}

// ─── Subject catalogue (for metadata only) ────────────────────────────────────
const SUBJECT_CATALOGUE = [
  { name: "Seismic Data Acquisition", code: "GEP-401", icon: <Radio size={17} />, domain: "Seismics", level: "Advanced", levelColor: "#b45309", levelBg: "#fef3c7", description: "Field techniques, receiver arrays, source mechanisms & 2D/3D seismic survey design for land and marine environments", tags: ["Field Methods", "Survey Design", "Signal Processing"] },
  { name: "Seismic Processing & Interpretation", code: "GEP-402", icon: <Waves size={17} />, domain: "Seismics", level: "Professional", levelColor: "#991b1b", levelBg: "#fee2e2", description: "NMO correction, migration, deconvolution, attribute analysis & structural horizon mapping from seismic data", tags: ["Migration", "Attributes", "Velocity Analysis"] },
  { name: "Reservoir Geophysics", code: "GEP-403", icon: <Database size={17} />, domain: "Reservoir", level: "Professional", levelColor: "#991b1b", levelBg: "#fee2e2", description: "Rock physics, AVO analysis, time-lapse seismics & quantitative reservoir characterization methods", tags: ["AVO", "Rock Physics", "4D Seismic"] },
  { name: "Well Log Analysis", code: "GEP-404", icon: <Activity size={17} />, domain: "Petrophysics", level: "Advanced", levelColor: "#b45309", levelBg: "#fef3c7", description: "Wireline log interpretation, resistivity, porosity, permeability & lithology estimation from borehole data", tags: ["Wireline", "Porosity", "Resistivity"] },
  { name: "Formation Evaluation", code: "GEP-405", icon: <Layers size={17} />, domain: "Petrophysics", level: "Advanced", levelColor: "#b45309", levelBg: "#fef3c7", description: "Fluid saturation, lithology discrimination, MWD/LWD techniques & petrophysical modelling workflows", tags: ["Fluid Saturation", "MWD/LWD", "Lithology"] },
  { name: "Gravity & Magnetics", code: "GEP-301", icon: <Globe size={17} />, domain: "Potential Fields", level: "Intermediate", levelColor: "#1e40af", levelBg: "#dbeafe", description: "Potential field theory, Bouguer anomaly correction, magnetic anomaly interpretation & inversion methods", tags: ["Bouguer Anomaly", "Magnetic Susceptibility", "Upward Continuation"] },
  { name: "Geoelectromagnetics", code: "GEP-302", icon: <Zap size={17} />, domain: "EM Methods", level: "Advanced", levelColor: "#b45309", levelBg: "#fef3c7", description: "DC resistivity, Magnetotellurics, CSEM, Transient EM & Induced Polarization for subsurface characterization", tags: ["MT", "CSEM", "IP Method"] },
  { name: "Geophysical Inversion", code: "GEP-501", icon: <TrendingUp size={17} />, domain: "Quantitative", level: "Professional", levelColor: "#991b1b", levelBg: "#fee2e2", description: "Linear & non-linear inversion, Tikhonov regularization, Bayesian inference & uncertainty quantification", tags: ["Regularization", "Bayesian", "Optimization"] },
  { name: "AI & Machine Learning in Geophysics", code: "GEP-502", icon: <Cpu size={17} />, domain: "Computational", level: "Professional", levelColor: "#991b1b", levelBg: "#fee2e2", description: "CNNs for seismic interpretation, unsupervised geological clustering & physics-informed neural networks", tags: ["Deep Learning", "Clustering", "Neural Networks"] },
  { name: "Mathematical & Functional Analysis", code: "GEP-101", icon: <Grid size={17} />, domain: "Mathematics", level: "Core", levelColor: "#5b21b6", levelBg: "#ede9fe", description: "Fourier analysis, linear operators, Hilbert spaces, differential equations & numerical solution methods", tags: ["Fourier Transform", "Linear Algebra", "ODEs"] },
  { name: "Earthquake Seismology", code: "GEP-303", icon: <Triangle size={17} />, domain: "Seismology", level: "Advanced", levelColor: "#b45309", levelBg: "#fef3c7", description: "Source mechanisms, focal solutions, body-wave tomography, seismotectonics & seismic hazard assessment", tags: ["Focal Mechanism", "Tomography", "Hazard"] },
  { name: "Exploration Geophysics", code: "GEP-201", icon: <Crosshair size={17} />, domain: "Exploration", level: "Intermediate", levelColor: "#1e40af", levelBg: "#dbeafe", description: "Integrated exploration strategy, basin analysis, multi-method data integration & prospect evaluation techniques", tags: ["Integration", "Prospect Evaluation", "Mapping"] },
  { name: "Borehole Geophysics", code: "GEP-304", icon: <BarChart2 size={17} />, domain: "Borehole", level: "Advanced", levelColor: "#b45309", levelBg: "#fef3c7", description: "VSP surveys, cross-hole seismic tomography, acoustic, sonic & downhole measurement methods", tags: ["VSP", "Cross-hole", "Acoustic Logging"] },
  { name: "Mathematics for Geophysics", code: "GEP-102", icon: <BookOpen size={17} />, domain: "Mathematics", level: "Core", levelColor: "#5b21b6", levelBg: "#ede9fe", description: "Vector calculus, complex variable theory, probability & statistics applied to geophysical inverse problems", tags: ["Vector Calculus", "Statistics", "Complex Analysis"] },
  { name: "Physics for Earth Sciences", code: "GEP-103", icon: <Zap size={17} />, domain: "Physics", level: "Core", levelColor: "#5b21b6", levelBg: "#ede9fe", description: "Elasticity theory, seismic wave mechanics, classical electrodynamics & thermodynamics fundamentals", tags: ["Wave Mechanics", "Elasticity", "Electrodynamics"] },
  { name: "Seismological Data Analysis", code: "GEP-601", icon: <Waves size={17} />, domain: "Seismology", level: "Advanced", levelColor: "#b45309", levelBg: "#fef3c7", description: "Advanced techniques in seismological data processing, waveform analysis & interpretation", tags: ["Waveform", "Data Processing", "Analysis"] },
  { name: "Carbon Capture and Storage", code: "GEP-602", icon: <Database size={17} />, domain: "Applied", level: "Advanced", levelColor: "#b45309", levelBg: "#fef3c7", description: "Geological storage of CO2, monitoring techniques, risk assessment and geophysical methods for CCS", tags: ["CO2 Storage", "Monitoring", "Risk Assessment"] },
  { name: "Near Surface Geophysics", code: "GEP-603", icon: <Crosshair size={17} />, domain: "Applied", level: "Intermediate", levelColor: "#1e40af", levelBg: "#dbeafe", description: "Shallow subsurface investigations using seismic, EM & potential field methods for engineering & environmental applications", tags: ["Shallow Seismic", "GPR", "Environmental"] },
];

const DC: Record<string, { fg: string; bg: string; bd: string }> = {
  "Seismics":         { fg: "#92400e", bg: "#fef3c7", bd: "#fcd34d" },
  "Reservoir":        { fg: "#991b1b", bg: "#fee2e2", bd: "#fca5a5" },
  "Petrophysics":     { fg: "#155e75", bg: "#cffafe", bd: "#67e8f9" },
  "Potential Fields": { fg: "#14532d", bg: "#dcfce7", bd: "#86efac" },
  "EM Methods":       { fg: "#4c1d95", bg: "#ede9fe", bd: "#c4b5fd" },
  "Quantitative":     { fg: "#7c2d12", bg: "#ffedd5", bd: "#fdba74" },
  "Computational":    { fg: "#831843", bg: "#fce7f3", bd: "#f9a8d4" },
  "Mathematics":      { fg: "#312e81", bg: "#e0e7ff", bd: "#a5b4fc" },
  "Seismology":       { fg: "#134e4a", bg: "#ccfbf1", bd: "#5eead4" },
  "Exploration":      { fg: "#365314", bg: "#f7fee7", bd: "#bef264" },
  "Borehole":         { fg: "#581c87", bg: "#f3e8ff", bd: "#d8b4fe" },
  "Physics":          { fg: "#1e3a5f", bg: "#dbeafe", bd: "#93c5fd" },
  "Applied":          { fg: "#065f46", bg: "#d1fae5", bd: "#6ee7b7" },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Classify a paper as "mid" | "end" | "quiz"
 * Priority: explicit `type` field → filename keywords → fallback
 */
function getET(paper: PaperEntry): "mid" | "end" | "quiz" {
  const t = (paper.type ?? "").toLowerCase();
  if (t === "mid")  return "mid";
  if (t === "end")  return "end";
  if (t === "quiz") return "quiz";

  // Fallback: sniff the PDF filename / path
  const path = (paper.pdf ?? "").toLowerCase();
  if (path.includes("quiz") || path.includes("class-test") || path.includes("ct"))  return "quiz";
  if (path.includes("mid"))  return "mid";
  if (path.includes("end") || path.includes("final")) return "end";

  // Last resort: year modulo (deterministic but arbitrary)
  const m = paper.year % 3;
  return m === 0 ? "quiz" : m === 1 ? "mid" : "end";
}

function getMeta(name: string) {
  return (
    SUBJECT_CATALOGUE.find(
      s =>
        s.name.toLowerCase() === name.toLowerCase() ||
        s.name.toLowerCase().includes(name.toLowerCase().slice(0, 14)) ||
        name.toLowerCase().includes(s.name.toLowerCase().slice(0, 14))
    ) ?? {
      name,
      code: "GEP-???",
      icon: <FileText size={17} />,
      domain: "General",
      level: "Intermediate",
      levelColor: "#374151",
      levelBg: "#f3f4f6",
      description: "Comprehensive study material and previous year examination papers",
      tags: ["Theory", "Applications"],
    }
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SemesterSubjectPYQPage() {
  const { semId } = useParams<{ semId: string }>();
  const [q, setQ]     = useState("");
  const [yr, setYr]   = useState<number | null>(null);
  const [cat, setCat] = useState<"mid" | "end" | "quiz" | null>(null);
  const [exp, setExp] = useState<string | null>(null);
  const [dom, setDom] = useState<string | null>(null);

  const sem   = semId ? semesterPYQs[semId as keyof typeof semesterPYQs] : null;
  const title = sem?.title ?? `Semester ${semId?.replace("sem", "") ?? ""}`;

  // ── Only use subjects defined in the data file (no catalogue padding) ──────
  const subs = useMemo<Record<string, PaperEntry[]>>(
    () => (sem?.subjects as Record<string, PaperEntry[]>) ?? {},
    [sem]
  );

  const years = useMemo(() => {
    const y = new Set<number>();
    Object.values(subs).forEach(papers => papers.forEach(p => y.add(p.year)));
    return Array.from(y).sort((a, b) => b - a);
  }, [subs]);

  const doms = useMemo(() => {
    const d = new Set<string>();
    Object.keys(subs).forEach(s => d.add(getMeta(s).domain));
    return Array.from(d);
  }, [subs]);

  const total = useMemo(() => Object.values(subs).reduce((a, p) => a + p.length, 0), [subs]);
  const midT  = useMemo(() => Object.values(subs).reduce((a, p) => a + p.filter(x => getET(x) === "mid").length, 0), [subs]);
  const endT  = useMemo(() => Object.values(subs).reduce((a, p) => a + p.filter(x => getET(x) === "end").length, 0), [subs]);
  const quizT = useMemo(() => Object.values(subs).reduce((a, p) => a + p.filter(x => getET(x) === "quiz").length, 0), [subs]);

  // ── Filter subjects ───────────────────────────────────────────────────────
  const filtered = useMemo(
    () =>
      Object.entries(subs).filter(([s, papers]) => {
        const meta = getMeta(s);
        // Search match
        if (q && !s.toLowerCase().includes(q.toLowerCase()) &&
            !meta.domain.toLowerCase().includes(q.toLowerCase()) &&
            !meta.code.toLowerCase().includes(q.toLowerCase())) return false;
        // Year filter
        if (yr && !papers.some(x => x.year === yr)) return false;
        // Category filter — show subject if it has at least one paper of that type
        if (cat && !papers.some(x => getET(x) === cat)) return false;
        // Domain filter
        if (dom && meta.domain !== dom) return false;
        return true;
      }),
    [subs, q, yr, cat, dom]
  );

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Fira+Code:wght@400;500;600&display=swap');
        :root{
          --s50:#fafaf9;--s100:#f5f5f4;--s200:#e7e5e4;--s300:#d6d3d1;--s400:#a8a29e;
          --s500:#78716c;--s600:#57534e;--s700:#44403c;--s800:#292524;--s900:#1c1917;
          --forest:#1a3a2a;--f2:#2d5a40;--f3:#3d7a54;--f4:#5a9e72;--f5:#8cc4a0;
          --sage:#e8f4ee;--ink:#1c1917;--ink2:#44403c;--ink3:#78716c;--ink4:#a8a29e;
          --am:#d97706;--am2:#f59e0b;--blue:#1d4ed8;--b2:#3b82f6;
          --rose:#be123c;--vio:#6d28d9;--teal:#0f766e;
          --bd:#e7e5e4;--bd2:#d6d3d1;
          --sh0:0 1px 2px rgba(28,25,23,.05);
          --sh1:0 2px 8px rgba(28,25,23,.07),0 1px 3px rgba(28,25,23,.04);
          --sh2:0 6px 24px rgba(28,25,23,.09),0 2px 8px rgba(28,25,23,.05);
          --sh3:0 16px 48px rgba(28,25,23,.12),0 4px 16px rgba(28,25,23,.06);
          --r:8px;--rl:14px;--rxl:20px;--tr:190ms cubic-bezier(.4,0,.2,1);
        }
        .pg{font-family:'DM Sans',sans-serif;background:var(--s100);min-height:100vh;color:var(--ink);}
        .hero{background:var(--forest);position:relative;overflow:hidden;padding:72px 24px 80px;}
        .h-topo{position:absolute;inset:0;z-index:0;opacity:.055;
          background-image:repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,.5) 39px,rgba(255,255,255,.5) 40px),
          repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,.5) 39px,rgba(255,255,255,.5) 40px);}
        .h-slash{position:absolute;top:0;right:-60px;bottom:0;width:420px;background:linear-gradient(135deg,transparent 40%,rgba(61,122,84,.35) 100%);z-index:0;}
        .h-line{position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--am2),#f0c040 40%,var(--f4) 100%);}
        .hi{max-width:1200px;margin:0 auto;position:relative;z-index:1;}
        .hbc{display:flex;align-items:center;gap:8px;margin-bottom:36px;font-family:'Fira Code',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.32);}
        .hbca{color:rgba(255,255,255,.58);}
        .hkick{display:inline-flex;align-items:center;gap:9px;margin-bottom:20px;padding:5px 14px;border-radius:100px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);font-family:'Fira Code',monospace;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:var(--am2);}
        .hkdot{width:5px;height:5px;border-radius:50%;background:var(--am2);animation:kd 2.5s ease infinite;}
        @keyframes kd{0%,100%{opacity:1}50%{opacity:.3}}
        .htitle{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(3.2rem,7vw,6.5rem);font-weight:700;line-height:.95;letter-spacing:-.03em;color:#fff;margin:0 0 16px;}
        .htitle em{font-style:italic;font-weight:600;color:var(--am2);}
        .hsub{font-size:14px;font-weight:400;color:rgba(255,255,255,.42);line-height:1.75;max-width:520px;margin-bottom:44px;letter-spacing:.01em;}
        .hstats{display:flex;flex-wrap:wrap;gap:10px;}
        .hst{display:flex;align-items:center;gap:12px;padding:12px 18px;min-width:128px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:var(--rl);position:relative;overflow:hidden;transition:background var(--tr);}
        .hst:hover{background:rgba(255,255,255,.09);}
        .hst::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;border-radius:100px;}
        .hsa::after{background:linear-gradient(90deg,var(--am),var(--am2));}
        .hsg::after{background:linear-gradient(90deg,var(--f3),var(--f4));}
        .hsb::after{background:linear-gradient(90deg,var(--blue),var(--b2));}
        .hsr::after{background:linear-gradient(90deg,var(--rose),#f43f5e);}
        .hsv::after{background:linear-gradient(90deg,var(--vio),#8b5cf6);}
        .hst2::after{background:linear-gradient(90deg,var(--teal),#14b8a6);}
        .hsnum{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700;color:#fff;line-height:1;}
        .hslbl{font-family:'Fira Code',monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.33);margin-top:3px;}
        .main{max-width:1200px;margin:0 auto;padding:52px 24px 120px;}
        .shed{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid var(--bd);position:relative;}
        .shed::after{content:'';position:absolute;bottom:-2px;left:0;width:48px;height:2px;background:var(--forest);}
        .stl{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:600;color:var(--ink);letter-spacing:-.02em;line-height:1.1;}
        .ssl{font-size:12px;color:var(--ink4);margin-top:4px;}
        .smt{font-family:'Fira Code',monospace;font-size:10px;color:var(--ink4);letter-spacing:1px;display:flex;align-items:center;gap:6px;padding-bottom:2px;}
        .cgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:56px;}
        @media(max-width:1000px){.cgrid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:560px){.cgrid{grid-template-columns:1fr;}}
        .ccard{background:#fff;border:1.5px solid var(--bd);border-radius:var(--rxl);overflow:hidden;cursor:pointer;transition:all var(--tr);box-shadow:var(--sh1);position:relative;}
        .ccard:hover{box-shadow:var(--sh3);transform:translateY(-3px);}
        .ccard.sel{box-shadow:var(--sh3);transform:translateY(-3px);}
        .ccard.sel.cm{border-color:#3b82f6;}
        .ccard.sel.ce{border-color:var(--f3);}
        .ccard.sel.cq{border-color:var(--vio);}
        .ccard.sel.ca{border-color:var(--am);}
        .ccbar{height:4px;border-radius:20px 20px 0 0;}
        .cm .ccbar{background:linear-gradient(90deg,#1d4ed8,#3b82f6,#60a5fa);}
        .ce .ccbar{background:linear-gradient(90deg,var(--forest),var(--f3),var(--f4));}
        .cq .ccbar{background:linear-gradient(90deg,#5b21b6,#7c3aed,#8b5cf6);}
        .ca .ccbar{background:linear-gradient(90deg,#92400e,var(--am),var(--am2));}
        .ccbody{padding:22px 22px 0;}
        .ccstatus{display:inline-flex;align-items:center;gap:7px;padding:4px 12px;border-radius:100px;margin-bottom:18px;font-family:'Fira Code',monospace;font-size:9px;font-weight:600;letter-spacing:2px;text-transform:uppercase;transition:all var(--tr);}
        .cm .ccstatus{background:#dbeafe;color:#1d4ed8;}
        .ce .ccstatus{background:var(--sage);color:var(--f2);}
        .cq .ccstatus{background:#ede9fe;color:#5b21b6;}
        .ca .ccstatus{background:#fef3c7;color:#92400e;}
        .ccard.sel.cm .ccstatus{background:#1d4ed8;color:#fff;}
        .ccard.sel.ce .ccstatus{background:var(--f2);color:#fff;}
        .ccard.sel.cq .ccstatus{background:#5b21b6;color:#fff;}
        .ccard.sel.ca .ccstatus{background:#92400e;color:#fff;}
        .ccico{width:50px;height:50px;border-radius:13px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;border:1.5px solid var(--bd);transition:all var(--tr);}
        .ccico svg{width:22px;height:22px;}
        .cm .ccico{background:#eff6ff;}.cm .ccico svg{color:#2563eb;}
        .ce .ccico{background:var(--sage);}.ce .ccico svg{color:var(--f2);}
        .cq .ccico{background:#f5f3ff;}.cq .ccico svg{color:#6d28d9;}
        .ca .ccico{background:#fffbeb;}.ca .ccico svg{color:#92400e;}
        .ccard.sel .ccico{transform:scale(1.06);}
        .ccname{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;color:var(--ink);letter-spacing:-.02em;margin-bottom:7px;line-height:1.2;}
        .ccdesc{font-size:11.5px;color:var(--ink3);line-height:1.7;margin-bottom:18px;}
        .ccdiv{height:1px;background:var(--bd);}
        .ccstats{display:flex;}
        .ccst{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:13px 6px;text-align:center;border-right:1px solid var(--bd);}
        .ccst:last-child{border-right:none;}
        .ccsv{font-family:'Fira Code',monospace;font-size:15px;font-weight:600;}
        .cm .ccsv{color:#2563eb;}.ce .ccsv{color:var(--f2);}.cq .ccsv{color:#6d28d9;}.ca .ccsv{color:#92400e;}
        .ccsk{font-family:'Fira Code',monospace;font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink4);}
        .ccfoot{display:flex;align-items:center;justify-content:space-between;padding:13px 22px;border-top:1px solid var(--bd);font-size:12px;font-weight:600;color:var(--ink3);transition:color var(--tr);background:var(--s50);}
        .ccard:hover .ccfoot{color:var(--ink);}
        .ccarr{transition:transform var(--tr);}
        .ccard:hover .ccarr{transform:translateX(4px);}
        .toolbar{background:#fff;border:1.5px solid var(--bd);border-radius:var(--rl);padding:14px 18px;margin-bottom:12px;display:flex;flex-wrap:wrap;gap:12px;align-items:center;box-shadow:var(--sh0);}
        .sw{position:relative;flex:1;min-width:220px;}
        .siabs{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:var(--ink4);pointer-events:none;}
        .sinp{width:100%;padding:9px 36px 9px 38px;background:var(--s50);border:1.5px solid var(--bd);border-radius:var(--r);font-family:'DM Sans',sans-serif;font-size:13px;color:var(--ink);outline:none;transition:border-color var(--tr),box-shadow var(--tr);}
        .sinp:focus{border-color:var(--f3);box-shadow:0 0 0 3px rgba(61,122,84,.1);background:#fff;}
        .sinp::placeholder{color:var(--ink4);}
        .scl{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--ink4);display:flex;align-items:center;padding:2px;transition:color var(--tr);}
        .scl:hover{color:var(--ink);}
        .frow{display:flex;flex-wrap:wrap;gap:6px;align-items:center;}
        .flbl{font-family:'Fira Code',monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--ink4);white-space:nowrap;display:flex;align-items:center;gap:5px;}
        .chip{padding:5px 12px;border-radius:100px;border:1.5px solid var(--bd);background:var(--s50);font-family:'Fira Code',monospace;font-size:10px;font-weight:500;color:var(--ink3);cursor:pointer;transition:all var(--tr);white-space:nowrap;}
        .chip:hover{border-color:var(--f3);color:var(--forest);background:var(--sage);}
        .chip.cy{background:#fef3c7!important;border-color:#f59e0b!important;color:#92400e!important;}
        .dchip{padding:4px 10px;border-radius:100px;border:1.5px solid var(--bd);background:var(--s50);font-family:'Fira Code',monospace;font-size:9px;font-weight:600;color:var(--ink4);cursor:pointer;transition:all var(--tr);white-space:nowrap;}
        .dchip:hover{color:var(--ink3);}
        .rbar{display:flex;align-items:center;justify-content:space-between;padding:0 4px;margin-bottom:22px;font-family:'Fira Code',monospace;font-size:10px;color:var(--ink4);letter-spacing:1px;}
        .rbar strong{color:var(--f2);}
        .sgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(350px,1fr));gap:12px;}
        @media(max-width:640px){.sgrid{grid-template-columns:1fr;}}
        .sc{background:#fff;border:1.5px solid var(--bd);border-radius:var(--rl);overflow:hidden;transition:all var(--tr);box-shadow:var(--sh0);position:relative;}
        .sc:hover{box-shadow:var(--sh2);border-color:var(--bd2);transform:translateY(-1px);}
        .sc.op{border-color:var(--f3);box-shadow:var(--sh2),0 0 0 1px rgba(61,122,84,.15);}
        .scacc{height:3px;width:100%;transition:opacity var(--tr);opacity:.65;}
        .sc.op .scacc{opacity:1;}
        .schead{padding:18px 18px 0 18px;display:flex;gap:13px;align-items:flex-start;cursor:pointer;}
        .scico{width:40px;height:40px;border-radius:10px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border:1.5px solid var(--bd);}
        .scico svg{width:16px;height:16px;}
        .scinfo{flex:1;min-width:0;}
        .sccode{font-family:'Fira Code',monospace;font-size:9px;letter-spacing:2px;color:var(--ink4);text-transform:uppercase;margin-bottom:3px;}
        .scname{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:700;color:var(--ink);line-height:1.2;margin-bottom:7px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .sctags{display:flex;gap:5px;flex-wrap:wrap;align-items:center;}
        .scdt{font-family:'Fira Code',monospace;font-size:9px;font-weight:600;padding:2px 8px;border-radius:100px;text-transform:uppercase;letter-spacing:.5px;}
        .sclt{font-family:'Fira Code',monospace;font-size:9px;font-weight:600;padding:2px 8px;border-radius:100px;display:flex;align-items:center;gap:3px;}
        .scpt{font-family:'Fira Code',monospace;font-size:9px;color:var(--ink4);letter-spacing:1px;}
        .scbtn{width:28px;height:28px;border-radius:50%;flex-shrink:0;border:1.5px solid var(--bd);background:transparent;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all var(--tr);margin-top:2px;}
        .scbtn svg{width:13px;height:13px;color:var(--ink4);transition:all var(--tr);}
        .sc.op .scbtn{background:var(--sage);border-color:var(--f3);}
        .sc.op .scbtn svg{transform:rotate(90deg);color:var(--f2);}
        .scdesc{padding:10px 18px 8px 71px;font-size:11.5px;color:var(--ink3);line-height:1.65;}
        .scsks{padding:0 18px 15px 71px;display:flex;gap:5px;flex-wrap:wrap;}
        .scsk{font-size:9.5px;color:var(--ink4);padding:2px 7px;border-radius:4px;background:var(--s100);border:1px solid var(--bd);font-family:'Fira Code',monospace;}
        .ppwrap{border-top:1.5px solid var(--bd);background:var(--s50);animation:ppin .2s ease;}
        @keyframes ppin{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}
        .pprow{display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;background:var(--bd);}
        @media(max-width:520px){.pprow{grid-template-columns:1fr;}}
        .pp{background:var(--s50);padding:15px 17px;}
        .pphd{display:flex;align-items:center;justify-content:space-between;margin-bottom:11px;}
        .pplbl{display:flex;align-items:center;gap:6px;font-family:'Fira Code',monospace;font-size:9.5px;font-weight:600;letter-spacing:2px;text-transform:uppercase;}
        .ppdot{width:6px;height:6px;border-radius:50%;}
        .ppm .pplbl{color:#2563eb;}.ppe .pplbl{color:var(--f2);}.ppq .pplbl{color:#6d28d9;}
        .ppcnt{font-family:'Fira Code',monospace;font-size:9px;padding:2px 7px;border-radius:100px;}
        .ppm .ppcnt{background:#dbeafe;color:#1d4ed8;}.ppe .ppcnt{background:var(--sage);color:var(--f2);}.ppq .ppcnt{background:#ede9fe;color:#5b21b6;}
        .pppills{display:flex;flex-wrap:wrap;gap:7px;}
        .yb{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:var(--r);text-decoration:none;font-family:'Fira Code',monospace;font-size:11px;font-weight:600;color:var(--ink2);background:#fff;border:1.5px solid var(--bd);transition:all var(--tr);box-shadow:var(--sh0);}
        .yb svg{width:10px;height:10px;opacity:.5;transition:opacity var(--tr);}
        .ppm .yb:hover{border-color:#3b82f6;color:#1d4ed8;background:#eff6ff;box-shadow:0 0 0 3px rgba(59,130,246,.1);}
        .ppe .yb:hover{border-color:var(--f3);color:var(--f2);background:var(--sage);box-shadow:0 0 0 3px rgba(61,122,84,.1);}
        .ppq .yb:hover{border-color:#8b5cf6;color:#5b21b6;background:#f5f3ff;box-shadow:0 0 0 3px rgba(109,40,217,.1);}
        .yb:hover svg{opacity:1;}
        .ppempty{font-size:11px;color:var(--ink4);font-style:italic;font-family:'DM Sans',sans-serif;}
        .empty{text-align:center;padding:80px 24px;border:1.5px dashed var(--bd2);border-radius:var(--rxl);background:#fff;}
        .empty p{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:20px;color:var(--ink4);}
        .fsum{margin-top:52px;padding:28px 32px;background:#fff;border:1.5px solid var(--bd);border-radius:var(--rl);box-shadow:var(--sh1);display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;}
        .fsl{display:flex;align-items:center;gap:14px;}
        .fsico{width:48px;height:48px;border-radius:12px;background:var(--sage);border:1.5px solid var(--f5);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .fsico svg{color:var(--f2);width:20px;height:20px;}
        .fstit{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;color:var(--ink);margin-bottom:2px;}
        .fssub{font-size:12px;color:var(--ink4);}
        .fsr{display:flex;gap:24px;flex-wrap:wrap;}
        .fsn{text-align:center;}
        .fsnv{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:700;color:var(--f2);line-height:1;}
        .fsnl{font-family:'Fira Code',monospace;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink4);margin-top:3px;}
      `}</style>

      <div className="pg">
        {/* ── HERO ── */}
        <div className="hero">
          <div className="h-topo" />
          <div className="h-slash" />
          <div className="h-line" />
          <div className="hi">
            <div className="hbc">
              <GraduationCap size={11} />
              IIT (ISM) Dhanbad
              <span style={{ opacity: .35 }}>›</span>
              Applied Geophysics
              <span style={{ opacity: .35 }}>›</span>
              <span className="hbca">{title}</span>
            </div>
            <div className="hkick"><span className="hkdot" />Previous Year Question Papers</div>
            <h1 className="htitle">
              {title.split(" ").map((w, i, a) =>
                i === a.length - 1
                  ? <em key={i}>{w}</em>
                  : <span key={i}>{w}{" "}</span>
              )}
            </h1>
            <p className="hsub">
              Curated archive of mid-semester, end-semester & class quiz papers across all core Applied Geophysics subjects at IIT (ISM) Dhanbad.
            </p>
            <div className="hstats">
              {[
                { n: Object.keys(subs).length, l: "Subjects", c: "hsa", i: <BookMarked size={15} /> },
                { n: midT,  l: "Mid Sem", c: "hsb",  i: <Layers size={15} /> },
                { n: endT,  l: "End Sem", c: "hsg",  i: <Award size={15} /> },
                { n: quizT, l: "Quizzes", c: "hsv",  i: <HelpCircle size={15} /> },
                { n: total, l: "Total",   c: "hsr",  i: <FileText size={15} /> },
                { n: years[0] ?? "—", l: "Latest", c: "hst2", i: <Clock size={15} /> },
              ].map((s, i) => (
                <div key={i} className={`hst ${s.c}`}>
                  <span style={{ color: "rgba(255,255,255,.4)" }}>{s.i}</span>
                  <div>
                    <div className="hsnum">{s.n}</div>
                    <div className="hslbl">{s.l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MAIN ── */}
        <div className="main">
          {/* Section header */}
          <div className="shed">
            <div>
              <div className="stl">Examination Categories</div>
              <div className="ssl">Click a card to filter all subjects by exam type · click again to clear</div>
            </div>
            <div className="smt"><Clock size={11} />{years.length} years archived</div>
          </div>

          {/* Category cards */}
          <div className="cgrid">
            {([
              {
                id: "mid" as const, cls: "cm", status: "Mid Term", icon: <Layers />,
                name: "Mid Semester",
                desc: "First-half papers covering modules 1–3. Tests conceptual understanding, held mid-semester around Oct/Mar.",
                sv: midT, sy: years.length, ss: Object.keys(subs).length, cta: "Explore Mid Sem",
              },
              {
                id: "end" as const, cls: "ce", status: "Final Exam", icon: <Award />,
                name: "End Semester",
                desc: "Comprehensive final papers. Full syllabus coverage, higher grade weightage. Held November/April.",
                sv: endT, sy: years.length, ss: Object.keys(subs).length, cta: "Explore End Sem",
              },
              {
                id: "quiz" as const, cls: "cq", status: "Class Quiz", icon: <PenTool />,
                name: "Quiz Papers",
                desc: "Classroom assessment & surprise test papers. Short-duration, topic-specific evaluations.",
                sv: quizT, sy: years.length, ss: Object.keys(subs).length, cta: "Explore Quizzes",
              },
              {
                id: null, cls: "ca", status: "Complete", icon: <BookOpen />,
                name: "Full Archive",
                desc: "All mid-sem, end-sem & quiz papers combined in one unified filterable archive view.",
                sv: total, sy: years.length, ss: Object.keys(subs).length, cta: "Browse All",
              },
            ] as const).map(c => {
              const isSel = c.id === null ? cat === null : cat === c.id;
              const arrCol = c.cls === "cm" ? "#2563eb" : c.cls === "ce" ? "var(--f2)" : c.cls === "cq" ? "#6d28d9" : "#92400e";
              return (
                <div
                  key={c.cls}
                  className={`ccard ${c.cls}${isSel ? " sel" : ""}`}
                  onClick={() => c.id === null ? setCat(null) : setCat(cat === c.id ? null : c.id)}
                >
                  <div className="ccbar" />
                  <div className="ccbody">
                    <div className="ccstatus">{isSel ? "✓ Active" : c.status}</div>
                    <div className="ccico">{c.icon}</div>
                    <div className="ccname">{c.name}</div>
                    <div className="ccdesc">{c.desc}</div>
                  </div>
                  <div className="ccdiv" />
                  <div className="ccstats">
                    <div className="ccst"><div className="ccsv">{c.sv}+</div><div className="ccsk">Papers</div></div>
                    <div className="ccst"><div className="ccsv">{c.sy}</div><div className="ccsk">Years</div></div>
                    <div className="ccst"><div className="ccsv">{c.ss}</div><div className="ccsk">Subjects</div></div>
                  </div>
                  <div className="ccfoot">
                    <span>{c.cta}</span>
                    <ArrowRight size={14} className="ccarr" style={{ color: arrCol }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Toolbar */}
          <div className="toolbar">
            <div className="sw">
              <Search className="siabs" size={14} />
              <input
                className="sinp"
                placeholder="Search subjects by name, code, or domain…"
                value={q}
                onChange={e => setQ(e.target.value)}
              />
              {q && <button className="scl" onClick={() => setQ("")}><X size={13} /></button>}
            </div>
            {years.length > 0 && (
              <div className="frow">
                <span className="flbl"><Filter size={9} /> Year</span>
                {years.map(y => (
                  <button key={y} className={`chip${yr === y ? " cy" : ""}`} onClick={() => setYr(yr === y ? null : y)}>{y}</button>
                ))}
              </div>
            )}
            {doms.length > 0 && (
              <div className="frow">
                <span className="flbl"><Grid size={9} /> Domain</span>
                {doms.map(d => {
                  const dc = DC[d] ?? { fg: "#44403c", bg: "#f5f5f4", bd: "#d6d3d1" };
                  const isA = dom === d;
                  return (
                    <button
                      key={d}
                      className="dchip"
                      style={isA ? { background: dc.bg, borderColor: dc.bd, color: dc.fg } : {}}
                      onClick={() => setDom(dom === d ? null : d)}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="rbar">
            <span>
              Showing <strong>{filtered.length}</strong> of {Object.keys(subs).length} subjects
              {cat && <> · <strong>{cat === "mid" ? "Mid Semester" : cat === "end" ? "End Semester" : "Quiz Papers"}</strong></>}
              {yr  && <> · <strong>{yr}</strong></>}
              {dom && <> · <strong>{dom}</strong></>}
            </span>
            <span>{filtered.reduce((a, [, p]) => a + p.length, 0)} papers in view</span>
          </div>

          {/* Subject cards */}
          {filtered.length === 0 ? (
            <div className="empty"><p>No subjects match the current filters.</p></div>
          ) : (
            <div className="sgrid">
              {filtered.map(([subject, papers], idx) => {
                const meta  = getMeta(subject);
                const dc    = DC[meta.domain] ?? { fg: "#44403c", bg: "#f5f5f4", bd: "#d6d3d1" };
                const isOp  = exp === subject;

                // Filtered by year if year chip active, then sorted newest first
                const midP  = papers.filter(p => getET(p) === "mid"  && (!yr || p.year === yr)).sort((a, b) => b.year - a.year);
                const endP  = papers.filter(p => getET(p) === "end"  && (!yr || p.year === yr)).sort((a, b) => b.year - a.year);
                const qP    = papers.filter(p => getET(p) === "quiz" && (!yr || p.year === yr)).sort((a, b) => b.year - a.year);

                const sm = !cat || cat === "mid";
                const se = !cat || cat === "end";
                const sq = !cat || cat === "quiz";

                return (
                  <div key={subject} className={`sc${isOp ? " op" : ""}`}>
                    <div className="scacc" style={{ background: `linear-gradient(90deg,${dc.fg},${dc.bd})` }} />
                    <div className="schead" onClick={() => setExp(isOp ? null : subject)}>
                      <div className="scico" style={{ background: dc.bg, borderColor: dc.bd }}>
                        <span style={{ color: dc.fg }}>{meta.icon}</span>
                      </div>
                      <div className="scinfo">
                        <div className="sccode">{meta.code} · {String(idx + 1).padStart(2, "0")}</div>
                        <div className="scname">{subject}</div>
                        <div className="sctags">
                          <span className="scdt" style={{ background: dc.bg, color: dc.fg, border: `1px solid ${dc.bd}` }}>{meta.domain}</span>
                          <span className="sclt" style={{ background: meta.levelBg, color: meta.levelColor, border: `1px solid ${meta.levelColor}30` }}>
                            <Star size={8} />{meta.level}
                          </span>
                          <span className="scpt">{papers.length} paper{papers.length !== 1 ? "s" : ""}</span>
                        </div>
                      </div>
                      <button className="scbtn"><ChevronRight /></button>
                    </div>

                    <div className="scdesc">{meta.description}</div>
                    <div className="scsks">{meta.tags.map(t => <span key={t} className="scsk">{t}</span>)}</div>

                    {isOp && (
                      <div className="ppwrap">
                        <div className="pprow">
                          {sm && (
                            <div className="pp ppm">
                              <div className="pphd">
                                <div className="pplbl"><span className="ppdot" style={{ background: "#3b82f6" }} />Mid Sem</div>
                                <span className="ppcnt">{midP.length}</span>
                              </div>
                              <div className="pppills">
                                {midP.length === 0
                                  ? <span className="ppempty">No papers yet</span>
                                  : midP.map((p, i) => (
                                    <a key={`mid-${p.year}-${i}`} href={p.pdf} download className="yb">
                                      <Download size={10} />
                                      {p.label ?? p.year}
                                    </a>
                                  ))}
                              </div>
                            </div>
                          )}
                          {se && (
                            <div className="pp ppe">
                              <div className="pphd">
                                <div className="pplbl"><span className="ppdot" style={{ background: "var(--f3)" }} />End Sem</div>
                                <span className="ppcnt">{endP.length}</span>
                              </div>
                              <div className="pppills">
                                {endP.length === 0
                                  ? <span className="ppempty">No papers yet</span>
                                  : endP.map((p, i) => (
                                    <a key={`end-${p.year}-${i}`} href={p.pdf} download className="yb">
                                      <Download size={10} />
                                      {p.label ?? p.year}
                                    </a>
                                  ))}
                              </div>
                            </div>
                          )}
                          {sq && (
                            <div className="pp ppq">
                              <div className="pphd">
                                <div className="pplbl"><span className="ppdot" style={{ background: "#7c3aed" }} />Quiz</div>
                                <span className="ppcnt">{qP.length}</span>
                              </div>
                              <div className="pppills">
                                {qP.length === 0
                                  ? <span className="ppempty">No quizzes yet</span>
                                  : qP.map((p, i) => (
                                    <a key={`quiz-${p.year}-${i}`} href={p.pdf} download className="yb">
                                      <Download size={10} />
                                      {p.label ?? p.year}
                                    </a>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer */}
          <div className="fsum">
            <div className="fsl">
              <div className="fsico"><BookMarked /></div>
              <div>
                <div className="fstit">Paper Archive Summary</div>
                <div className="fssub">IIT (ISM) Dhanbad · Applied Geophysics · {title}</div>
              </div>
            </div>
            <div className="fsr">
              {[
                { n: Object.keys(subs).length, l: "Subjects" },
                { n: midT,  l: "Mid Sem" },
                { n: endT,  l: "End Sem" },
                { n: quizT, l: "Quizzes" },
              ].map(s => (
                <div key={s.l} className="fsn">
                  <div className="fsnv">{s.n}</div>
                  <div className="fsnl">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}