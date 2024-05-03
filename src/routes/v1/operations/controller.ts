import { Request, Response } from 'express';
import { getOperationByTypeFromDb, getOperationsFromDb } from '../../../db/operations';
import { createNewRecordInDb, getUserRecordsFromDb } from '../../../db/records';
import { validateUserCredit } from '../../../utils';

export const getOperations = async (req: Request, res: Response) => {
  const operations = await getOperationsFromDb();

  return res.json({ operations });
};

export const postOperation = async (req: Request, res: Response) => {
  const { type, userId } = req.body;

  const [
    operation,
    userRecords,
  ] = await Promise.all([
    getOperationByTypeFromDb(type),
    getUserRecordsFromDb(userId),
  ]);

  if (!operation) {
    return res.status(404).send('Operation is not currently available');
  }

  const { status, remainingCredits } = validateUserCredit(userRecords, operation.cost);

  if (!status) {
    return res.status(403).send('Insufficient credits');
  }

  // TODO: Perform operation

  createNewRecordInDb(operation, userId, remainingCredits, 0); // Add operation response

  return res.send('Success');
};
