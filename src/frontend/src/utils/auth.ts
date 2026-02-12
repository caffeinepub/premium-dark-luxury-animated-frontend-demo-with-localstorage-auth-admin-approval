import { getUsers, setUsers, type User } from './storage';

// Register function still uses localStorage for demo purposes
// In production with Firebase, this would create a Firestore user document
export function register(name: string, email: string, password: string): { success: boolean; message: string } {
  const users = getUsers();

  if (users.find((u) => u.email === email)) {
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

// Logout now clears in-memory authz state (handled by useAuthzState hook)
// No localStorage session clearing for authorization
export function logout(): void {
  // Authorization state clearing is handled by the component calling clearAuthzState()
  // This function is kept for backward compatibility
}

// Admin functions still use localStorage for demo purposes
// In production with Firebase, these would update Firestore user documents
export function approveUser(email: string): void {
  const users = getUsers();
  const userIndex = users.findIndex((u) => u.email === email);

  if (userIndex !== -1 && users[userIndex].role !== 'admin') {
    users[userIndex].approved = true;
    setUsers(users);
  }
}

export function updateUserPermissions(email: string, allowedPages: string[]): void {
  const users = getUsers();
  const userIndex = users.findIndex((u) => u.email === email);

  if (userIndex !== -1 && users[userIndex].role !== 'admin') {
    users[userIndex].allowedPages = allowedPages;
    setUsers(users);
  }
}
