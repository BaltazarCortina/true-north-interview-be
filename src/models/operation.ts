import mongoose, { Schema } from 'mongoose';

export enum OperationType {
  ADDITION = 'ADDITION',
  SUBTRACTION = 'SUBTRACTION',
  MULTIPLICATION = 'MULTIPLICATION',
  DIVISION = 'DIVISION',
  SQUARE_ROOT = 'SQUARE_ROOT',
  RANDOM_STRING = 'RANDOM_STRING',
}

const operationSchema = new Schema(
  {
    type: {
      type: String,
      enum: OperationType,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

type OperationSchemaType = mongoose.InferSchemaType<typeof operationSchema>;

export interface Operation extends Omit<OperationSchemaType, 'type'> {
  _id: mongoose.Types.ObjectId;
  type: OperationType;
}

export default mongoose.model<Operation>('Operation', operationSchema);
