export type LocalUserRole = "ADMIN" | "ISM_STUDENT";

export interface LocalAuthSession {
  username: string;
  role: LocalUserRole;
  loggedInAt: string;
}

const LOCAL_AUTH_KEY = "geophysics_local_auth_session_v1";

function canUseStorage(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const testKey = "__geo_auth_storage_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function getLocalAuthSession(): LocalAuthSession | null {
  if (!canUseStorage()) return null;

  try {
    const raw = window.localStorage.getItem(LOCAL_AUTH_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<LocalAuthSession>;
    if (!parsed.username || !parsed.role || !parsed.loggedInAt) return null;

    return {
      username: parsed.username,
      role: parsed.role,
      loggedInAt: parsed.loggedInAt,
    };
  } catch {
    return null;
  }
}

export function setLocalAuthSession(session: LocalAuthSession): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(session));
}

export function clearLocalAuthSession(): void {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(LOCAL_AUTH_KEY);
}

export function hasLocalAuthSession(): boolean {
  return !!getLocalAuthSession();
}

export function isLocalAdmin(): boolean {
  const session = getLocalAuthSession();
  return session?.role === "ADMIN";
}
