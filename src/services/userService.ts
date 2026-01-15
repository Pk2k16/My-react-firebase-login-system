import { db } from './firebase';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Create or update user profile
export const createUserProfile = async (
  uid: string,
  data: Partial<UserProfile>
): Promise<void> => {
  if (!db) {
    // Mock version - store in localStorage
    localStorage.setItem(`userProfile_${uid}`, JSON.stringify(data));
    return;
  }

  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
  }
};

// Get user profile
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  if (!db) {
    // Mock version - get from localStorage
    const data = localStorage.getItem(`userProfile_${uid}`);
    return data ? JSON.parse(data) : null;
  }

  try {
    const userRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

// Update user profile
export const updateUserProfile = async (
  uid: string,
  data: Partial<UserProfile>
): Promise<void> => {
  if (!db) {
    // Mock version - update in localStorage
    const existing = localStorage.getItem(`userProfile_${uid}`);
    const current = existing ? JSON.parse(existing) : {};
    localStorage.setItem(`userProfile_${uid}`, JSON.stringify({ ...current, ...data }));
    return;
  }

  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
  }
};

// Search users by display name
export const searchUsers = async (displayName: string): Promise<UserProfile[]> => {
  if (!db) {
    // Mock version - return empty array
    return [];
  }

  try {
    const q = query(
      collection(db, 'users'),
      where('displayName', '>=', displayName),
      where('displayName', '<=', displayName + '\uf8ff')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as UserProfile);
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
};
