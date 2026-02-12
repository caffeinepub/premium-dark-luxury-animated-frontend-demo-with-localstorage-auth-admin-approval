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
const SESSION_KEY = 'app_session';

// Custom event for session changes
const SESSION_CHANGE_EVENT = 'session-change';

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
  return users.find(u => u.email === email) || null;
}

export function updateUser(email: string, updates: Partial<User>): void {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.email === email);
  
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updates };
    setUsers(users);
  }
}

export function getSession(): Session | null {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setSession(session: Session): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new CustomEvent(SESSION_CHANGE_EVENT, { detail: session }));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new CustomEvent(SESSION_CHANGE_EVENT, { detail: null }));
}

export function subscribeToSessionChanges(callback: (session: Session | null) => void): () => void {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<Session | null>;
    callback(customEvent.detail);
  };
  
  window.addEventListener(SESSION_CHANGE_EVENT, handler);
  return () => window.removeEventListener(SESSION_CHANGE_EVENT, handler);
}
