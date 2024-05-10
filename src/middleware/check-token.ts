import { NextFunction, Request, Response } from 'express';
import { getAuth } from 'firebase-admin/auth';

import User from '../models/user';

export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  try {
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(req.headers.authorization);

    const user = await User.findOne({ firebaseUid: decodedToken.uid }).lean();

    if (!user) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.locals.userId = user._id.toString();

    next();
  } catch (error) {
    console.log('error', error);
    return res.status(403).json({ message: 'Unauthorized' });
  }
};
