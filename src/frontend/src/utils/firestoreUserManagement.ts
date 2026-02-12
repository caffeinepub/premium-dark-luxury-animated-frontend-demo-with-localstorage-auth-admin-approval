// Firestore user management utilities
// Currently using localStorage as Firebase SDK is not available
// This implementation maintains the same interface for easy migration to Firestore

import { getUsers, setUsers, type User } from './storage';

export interface FirestoreUser {
  uid: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  approved: boolean;
  allowedPages: string[];
  registeredAt: string;
}

/**
 * Fetch all users with role="user" from storage
 * Currently uses localStorage; will use Firestore when SDK is available
 */
export async function fetchRegularUsers(): Promise<FirestoreUser[]> {
  try {
    const allUsers = getUsers();
    const regularUsers = allUsers.filter((u) => u.role === 'user');
    
    // Convert to FirestoreUser format (using email as uid for now)
    return regularUsers.map((user) => ({
      uid: user.email, // Using email as unique identifier
      email: user.email,
      name: user.name,
      role: user.role,
      approved: user.approved,
      allowedPages: user.allowedPages,
      registeredAt: user.registeredAt,
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

/**
 * Update user's approved status
 * Currently uses localStorage with merge-like behavior
 * Will use Firestore setDoc with merge:true when SDK is available
 */
export async function updateUserApproval(uid: string, approved: boolean): Promise<void> {
  try {
    const users = getUsers();
    const userIndex = users.findIndex((u) => u.email === uid && u.role === 'user');
    
    if (userIndex !== -1) {
      // Merge-like update: only modify approved field
      users[userIndex] = {
        ...users[userIndex],
        approved,
      };
      setUsers(users);
    }
  } catch (error) {
    console.error('Error updating user approval:', error);
    throw error;
  }
}

/**
 * Update user's allowedPages
 * Currently uses localStorage with merge-like behavior
 * Will use Firestore setDoc with merge:true when SDK is available
 */
export async function updateUserAllowedPages(uid: string, allowedPages: string[]): Promise<void> {
  try {
    const users = getUsers();
    const userIndex = users.findIndex((u) => u.email === uid && u.role === 'user');
    
    if (userIndex !== -1) {
      // Merge-like update: only modify allowedPages field
      users[userIndex] = {
        ...users[userIndex],
        allowedPages,
      };
      setUsers(users);
    }
  } catch (error) {
    console.error('Error updating user allowed pages:', error);
    throw error;
  }
}
