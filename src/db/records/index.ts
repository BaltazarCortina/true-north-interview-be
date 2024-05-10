import { FilterQuery } from 'mongoose';

import { Operation } from '../../models/operation';
import RecordSchema, { Record } from '../../models/record';
import { PopulatedRecord } from '../../types';

export const getPaginatedUserRecordsFromDb = async (
  userId: string,
  page: number,
  limit: number,
  operationId?: string,
  search?: string
) => {
  const query: FilterQuery<Record> = {
    logicDelete: false,
    userId,
  };

  if (operationId) query.operationId = operationId;

  if (search) query.date = { $regex: search, $options: 'i' };

  return RecordSchema.paginate<PopulatedRecord>(query, {
    page,
    limit,
    populate: 'operationId',
    lean: true,
  });
};

export const getUserRecordsFromDb = async (userId: string) => {
  return RecordSchema.find({ userId }).populate('operationId').lean();
};

export const createNewRecordInDb = async (
  operation: Operation,
  userId: string,
  userBalance: number,
  operationResponse: number | string
) => {
  const newRecord = new RecordSchema({
    operationId: operation._id,
    userId,
    type: operation.type,
    amount: operation.cost,
    userBalance,
    operationResponse,
    date: new Date().toUTCString(),
  });

  return newRecord.save();
};

export const deleteUserRecordFromDb = async (userId: string, recordId: string) => {
  return RecordSchema.findOneAndUpdate(
    { _id: recordId, userId, logicDelete: false },
    { logicDelete: true },
    { new: true }
  ).lean();
};
