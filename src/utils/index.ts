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