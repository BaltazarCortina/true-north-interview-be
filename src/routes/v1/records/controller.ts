import type { Request, Response } from 'express';

import { getOperationByTypeFromDb } from '../../../db/operations';
import {
  createNewRecordInDb,
  getPaginatedUserRecordsFromDb,
  getUserRecordsFromDb,
} from '../../../db/records';
import { performOperation, validateUserCredit } from '../../../utils';
import { IdAsParam } from '../../../utils/schema';
import { GetRecordsPaginatedQuery, NewRecordBody } from './schema';

export const getRecords = async (req: Request, res: Response) => {
  const { id } = IdAsParam.parse(req.params);
  const { page, limit } = GetRecordsPaginatedQuery.parse(req.query);

  const paginatedRecords = await getPaginatedUserRecordsFromDb(id, page, limit);

  const data = {
    docs: paginatedRecords.docs,
    totalDocs: paginatedRecords.totalDocs,
  };

  return res.json({ message: 'Success', status: 200, data });
};

export const postRecord = async (req: Request, res: Response) => {
  const body = NewRecordBody.parse(req.body);

  const { type, userId, firstNumber, secondNumber } = body;

  const [operation, userRecords] = await Promise.all([
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

  const operationResult = await performOperation(operation.type, firstNumber, secondNumber);

  await createNewRecordInDb(operation, userId, remainingCredits, operationResult);

  return res.json({ status: 201, message: 'Success', data: operationResult });
};
