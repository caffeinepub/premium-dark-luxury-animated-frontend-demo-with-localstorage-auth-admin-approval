import { getUsers, setUsers, type User } from './storage';

const ADMIN_EMAIL = 'admin@example.com';

export function seedAdmin(): void {
  const users = getUsers();
  const adminExists = users.find(u => u.email === ADMIN_EMAIL);

  if (!adminExists) {
    const admin: User = {
      email: ADMIN_EMAIL,
      password: 'admin123',
      name: 'Admin',
      role: 'admin',
      approved: true,
      allowedPages: ['home', 'videos', 'portfolio', 'intelus', 'live', 'myVideos', 'myFiles', 'admin'],
      registeredAt: new Date().toISOString(),
    };

    users.push(admin);
    setUsers(users);
  }
}
