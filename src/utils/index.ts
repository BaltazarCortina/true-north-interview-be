import { getRandomString } from "../lib/random";
import { OperationType } from "../models/operation";
import { Record } from "../models/record";

export const validateUserCredit = (records: Record[], operationCost: number) => {
  const initialCredits = parseInt(process.env.STARTING_CREDITS!);
  const creditsUsed = records.reduce((acc, record) => acc + record.amount, 0);

  const remainingCredits = initialCredits - creditsUsed - operationCost;

  return {
    status: remainingCredits >= 0,
    remainingCredits,
  };
}

export const performOperation = async (type: OperationType, a: number, b: number) => {
  switch (type) {
    case OperationType.ADDITION:
      return a + b;
    case OperationType.SUBTRACTION:
      return a - b;
    case OperationType.MULTIPLICATION:
      return a * b;
    case OperationType.DIVISION:
      return a / b;
    case OperationType.SQUARE_ROOT:
      return Math.sqrt(a);
    case OperationType.RANDOM_STRING:
      return getRandomString(a);
    default:
      throw new Error('Invalid operation type');
  }
};