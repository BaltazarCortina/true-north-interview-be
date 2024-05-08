import UserSchema from '../../models/user';

export const getUsersFromDb = async () => {
  return UserSchema.find().lean();
};
