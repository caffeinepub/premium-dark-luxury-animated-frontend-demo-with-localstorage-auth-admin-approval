export interface User {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  approved: boolean;
  allowedPages: string[];
  registeredAt: string;
}

export interface Session {
  email: string;
  name: string;
  role: 'admin' | 'user';
  allowedPages: string[];
}

const USERS_KEY = 'app_users';

// Note: Session storage functions are deprecated for authorization
// Authorization now uses in-memory state via useAuthzState hook
// User data is still stored in localStorage temporarily until Firebase integration is complete

export function getUsers(): User[] {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function setUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getUser(email: string): User | null {
  const users = getUsers();
  return users.find((u) => u.email === email) || null;
}

export function updateUser(email: string, updates: Partial<User>): void {
  const users = getUsers();
  const userIndex = users.findIndex((u) => u.email === email);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updates };
    setUsers(users);
  }
}

// Deprecated: No longer used for authorization decisions
// Authorization state is now managed in-memory via useAuthzState
export function getSession(): Session | null {
  return null;
}

export function setSession(session: Session): void {
  // No-op: Authorization state is now managed in-memory via useAuthzState
}

export function clearSession(): void {
  // No-op: Authorization state is now managed in-memory via useAuthzState
}

export function subscribeToSessionChanges(callback: (session: Session | null) => void): () => void {
  // No-op: Return empty unsubscribe function
  return () => {};
}
