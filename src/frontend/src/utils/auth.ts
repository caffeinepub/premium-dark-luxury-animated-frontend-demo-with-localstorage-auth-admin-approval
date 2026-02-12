import { getUsers, setUsers, setSession, clearSession, type User, type Session } from './storage';

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
    status: 'pending',
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

  if (user.status === 'pending' || user.status === 'rejected') {
    return { success: false, message: 'Your account is waiting for admin approval.' };
  }

  const session: Session = {
    email: user.email,
    name: user.name,
    role: user.role,
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
    users[userIndex].status = 'approved';
    setUsers(users);
  }
}

export function rejectUser(email: string): void {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.email === email);
  
  if (userIndex !== -1 && users[userIndex].role !== 'admin') {
    users[userIndex].status = 'rejected';
    setUsers(users);
  }
}
