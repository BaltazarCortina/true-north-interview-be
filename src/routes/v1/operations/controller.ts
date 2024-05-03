import type { Request, Response } from 'express';
import { getOperationsFromDb } from '../../../db/operations';

export const getOperations = async (req: Request, res: Response) => {
  const operations = await getOperationsFromDb();

  return res.json({ operations });
};