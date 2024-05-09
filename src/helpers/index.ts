import { getRandomString } from '../lib/random';
import { OperationType } from '../models/operation';
import { Record } from '../models/record';

export const validateUserCredit = (records: Record[], operationCost: number) => {
  const initialCredits = parseInt(process.env.STARTING_CREDITS!);
  const creditsUsed = records.reduce((acc, record) => acc + record.amount, 0);

  const remainingCredits = initialCredits - creditsUsed - operationCost;

  return {
    status: remainingCredits >= 0,
    remainingCredits,
  };
};

export const performOperation = async (type: OperationType, a: number, b?: number) => {
  if (type === OperationType.RANDOM_STRING) {
    if (a < 1 || a > 20 || !Number.isInteger(a)) {
      throw new Error('Invalid input for this operation type');
    }
    return getRandomString(a);
  }

  if (type === OperationType.SQUARE_ROOT) {
    if (a < 0) {
      throw new Error('Invalid input for this operation type');
    }
    return Math.sqrt(a);
  }

  if (b === undefined) {
    throw new Error('Second number is required for this operation type');
  }

  switch (type) {
    case OperationType.ADDITION:
      return a + b;
    case OperationType.SUBTRACTION:
      return a - b;
    case OperationType.MULTIPLICATION:
      return a * b;
    case OperationType.DIVISION:
      if (b === 0) {
        throw new Error('Cannot divide by zero');
      }
      return a / b;
    default:
      throw new Error('Invalid operation type');
  }
};
