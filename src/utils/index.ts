export const getAuthUserId = (locals: Record<string, any>) => {
  if (!locals.userId || typeof locals.userId !== 'string') {
    throw new Error('User ID not valid');
  }
  return locals.userId;
};
