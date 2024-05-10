import UserSchema from '../../models/user';

export const getUsersFromDb = async () => {
  return UserSchema.find().lean();
};

export const createUserInDb = async (email: string, firebaseUid: string) => {
  const user = new UserSchema({
    email,
    firebaseUid,
  });
  return user.save();
};
