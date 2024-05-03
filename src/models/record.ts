import mongoose, { Schema } from 'mongoose';

const recordSchema = new Schema(
  {
    operationId: {
      type: Schema.Types.ObjectId,
      ref: 'Operation',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    userBalance: {
      type: Number,
      required: true,
    },
    operationResponse: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    logicDelete: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export type RecordSchemaType = mongoose.InferSchemaType<typeof recordSchema>;
export type Record = RecordSchemaType & { _id: mongoose.Types.ObjectId };

export default mongoose.model<Record>('Record', recordSchema);
