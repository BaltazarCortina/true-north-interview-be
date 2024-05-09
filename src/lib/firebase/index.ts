import { cert, initializeApp } from 'firebase-admin/app';

export const initFirebaseApp = () => {
  initializeApp({
    credential: cert({
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
  });
};
