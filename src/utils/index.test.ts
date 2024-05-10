import { getAuthUserId } from '.';

describe('getAuthUserId', () => {
  it('should return the user ID when it exists and is a string', () => {
    const locals = { userId: '123' };
    expect(getAuthUserId(locals)).toBe('123');
  });

  it('should throw an error when locals is undefined', () => {
    expect(() => getAuthUserId({})).toThrow('User ID not valid');
  });
});
