import OperationSchema, { OperationType } from '../../models/operation';

export const getOperationByTypeFromDb = async (type: OperationType) => {
  return OperationSchema.findOne({ type }).lean();
};

export const getOperationsFromDb = async () => {
  return OperationSchema.find().lean();
};
