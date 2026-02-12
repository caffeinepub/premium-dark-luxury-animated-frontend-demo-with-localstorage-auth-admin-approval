import { getUsers, setUsers, setSession, clearSession, getUser, type User, type Session } from './storage';

export function register(name: string, email: string, password: string): { success: boolean; message: string } {
  const users = getUsers();
  
  if (users.find(u => u.email === email)) {
    return { success: false, message: 'Email already registered' };
  }

  const newUser: User = {
    email,
    password,
    name,
    role: 'user',
    approved: false,
    allowedPages: [],
    registeredAt: new Date().toISOString(),
  };

  users.push(newUser);
  setUsers(users);

  return { success: true, message: 'Registration successful. Please wait for admin approval.' };
}

export function login(email: string, password: string): { success: boolean; message: string; user?: User } {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return { success: false, message: 'Invalid email or password' };
  }

  if (!user.approved && user.role !== 'admin') {
    return { success: false, message: 'Your account is waiting for admin approval.' };
  }

  const session: Session = {
    email: user.email,
    name: user.name,
    role: user.role,
    allowedPages: user.allowedPages,
  };

  setSession(session);
  return { success: true, message: 'Login successful', user };
}

export function logout(): void {
  clearSession();
}

export function approveUser(email: string): void {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.email === email);
  
  if (userIndex !== -1 && users[userIndex].role !== 'admin') {
    users[userIndex].approved = true;
    setUsers(users);
  }
}

export function updateUserPermissions(email: string, allowedPages: string[]): void {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.email === email);
  
  if (userIndex !== -1 && users[userIndex].role !== 'admin') {
    users[userIndex].allowedPages = allowedPages;
    setUsers(users);
  }
}
