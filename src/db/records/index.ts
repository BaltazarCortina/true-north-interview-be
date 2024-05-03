import { Operation } from '../../models/operation';
import RecordSchema, { Record } from '../../models/record';

export const getUserRecordsFromDb = async (userId: string) => {
  return RecordSchema.find({ userId }).lean();
};

export const createNewRecordInDb = async (
  operation: Operation,
  userId: string,
  userBalance: number,
  operationResponse: number | string,
) => {
  const newRecord = new RecordSchema({
    operationId: operation._id,
    userId,
    type: operation.type,
    amount: operation.cost,
    userBalance,
    operationResponse,
  });

  return newRecord.save();
};