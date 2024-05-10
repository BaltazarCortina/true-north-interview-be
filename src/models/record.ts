import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

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
      type: String,
      required: true,
    },
    date: {
      type: String,
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

recordSchema.plugin(paginate);

export type RecordSchemaType = mongoose.InferSchemaType<typeof recordSchema>;
export type Record = RecordSchemaType & { _id: mongoose.Types.ObjectId };

export default mongoose.model<Record, mongoose.PaginateModel<Record>>('Record', recordSchema);
