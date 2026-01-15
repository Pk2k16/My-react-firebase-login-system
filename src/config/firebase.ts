// Mock Firebase Auth - Demo Version
// This is a mock implementation for testing without Firebase credentials
// Replace with real Firebase when you have credentials

export interface User {
  uid: string;
  email: string;
}

interface AuthUser extends User {
  email: string;
}

class MockAuth {
  private users: Map<string, { email: string; password: string }> = new Map();
  private currentUser: AuthUser | null = null;

  constructor() {
    // Load from localStorage
    const stored = localStorage.getItem('mockAuthUser');
    if (stored) {
      this.currentUser = JSON.parse(stored);
    }
  }

  async signUp(email: string, password: string): Promise<AuthUser> {
    if (this.users.has(email)) {
      throw new Error('Email already in use');
    }
    if (password.length < 6) {
      throw new Error('Password should be at least 6 characters');
    }
    const uid = Math.random().toString(36).substr(2, 9);
    const user = { uid, email };
    this.users.set(email, { email, password });
    this.currentUser = user;
    localStorage.setItem('mockAuthUser', JSON.stringify(user));
    localStorage.setItem('mockUsers', JSON.stringify(Array.from(this.users.entries())));
    return user;
  }

  async signIn(email: string, password: string): Promise<AuthUser> {
    const user = this.users.get(email);
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }
    const authUser = { uid: Math.random().toString(36).substr(2, 9), email };
    this.currentUser = authUser;
    localStorage.setItem('mockAuthUser', JSON.stringify(authUser));
    return authUser;
  }

  async signOut(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('mockAuthUser');
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    callback(this.currentUser);
    return () => {};
  }
}

export const auth = new MockAuth();
