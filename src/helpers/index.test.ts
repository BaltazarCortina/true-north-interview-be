import { OperationType } from '../models/operation';
import * as randomModule from '../lib/random';
import { Record } from '../models/record';
import { performOperation, validateUserCredit } from '.';

describe('performOperation', () => {
  const testCases = {
    [OperationType.ADDITION]: [
      { a: 0, b: 0, expected: 0 },
      { a: 2, b: 3, expected: 5 },
      { a: -2, b: -3, expected: -5 },
      { a: -2, b: 3, expected: 1 },
      { a: 0.1, b: 0.2, expected: 0.3 },
      { a: 2.246, b: 123.19, expected: 125.436 },
      { a: 12345, b: 98765, expected: 111110 },
      { a: 10, b: -7, expected: 3 },
      { a: 0, b: 8, expected: 8 },
      { a: 0, b: -6, expected: -6 },
      { a: 9999999, b: 8888888, expected: 18888887 },
      { a: -9999999, b: -8888888, expected: -18888887 },
      { a: 1000000000, b: -999999999, expected: 1 },
      { a: 3.14, b: 2.67, expected: 5.81 },
      { a: 7.5, b: 5, expected: 12.5 },
      { a: 0.000000000001, b: 0.000000000002, expected: 0.000000000003 },
      { a: 0.123456789, b: 0.987654321, expected: 1.11111111 },
      { a: 0.333333333, b: 0.666666666, expected: 0.999999999 },
      { a: 9007199254740991, b: 1, expected: 9007199254740992 },
      { a: -9007199254740991, b: -1, expected: -9007199254740992 },
    ],
    [OperationType.SUBTRACTION]: [
      { a: 5, b: 3, expected: 2 },
      { a: -5, b: -3, expected: -2 },
      { a: 10, b: -7, expected: 17 },
      { a: 0, b: 8, expected: -8 },
      { a: 0, b: -6, expected: 6 },
      { a: 9999999, b: 8888888, expected: 1111111 },
      { a: -9999999, b: -8888888, expected: -1111111 },
      { a: 1000000000, b: -999999999, expected: 1999999999 },
      { a: 3.14, b: 2.67, expected: 0.47 },
      { a: 7.5, b: 5, expected: 2.5 },
      { a: 0.123456789, b: 0.987654321, expected: -0.864197532 },
      { a: 0.1, b: 0.2, expected: -0.1 },
      { a: 0.1, b: 0.2, expected: -0.1 },
      { a: 7.5, b: 5, expected: 2.5 },
    ],
    [OperationType.MULTIPLICATION]: [
      { a: 5, b: 3, expected: 15 },
      { a: -5, b: -3, expected: 15 },
      { a: 10, b: -7, expected: -70 },
      { a: 0, b: 8, expected: 0 },
      { a: 0, b: -6, expected: 0 },
      { a: 9999999, b: 8888888, expected: 88888871111112 },
      { a: 3.14, b: 2.67, expected: 8.3838 },
      { a: 7.5, b: 5, expected: 37.5 },
    ],
    [OperationType.DIVISION]: [
      { a: 15, b: 3, expected: 5 },
      { a: -15, b: -3, expected: 5 },
      { a: 20, b: -5, expected: -4 },
      { a: 0, b: 8, expected: 0 },
      { a: 0, b: -6, expected: 0 },
      { a: 9999999, b: 8888888, expected: 1.125 },
      { a: 3.14, b: 2.67, expected: 1.1760299625468164794 },
      { a: 7.5, b: 5, expected: 1.5 },
      { a: 10, b: 3, expected: 3.3333333333333335 },
      { a: 1, b: 3, expected: 0.3333333333333333 },
    ],
    [OperationType.SQUARE_ROOT]: [
      { num: 25, expected: 5 },
      { num: 9.64, expected: 3.10483493925200474577 },
      { num: 100, expected: 10 },
      { num: 0, expected: 0 },
      { num: 999999999, expected: 31622.77658587240501519419 },
      { num: 1e-15, expected: 3.1622776601683795e-8 },
      { num: 0.25, expected: 0.5 },
      { num: 0.64, expected: 0.8 },
    ],
    [OperationType.RANDOM_STRING]: [
      { length: 1, expected: 'a' },
      { length: 10, expected: 'aaaaaaaaaa' },
    ],
  };

  // Mock call to endpoint that generates random string
  const spy = jest.spyOn(randomModule, 'getRandomString');
  spy.mockImplementation((length) => new Promise((resolve) => resolve('a'.repeat(length))));

  // HAPPY PATH

  testCases[OperationType.ADDITION].forEach((testCase) => {
    it(`should perform addition operation with ${testCase.a} and ${testCase.b}`, async () => {
      const result = await performOperation(OperationType.ADDITION, testCase.a, testCase.b);
      expect(result).toBe(testCase.expected);
    });
  });

  testCases[OperationType.SUBTRACTION].forEach((testCase) => {
    it(`should perform subtraction operation with ${testCase.a} and ${testCase.b}`, async () => {
      const result = await performOperation(OperationType.SUBTRACTION, testCase.a, testCase.b);
      expect(result).toBe(testCase.expected);
    });
  });

  testCases[OperationType.MULTIPLICATION].forEach((testCase) => {
    it(`should perform multiplication operation with ${testCase.a} and ${testCase.b}`, async () => {
      const result = await performOperation(OperationType.MULTIPLICATION, testCase.a, testCase.b);
      expect(result).toBe(testCase.expected);
    });
  });

  testCases[OperationType.DIVISION].forEach((testCase) => {
    it(`should perform division operation with ${testCase.a} and ${testCase.b}`, async () => {
      const result = await performOperation(OperationType.DIVISION, testCase.a, testCase.b);
      expect(result).toBe(testCase.expected);
    });
  });

  testCases[OperationType.SQUARE_ROOT].forEach((testCase) => {
    it(`should perform square root operation with ${testCase.num}`, async () => {
      const result = await performOperation(OperationType.SQUARE_ROOT, testCase.num);
      expect(result).toBe(testCase.expected);
    });
  });

  testCases[OperationType.RANDOM_STRING].forEach((testCase) => {
    it(`should perform random string generation with ${testCase.length}`, async () => {
      const result = await performOperation(OperationType.RANDOM_STRING, testCase.length);
      expect(result).toBe(testCase.expected);
    });
  });

  // EDGE CASES
  it('should throw error for division operation with zero as second number', async () => {
    await expect(performOperation(OperationType.DIVISION, 10, 0)).rejects.toThrow(
      'Cannot divide by zero'
    );
  });

  it('should throw error for square root operation with a negative integer', async () => {
    await expect(performOperation(OperationType.SQUARE_ROOT, -4)).rejects.toThrow(
      'Invalid input for this operation type'
    );
  });

  it('should throw error for random string operation with an invalid length', async () => {
    await expect(performOperation(OperationType.RANDOM_STRING, 0)).rejects.toThrow(
      'Invalid input for this operation type'
    );
    await expect(performOperation(OperationType.RANDOM_STRING, 21)).rejects.toThrow(
      'Invalid input for this operation type'
    );
    await expect(performOperation(OperationType.RANDOM_STRING, 10.5)).rejects.toThrow(
      'Invalid input for this operation type'
    );
  });

  it('should throw error for invalid operation type', async () => {
    await expect(performOperation('INVALID_OPERATION' as OperationType, 2, 3)).rejects.toThrow(
      'Invalid operation type'
    );
  });

  it('should throw error for operation type requiring second number without providing it', () => {
    expect(() => performOperation(OperationType.ADDITION, 2)).rejects.toThrow(
      'Second number is required for this operation type'
    );
    expect(() => performOperation(OperationType.SUBTRACTION, 5)).rejects.toThrow(
      'Second number is required for this operation type'
    );
    expect(() => performOperation(OperationType.MULTIPLICATION, 3)).rejects.toThrow(
      'Second number is required for this operation type'
    );
    expect(() => performOperation(OperationType.DIVISION, 10)).rejects.toThrow(
      'Second number is required for this operation type'
    );
  });
});

describe('validateUserCredit', () => {
  it('should return a status of true and remaining credits when user has enough credits for operation', () => {
    const recordsMock = [{ amount: 10 }, { amount: 20 }, { amount: 30 }] as Record[];

    const operationCost = 15;

    const result = validateUserCredit(recordsMock, operationCost);

    expect(result.status).toBe(true);
    expect(result.remainingCredits).toBe(25);
  });

  it('should return a status of false and negative remaining credits when user does not have enough credits for operation', () => {
    const recordsMock = [
      { amount: 10 },
      { amount: 20 },
      { amount: 30 },
      { amount: 30 },
    ] as Record[];

    const operationCost = 15;

    const result = validateUserCredit(recordsMock, operationCost);

    expect(result.status).toBe(false);
    expect(result.remainingCredits).toBe(-5);
  });
});
