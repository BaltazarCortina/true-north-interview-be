import type { Request, Response } from 'express';
import { getOperationByTypeFromDb, getOperationsFromDb } from '../../../db/operations';
import { createNewRecordInDb, getUserRecordsFromDb } from '../../../db/records';
import { performOperation, validateUserCredit } from '../../../utils';
import type { OperationType } from '../../../models/operation';

export const getRecords = async (req: Request, res: Response) => {
  const { userId } = req.params; // TODO: Validate params
  const records = await getUserRecordsFromDb(userId);

  return res.json({ records });
};

export const postRecord = async (req: Request, res: Response) => {
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

  const operationResult = await performOperation(operation.type as OperationType, 0, 0); // TODO: Validate input and type correctly

  createNewRecordInDb(operation, userId, remainingCredits, operationResult);

  return res.json({ msg:'Success', result: operationResult });
};
