import Decimal from 'decimal.js';

import { getRandomString } from '../lib/random';
import { OperationType } from '../models/operation';
import { Record } from '../models/record';

export const validateUserCredit = (records: Record[], operationCost: number) => {
  const initialCredits = parseInt(process.env.STARTING_CREDITS || '0', 10);
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
    return new Decimal(a).sqrt().toNumber();
  }

  if (b === undefined) {
    throw new Error('Second number is required for this operation type');
  }

  let result: Decimal;
  switch (type) {
    case OperationType.ADDITION:
      result = new Decimal(a).add(b);
      break;
    case OperationType.SUBTRACTION:
      result = new Decimal(a).sub(b);
      break;
    case OperationType.MULTIPLICATION:
      result = new Decimal(a).mul(b);
      break;
    case OperationType.DIVISION:
      if (b === 0) {
        throw new Error('Cannot divide by zero');
      }
      result = new Decimal(a).div(b);
      break;
    default:
      throw new Error('Invalid operation type');
  }

  if (result.isZero()) return 0;

  return result.toNumber();
};
