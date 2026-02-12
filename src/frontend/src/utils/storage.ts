export interface User {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  status: 'pending' | 'approved' | 'rejected';
  registeredAt: string;
}

export interface Session {
  email: string;
  name: string;
  role: 'admin' | 'user';
}

const USERS_KEY = 'app_users';
const SESSION_KEY = 'app_session';

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
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}
