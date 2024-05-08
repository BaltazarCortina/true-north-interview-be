import { PopulatedRecord } from '../../types';

export const parseRecords = (records: PopulatedRecord[]) => {
  return records.map((record) => {
    return {
      id: record._id.toString(),
      operationId: {
        id: record.operationId._id.toString(),
        type: record.operationId.type,
      },
      amount: record.amount,
      userBalance: record.userBalance,
      operationResponse: record.operationResponse,
      date: record.date,
    };
  });
};

export type ParsedRecord = ReturnType<typeof parseRecords>[number];
