import type { Request, Response } from 'express';

import { getOperationByTypeFromDb } from '../../../db/operations';
import {
  createNewRecordInDb,
  getPaginatedUserRecordsFromDb,
  getUserRecordsFromDb,
} from '../../../db/records';
import { performOperation, validateUserCredit } from '../../../helpers';
import { GetRecordsPaginatedQuery, NewRecordBody } from './schema';
import { parseRecords } from '../../../helpers/parser';
import { getAuthUserId } from '../../../utils';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const userId = getAuthUserId(res.locals);
    console.log('userId', userId);
    const { page, limit } = GetRecordsPaginatedQuery.parse(req.query);

    const paginatedRecords = await getPaginatedUserRecordsFromDb(userId, page, limit);

    const data = {
      docs: parseRecords(paginatedRecords.docs),
      totalDocs: paginatedRecords.totalDocs,
    };

    return res.json({ message: 'Success', status: 200, data });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const postRecord = async (req: Request, res: Response) => {
  try {
    const userId = getAuthUserId(res.locals);

    const body = NewRecordBody.parse(req.body);

    const { type, firstNumber, secondNumber } = body;

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
  } catch (error) {
    return res.status(400).json({ error });
  }
};
