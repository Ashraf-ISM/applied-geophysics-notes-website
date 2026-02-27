export type ResourceKind = "book" | "material" | "pyq" | "interview";

export type PrepStatus = "not-started" | "in-progress" | "ready";

export interface DashboardBookmark {
  id: string;
  title: string;
  subtitle?: string;
  type: ResourceKind;
  href?: string;
  createdAt: string;
}

export interface DashboardRecentItem {
  id: string;
  title: string;
  subtitle?: string;
  type: ResourceKind;
  href?: string;
  viewedAt: string;
}

export interface PrepTask {
  id: string;
  title: string;
  status: PrepStatus;
}

export interface StudentDashboardState {
  bookmarks: DashboardBookmark[];
  recent: DashboardRecentItem[];
  prep: PrepTask[];
}

const STORAGE_KEY = "geophysics_student_dashboard_v1";
const UPDATE_EVENT = "student-dashboard-updated";

const defaultPrep: PrepTask[] = [
  { id: "core-fundamentals", title: "Core fundamentals revision", status: "not-started" },
  { id: "pyq-practice", title: "PYQ practice by topic", status: "not-started" },
  { id: "project-narrative", title: "Project narrative preparation", status: "not-started" },
  { id: "interview-mocks", title: "Interview mock simulations", status: "not-started" },
];

const defaultState: StudentDashboardState = {
  bookmarks: [],
  recent: [],
  prep: defaultPrep,
};

function canUseStorage(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const testKey = "__geo_storage_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

function emitUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(UPDATE_EVENT));
  }
}

function normalizeState(state: Partial<StudentDashboardState> | null): StudentDashboardState {
  if (!state) return defaultState;

  return {
    bookmarks: Array.isArray(state.bookmarks) ? state.bookmarks : [],
    recent: Array.isArray(state.recent) ? state.recent : [],
    prep: Array.isArray(state.prep) && state.prep.length > 0 ? state.prep : defaultPrep,
  };
}

export function loadDashboardState(): StudentDashboardState {
  if (!canUseStorage()) return defaultState;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return normalizeState(JSON.parse(raw) as Partial<StudentDashboardState>);
  } catch {
    return defaultState;
  }
}

export function saveDashboardState(state: StudentDashboardState): void {
  if (!canUseStorage()) return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  emitUpdate();
}

export function getDashboardUpdateEventName(): string {
  return UPDATE_EVENT;
}

export function addBookmark(item: Omit<DashboardBookmark, "createdAt">): void {
  const state = loadDashboardState();
  const exists = state.bookmarks.some((bookmark) => bookmark.id === item.id);

  if (exists) return;

  const next: StudentDashboardState = {
    ...state,
    bookmarks: [{ ...item, createdAt: new Date().toISOString() }, ...state.bookmarks].slice(0, 50),
  };

  saveDashboardState(next);
}

export function removeBookmark(id: string): void {
  const state = loadDashboardState();
  const next: StudentDashboardState = {
    ...state,
    bookmarks: state.bookmarks.filter((item) => item.id !== id),
  };

  saveDashboardState(next);
}

export function isBookmarked(id: string): boolean {
  const state = loadDashboardState();
  return state.bookmarks.some((item) => item.id === id);
}

export function addRecentItem(item: Omit<DashboardRecentItem, "viewedAt">): void {
  const state = loadDashboardState();
  const filtered = state.recent.filter((entry) => entry.id !== item.id);

  const next: StudentDashboardState = {
    ...state,
    recent: [{ ...item, viewedAt: new Date().toISOString() }, ...filtered].slice(0, 25),
  };

  saveDashboardState(next);
}

export function updatePrepStatus(id: string, status: PrepStatus): void {
  const state = loadDashboardState();
  const next: StudentDashboardState = {
    ...state,
    prep: state.prep.map((task) => (task.id === id ? { ...task, status } : task)),
  };

  saveDashboardState(next);
}

export function clearRecentItems(): void {
  const state = loadDashboardState();
  saveDashboardState({ ...state, recent: [] });
}
