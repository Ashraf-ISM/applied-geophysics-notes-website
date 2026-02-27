export type MaterialType = "pyq" | "notes" | "reference" | "textbook";
export type AccessLevel = "public" | "ism-only";
export type ModerationStatus = "draft" | "review" | "published";
export type LinkHealth = "unknown" | "ok" | "broken";

export interface Material {
  id: string;
  title: string;
  description: string;
  subject: string;
  subjectLabel: string;
  type: MaterialType;
  accessLevel: AccessLevel;
  uploadDate: string;
  downloads: number;
  semester: string;
  topic: string;
  fileUrl: string;
  moderationStatus: ModerationStatus;
  verifiedBy?: string;
  linkHealth: LinkHealth;
  lastCheckedAt?: string;
}

export interface CreateMaterialInput {
  title: string;
  description: string;
  subject: string;
  subjectLabel: string;
  type: MaterialType;
  accessLevel: AccessLevel;
  semester: string;
  topic: string;
  fileUrl: string;
  moderationStatus?: ModerationStatus;
}

const STORAGE_KEY = "geophysics_materials_v3";
const UPDATE_EVENT = "materials-updated";

const seedMaterials: Material[] = [
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
    semester: "Semester 2",
    topic: "Wave Propagation",
    fileUrl: "/pyq/sem6/sda-.jpeg",
    moderationStatus: "published",
    verifiedBy: "System Seed",
    linkHealth: "ok",
    lastCheckedAt: "2026-02-28",
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
    semester: "Semester 2",
    topic: "Seismic Waves",
    fileUrl: "",
    moderationStatus: "published",
    verifiedBy: "System Seed",
    linkHealth: "unknown",
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
    semester: "Semester 3",
    topic: "Gravity Survey",
    fileUrl: "",
    moderationStatus: "published",
    verifiedBy: "System Seed",
    linkHealth: "unknown",
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
    semester: "Semester 3",
    topic: "Signal Processing",
    fileUrl: "",
    moderationStatus: "published",
    verifiedBy: "System Seed",
    linkHealth: "unknown",
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
    semester: "Semester 4",
    topic: "Electrical Methods",
    fileUrl: "",
    moderationStatus: "published",
    verifiedBy: "System Seed",
    linkHealth: "unknown",
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
    semester: "Semester 4",
    topic: "Log Interpretation",
    fileUrl: "",
    moderationStatus: "published",
    verifiedBy: "System Seed",
    linkHealth: "unknown",
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
    semester: "Semester 2",
    topic: "GNSS Processing",
    fileUrl: "",
    moderationStatus: "published",
    verifiedBy: "System Seed",
    linkHealth: "unknown",
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
    semester: "Semester 3",
    topic: "Quantitative Seismology",
    fileUrl: "",
    moderationStatus: "published",
    verifiedBy: "System Seed",
    linkHealth: "unknown",
  },
];

function canUseStorage(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const testKey = "__materials_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

function emitUpdate(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(UPDATE_EVENT));
  }
}

function normalizeMaterial(material: Partial<Material>): Material | null {
  if (!material.id || !material.title || !material.subject || !material.subjectLabel || !material.type || !material.accessLevel || !material.uploadDate || !material.semester || !material.topic) {
    return null;
  }

  return {
    id: material.id,
    title: material.title,
    description: material.description ?? "",
    subject: material.subject,
    subjectLabel: material.subjectLabel,
    type: material.type,
    accessLevel: material.accessLevel,
    uploadDate: material.uploadDate,
    downloads: Number(material.downloads ?? 0),
    semester: material.semester,
    topic: material.topic,
    fileUrl: material.fileUrl ?? "",
    moderationStatus: material.moderationStatus ?? "published",
    verifiedBy: material.verifiedBy,
    linkHealth: material.linkHealth ?? "unknown",
    lastCheckedAt: material.lastCheckedAt,
  };
}

function getLegacyMaterials(): Material[] {
  const legacyRaw = window.localStorage.getItem("geophysics_materials_v2");
  if (!legacyRaw) return [];

  try {
    const parsed = JSON.parse(legacyRaw) as Partial<Material>[];
    return parsed
      .map((item) => normalizeMaterial({ ...item, moderationStatus: item.moderationStatus ?? "published" }))
      .filter((item): item is Material => !!item);
  } catch {
    return [];
  }
}

export function getAllMaterials(): Material[] {
  if (!canUseStorage()) return seedMaterials;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const migrated = getLegacyMaterials();
      return migrated.length > 0 ? migrated : seedMaterials;
    }

    const parsed = JSON.parse(raw) as Partial<Material>[];
    const normalized = parsed.map(normalizeMaterial).filter((item): item is Material => !!item);
    return normalized.length > 0 ? normalized : seedMaterials;
  } catch {
    return seedMaterials;
  }
}

export function getPublishedMaterials(): Material[] {
  return getAllMaterials().filter((item) => item.moderationStatus === "published");
}

export function saveAllMaterials(materialList: Material[]): void {
  if (!canUseStorage()) return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(materialList));
    emitUpdate();
  } catch (error) {
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      throw new Error("Browser storage quota exceeded. Use a Drive/PDF link for large files.");
    }
    throw new Error("Unable to save material to browser storage.");
  }
}

export function addMaterial(input: CreateMaterialInput): Material {
  const list = getAllMaterials();
  const item: Material = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
    title: input.title,
    description: input.description,
    subject: input.subject,
    subjectLabel: input.subjectLabel,
    type: input.type,
    accessLevel: input.accessLevel,
    semester: input.semester,
    topic: input.topic,
    fileUrl: input.fileUrl,
    uploadDate: new Date().toISOString().slice(0, 10),
    downloads: 0,
    moderationStatus: input.moderationStatus ?? "draft",
    verifiedBy: undefined,
    linkHealth: "unknown",
    lastCheckedAt: undefined,
  };

  saveAllMaterials([item, ...list]);
  return item;
}

export function updateMaterialModeration(id: string, status: ModerationStatus, reviewer?: string): void {
  const list = getAllMaterials();
  const next = list.map((item) => {
    if (item.id !== id) return item;
    return {
      ...item,
      moderationStatus: status,
      verifiedBy: status === "published" ? (reviewer || item.verifiedBy || "Admin") : item.verifiedBy,
    };
  });
  saveAllMaterials(next);
}

export function updateMaterialLinkHealth(id: string, linkHealth: LinkHealth): void {
  const list = getAllMaterials();
  const now = new Date().toISOString();
  const next = list.map((item) => (item.id === id ? { ...item, linkHealth, lastCheckedAt: now } : item));
  saveAllMaterials(next);
}

export function recordMaterialDownload(id: string): void {
  const list = getAllMaterials();
  const next = list.map((item) => (item.id === id ? { ...item, downloads: item.downloads + 1 } : item));
  saveAllMaterials(next);
}

export function subscribeMaterialsUpdate(callback: () => void): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener(UPDATE_EVENT, callback);
  return () => window.removeEventListener(UPDATE_EVENT, callback);
}

// Backward compatibility for existing imports.
export const materials: Material[] = seedMaterials;
