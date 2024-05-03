import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

export type UserSchemaType = mongoose.InferSchemaType<typeof userSchema>;
export type User = UserSchemaType & { _id: mongoose.Types.ObjectId };

export default mongoose.model<User>('User', userSchema);
