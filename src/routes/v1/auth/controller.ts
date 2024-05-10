import type { Request, Response } from 'express';
import { UserRecord } from 'firebase-admin/auth';

import { createUserInFirebase, deleteUserInFirebase } from '../../../lib/firebase';
import { createUserInDb } from '../../../db/users';
import { NewUserBody } from './schema';

export const createUser = async (req: Request, res: Response) => {
  let firebaseUser: UserRecord | null = null;

  try {
    const { email, password } = NewUserBody.parse(req.body);

    firebaseUser = await createUserInFirebase(email, password);

    const user = await createUserInDb(email, firebaseUser.uid);

    return res.json({ message: 'User created', data: user });
  } catch (error) {
    if (firebaseUser) {
      await deleteUserInFirebase(firebaseUser.uid);
    }

    return res.status(400).json({ message: 'Invalid request', error });
  }
};
