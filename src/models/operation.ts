import mongoose, { Schema } from 'mongoose';

enum OperationType {
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

export type Operation = mongoose.InferSchemaType<typeof operationSchema>;

export default mongoose.model<Operation>('Operation', operationSchema);
