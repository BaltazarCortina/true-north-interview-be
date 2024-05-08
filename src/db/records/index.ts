import { Operation } from '../../models/operation';
import RecordSchema from '../../models/record';
import { PopulatedRecord } from '../../types';

export const getPaginatedUserRecordsFromDb = async (
  userId: string,
  page: number,
  limit: number
) => {
  return RecordSchema.paginate<PopulatedRecord>(
    { userId },
    { page, limit, populate: 'operationId', lean: true }
  );
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
    date: new Date(),
  });

  return newRecord.save();
};
