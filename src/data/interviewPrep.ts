export interface InterviewCompanyPrep {
  slug: string;
  name: string;
  segment: string;
  hiringFocus: string[];
  strategy: string[];
  questions: {
    technical: string[];
    hr: string[];
    caseStudy: string[];
  };
}

export const interviewPrepCompanies: InterviewCompanyPrep[] = [
  {
    slug: "reliance",
    name: "Reliance Industries",
    segment: "Integrated Energy",
    hiringFocus: ["Production geophysics", "Subsurface integration", "Asset economics"],
    strategy: [
      "Prepare one integrated basin story: seismic + well logs + petrophysics + development recommendation.",
      "Practice writing short investment-minded conclusions with uncertainty range and upside/downside.",
      "Revise seismic attributes, inversion basics, AVO interpretation, and how they impact drilling decisions.",
    ],
    questions: {
      technical: [
        "How do you differentiate lithology and fluid effects in an AVO crossplot?",
        "What quality-control checks do you run before structural interpretation on 3D seismic?",
        "How would you integrate pressure data with seismic interpretation to de-risk a prospect?",
      ],
      hr: [
        "Describe a time you handled conflicting interpretations within a team.",
        "Why Reliance for a long-term upstream geoscience career?",
      ],
      caseStudy: [
        "You have amplitude anomalies and one dry offset well. Do you recommend drilling? Explain with risks and mitigation.",
      ],
    },
  },
  {
    slug: "exxonmobil",
    name: "ExxonMobil",
    segment: "Global Upstream",
    hiringFocus: ["Technical depth", "Global collaboration", "Structured problem solving"],
    strategy: [
      "Build strong fundamentals in wave propagation, seismic processing steps, and uncertainty quantification.",
      "Prepare for whiteboard-style explanations with assumptions, equations, and decision logic.",
      "Practice concise communication for cross-functional teams in geology, drilling, and reservoir engineering.",
    ],
    questions: {
      technical: [
        "Explain migration in simple terms and list what can go wrong with velocity errors.",
        "How would you validate a structural closure before moving to volumetrics?",
        "What is the tradeoff between model complexity and interpretability in inversion workflows?",
      ],
      hr: [
        "Tell us about a technically difficult project and your ownership in it.",
        "How do you work with teams in different time zones and disciplines?",
      ],
      caseStudy: [
        "Given sparse seismic coverage in frontier acreage, design a phased exploration program with budget constraints.",
      ],
    },
  },
  {
    slug: "bp",
    name: "BP",
    segment: "Integrated Energy & Transition",
    hiringFocus: ["Subsurface characterization", "Digital workflows", "Energy transition awareness"],
    strategy: [
      "Prepare examples where you used automation, scripting, or ML in geophysical interpretation.",
      "Revise seismic-to-static model handoff and uncertainty communication to non-geophysicists.",
      "Include one decarbonization angle such as CCS site screening or monitoring concepts.",
    ],
    questions: {
      technical: [
        "How do you assess seal integrity from geophysical data?",
        "What makes a CCS storage candidate viable from a geoscience perspective?",
        "How do you compare deterministic and probabilistic volumetric estimates?",
      ],
      hr: [
        "What does safe and ethical decision-making mean in subsurface projects?",
        "How do you prioritize when multiple tasks are urgent?",
      ],
      caseStudy: [
        "You must rank three prospects with different geological risk profiles. Present a screening framework.",
      ],
    },
  },
  {
    slug: "chevron",
    name: "Chevron",
    segment: "Exploration & Development",
    hiringFocus: ["Exploration screening", "Operational readiness", "Technical communication"],
    strategy: [
      "Practice prospect risking using source-reservoir-seal-trap framework with probabilities.",
      "Prepare one example of converting technical ambiguity into actionable recommendations.",
      "Revise depth conversion pitfalls and their impact on well location decisions.",
    ],
    questions: {
      technical: [
        "How do you construct and validate a depth model in structurally complex areas?",
        "What indicators suggest processing artifacts versus genuine geologic features?",
        "How would you integrate gravity/magnetics where seismic quality is poor?",
      ],
      hr: [
        "Tell us about receiving critical feedback and how you responded.",
        "How do you explain technical decisions to non-technical stakeholders?",
      ],
      caseStudy: [
        "A lead looks attractive structurally but has weak reservoir evidence. What is your recommendation and why?",
      ],
    },
  },
  {
    slug: "cairn",
    name: "Cairn Oil & Gas",
    segment: "Onshore & Mature Basins",
    hiringFocus: ["Field pragmatism", "Rapid interpretation", "Cost-aware decisions"],
    strategy: [
      "Focus on practical workflows for mature basins: reprocessing, infill targets, and quick-look screening.",
      "Prepare examples of working with limited or noisy datasets under time constraints.",
      "Revise near-surface effects, statics, and common interpretation uncertainties in onshore settings.",
    ],
    questions: {
      technical: [
        "How would you evaluate an infill drilling opportunity in a mature field?",
        "What is your workflow to QC old 2D seismic before reinterpretation?",
        "How do you prioritize leads when budget allows only one well?",
      ],
      hr: [
        "Describe a project where you delivered under tight timelines.",
        "What does ownership look like for an early-career geophysicist?",
      ],
      caseStudy: [
        "Given legacy seismic and limited wells, propose a low-cost plan to improve field development confidence.",
      ],
    },
  },
  {
    slug: "ongc",
    name: "ONGC",
    segment: "National Upstream Operations",
    hiringFocus: ["Core geophysics fundamentals", "Field operations", "Public-sector technical rigor"],
    strategy: [
      "Revise basics thoroughly: signal processing, potential methods, well logging, and exploration geophysics.",
      "Prepare for structured technical interviews and objective-style conceptual questioning.",
      "Build clarity on Indian basins, exploration lifecycle, and offshore/onshore operational context.",
    ],
    questions: {
      technical: [
        "State the assumptions behind common midpoint stacking.",
        "How do gravity and magnetic methods complement seismic interpretation?",
        "Explain the role of VSP in tie and depth uncertainty reduction.",
      ],
      hr: [
        "Why ONGC and how do you see your role in national energy security?",
        "How do you approach discipline and accountability in long-cycle projects?",
      ],
      caseStudy: [
        "Design a phased data acquisition plan for a new block with limited historical information.",
      ],
    },
  },
];
