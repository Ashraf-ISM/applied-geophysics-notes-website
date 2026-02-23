export type Subject = {
  id: string;
  name: string;
  tagline: string;
  level: string;
  courses: string[];
  materials: {
    title: string;
    type: "PDF" | "Book" | "Notes";
    path: string;
  }[];
};

export const subjects: Subject[] = [
  // ===============================
  // SOLID EARTH & SEISMOLOGY
  // ===============================
  {
    id: "solid-earth-seismology",
    name: "Solid Earth & Seismology",
    tagline: "Earthquakes, wave propagation and crustal dynamics",
    level: "Core",
    courses: [
      "Solid Earth Geophysics",
      "Earthquake Seismology",
      "Seismology",
      "Seismic Hazard Zonation",
      "Seismological Data Analysis",
      "Computational Seismology",
      "Strong Motion Seismology and Structural Responses",
      "Earthquake Statistics and Hazard",
    ],
    materials: [],
  },

  // ===============================
  // POTENTIAL FIELD METHODS
  // ===============================
  {
    id: "potential-field-methods",
    name: "Potential Field Methods",
    tagline: "Gravity, magnetic and radiometric exploration",
    level: "Core",
    courses: [
      "Gravity Method",
      "Magnetic Method",
      "Radiometric Method",
      "Geophysical Field Theory",
    ],
    materials: [],
  },

  // ===============================
  // ELECTRICAL & EM METHODS
  // ===============================
  {
    id: "electrical-em-methods",
    name: "Electrical & EM Methods",
    tagline: "Resistivity, EM and near-surface investigations",
    level: "Core",
    courses: [
      "Self-Potential Method: Theory and Application",
      "Geoelectrical Method",
      "Geoelectromagnetic Method",
      "Groundwater Geophysics",
      "Geophysical Methods for Groundwater Exploration",
      "Engineering Geophysics",
      "Near Surface Geophysics and Geotechnical Modelling",
    ],
    materials: [],
  },

  // ===============================
  // WELL LOGGING & PETROLEUM
  // ===============================
  {
    id: "well-logging-petroleum",
    name: "Well Logging & Petroleum Geophysics",
    tagline: "Formation evaluation and reservoir characterization",
    level: "Advanced",
    courses: [
      "Well Logging",
      "Formation Evaluation",
      "Well Log and Electrofacies Analysis",
      "Petroleum Geophysics",
      "Reservoir Geophysics and Deep Water Imaging",
      "Geostatistical Modeling for Oil and Gas Field Development",
    ],
    materials: [],
  },

  // ===============================
  // SEISMIC ACQUISITION & PROCESSING
  // ===============================
  {
    id: "seismic-acquisition-processing",
    name: "Seismic Acquisition & Processing",
    tagline: "Seismic workflows from acquisition to interpretation",
    level: "Advanced",
    courses: [
      "Seismic Data Acquisition",
      "Seismic Data Processing and Interpretation",
      "Advanced Seismic Data Interpretation",
      "Seismic Refraction Technology",
    ],
    materials: [],
  },

  // ===============================
  // MATHEMATICAL & COMPUTATIONAL
  // ===============================
  {
    id: "mathematical-computational-geophysics",
    name: "Mathematical & Computational Geophysics",
    tagline: "Numerical modelling, inversion and data analysis",
    level: "Core",
    courses: [
      "Mathematical Geophysics",
      "Mathematical Functional Analysis",
      "Advanced Numerical Methods",
      "Numerical Analysis and Data Structure",
      "Finite Element Analysis",
      "Geophysical Inversion",
      "Time Series Analysis in Geosciences",
    ],
    materials: [],
  },

  // ===============================
  // REMOTE SENSING & GIS
  // ===============================
  {
    id: "remote-sensing-gis",
    name: "Remote Sensing & GIS",
    tagline: "Satellite data, imaging and spatial analysis",
    level: "Core",
    courses: [
      "Remote Sensing Principles",
      "Remote Sensing: Principles and Data Acquisition System",
      "Image Processing and Geographic Information System",
      "Satellite Image Processing and Geographic Information System",
    ],
    materials: [],
  },

  // ===============================
  // GEODYNAMICS & EARTH SYSTEMS
  // ===============================
  {
    id: "geodynamics-earth-systems",
    name: "Geodynamics & Earth Systems",
    tagline: "Earth evolution, tectonics and planetary processes",
    level: "Core",
    courses: [
      "Geothermics and Geodynamics",
      "Earth and Planetary System",
      "Oceanography",
      "Hydrology",
    ],
    materials: [],
  },

  // ===============================
  // EXPLORATION & APPLIED
  // ===============================
  {
    id: "exploration-applied-geophysics",
    name: "Exploration & Applied Geophysics",
    tagline: "Mineral, airborne and engineering exploration methods",
    level: "Applied",
    courses: [
      "Geophysical Prospecting",
      "Geophysics for Mineral Exploration",
      "Geophysical Methods for Coal Exploration",
      "Airborne Geophysics",
    ],
    materials: [],
  },

  // ===============================
  // AI & DATA ANALYTICS
  // ===============================
  {
    id: "ai-data-analytics",
    name: "AI & Data Analytics in Geoscience",
    tagline: "Machine learning and data-driven geophysics",
    level: "Modern",
    courses: [
      "Artificial Intelligence and Machine Learning in Geosciences",
    ],
    materials: [],
  },

  // ===============================
  // ROCK PHYSICS & FUNDAMENTALS
  // ===============================
  {
    id: "rock-physics-fundamentals",
    name: "Rock Physics & Fundamentals",
    tagline: "Physical properties of rocks and subsurface media",
    level: "Core",
    courses: [
      "Introduction to Rock Physics",
    ],
    materials: [],
  },

  // ===============================
  // GENERAL GEOPHYSICS & RESEARCH
  // ===============================
  {
    id: "general-geophysics-research",
    name: "General Geophysics & Research",
    tagline: "Foundational theory and scientific methodology",
    level: "Core",
    courses: [
      "Research Methodology and Statistics",
    ],
    materials: [],
  },
];
