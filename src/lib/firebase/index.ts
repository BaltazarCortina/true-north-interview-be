import { cert, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

export const initFirebaseApp = () => {
  initializeApp({
    credential: cert({
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
  });
};

export const createUserInFirebase = async (email: string, password: string) => {
  const auth = getAuth();
  return auth.createUser({
    email,
    password,
  });
};

export const deleteUserInFirebase = async (uid: string) => {
  const auth = getAuth();
  return auth.deleteUser(uid);
};
